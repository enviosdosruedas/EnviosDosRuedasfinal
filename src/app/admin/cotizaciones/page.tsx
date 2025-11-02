// src/app/admin/cotizaciones/page.tsx
import type { Metadata } from 'next';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import prisma from "@/lib/prisma";
import { ServiceTypeEnum, type PriceRange as PrismaPriceRange } from '@prisma/client';
import { EditablePriceTable } from '@/components/admin/cotizaciones/EditablePriceTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Coins } from 'lucide-react';

export const metadata: Metadata = {
  title: "Gestión de Cotizaciones",
  description: "Administra los rangos de precios para los servicios de envío.",
  robots: {
    index: false,
    follow: false,
  },
};

// Define a client-safe type with numbers instead of Decimals
type PriceRangeClient = Omit<PrismaPriceRange, 'distanciaMinKm' | 'distanciaMaxKm' | 'precioRango'> & {
  distanciaMinKm: number;
  distanciaMaxKm: number;
  precioRango: number;
};

// Disable caching for this admin page to always get fresh data
export const revalidate = 0;

async function getPriceRangesGrouped(): Promise<Record<ServiceTypeEnum, PriceRangeClient[]>> {
  const priceRanges = await prisma.priceRange.findMany({
    orderBy: {
      distanciaMinKm: 'asc',
    },
  });

  // Convert Decimal fields to numbers and group by serviceType
  const groupedRanges = priceRanges.reduce((acc, pr) => {
    const serviceType = pr.serviceType;
    if (!acc[serviceType]) {
      acc[serviceType] = [];
    }
    // Correctly map to the client-safe type
    acc[serviceType].push({
      ...pr,
      distanciaMinKm: pr.distanciaMinKm.toNumber(),
      distanciaMaxKm: pr.distanciaMaxKm.toNumber(),
      precioRango: pr.precioRango.toNumber(),
    });
    return acc;
  }, {} as Record<ServiceTypeEnum, PriceRangeClient[]>);

  // Ensure all service types have an entry, even if empty
  return {
    [ServiceTypeEnum.EXPRESS]: groupedRanges[ServiceTypeEnum.EXPRESS] || [],
    [ServiceTypeEnum.LOW_COST]: groupedRanges[ServiceTypeEnum.LOW_COST] || [],
    [ServiceTypeEnum.PUNTO_DE_RETIRO]: groupedRanges[ServiceTypeEnum.PUNTO_DE_RETIRO] || [],
  };
}

export default async function AdminCotizacionesPage() {
  const groupedPriceRanges = await getPriceRangesGrouped();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Card className='mb-8'>
            <CardHeader>
                <CardTitle>Gestión de Tarifas de Envío</CardTitle>
                <CardDescription>
                    Selecciona el tipo de servicio para ver y editar las tarifas. Puedes modificar los precios directamente en la tabla y guardar todos los cambios de una vez.
                </CardDescription>
            </CardHeader>
        </Card>
        
        <Tabs defaultValue={ServiceTypeEnum.EXPRESS} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={ServiceTypeEnum.EXPRESS}>
              <Truck className="mr-2 h-4 w-4" />
              Tarifas Express
            </TabsTrigger>
            <TabsTrigger value={ServiceTypeEnum.LOW_COST}>
              <Coins className="mr-2 h-4 w-4" />
              Tarifas Low Cost
            </TabsTrigger>
          </TabsList>
          <TabsContent value={ServiceTypeEnum.EXPRESS}>
             <EditablePriceTable 
                initialData={groupedPriceRanges[ServiceTypeEnum.EXPRESS]} 
                serviceType={ServiceTypeEnum.EXPRESS}
             />
          </TabsContent>
          <TabsContent value={ServiceTypeEnum.LOW_COST}>
             <EditablePriceTable 
                initialData={groupedPriceRanges[ServiceTypeEnum.LOW_COST]} 
                serviceType={ServiceTypeEnum.LOW_COST}
             />
          </TabsContent>
        </Tabs>

      </main>
      <Footer />
    </div>
  );
}