
// src/app/admin/etiquetas/actions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma, ServiceTypeEnum } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const EtiquetaFormSchema = z.object({
  id: z.coerce.number().int().optional(),
  tipoEnvio: z.nativeEnum(ServiceTypeEnum, { required_error: 'El tipo de servicio es requerido.' }),
  
  remitenteNombre: z.string().min(3, { message: 'El nombre del remitente es requerido.' }),
  remitenteDireccion: z.string().min(5, { message: 'La dirección de retiro es requerida.' }),
  remitenteNotas: z.string().optional(),
  
  destinatarioNombre: z.string().min(3, { message: 'El nombre del destinatario es requerido.' }),
  destinatarioDireccion: z.string().min(5, { message: 'La dirección de entrega es requerida.' }),
  destinatarioTelefono: z.string().regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  montoACobrar: z.coerce.number().min(0, "El monto no puede ser negativo.").optional().or(z.literal('')),
  destinatarioNotas: z.string().optional(),
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
        console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
        return {
            error: 'Por favor, corrige los errores en el formulario.',
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { id, ...data } = validatedFields.data;
    const decimalData = {
        ...data,
        montoACobrar: data.montoACobrar ? new Prisma.Decimal(data.montoACobrar) : null,
    };
    
    let newEtiquetaId;

    try {
        if (id) {
            // Update logic
            const updatedEtiqueta = await prisma.etiqueta.update({
                where: { id },
                data: decimalData,
            });
            newEtiquetaId = updatedEtiqueta.id;
        } else {
            // Create logic
            const newEtiqueta = await prisma.etiqueta.create({
                data: decimalData,
            });
            newEtiquetaId = newEtiqueta.id;
        }

        // Revalidate the list page
        revalidatePath('/admin/etiquetas');

        // Redirect after creation
        if (!id) {
            redirect(`/admin/etiquetas/${newEtiquetaId}`);
        }

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
