// src/app/repartidor/page.tsx
import type { Metadata } from 'next';
import prisma from "@/lib/prisma";
import type { Repartidor } from "@prisma/client";
import { RepartidorSelection } from '@/components/repartidor/RepartidorSelection';

export const metadata: Metadata = {
  title: "Acceso de Repartidor",
  description: "Selecciona tu perfil para acceder a tu panel de entregas.",
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60; // Revalidate every minute to get fresh data

async function getRepartidores(): Promise<Repartidor[]> {
  const repartidores = await prisma.repartidor.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
  return repartidores;
}

export default async function RepartidorLoginPage() {
    const repartidores = await getRepartidores();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <RepartidorSelection repartidores={repartidores} />
        </div>
    );
}
