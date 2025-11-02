// src/app/admin/etiquetas/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import prisma from "@/lib/prisma";
import { EtiquetasTable } from "@/components/admin/etiquetas/EtiquetasTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Ticket, Printer } from "lucide-react";
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Etiqueta } from "@prisma/client";
import { EtiquetaPrintLayout } from '@/components/admin/etiquetas/EtiquetaPrintLayout';


type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};

// Revalidate data to ensure it's fresh
export const revalidate = 0; // Revalidate on every request

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

export default function AdminEtiquetasPage() {
    const [etiquetas, setEtiquetas] = useState<FormattedEtiqueta[]>([]);
    const [etiquetaToPrint, setEtiquetaToPrint] = useState<FormattedEtiqueta | null>(null);
    const [isPrintingAll, setIsPrintingAll] = useState(false);
    
    useEffect(() => {
        getEtiquetas().then(setEtiquetas);
    }, []);
    
    const handlePrint = (etiqueta: FormattedEtiqueta) => {
        setEtiquetaToPrint(etiqueta);
        setIsPrintingAll(false);
        setTimeout(() => window.print(), 100);
    };

    const handlePrintAll = () => {
        setIsPrintingAll(true);
        setEtiquetaToPrint(null);
        setTimeout(() => window.print(), 100);
    };

    const onAfterPrint = () => {
      setEtiquetaToPrint(null);
      setIsPrintingAll(false);
    };

    useEffect(() => {
        window.addEventListener('afterprint', onAfterPrint);
        return () => {
            window.removeEventListener('afterprint', onAfterPrint);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <AdminHeader />
            <main className="flex-grow container mx-auto px-4 py-8 pt-24">
                <div className="no-print">
                    <Card className="mb-8 bg-background shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <Ticket className="w-8 h-8 text-primary" />
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-primary">Gestión de Etiquetas</CardTitle>
                                        <CardDescription>Visualiza, crea y administra las etiquetas de envío.</CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                     <Button onClick={handlePrintAll} variant="outline" disabled={etiquetas.length === 0}>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Imprimir Todas
                                    </Button>
                                    <Button asChild>
                                        <Link href="/admin/etiquetas/nueva">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Crear Nueva Etiqueta
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <EtiquetasTable etiquetas={etiquetas} onPrint={handlePrint} />
                </div>
                 <div className="print-only">
                    {etiquetaToPrint && <EtiquetaPrintLayout etiqueta={etiquetaToPrint} />}
                    {isPrintingAll && (
                        <div className="space-y-4">
                            {etiquetas.map((e, index) => (
                                <EtiquetaPrintLayout key={e.id} etiqueta={e} isLast={index === etiquetas.length - 1} />
                            ))}
                        </div>
                    )}
                 </div>
            </main>
            <Footer />
            <style jsx global>{`
                @media print {
                  .no-print {
                    display: none !important;
                  }
                  .print-only {
                    display: block !important;
                  }
                  body {
                    background-color: #fff !important;
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