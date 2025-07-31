'use client';

import { HeroSection } from "@/components/ui/HeroSection";
import { Badge } from "@/components/ui/badge";
import { ExpressContent } from "@/components/express/express-content";
import { ExpressBenefits } from "@/components/express/express-benefits";
import { UrgentScenarios } from "@/components/express/urgent-scenarios";
import { ExpressCta } from "@/components/express/express-cta";
import { ExpressPricingRanges } from "@/components/express/express-pricing-ranges";
import { Rocket, ArrowRight, Calculator as CalculatorIcon } from "lucide-react";

export function ExpressPageClient() {
  return (
    <>
      <HeroSection
        title={
          <span className="text-secondary">Mensajería - Envíos Express</span>
        }
        description={
          <>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
              Servicio de mensajería rápido y confiable para entregas el mismo día en Mar del Plata. Ideal para documentos y paquetes con máxima prioridad.
            </p>
            <div className="mt-3 sm:mt-4 md:mt-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-foreground mb-0.5 sm:mb-1 font-heading">
                Envios DosRuedas
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-primary-foreground/80">
                Tu Solución Confiable para Envíos
              </p>
            </div>
          </>
        }
        ctaButtons={[
          { text: "Cotizar Envío Express", href: "/cotizar/express", variant: "secondary", icon: "Calculator", className:"text-sm sm:text-lg py-2.5 sm:py-3 px-5 sm:px-7" },
          { text: "Ver Tarifas", href: "#express-pricing-ranges", variant: "outline", className: "bg-transparent border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary text-sm sm:text-lg py-2.5 sm:py-3 px-5 sm:px-7", icon: "ArrowRight" },
        ]}
        backgroundType="image"
        backgroundImageUrl="/bannerenvios.png"
        backgroundImageAlt="Banner envíos express Envios DosRuedas"
        backgroundOverlayOpacity={0.75}
        textColorClassName="text-primary-foreground"
        layout="center-stacked"
        textAlignment="text-center"
        titleClassName="text-4xl sm:text-5xl md:text-6xl font-bold font-heading"
        minHeight="min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh]"
        className="py-12 sm:py-16 md:py-20"
      />
      <ExpressContent />
      <div id="express-pricing-ranges">
        <ExpressPricingRanges />
      </div>
      <ExpressBenefits />
      <UrgentScenarios />
      <ExpressCta />
    </>
  );
}
