import type { Metadata } from "next";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { CarruselRedes } from "@/components/homenew/carrusel-redes";
import { Footer } from "@/components/homenew/footer";
import { ExpressPageClient } from "@/components/express/express-page-client";
import prisma from "@/lib/prisma";
import { ServiceTypeEnum } from "@prisma/client";
import type { PriceRangeClient } from "@/components/express/express-pricing-ranges";

export const metadata: Metadata = {
  title: "Envíos Express Inmediatos en Mar del Plata",
  description:
    "Servicio de Envíos Express en Mar del Plata. Entrega rápida y garantizada el mismo día para tus paquetes y documentos. Cotiza ahora.",
  keywords: "envios express mar del plata, mensajeria urgente, delivery rapido, entrega mismo dia, paqueteria express",
};

async function getPriceRanges(): Promise<PriceRangeClient[]> {
  const priceRanges = await prisma.priceRange.findMany({
    where: {
      serviceType: ServiceTypeEnum.EXPRESS,
      isActive: true,
    },
    orderBy: {
      distanciaMinKm: 'asc',
    },
  });

  return priceRanges.map(pr => ({
    ...pr,
    distanciaMinKm: pr.distanciaMinKm.toNumber(),
    distanciaMaxKm: pr.distanciaMaxKm.toNumber(),
    precioRango: pr.precioRango.toNumber(),
  }));
}

export default async function EnviosExpressPage() {
  const priceRanges = await getPriceRanges();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OptimizedHeader />
      <main className="flex-grow">
        <ExpressPageClient priceRanges={priceRanges} />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  );
}
