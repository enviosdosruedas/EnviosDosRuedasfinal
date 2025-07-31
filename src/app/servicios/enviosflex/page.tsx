import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { EnviosFlexHero } from "@/components/envios-flex/envios-flex-hero"
import { EnviosFlexContent } from "@/components/envios-flex/envios-flex-content"
import { MercadoLibreBenefits } from "@/components/envios-flex/mercadolibre-benefits"
import { FlexPricingRanges } from "@/components/envios-flex/flex-pricing-ranges"
import { HowItWorks } from "@/components/envios-flex/how-it-works"
import { Requirements } from "@/components/envios-flex/requirements"
import { EnviosFlexCta } from "@/components/envios-flex/envios-flex-cta"
import { Footer } from "@/components/homenew/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Envios Flex MercadoLibre - Envios DosRuedas | Potencia tus Ventas Online",
  description:
    "Servicio especializado de Envios Flex para vendedores de MercadoLibre. Entregas rápidas garantizadas, integración sencilla y amplia cobertura en Mar del Plata.",
  keywords:
    "envios flex, mercadolibre, vendedores online, entregas rapidas, mar del plata, reputacion vendedor, envios mismo dia",
}

export default function EnviosFlexPage() {
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <main>
        <EnviosFlexHero />
        <EnviosFlexContent />
        <MercadoLibreBenefits />
        <FlexPricingRanges />
        <HowItWorks />
        <Requirements />
        <EnviosFlexCta />
      </main>
      <Footer />
    </div>
  )
}
