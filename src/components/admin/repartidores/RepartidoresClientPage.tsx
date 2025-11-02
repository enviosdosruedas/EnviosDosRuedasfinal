
// src/components/admin/repartidores/RepartidoresClientPage.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { RepartidoresTable } from "@/components/admin/repartidores/RepartidoresTable";
import { RepartidorForm } from "@/components/admin/repartidores/RepartidorForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Repartidor } from "@prisma/client";

interface RepartidoresClientPageProps {
    initialRepartidores: Repartidor[];
}

export function RepartidoresClientPage({ initialRepartidores }: RepartidoresClientPageProps) {
    const [repartidores, setRepartidores] = useState<Repartidor[]>(initialRepartidores);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRepartidor, setSelectedRepartidor] = useState<Repartidor | null>(null);

    const handleOpenForm = (repartidor: Repartidor | null = null) => {
        setSelectedRepartidor(repartidor);
        setIsFormOpen(true);
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        // We rely on server-side revalidation, but could also update state here
        // to provide a more immediate UI update if needed.
    };
    
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
                                        <CardTitle className="text-2xl font-bold text-primary">Gestión de Repartidores</CardTitle>
                                        <CardDescription>Añade, edita y gestiona tus repartidores.</CardDescription>
                                    </div>
                                </div>
                                <Button onClick={() => handleOpenForm()}>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Añadir Repartidor
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                    <RepartidoresTable
                      repartidores={initialRepartidores} // Always pass fresh server data
                      onEdit={handleOpenForm} 
                    />
                </main>
                <Footer />
            </div>
             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <RepartidorForm 
                        repartidor={selectedRepartidor}
                        onSuccess={handleFormSuccess}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
