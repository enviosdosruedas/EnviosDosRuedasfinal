
import type { Metadata } from "next";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import { HeroGastronomico } from "@/components/delivery-gastronomico/hero-gastronomico";
import { MisionGastronomico } from "@/components/delivery-gastronomico/mision-gastronomico";
import { DiferenciaGastronomico } from "@/components/delivery-gastronomico/diferencia-gastronomico";
import { BeneficiosGastronomico } from "@/components/delivery-gastronomico/beneficios-gastronomico";
import { FaqGastronomico } from "@/components/delivery-gastronomico/faq-gastronomico";
import { CtaGastronomico } from "@/components/delivery-gastronomico/cta-gastronomico";

export const metadata: Metadata = {
  title: "Delivery Gastronómico Profesional | Envios DosRuedas",
  description:
    "Profesionalizamos el delivery para tu restaurante. Conoce nuestro servicio de moto fija, con disponibilidad garantizada y comunicación directa.",
  keywords: "delivery gastronomico, moto fija, repartidor para restaurantes, delivery profesional, mar del plata",
};

export default function DeliveryGastronomicoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <OptimizedHeader />
      <main>
        <HeroGastronomico />
        <MisionGastronomico />
        <DiferenciaGastronomico />
        <BeneficiosGastronomico />
        <FaqGastronomico />
        <CtaGastronomico />
      </main>
      <Footer />
    </div>
  );
}
