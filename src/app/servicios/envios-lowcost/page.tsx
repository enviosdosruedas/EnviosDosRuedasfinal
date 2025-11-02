import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { LowcostHero } from "@/components/lowcost/lowcost-hero"
import { LowcostContent } from "@/components/lowcost/lowcost-content"
import { PricingComparison } from "@/components/lowcost/pricing-comparison"
import { LowcostBenefits } from "@/components/lowcost/lowcost-benefits"
import { HowLowcostWorks } from "@/components/lowcost/how-lowcost-works"
import { LowcostCta } from "@/components/lowcost/lowcost-cta"
import { CarruselRedes } from "@/components/homenew/carrusel-redes"
import { Footer } from "@/components/homenew/footer"
import type { Metadata } from "next"
import prisma from "@/lib/prisma";
import { ServiceTypeEnum } from "@prisma/client";
import type { PriceRangeClient } from "@/components/lowcost/pricing-comparison";

export const metadata: Metadata = {
  title: "Envios Low Cost - Envios DosRuedas | Mensajería Económica en Mar del Plata",
  description:
    "Servicio de mensajería económica con rutas optimizadas. Ahorra hasta 50% en tus envíos sin sacrificar calidad.",
  keywords:
    "envios low cost, mensajeria economica, envios baratos, mar del plata, rutas optimizadas, envios programados",
}

async function getPriceRanges(): Promise<PriceRangeClient[]> {
  const priceRanges = await prisma.priceRange.findMany({
    where: {
      serviceType: ServiceTypeEnum.LOW_COST,
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


export default async function EnviosLowCostPage() {
  const priceRanges = await getPriceRanges();
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <main>
        <LowcostHero />
        <LowcostContent />
        <PricingComparison priceRanges={priceRanges} />
        <LowcostBenefits />
        <HowLowcostWorks />
        <LowcostCta />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  )
}
