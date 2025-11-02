// src/app/admin/clientes/page.tsx
import prisma from "@/lib/prisma";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateClientForm } from "@/components/admin/clientes/CreateClientForm";
import { Users, PlusCircle } from "lucide-react";
import type { Metadata } from 'next';
import { ClientsTable } from "@/components/admin/clientes/ClientsTable";

export const metadata: Metadata = {
  title: "Gestión de Clientes",
  description: "Administra, visualiza, crea y modifica los clientes de Envios DosRuedas.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data to ensure it's fresh
export const revalidate = 0;

export default async function AdminClientesPage() {
  const clients = await prisma.client.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedClients = clients.map(client => ({
      ...client,
      addressLat: client.addressLat?.toNumber() ?? null,
      addressLng: client.addressLng?.toNumber() ?? null,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna del formulario */}
          <div className="lg:col-span-1">
             <Card className="shadow-lg sticky top-24">
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
          <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <CardTitle className="text-xl font-bold">Listado de Clientes</CardTitle>
                    </div>
                    <CardDescription>
                       Gestiona todos los clientes registrados en el sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ClientsTable clients={formattedClients} />
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
