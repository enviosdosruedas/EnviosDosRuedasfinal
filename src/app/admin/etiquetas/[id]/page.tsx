// src/app/admin/etiquetas/[id]/page.tsx
import type { Metadata } from 'next';
import { EtiquetaClientPage } from "@/components/admin/etiquetas/EtiquetaClientPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { FormattedEtiqueta } from '@/types';
import { EtiquetaStatus } from '@/types';

export const metadata: Metadata = {
  title: "Generar Etiqueta de Envío",
  description: "Crea o edita etiquetas de envío para tus pedidos.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data on every request to ensure it's fresh
export const revalidate = 0;

async function getEtiqueta(id: string): Promise<FormattedEtiqueta | null> {
  if (id === 'nueva') {
    return null;
  }
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    notFound();
  }
  
  const etiqueta = await prisma.etiqueta.findUnique({
    where: { id: numericId },
  });

  if (!etiqueta) {
    notFound();
  }

  // Explicitly cast the status to our custom enum
  const status = (etiqueta.status as string) in EtiquetaStatus 
    ? etiqueta.status as EtiquetaStatus 
    : EtiquetaStatus.PENDIENTE;

  return {
    ...etiqueta,
    montoACobrar: etiqueta.montoACobrar?.toNumber() ?? null,
    orderNumber: etiqueta.orderNumber ?? null,
    status: status,
  };
}


export default async function GenerarEtiquetaPage({ params }: { params: { id: string } }) {
    const etiqueta = await getEtiqueta(params.id);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
             <header className="p-4 no-print">
                <Button asChild variant="outline">
                    <Link href="/admin/etiquetas">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al listado
                    </Link>
                </Button>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
               <EtiquetaClientPage initialData={etiqueta} />
            </main>
        </div>
    );
}
