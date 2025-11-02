// src/components/admin/etiquetas/EtiquetasClientPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Ticket, Printer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Etiqueta } from "@prisma/client";
import { EtiquetaPrintLayout } from "@/components/admin/etiquetas/EtiquetaPrintLayout";
import { EtiquetasTable } from "@/components/admin/etiquetas/EtiquetasTable";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";

type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};

interface EtiquetasClientPageProps {
    initialEtiquetas: FormattedEtiqueta[];
}

export function EtiquetasClientPage({ initialEtiquetas }: EtiquetasClientPageProps) {
    const [etiquetas, setEtiquetas] = useState<FormattedEtiqueta[]>(initialEtiquetas);
    const [etiquetaToPrint, setEtiquetaToPrint] = useState<FormattedEtiqueta | null>(null);
    const [isPrintingAll, setIsPrintingAll] = useState(false);

    useEffect(() => {
        setEtiquetas(initialEtiquetas);
    }, [initialEtiquetas]);
    
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
        const handleAfterPrint = () => onAfterPrint();
        window.addEventListener('afterprint', handleAfterPrint);
        return () => {
            window.removeEventListener('afterprint', handleAfterPrint);
        };
    }, []);

    return (
        <>
            <div className="no-print flex flex-col min-h-screen">
                <AdminHeader />
                <main className="flex-grow container mx-auto px-4 py-8 pt-24">
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
                </main>
                <Footer />
            </div>
             <div className="print-only">
                {etiquetaToPrint && <EtiquetaPrintLayout etiqueta={etiquetaToPrint} />}
                {isPrintingAll && (
                    <div className="labels-container-grid">
                        {etiquetas.map((e, index) => (
                            <div key={e.id} className="printable-label-wrapper-grid">
                                <EtiquetaPrintLayout etiqueta={e} isLast={index === etiquetas.length - 1} />
                            </div>
                        ))}
                    </div>
                )}
             </div>
        </>
    );
}
