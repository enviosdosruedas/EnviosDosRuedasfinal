// src/components/repartidor/RepartidorDashboard.tsx
'use client';

import { useState, useMemo } from 'react';
import type { Repartidor } from "@prisma/client";
import type { FormattedEtiqueta } from "@/types";
import { EtiquetaStatus } from '@/types';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bike, LogOut } from "lucide-react";
import Link from 'next/link';
import { HojaDeRutaRepartidor } from './HojaDeRutaRepartidor';

interface RepartidorDashboardProps {
    repartidor: Repartidor;
    initialEtiquetas: FormattedEtiqueta[];
}

export function RepartidorDashboard({ repartidor, initialEtiquetas }: RepartidorDashboardProps) {
    const [etiquetas, setEtiquetas] = useState(initialEtiquetas);

    const handleStatusChange = (etiquetaId: number, newStatus: EtiquetaStatus) => {
        setEtiquetas(prev => prev.map(e => e.id === etiquetaId ? { ...e, status: newStatus } : e));
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

            <main className="container mx-auto px-4 py-8">
                 <HojaDeRutaRepartidor 
                    etiquetas={etiquetas}
                    onStatusChange={handleStatusChange}
                 />
            </main>
        </div>
    );
}
