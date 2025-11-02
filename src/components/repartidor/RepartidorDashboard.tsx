// src/components/repartidor/RepartidorDashboard.tsx
'use client';

import { useState } from 'react';
import type { Repartidor } from "@prisma/client";
import type { FormattedEtiqueta } from "@/types";
import { EtiquetaStatus } from '@/types';
import { Button } from "@/components/ui/button";
import { Bike, LogOut } from "lucide-react";
import Link from 'next/link';
import { HojaDeRutaRepartidor } from './HojaDeRutaRepartidor';
import { AssignEtiqueta } from './AssignEtiqueta';
import { useToast } from '@/hooks/use-toast';

interface RepartidorDashboardProps {
    repartidor: Repartidor;
    initialEtiquetas: FormattedEtiqueta[];
}

export function RepartidorDashboard({ repartidor, initialEtiquetas }: RepartidorDashboardProps) {
    const [etiquetas, setEtiquetas] = useState(initialEtiquetas);
    const { toast } = useToast();

    const handleStatusChange = (etiquetaId: number, newStatus: EtiquetaStatus) => {
        setEtiquetas(prev => prev.map(e => e.id === etiquetaId ? { ...e, status: newStatus } : e));
    };

    const handleEtiquetaAssigned = (newEtiqueta: FormattedEtiqueta) => {
        // Add or update the etiqueta in the list
        setEtiquetas(prev => {
            const existingIndex = prev.findIndex(e => e.id === newEtiqueta.id);
            if (existingIndex > -1) {
                const updatedList = [...prev];
                updatedList[existingIndex] = newEtiqueta;
                return updatedList;
            } else {
                return [newEtiqueta, ...prev];
            }
        });
        toast({
            title: 'Etiqueta Asignada',
            description: `La etiqueta #${newEtiqueta.orderNumber} ha sido añadida a tu hoja de ruta.`,
            className: 'bg-green-100 border-green-400 text-green-700',
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Bike className="h-7 w-7" />
                        <h1 className="text-xl font-bold font-display">
                            Bienvenido, {repartidor.name.split(' ')[0]}
                        </h1>
                    </div>
                    <Button asChild variant="secondary" size="sm">
                        <Link href="/repartidor">
                            <LogOut className="mr-2 h-4 w-4" /> Salir
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                 <AssignEtiqueta 
                    repartidorId={repartidor.id} 
                    onEtiquetaAssigned={handleEtiquetaAssigned} 
                 />
                 <HojaDeRutaRepartidor 
                    etiquetas={etiquetas.filter(e => e.repartidorId === repartidor.id)}
                    onStatusChange={handleStatusChange}
                 />
            </main>
        </div>
    );
}
