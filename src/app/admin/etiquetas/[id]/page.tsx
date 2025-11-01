
// src/app/admin/etiquetas/[id]/page.tsx

import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import { EtiquetaForm } from "@/components/admin/etiquetas/EtiquetaForm";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;

  if (id === 'nueva') {
    return {
      title: "Nueva Etiqueta de Envío",
      description: "Genera una nueva etiqueta de envío para un pedido.",
      robots: { index: false, follow: false },
    };
  }

  const etiqueta = await prisma.etiqueta.findUnique({ where: { id: parseInt(id) } });

  if (!etiqueta) {
    return {
      title: "Etiqueta no encontrada",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Editar Etiqueta #${etiqueta.id}`,
    description: `Editando detalles para la etiqueta de envío de ${etiqueta.remitenteNombre} a ${etiqueta.destinatarioNombre}.`,
    robots: { index: false, follow: false },
  };
}

export default async function EtiquetaPage({ params }: PageProps) {
  const { id } = params;
  const isNew = id === 'nueva';
  let etiqueta = null;

  if (!isNew) {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      notFound();
    }
    etiqueta = await prisma.etiqueta.findUnique({
      where: { id: numericId },
    });
    if (!etiqueta) {
      notFound();
    }
  }

  const formattedEtiqueta = etiqueta ? {
    ...etiqueta,
    montoACobrar: etiqueta.montoACobrar?.toNumber() ?? null,
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900 font-sans">
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto mb-8 bg-background shadow-lg">
            <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3">
                    <Package className="w-7 h-7 text-primary" />
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                        {isNew ? 'Generar Nueva Etiqueta de Envío' : `Editando Etiqueta #${id}`}
                    </CardTitle>
                </div>
                 <CardDescription>
                    {isNew ? 'Completa los datos para generar una etiqueta para un nuevo envío.' : 'Modifica los detalles de la etiqueta existente.'}
                </CardDescription>
            </CardHeader>
        </Card>
        <EtiquetaForm initialData={formattedEtiqueta} />
      </main>
      <Footer />
    </div>
  );
}
