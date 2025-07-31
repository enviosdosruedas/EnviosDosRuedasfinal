
import type { Metadata } from 'next';
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { CarruselRedes } from "@/components/homenew/carrusel-redes";
import { Footer } from "@/components/homenew/footer";
import LowCostCalculatorHero from '@/components/calculator/lowcost-calculator-hero';
import LowCostCalculator from '@/components/calculator/lowcost-calculator';
import MapFeatures from '@/components/calculator/map-features';
import PricingInfo from '@/components/calculator/pricing-info';
import CalculatorTips from '@/components/calculator/calculator-tips';
import CalculatorContact from '@/components/calculator/calculator-contact';

export const metadata: Metadata = {
  title: 'Cotizador de Envíos Low Cost - Envios DosRuedas',
  description: 'Calcula el precio de tus envíos económicos y programados en Mar del Plata. La opción más conveniente para tus necesidades no urgentes.',
  keywords: ['cotizador envíos low cost', 'envíos económicos', 'delivery Mar del Plata barato', 'calcular precio envío económico', 'mensajería programada'],
};

export default function CotizarLowCostPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <OptimizedHeader />
      <main className="flex-grow">
        <LowCostCalculatorHero />
        <LowCostCalculator />
        <MapFeatures />
        <PricingInfo />
        <CalculatorTips />
        <CalculatorContact />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  );
}
