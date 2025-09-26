
// src/app/admin/cotizaciones/page.tsx
import type { Metadata } from 'next';
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import prisma from "@/lib/prisma";
import { PriceRangeTable } from "@/components/admin/cotizaciones/PriceRangeTable";
import { ServiceTypeEnum } from '@prisma/client';

export const metadata: Metadata = {
  title: "Gestión de Cotizaciones",
  description: "Administra los rangos de precios para los servicios de envío.",
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60; // Revalidate data every 60 seconds

async function getPriceRanges() {
  const priceRanges = await prisma.priceRange.findMany({
    orderBy: [
      { serviceType: 'asc' },
      { distanciaMinKm: 'asc' },
    ],
  });

  // Convert Decimal fields to numbers for client component compatibility
  return priceRanges.map(pr => ({
    ...pr,
    distanciaMinKm: pr.distanciaMinKm.toNumber(),
    distanciaMaxKm: pr.distanciaMaxKm.toNumber(),
    precioRango: pr.precioRango.toNumber(),
  }));
}

export default async function AdminCotizacionesPage() {
  const priceRanges = await getPriceRanges();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <PriceRangeTable initialData={priceRanges} />
      </main>
      <Footer />
    </div>
  );
}
