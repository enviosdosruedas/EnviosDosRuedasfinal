// src/app/admin/etiquetas/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from 'next';
import { type Etiqueta } from "@prisma/client";
import { EtiquetasClientPage } from "@/components/admin/etiquetas/EtiquetasClientPage";
import { EtiquetaStatus } from "./status";

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

export type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
  status: EtiquetaStatus;
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
    // Temporary fix: Assume PENDIENTE if status is not in the DB yet
    status: (etiqueta as any).status || EtiquetaStatus.PENDIENTE,
  }));
}

export default async function AdminEtiquetasPage() {
    const etiquetas = await getEtiquetas();

    return (
        <EtiquetasClientPage initialEtiquetas={etiquetas} />
    );
}
