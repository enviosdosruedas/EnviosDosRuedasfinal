import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { MotoFijaHero } from "@/components/moto-fija/moto-fija-hero"
import { MotoFijaContent } from "@/components/moto-fija/moto-fija-content"
import { ServiceFeatures } from "@/components/moto-fija/service-features"
import { IdealClients } from "@/components/moto-fija/ideal-clients"
import { PricingPlans } from "@/components/moto-fija/pricing-plans"
import { MotoFijaCta } from "@/components/moto-fija/moto-fija-cta"
import { Footer } from "@/components/homenew/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Moto Fija - Envios DosRuedas | Servicio de Delivery Dedicado para Empresas",
  description:
    "Servicio premium de moto fija con repartidor dedicado para tu negocio. Horarios personalizados, rutas optimizadas y comunicación directa. Ideal para restaurantes y comercios.",
  keywords:
    "moto fija, delivery dedicado, repartidor exclusivo, servicio premium, restaurantes, comercios, mar del plata",
}

export default function MotoFijaPage() {
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <main>
        <MotoFijaHero />
        <MotoFijaContent />
        <ServiceFeatures />
        <IdealClients />
        <PricingPlans />
        <MotoFijaCta />
      </main>
      <Footer />
    </div>
  )
}
