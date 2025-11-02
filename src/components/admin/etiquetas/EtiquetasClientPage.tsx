// src/components/admin/etiquetas/EtiquetasClientPage.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Ticket, Printer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EtiquetaPrintLayout } from "@/components/admin/etiquetas/EtiquetaPrintLayout";
import { EtiquetasTable } from "@/components/admin/etiquetas/EtiquetasTable";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { EtiquetaStatus, type FormattedEtiqueta } from "@/types";
import { EtiquetasToolbar } from './EtiquetasToolbar';
import type { DateRange } from 'react-day-picker';

interface EtiquetasClientPageProps {
    initialEtiquetas: FormattedEtiqueta[];
}

export function EtiquetasClientPage({ initialEtiquetas }: EtiquetasClientPageProps) {
    const [etiquetas, setEtiquetas] = useState<FormattedEtiqueta[]>(initialEtiquetas);
    const [etiquetasToPrint, setEtiquetasToPrint] = useState<FormattedEtiqueta[]>([]);
    const [filter, setFilter] = useState<string>(EtiquetaStatus.PENDIENTE);
    const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(), to: new Date() });
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        setEtiquetas(initialEtiquetas);
    }, [initialEtiquetas]);

    const filteredEtiquetas = useMemo(() => {
        return etiquetas.filter(e => {
            const statusMatch = filter === 'all' || e.status === filter;
            
            const dateMatch = !dateRange?.from || (
                new Date(e.createdAt) >= dateRange.from &&
                (!dateRange.to || new Date(e.createdAt) <= dateRange.to)
            );

            const searchMatch = searchTerm.trim() === '' ||
                e.remitenteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.destinatarioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (e.orderNumber && e.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()));

            return statusMatch && dateMatch && searchMatch;
        });
    }, [etiquetas, filter, dateRange, searchTerm]);
    
    const handlePrint = (etiqueta: FormattedEtiqueta) => {
        setEtiquetasToPrint([etiqueta]);
        setTimeout(() => window.print(), 100);
    };

    const handlePrintAll = () => {
        if (filteredEtiquetas.length === 0) {
            toast({ title: 'No hay etiquetas', description: 'No hay etiquetas en la vista actual para imprimir.', variant: 'destructive'});
            return;
        }
        setEtiquetasToPrint(filteredEtiquetas);
        setTimeout(() => window.print(), 100);
    };

    const onAfterPrint = async () => {
      if (etiquetasToPrint.length > 0) {
        const idsToUpdate = etiquetasToPrint
            .filter(e => e.status === EtiquetaStatus.PENDIENTE)
            .map(e => e.id);

        if (idsToUpdate.length > 0) {
            console.log(`[SIMULACIÓN] Actualizando estado de etiquetas ${idsToUpdate.join(', ')} a IMPRESA`);
            const updateResult = { count: idsToUpdate.length }; 

            toast({
                title: 'Estado Actualizado (Simulado)',
                description: `${updateResult.count} etiqueta(s) marcada(s) como 'Impresa'.`,
                className: 'bg-green-100 border-green-400 text-green-700',
            });
            router.refresh();
        }
        
        setEtiquetasToPrint([]);
      }
    };

    useEffect(() => {
        const handleAfterPrint = () => onAfterPrint();
        window.addEventListener('afterprint', handleAfterPrint);
        return () => {
            window.removeEventListener('afterprint', handleAfterPrint);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [etiquetasToPrint]);
    
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
                                <div className="flex flex-wrap gap-2">
                                     <Button onClick={handlePrintAll} variant="secondary" disabled={filteredEtiquetas.length === 0}>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Imprimir ({filteredEtiquetas.length})
                                    </Button>
                                    <Button asChild>
                                        <Link href="/admin/etiquetas/nueva">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Crear Etiqueta
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <EtiquetasToolbar
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                        statusFilter={filter}
                        onStatusFilterChange={setFilter}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        allCount={etiquetas.length}
                        pendingCount={etiquetas.filter(e => e.status === EtiquetaStatus.PENDIENTE).length}
                        printedCount={etiquetas.filter(e => e.status === EtiquetaStatus.IMPRESA).length}
                    />
                    <EtiquetasTable etiquetas={filteredEtiquetas} onPrint={handlePrint} />
                </main>
                <Footer />
            </div>
             <div className="print-only">
                {etiquetasToPrint.length > 0 && (
                    <div className="labels-container-grid">
                        {etiquetasToPrint.map((e, index) => (
                            <div key={e.id} className="printable-label-wrapper-grid">
                                <EtiquetaPrintLayout etiqueta={e} isLast={index === etiquetasToPrint.length - 1} />
                            </div>
                        ))}
                    </div>
                )}
             </div>
        </>
    );
}
