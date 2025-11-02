// src/app/admin/clientes/page.tsx
import prisma from "@/lib/prisma";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateClientForm } from "@/components/admin/clientes/CreateClientForm";
import { Users, PlusCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gestión de Clientes",
  description: "Administra, visualiza, crea y modifica los clientes de Envios DosRuedas.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data to ensure it's fresh
export const revalidate = 60;

export default async function AdminClientesPage() {
  const clients = await prisma.client.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna del formulario */}
          <div className="lg:col-span-2">
             <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <PlusCircle className="w-6 h-6 text-primary" />
                        <CardTitle className="text-xl font-bold">Crear Nuevo Cliente</CardTitle>
                    </div>
                    <CardDescription>
                        Completa los datos para registrar un nuevo cliente en el sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateClientForm />
                </CardContent>
            </Card>
          </div>
          
          {/* Columna de la lista de clientes */}
          <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <CardTitle className="text-xl font-bold">Clientes Recientes</CardTitle>
                    </div>
                    <CardDescription>
                       Listado de los últimos clientes registrados.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {clients.length > 0 ? (
                        <ul className="space-y-4">
                            {clients.slice(0, 10).map(client => (
                                <li key={client.id} className="p-3 bg-gray-100 rounded-md">
                                    <p className="font-semibold">{client.name} {client.lastName}</p>
                                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                                    <p className="text-xs text-gray-500">{client.address}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <p className="text-sm text-center text-muted-foreground py-8">No hay clientes registrados aún.</p>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}