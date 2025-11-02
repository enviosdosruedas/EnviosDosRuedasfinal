// src/components/admin/etiquetas/EtiquetasClientPage.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Ticket, Printer, XCircle, CheckCircle, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Etiqueta } from "@prisma/client";
import { EtiquetaPrintLayout } from "@/components/admin/etiquetas/EtiquetaPrintLayout";
import { EtiquetasTable } from "@/components/admin/etiquetas/EtiquetasTable";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { updateEtiquetasStatus, EtiquetaStatus } from '@/app/admin/etiquetas/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
  status: EtiquetaStatus;
};

interface EtiquetasClientPageProps {
    initialEtiquetas: FormattedEtiqueta[];
}

type FilterStatus = 'ALL' | EtiquetaStatus;

export function EtiquetasClientPage({ initialEtiquetas }: EtiquetasClientPageProps) {
    const [etiquetas, setEtiquetas] = useState<FormattedEtiqueta[]>(initialEtiquetas);
    const [etiquetasToPrint, setEtiquetasToPrint] = useState<FormattedEtiqueta[]>([]);
    const [filter, setFilter] = useState<FilterStatus>('ALL');
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        setEtiquetas(initialEtiquetas);
    }, [initialEtiquetas]);

    const filteredEtiquetas = useMemo(() => {
        if (filter === 'ALL') {
            return etiquetas;
        }
        return etiquetas.filter(e => e.status === filter);
    }, [etiquetas, filter]);
    
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
        const idsToUpdate = etiquetasToPrint.map(e => e.id);
        const result = await updateEtiquetasStatus(idsToUpdate, EtiquetaStatus.IMPRESA);

        if (result.success) {
            toast({
                title: 'Estado Actualizado',
                description: `${result.count} etiqueta(s) marcada(s) como 'Impresa'.`,
                className: 'bg-green-100 border-green-400 text-green-700',
            });
            // Re-fetch or update state locally
             router.refresh();
        } else {
             toast({ title: 'Error', description: result.error, variant: 'destructive'});
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
    
    const FilterButton = ({ status, label, icon: Icon, count }: { status: FilterStatus, label: string, icon: React.ElementType, count: number }) => (
        <Button
            onClick={() => setFilter(status)}
            variant={filter === status ? 'default' : 'outline'}
            className="h-12"
        >
            <Icon className="mr-2 h-5 w-5" />
            {label}
            <Badge variant={filter === status ? 'secondary' : 'default'} className="ml-2">{count}</Badge>
        </Button>
    );

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
                    <div className="mb-6 flex flex-wrap gap-2">
                        <FilterButton status="ALL" label="Todas" icon={Bell} count={etiquetas.length} />
                        <FilterButton status={EtiquetaStatus.PENDIENTE} label="Pendientes" icon={XCircle} count={etiquetas.filter(e => e.status === EtiquetaStatus.PENDIENTE).length} />
                        <FilterButton status={EtiquetaStatus.IMPRESA} label="Impresas" icon={CheckCircle} count={etiquetas.filter(e => e.status === EtiquetaStatus.IMPRESA).length} />
                    </div>
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
