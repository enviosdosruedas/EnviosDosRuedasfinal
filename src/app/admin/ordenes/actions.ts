// src/app/admin/ordenes/actions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteOrder(orderId: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.order.delete({
      where: { id: orderId },
    });

    revalidatePath('/admin/ordenes'); // Revalidate the orders list page
    return { success: true };
  } catch (error) {
    console.error(`Error deleting order #${orderId}:`, error);
    // Handle specific Prisma error for record not found
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
       return { success: false, error: 'No se encontró la orden para eliminar. Es posible que ya haya sido eliminada.' };
    }
    return { success: false, error: 'Ocurrió un error al eliminar la orden.' };
  }
}
