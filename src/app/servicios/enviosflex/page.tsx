import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { EnviosFlexHero } from "@/components/envios-flex/envios-flex-hero"
import { EnviosFlexContent } from "@/components/envios-flex/envios-flex-content"
import { MercadoLibreBenefits } from "@/components/envios-flex/mercadolibre-benefits"
import { FlexPricingRanges } from "@/components/envios-flex/flex-pricing-ranges"
import { HowItWorks } from "@/components/envios-flex/how-it-works"
import { Requirements } from "@/components/envios-flex/requirements"
import { EnviosFlexCta } from "@/components/envios-flex/envios-flex-cta"
import { CarruselRedes } from "@/components/homenew/carrusel-redes"
import { Footer } from "@/components/homenew/footer"
import type { Metadata } from "next"
import prisma from "@/lib/prisma";
import { ServiceTypeEnum } from "@prisma/client";
import type { PriceRangeClient } from "@/components/envios-flex/flex-pricing-ranges";

export const metadata: Metadata = {
  title: "Envios Flex MercadoLibre - Envios DosRuedas | Potencia tus Ventas Online",
  description:
    "Servicio especializado de Envios Flex para vendedores de MercadoLibre. Entregas rápidas garantizadas, integración sencilla y amplia cobertura en Mar del Plata.",
  keywords:
    "envios flex, mercadolibre, vendedores online, entregas rapidas, mar del plata, reputacion vendedor, envios mismo dia",
}

async function getPriceRanges(): Promise<PriceRangeClient[]> {
  const priceRanges = await prisma.priceRange.findMany({
    where: {
      serviceType: ServiceTypeEnum.LOW_COST, // Flex uses Low Cost pricing structure
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

export default async function EnviosFlexPage() {
  const priceRanges = await getPriceRanges();
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <main>
        <EnviosFlexHero />
        <EnviosFlexContent />
        <MercadoLibreBenefits />
        <FlexPricingRanges priceRanges={priceRanges} />
        <HowItWorks />
        <Requirements />
        <EnviosFlexCta />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  )
}
