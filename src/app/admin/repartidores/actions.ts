// src/app/admin/repartidores/actions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { EtiquetaStatus } from '@/types';
import type { FormattedEtiqueta } from '@/types';

const repartidorSchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.string().min(2, 'El nombre es requerido.'),
  phone: z.string().min(7, 'El teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  vehicleType: z.string().min(3, 'El tipo de vehículo es requerido.'),
  licensePlate: z.string().min(4, 'La patente es requerida.'),
  isActive: z.boolean(),
});

export interface RepartidorFormState {
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof repartidorSchema>, string[]>>;
}

async function upsertRepartidor(
  formData: FormData
): Promise<RepartidorFormState> {
  const rawData = {
    id: formData.get('id'),
    name: formData.get('name'),
    phone: formData.get('phone'),
    vehicleType: formData.get('vehicleType'),
    licensePlate: formData.get('licensePlate'),
    isActive: formData.get('isActive') === 'true',
  };
  
  const validatedFields = repartidorSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: 'Por favor, corrige los errores en el formulario.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validatedFields.data;

  try {
    if (id) {
      // Update
      await prisma.repartidor.update({
        where: { id },
        data,
      });
    } else {
      // Create
      await prisma.repartidor.create({
        data,
      });
    }

    revalidatePath('/admin/repartidores');
    return {
      message: `Repartidor ${id ? 'actualizado' : 'creado'} exitosamente.`,
    };

  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
       const target = e.meta?.target as string[];
       if (target.includes('phone')) {
         return { error: 'Error: El número de teléfono ya está en uso.' };
       }
       if (target.includes('licensePlate')) {
         return { error: 'Error: La patente del vehículo ya está registrada.' };
       }
    }
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido al guardar.';
    return { error: `Hubo un error al guardar el repartidor: ${errorMessage}` };
  }
}

export async function createRepartidor(prevState: RepartidorFormState, formData: FormData): Promise<RepartidorFormState> {
    return upsertRepartidor(formData);
}

export async function updateRepartidor(prevState: RepartidorFormState, formData: FormData): Promise<RepartidorFormState> {
    return upsertRepartidor(formData);
}

export async function deleteRepartidor(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if the repartidor is associated with any orders
    const ordersCount = await prisma.etiqueta.count({
      where: { repartidorId: id },
    });

    if (ordersCount > 0) {
      return { success: false, error: 'No se puede eliminar el repartidor porque tiene entregas asociadas. Por favor, reasigna las entregas primero.' };
    }

    await prisma.repartidor.delete({
      where: { id },
    });
    revalidatePath('/admin/repartidores');
    return { success: true };
  } catch (error) {
    console.error(`Error deleting repartidor #${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
       return { success: false, error: 'No se encontró el repartidor para eliminar.' };
    }
    return { success: false, error: 'Ocurrió un error al eliminar el repartidor.' };
  }
}

export async function assignEtiquetaByOrderNumber(
    repartidorId: number,
    orderNumber: string
): Promise<{ success: boolean; error?: string; etiqueta?: FormattedEtiqueta }> {
    try {
        const etiqueta = await prisma.etiqueta.findUnique({
            where: { orderNumber },
        });

        if (!etiqueta) {
            return { success: false, error: `No se encontró ninguna etiqueta con el número de orden "${orderNumber}".` };
        }

        if (etiqueta.repartidorId && etiqueta.repartidorId !== repartidorId) {
            return { success: false, error: `Esta etiqueta ya está asignada a otro repartidor.` };
        }

        if (etiqueta.status !== EtiquetaStatus.PENDIENTE && etiqueta.status !== EtiquetaStatus.IMPRESA) {
            return { success: false, error: `La etiqueta ya está en estado "${etiqueta.status}" y no puede ser re-asignada.` };
        }

        const updatedEtiqueta = await prisma.etiqueta.update({
            where: { id: etiqueta.id },
            data: {
                repartidorId: repartidorId,
                status: EtiquetaStatus.EN_CAMINO,
            },
        });

        revalidatePath(`/repartidor/${repartidorId}`);
        revalidatePath('/admin/repartidores');

        return {
            success: true,
            etiqueta: {
              ...updatedEtiqueta,
              montoACobrar: updatedEtiqueta.montoACobrar?.toNumber() ?? null,
              orderNumber: updatedEtiqueta.orderNumber || null,
              status: updatedEtiqueta.status as EtiquetaStatus,
            }
        };

    } catch (error) {
        console.error("Error assigning etiqueta by order number:", error);
        return { success: false, error: "Ocurrió un error en el servidor al intentar asignar la etiqueta." };
    }
}
