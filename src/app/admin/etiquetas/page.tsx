// src/app/admin/etiquetas/page.tsx
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
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
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <AdminHeader />
            <main className="flex-grow container mx-auto px-4 py-8 pt-24">
               <EtiquetasClientPage initialEtiquetas={etiquetas} />
            </main>
            <Footer />
        </div>
    );
}
