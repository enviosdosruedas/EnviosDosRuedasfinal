// src/app/admin/etiquetas/actions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma, ServiceTypeEnum, EtiquetaStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const timeStringToMinutes = (time: string) => {
  if (!time || !time.includes(':')) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const PUNTO_RETIRO_ADDRESS = "11 de Septiembre 3317, Mar del Plata";

const EtiquetaFormSchema = z.object({
  id: z.coerce.number().int().optional(),
  orderNumber: z.string().optional(),
  tipoEnvio: z.nativeEnum(ServiceTypeEnum, { required_error: 'El tipo de servicio es requerido.' }),
  
  remitenteNombre: z.string().min(3, { message: 'El nombre del remitente es requerido.' }),
  remitenteDireccion: z.string().min(5, { message: 'La dirección de retiro es requerida.' }),
  remitenteNotas: z.string().optional(),
  
  destinatarioNombre: z.string().min(3, { message: 'El nombre del destinatario es requerido.' }),
  destinatarioDireccion: z.string().min(5, { message: 'La dirección de entrega es requerida.' }),
  destinatarioTelefono: z.string().regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  montoACobrar: z.coerce.number().min(0, "El monto no puede ser negativo.").optional().or(z.literal('')),
  destinatarioNotas: z.string().optional(),
  deliveryStartTime: z.string().optional(),
  deliveryEndTime: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.tipoEnvio === ServiceTypeEnum.EXPRESS) {
    if (!data.deliveryStartTime || !data.deliveryEndTime) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El rango horario es requerido para envíos Express.", path: ["deliveryStartTime"] });
    } else {
      const start = timeStringToMinutes(data.deliveryStartTime);
      const end = timeStringToMinutes(data.deliveryEndTime);
      if (end <= start) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La hora final debe ser posterior a la inicial.", path: ["deliveryEndTime"] });
      } else if (end - start < 120) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El rango horario debe ser de al menos 2 horas.", path: ["deliveryEndTime"] });
      }
    }
  }

  if (data.tipoEnvio === ServiceTypeEnum.PUNTO_DE_RETIRO && data.destinatarioDireccion !== PUNTO_RETIRO_ADDRESS) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La dirección debe ser la del punto de retiro.", path: ["destinatarioDireccion"] });
  }
});

export interface EtiquetaFormState {
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof EtiquetaFormSchema>, string[]>>;
  etiquetaId?: number;
}

export async function upsertEtiqueta(
  prevState: EtiquetaFormState,
  formData: FormData
): Promise<EtiquetaFormState> {
    const rawData = Object.fromEntries(formData.entries());
    
    const validatedFields = EtiquetaFormSchema.safeParse({
        ...rawData,
        montoACobrar: rawData.montoACobrar === '' ? undefined : rawData.montoACobrar,
    });

    if (!validatedFields.success) {
        return {
            error: 'Por favor, corrige los errores en el formulario.',
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { id, ...data } = validatedFields.data;

    const dbData: Omit<Prisma.EtiquetaCreateInput, 'orderNumber' | 'status'> & { orderNumber?: string, status?: EtiquetaStatus } = {
        tipoEnvio: data.tipoEnvio,
        remitenteNombre: data.remitenteNombre,
        remitenteDireccion: data.remitenteDireccion,
        remitenteNotas: data.remitenteNotas,
        destinatarioNombre: data.destinatarioNombre,
        destinatarioDireccion: data.destinatarioDireccion,
        destinatarioTelefono: data.destinatarioTelefono,
        montoACobrar: data.montoACobrar ? new Prisma.Decimal(data.montoACobrar) : null,
        destinatarioNotas: data.destinatarioNotas,
        deliveryStartTime: data.tipoEnvio === 'EXPRESS' ? data.deliveryStartTime : null,
        deliveryEndTime: data.tipoEnvio === 'EXPRESS' ? data.deliveryEndTime : null,
    };
    
    let newEtiquetaId;

    try {
        if (id) {
            // Update logic - status does not change on update
            const updatedEtiqueta = await prisma.etiqueta.update({
                where: { id },
                data: dbData,
            });
            newEtiquetaId = updatedEtiqueta.id;
        } else {
            // Create logic
            const prefix = data.tipoEnvio === 'EXPRESS' ? 'EXP' : 'LOW';
            const orderNumber = `${prefix}-${Date.now()}`;
            
            const newEtiqueta = await prisma.etiqueta.create({
                data: {
                    ...dbData,
                    orderNumber: orderNumber,
                    status: EtiquetaStatus.PENDIENTE, // Default status for new labels
                },
            });
            newEtiquetaId = newEtiqueta.id;
        }

        revalidatePath('/admin/etiquetas');

        return {
            message: `Etiqueta ${id ? 'actualizada' : 'creada'} exitosamente.`,
            etiquetaId: newEtiquetaId,
        };

    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido al guardar la etiqueta.';
        return {
            error: `Hubo un error al guardar la etiqueta: ${errorMessage}`,
        };
    }
}


export async function updateEtiquetasStatus(
  ids: number[],
  status: EtiquetaStatus
): Promise<{ success: boolean; error?: string; count?: number }> {
  if (!ids || ids.length === 0) {
    return { success: false, error: 'No se proporcionaron IDs de etiquetas.' };
  }

  try {
    const updateResult = await prisma.etiqueta.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status: status,
      },
    });

    revalidatePath('/admin/etiquetas');
    return { success: true, count: updateResult.count };
  } catch (error) {
    console.error('Error updating etiqueta status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
    return { success: false, error: `Error al actualizar estado: ${errorMessage}` };
  }
}
