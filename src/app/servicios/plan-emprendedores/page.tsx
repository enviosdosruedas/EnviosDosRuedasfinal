import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { EntrepreneurHero } from "@/components/entrepreneur/entrepreneur-hero"
import { PlanInformation } from "@/components/entrepreneur/plan-information"
import { EntrepreneurBenefits } from "@/components/entrepreneur/entrepreneur-benefits"
import { EntrepreneurPricingRanges } from "@/components/entrepreneur/entrepreneur-pricing-ranges"
import { EntrepreneurCta } from "@/components/entrepreneur/entrepreneur-cta"
import { Footer } from "@/components/homenew/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plan Emprendedores - Envios DosRuedas | Impulsa tu Negocio Online",
  description:
    "Plan especializado para emprendedores y negocios online. Tarifas preferenciales, flexibilidad horaria y soporte dedicado. Potencia tus ventas con envíos profesionales.",
  keywords:
    "plan emprendedores, envios negocios online, tarifas preferenciales, emprendedores mar del plata, envios ecommerce",
}

export default function EntrepreneurPlanPage() {
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <main>
        <EntrepreneurHero />
        <PlanInformation />
        <EntrepreneurBenefits />
        <EntrepreneurPricingRanges />
        <EntrepreneurCta />
      </main>
      <Footer />
    </div>
  )
}
