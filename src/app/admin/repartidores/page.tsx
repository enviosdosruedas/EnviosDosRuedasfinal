// src/app/admin/repartidores/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from 'next';
import { RepartidoresClientPage } from "@/components/admin/repartidores/RepartidoresClientPage";
import { Etiqueta, Repartidor, ServiceTypeEnum } from "@prisma/client";
import { EtiquetaStatus, type FormattedEtiqueta } from "@/types";

export const metadata: Metadata = {
  title: "Gestión de Repartidores y Entregas",
  description: "Administra repartidores y visualiza las hojas de ruta de entrega diarias.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data on every request to ensure it's fresh
export const revalidate = 0;

async function getRepartidores(): Promise<Repartidor[]> {
   const repartidores = await prisma.repartidor.findMany({
    orderBy: {
      name: 'asc',
    },
    where: {
      isActive: true
    }
  });
  return repartidores;
}

async function getEtiquetas(): Promise<FormattedEtiqueta[]> {
    const etiquetas = await prisma.etiqueta.findMany({
     orderBy: {
       createdAt: 'desc',
     },
   });
 
   return etiquetas.map(etiqueta => ({
     ...etiqueta,
     montoACobrar: etiqueta.montoACobrar?.toNumber() ?? null,
     status: (etiqueta.status as EtiquetaStatus) || EtiquetaStatus.PENDIENTE,
     orderNumber: etiqueta.orderNumber || null,
   }));
 }

export default async function AdminRepartidoresPage() {
    const repartidores = await getRepartidores();
    const etiquetas = await getEtiquetas();

    return (
        <RepartidoresClientPage 
            initialRepartidores={repartidores} 
            initialEtiquetas={etiquetas}
        />
    );
}
