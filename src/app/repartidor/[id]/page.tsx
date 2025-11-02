// src/app/repartidor/[id]/page.tsx
import type { Metadata } from 'next';
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { type Repartidor } from "@prisma/client";
import { EtiquetaStatus, type FormattedEtiqueta } from "@/types";
import { RepartidorDashboard } from '@/components/repartidor/RepartidorDashboard';

export const revalidate = 0; // Always fetch fresh data

async function getRepartidorData(id: string): Promise<{ repartidor: Repartidor; etiquetas: FormattedEtiqueta[] } | null> {
    const repartidorId = parseInt(id, 10);
    if (isNaN(repartidorId)) {
        return null;
    }

    const repartidor = await prisma.repartidor.findUnique({
        where: { id: repartidorId },
    });

    if (!repartidor) {
        return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const etiquetas = await prisma.etiqueta.findMany({
        where: {
            repartidorId: repartidorId,
             createdAt: {
                gte: today,
                lt: tomorrow,
            },
            status: {
                in: [EtiquetaStatus.IMPRESA, EtiquetaStatus.EN_CAMINO, EtiquetaStatus.ENTREGADA, EtiquetaStatus.NO_ENTREGADA]
            }
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const formattedEtiquetas = etiquetas.map(e => ({
        ...e,
        montoACobrar: e.montoACobrar?.toNumber() ?? null,
        orderNumber: e.orderNumber || null,
        status: e.status as EtiquetaStatus,
        repartidorId: e.repartidorId,
    }));

    return { repartidor, etiquetas: formattedEtiquetas };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await getRepartidorData(params.id);
  return {
    title: `Panel de ${data?.repartidor.name || 'Repartidor'}`,
    description: `Hoja de ruta y gestión de entregas para ${data?.repartidor.name}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}


export default async function RepartidorPage({ params }: { params: { id: string } }) {
    const data = await getRepartidorData(params.id);

    if (!data) {
        notFound();
    }

    return (
        <RepartidorDashboard 
            repartidor={data.repartidor}
            initialEtiquetas={data.etiquetas}
        />
    );
}
