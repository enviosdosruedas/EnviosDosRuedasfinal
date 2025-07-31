
import type { Metadata } from 'next';
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import CalculatorHero from '@/components/calculator/calculator-hero';
import ExpressCalculator from '@/components/calculator/express-calculator';
import PricingInfo from '@/components/calculator/pricing-info';
import CalculatorTips from '@/components/calculator/calculator-tips';
import CalculatorContact from '@/components/calculator/calculator-contact';
import MapFeatures from '@/components/calculator/map-features';

export const metadata: Metadata = {
  title: 'Cotizador de Envíos Express - Envios DosRuedas',
  description: 'Calcula el precio de tus envíos express en Mar del Plata de forma rápida y sencilla. Ingresa origen y destino para obtener tu cotización al instante.',
  keywords: ['cotizador envíos', 'envíos express', 'delivery Mar del Plata', 'calcular precio envío', 'mensajería urgente'],
};

export default function CotizarExpressPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <OptimizedHeader />
      <main className="flex-grow">
        <CalculatorHero />
        <ExpressCalculator />
        <MapFeatures />
        <PricingInfo />
        <CalculatorTips />
        <CalculatorContact />
      </main>
      <Footer />
    </div>
  );
}
