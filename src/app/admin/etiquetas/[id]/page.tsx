// src/app/admin/etiquetas/[id]/page.tsx
'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { EtiquetaForm } from "@/components/admin/etiquetas/EtiquetaForm";
import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Package, Printer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ServiceTypeEnum, Etiqueta } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { EtiquetaPrintLayout } from "@/components/admin/etiquetas/EtiquetaPrintLayout";

// This is a client component, so metadata should be handled differently or removed if not needed server-side.
// For simplicity, we'll manage the title client-side.

type FormattedEtiquetaType = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};

// Async function to fetch data
async function getEtiqueta(id: string): Promise<FormattedEtiquetaType | 'nueva' | null> {
  if (id === 'nueva') {
    return 'nueva';
  }
  
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    return null; // Triggers notFound
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

export default function EtiquetaPageWrapper() {
    const pathname = usePathname();
    const id = pathname.split('/').pop() || '';
    const [etiqueta, setEtiqueta] = useState<FormattedEtiquetaType | 'nueva' | null | undefined>(undefined);
    
    useEffect(() => {
        if(id){
            getEtiqueta(id).then(data => {
                if (data === null) {
                    notFound();
                } else {
                    setEtiqueta(data);
                }
            });
        }
    }, [id]);

    const isNew = etiqueta === 'nueva';
    const hasData = etiqueta && etiqueta !== 'nueva';
    
    const handlePrint = () => {
        window.print();
    };

    if (etiqueta === undefined) {
        return (
            <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-900 font-sans">
                <AdminHeader />
                <main className="flex-grow container mx-auto px-4 py-8 pt-24 text-center">
                    <p>Cargando datos de la etiqueta...</p>
                </main>
                <Footer />
            </div>
        );
    }

    const title = isNew ? 'Generar Nueva Etiqueta de Envío' : `Editando Etiqueta #${(etiqueta as FormattedEtiquetaType)?.orderNumber || id}`;
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
                    <EtiquetaForm initialData={hasData ? etiqueta as FormattedEtiquetaType : null} />
                    {hasData && (
                        <div className="max-w-4xl mx-auto mt-8 flex justify-center">
                            <Button onClick={handlePrint} size="lg">
                                <Printer className="mr-2 h-5 w-5" />
                                Imprimir Etiqueta
                            </Button>
                        </div>
                    )}
                </div>
                {hasData && (
                    <div className="print-only">
                        <EtiquetaPrintLayout etiqueta={etiqueta as FormattedEtiquetaType} />
                    </div>
                )}
            </main>
            <Footer />
            <style jsx global>{`
                @media print {
                  .no-print {
                    display: none;
                  }
                  .print-only {
                    display: block;
                  }
                  body {
                    background-color: #fff;
                  }
                  main {
                    padding-top: 0 !important;
                    padding-bottom: 0 !important;
                  }
                }
                .print-only {
                  display: none;
                }
            `}</style>
        </div>
    );
}