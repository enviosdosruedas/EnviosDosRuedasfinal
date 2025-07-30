import { Header } from "@/components/header"
import { LowcostHero } from "@/components/lowcost/lowcost-hero"
import { LowcostContent } from "@/components/lowcost/lowcost-content"
import { PricingComparison } from "@/components/lowcost/pricing-comparison"
import { LowcostBenefits } from "@/components/lowcost/lowcost-benefits"
import { HowLowcostWorks } from "@/components/lowcost/how-lowcost-works"
import { LowcostCta } from "@/components/lowcost/lowcost-cta"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Envios Low Cost - Envios DosRuedas | Mensajería Económica en Mar del Plata",
  description:
    "Servicio de mensajería económica con rutas optimizadas. Ahorra hasta 50% en tus envíos sin sacrificar calidad.",
  keywords:
    "envios low cost, mensajeria economica, envios baratos, mar del plata, rutas optimizadas, envios programados",
}

export default function EnviosLowCostPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <LowcostHero />
        <LowcostContent />
        <PricingComparison />
        <LowcostBenefits />
        <HowLowcostWorks />
        <LowcostCta />
      </main>
      <Footer />
    </div>
  )
}
