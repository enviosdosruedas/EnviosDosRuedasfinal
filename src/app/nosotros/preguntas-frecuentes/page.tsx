import { OptimizedHeader } from "@/components/homenew/optimized-header"
import { FaqHero } from "@/components/faq/faq-hero"
import { FaqCategories } from "@/components/faq/faq-categories"
import { FaqContactCta } from "@/components/faq/faq-contact-cta"
import { Footer } from "@/components/homenew/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Envios DosRuedas | FAQ Mensajería y Delivery",
  description:
    "Encuentra respuestas a las preguntas más frecuentes sobre nuestros servicios de mensajería y delivery en Mar del Plata. Tarifas, tiempos, cobertura y más.",
  keywords: "preguntas frecuentes, faq, envios mar del plata, mensajeria, delivery, tarifas, tiempos entrega",
}

export default function FaqPage() {
  return (
    <div className="min-h-screen">
      <OptimizedHeader />
      <main>
        <FaqHero />
        <FaqCategories />
        <FaqContactCta />
      </main>
      <Footer />
    </div>
  )
}
