// src/app/admin/clientes/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from 'next/navigation';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditClientForm } from "@/components/admin/clientes/EditClientForm";
import type { Metadata } from "next";
import { User } from "lucide-react";
import type { Client as PrismaClient } from "@prisma/client";

// Define a client-safe type with numbers instead of Decimals
type FormattedClient = Omit<PrismaClient, 'addressLat' | 'addressLng'> & {
  addressLat: number | null;
  addressLng: number | null;
};

async function getClient(id: string): Promise<FormattedClient | null> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    notFound();
  }

  const client = await prisma.client.findUnique({
    where: { id: numericId },
  });

  if (!client) {
    notFound();
  }

  return {
    ...client,
    addressLat: client.addressLat?.toNumber() ?? null,
    addressLng: client.addressLng?.toNumber() ?? null,
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const client = await getClient(params.id);
  return {
    title: `Editar Cliente: ${client?.name || 'Cliente'}`,
    description: `Página para editar los detalles del cliente.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await getClient(params.id);

  if (!client) {
      notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-primary" />
              <CardTitle className="text-xl font-bold">Editar Cliente</CardTitle>
            </div>
            <CardDescription>
              Modifica los datos del cliente y guarda los cambios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditClientForm client={client} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
