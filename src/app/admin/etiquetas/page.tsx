// src/app/admin/etiquetas/page.tsx
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import prisma from "@/lib/prisma";
import { EtiquetasTable } from "@/components/admin/etiquetas/EtiquetasTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Ticket } from "lucide-react";
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export const metadata: Metadata = {
  title: "Gestión de Etiquetas de Envío",
  description: "Administra, visualiza y crea etiquetas para los envíos.",
  robots: {
    index: false,
    follow: false,
  },
};

// Revalidate data to ensure it's fresh
export const revalidate = 0; // Revalidate on every request

export default async function AdminEtiquetasPage() {
  const etiquetas = await prisma.etiqueta.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Convert Decimal fields to numbers for client component compatibility
  const formattedEtiquetas = etiquetas.map(etiqueta => ({
    ...etiqueta,
    montoACobrar: etiqueta.montoACobrar?.toNumber() ?? null,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
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
                    <Button asChild>
                        <Link href="/admin/etiquetas/nueva">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Crear Nueva Etiqueta
                        </Link>
                    </Button>
                </div>
            </CardHeader>
        </Card>
        <EtiquetasTable etiquetas={formattedEtiquetas} />
      </main>
      <Footer />
    </div>
  );
}
