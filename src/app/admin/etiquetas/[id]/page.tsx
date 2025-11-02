// src/app/admin/etiquetas/[id]/page.tsx
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import prisma from "@/lib/prisma";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Package, Printer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Etiqueta as PrismaEtiqueta } from "@prisma/client";
import { EtiquetaClientPage } from "@/components/admin/etiquetas/EtiquetaClientPage";

type FormattedEtiquetaType = Omit<PrismaEtiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};

interface PageProps {
    params: { id: string };
}

async function getEtiqueta(id: string): Promise<FormattedEtiquetaType | 'nueva' | null> {
  if (id === 'nueva') {
    return 'nueva';
  }
  
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return null;
  }
  
  const etiqueta = await prisma.etiqueta.findUnique({
    where: { id: numericId },
  });

  if (!etiqueta) {
    return null;
  }
  
  return {
    ...etiqueta,
    montoACobrar: etiqueta.montoACobrar?.toNumber() ?? null,
  };
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
    const id = params.id;
    const etiqueta = await getEtiqueta(id);

    let title: string;
    let description: string;
    
    if(etiqueta === 'nueva') {
        title = "Generar Nueva Etiqueta";
        description = "Crea una nueva etiqueta de envío para un pedido."
    } else if (etiqueta) {
        title = `Editando Etiqueta #${(etiqueta as FormattedEtiquetaType).orderNumber || id}`;
        description = `Modifica los detalles de la etiqueta de envío existente.`
    } else {
        title = "Etiqueta no encontrada";
        description = "La etiqueta que buscas no existe o ha sido eliminada."
    }

    return {
        title,
        description,
        robots: {
            index: false,
            follow: false,
        },
    }
}


export default async function EtiquetaPage({ params }: PageProps) {
    const etiquetaData = await getEtiqueta(params.id);

    if (etiquetaData === null) {
        notFound();
    }
    
    const isNew = etiquetaData === 'nueva';
    const hasData = etiquetaData && !isNew;
    const title = isNew ? 'Generar Nueva Etiqueta de Envío' : `Editando Etiqueta #${(etiquetaData as FormattedEtiquetaType)?.orderNumber || params.id}`;
    const description = isNew ? 'Completa los datos para generar una etiqueta para un nuevo envío.' : 'Modifica los detalles de la etiqueta existente.';

    return (
        <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900 font-sans">
            <AdminHeader />
            <main className="flex-grow container mx-auto px-4 py-8 pt-24">
                <div className="no-print">
                    <Card className="max-w-4xl mx-auto mb-8 bg-background shadow-lg">
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-center gap-3">
                                <Package className="w-7 h-7 text-primary" />
                                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                                    {title}
                                </CardTitle>
                            </div>
                            <CardDescription>
                                {description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <EtiquetaClientPage 
                    initialData={hasData ? (etiquetaData as FormattedEtiquetaType) : null}
                />
            </main>
            <Footer />
        </div>
    );
}
