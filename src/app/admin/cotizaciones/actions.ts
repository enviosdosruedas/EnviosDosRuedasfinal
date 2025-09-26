
// src/app/admin/cotizaciones/actions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { Prisma, ServiceTypeEnum } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const PriceRangeSchema = z.object({
  id: z.coerce.number().int().optional(),
  distanciaMinKm: z.coerce.number().min(0, 'La distancia mínima no puede ser negativa.'),
  distanciaMaxKm: z.coerce.number().positive('La distancia máxima debe ser mayor que cero.'),
  precioRango: z.coerce.number().positive('El precio debe ser mayor que cero.'),
  serviceType: z.nativeEnum(ServiceTypeEnum, { required_error: 'El tipo de servicio es requerido.' }),
  isActive: z.boolean(),
}).refine(data => data.distanciaMinKm < data.distanciaMaxKm, {
  message: 'La distancia máxima debe ser mayor que la distancia mínima.',
  path: ['distanciaMaxKm'],
});

export interface PriceRangeState {
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof PriceRangeSchema>, string[]>>;
}

async function upsertPriceRange(
  formData: FormData
): Promise<PriceRangeState> {
  const rawData = {
    id: formData.get('id'),
    distanciaMinKm: formData.get('distanciaMinKm'),
    distanciaMaxKm: formData.get('distanciaMaxKm'),
    precioRango: formData.get('precioRango'),
    serviceType: formData.get('serviceType'),
    isActive: formData.get('isActive') === 'true',
  };
  
  const validatedFields = PriceRangeSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: 'Por favor, corrige los errores en el formulario.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validatedFields.data;
  const decimalData = {
      ...data,
      distanciaMinKm: new Prisma.Decimal(data.distanciaMinKm),
      distanciaMaxKm: new Prisma.Decimal(data.distanciaMaxKm),
      precioRango: new Prisma.Decimal(data.precioRango),
  };

  try {
    if (id) {
      // Update
      await prisma.priceRange.update({
        where: { id },
        data: decimalData,
      });
    } else {
      // Create
      await prisma.priceRange.create({
        data: decimalData,
      });
    }

    revalidatePath('/admin/cotizaciones');
    return {
      message: `Rango de precios ${id ? 'actualizado' : 'creado'} exitosamente.`,
    };

  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return { error: 'Error: Ya existe un rango con la misma configuración de distancia y tipo de servicio.' };
    }
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido al guardar.';
    return { error: `Hubo un error al guardar el rango de precios: ${errorMessage}` };
  }
}

export async function createPriceRange(prevState: PriceRangeState, formData: FormData): Promise<PriceRangeState> {
    return upsertPriceRange(formData);
}

export async function updatePriceRange(prevState: PriceRangeState, formData: FormData): Promise<PriceRangeState> {
    return upsertPriceRange(formData);
}

export async function deletePriceRange(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.priceRange.delete({
      where: { id },
    });
    revalidatePath('/admin/cotizaciones');
    return { success: true };
  } catch (error) {
    console.error(`Error deleting price range #${id}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
       return { success: false, error: 'No se encontró el rango de precios para eliminar.' };
    }
    return { success: false, error: 'Ocurrió un error al eliminar el rango de precios.' };
  }
}
