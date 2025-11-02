// src/app/admin/etiquetas/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from 'next';
import { Etiqueta } from "@prisma/client";
import { EtiquetasClientPage } from "@/components/admin/etiquetas/EtiquetasClientPage";

export const metadata: Metadata = {
  title: "Gestión de Etiquetas",
  description: "Visualiza, crea y administra las etiquetas de envío.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data on every request to ensure it's fresh
export const revalidate = 0;

type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};

async function getEtiquetas(): Promise<FormattedEtiqueta[]> {
   const etiquetas = await prisma.etiqueta.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return etiquetas.map(etiqueta => ({
    ...etiqueta,
    montoACobrar: etiqueta.montoACobrar?.toNumber() ?? null,
  }));
}

export default async function AdminEtiquetasPage() {
    const etiquetas = await getEtiquetas();

    return (
        <EtiquetasClientPage initialEtiquetas={etiquetas} />
    );
}
