
'use server';

import prisma from '@/lib/prisma';
import type { Order } from '@prisma/client';

export interface TrackingData {
  order: Order;
  pickupLocation: { lat: number; lng: number } | null;
  deliveryLocation: { lat: number; lng: number } | null;
  driverLocation: { lat: number; lng: number } | null; // Simulated
  status: string; // Simulated
  estimatedArrival: string; // Simulated, raw time or ISO string preferred
  timeRemaining: string; // Simulated
  driverInfo: {
    name: string;
    title: string;
    photo: string;
    phone: string;
  }; // Simulated
  updates: {
    time: string; // Should be ISO string from server
    status: string;
    description: string;
    icon: string;
    isActive: boolean;
  }[]; // Simulated
}

export async function getOrderTrackingDetails(orderId: string): Promise<{ success: boolean; data?: TrackingData; error?: string }> {
  try {
    // Ensure orderId is treated as number if your Prisma schema ID is Int
    const numericOrderId = parseInt(orderId, 10);
    if (isNaN(numericOrderId)) {
        return { success: false, error: `ID de pedido inválido: "${orderId}". Debe ser un número.` };
    }

    const order = await prisma.order.findUnique({
      where: { id: numericOrderId }, // Use numericOrderId
    });

    if (!order) {
      return { success: false, error: `Pedido con ID "${orderId}" no encontrado.` };
    }

    const plainOrderObject = {
      ...order,
      // Convert all Decimal fields to numbers so they can be passed to client components
      originLat: order.originLat?.toNumber() ?? null,
      originLng: order.originLng?.toNumber() ?? null,
      destinationLat: order.destinationLat?.toNumber() ?? null,
      destinationLng: order.destinationLng?.toNumber() ?? null,
      quotedPrice: order.quotedPrice?.toNumber() ?? null,
      shippingCost: order.shippingCost?.toNumber() ?? null,
      totalCost: order.totalCost?.toNumber() ?? null,
    };
    
    // Use the coordinates stored in the order, don't geocode again.
    const pickupLocation = plainOrderObject.originLat && plainOrderObject.originLng
      ? { lat: plainOrderObject.originLat, lng: plainOrderObject.originLng }
      : null;
    
    const deliveryLocation = plainOrderObject.destinationLat && plainOrderObject.destinationLng
      ? { lat: plainOrderObject.destinationLat, lng: plainOrderObject.destinationLng }
      : null;
    
    const driverLocation = pickupLocation || { lat: -38.0023, lng: -57.5575 }; 

    const now = new Date();
    const estimatedArrivalTime = new Date(now.getTime() + 47 * 60000);

    // Prepare pickupDateTime as ISO string for the 'updates' array
    const pickupDateTimeISO = order.pickupDateTime ? order.pickupDateTime.toISOString() : new Date().toISOString();


    const trackingData: TrackingData = {
      order: plainOrderObject as any, // Cast to bypass strict type check for Decimal fields. The runtime object is what matters.
      pickupLocation,
      deliveryLocation,
      driverLocation,
      status: "En curso",
      estimatedArrival: estimatedArrivalTime.toISOString(), // Return as ISO string
      timeRemaining: "47 minutos", 
      driverInfo: {
        name: "Matias C.",
        title: "Tu Conductor Asignado",
        photo: "https://placehold.co/80x80.png", 
        phone: "02231234567"
      },
      updates: [
        {
          time: pickupDateTimeISO, // Use ISO string
          status: "Pedido Recibido",
          description: `Tu pedido ${order.id} ha sido confirmado.`,
          icon: "started",
          isActive: true
        },
      ],
    };

    return { success: true, data: trackingData };
  } catch (error) {
    console.error('Error fetching order tracking details:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred while fetching tracking details.' };
  }
}
