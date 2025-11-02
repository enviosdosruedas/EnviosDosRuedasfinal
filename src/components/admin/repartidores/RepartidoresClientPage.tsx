// src/components/admin/repartidores/RepartidoresClientPage.tsx
'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, Users, Package, SlidersHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { RepartidoresTable } from "@/components/admin/repartidores/RepartidoresTable";
import { RepartidorForm } from "@/components/admin/repartidores/RepartidorForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Repartidor, Etiqueta as PrismaEtiqueta } from "@prisma/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { HojaDeRuta } from '@/components/admin/repartidores/HojaDeRuta';
import type { FormattedEtiqueta } from '@/types';
import { EtiquetaStatus } from '@/types';
import { assignEtiquetaToRepartidor } from '@/app/admin/repartidores/actions';
import { useToast } from '@/hooks/use-toast';

interface RepartidoresClientPageProps {
    initialRepartidores: Repartidor[];
    initialEtiquetas: FormattedEtiqueta[];
}

export function RepartidoresClientPage({ initialRepartidores, initialEtiquetas }: RepartidoresClientPageProps) {
    const [repartidores, setRepartidores] = useState<Repartidor[]>(initialRepartidores);
    const [etiquetas, setEtiquetas] = useState<FormattedEtiqueta[]>(initialEtiquetas);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRepartidor, setSelectedRepartidor] = useState<Repartidor | null>(null);
    const [selectedRepartidorId, setSelectedRepartidorId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleOpenForm = (repartidor: Repartidor | null = null) => {
        setSelectedRepartidor(repartidor);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        // Data will be revalidated by the server action
    };

    const handleAssign = async (etiquetaId: number, repartidorId: number) => {
        const result = await assignEtiquetaToRepartidor(etiquetaId, repartidorId);
        if (result.success) {
            toast({ title: 'Éxito', description: `Etiqueta asignada a ${repartidores.find(r => r.id === repartidorId)?.name}.` });
            // Optimistically update UI or wait for revalidation
        } else {
            toast({ title: 'Error', description: result.error, variant: 'destructive' });
        }
    };

    const etiquetasPendientes = useMemo(() => {
        return initialEtiquetas.filter(e => e.status === EtiquetaStatus.PENDIENTE || e.status === EtiquetaStatus.IMPRESA);
    }, [initialEtiquetas]);

    const repartidorSeleccionado = selectedRepartidorId 
        ? repartidores.find(r => r.id === parseInt(selectedRepartidorId)) 
        : null;

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <AdminHeader />
                <main className="flex-grow container mx-auto px-4 py-8 pt-24">
                    <Card className="mb-8 bg-background shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <Users className="w-8 h-8 text-primary" />
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-primary">Vista de Repartidor</CardTitle>
                                        <CardDescription>Selecciona un repartidor para ver su hoja de ruta o gestiona la flota.</CardDescription>
                                    </div>
                                </div>
                                <Button onClick={() => handleOpenForm()}>
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    Gestionar Repartidores
                                </Button>
                            </div>
                            <div className="pt-4">
                                <Select onValueChange={setSelectedRepartidorId} value={selectedRepartidorId || ''}>
                                    <SelectTrigger className="w-full md:w-1/2" id="repartidor-select">
                                        <SelectValue placeholder="Selecciona un repartidor para ver su ruta..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {repartidores.map(r => (
                                            <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                    </Card>

                    {repartidorSeleccionado && (
                        <HojaDeRuta 
                            repartidor={repartidorSeleccionado}
                            etiquetas={initialEtiquetas}
                        />
                    )}

                </main>
                <Footer />
            </div>
             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                     <DialogHeader>
                        <DialogTitle>Gestionar Repartidores</DialogTitle>
                        <DialogDescription>
                            Añade, edita y gestiona tu flota de repartidores.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 overflow-y-auto flex-grow">
                        <div className='md:border-r md:pr-8'>
                             <h3 className="text-lg font-semibold mb-4">Añadir o Editar Repartidor</h3>
                             <RepartidorForm 
                                repartidor={selectedRepartidor}
                                onSuccess={handleFormSuccess}
                            />
                        </div>
                        <div>
                             <h3 className="text-lg font-semibold mb-4">Listado de Repartidores</h3>
                            <RepartidoresTable
                                repartidores={initialRepartidores} 
                                onEdit={handleOpenForm} 
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
