
// src/app/admin/repartidores/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from 'next';
import { RepartidoresClientPage } from "@/components/admin/repartidores/RepartidoresClientPage";
import { Repartidor } from "@prisma/client";

export const metadata: Metadata = {
  title: "Gestión de Repartidores",
  description: "Administra, visualiza, crea y modifica los repartidores de Envios DosRuedas.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data to ensure it's fresh
export const revalidate = 0;

async function getRepartidores(): Promise<Repartidor[]> {
   const repartidores = await prisma.repartidor.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return repartidores;
}

export default async function AdminRepartidoresPage() {
    const repartidores = await getRepartidores();

    return (
        <RepartidoresClientPage initialRepartidores={repartidores} />
    );
}
