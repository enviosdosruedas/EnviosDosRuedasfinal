
"use client";

import { HeroSection } from "@/components/ui/HeroSection";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed } from "lucide-react";

export function HeroGastronomico() {
  return (
    <HeroSection
      preTitle={
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 mb-6 px-4 py-2 text-sm font-medium font-sans">
          <UtensilsCrossed className="w-4 h-4 mr-2" />
          Exclusivo para Gastronomía
        </Badge>
      }
      title={<span className="text-secondary">Delivery Gastronómico Profesional</span>}
      description={
        <>
          <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mt-4 mb-2 font-semibold font-display">Nuestra Misión: Profesionalizar el Delivery</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-3xl mx-auto font-sans">
            Un servicio pensado para restaurantes que buscan confiabilidad, eficiencia y un socio estratégico para sus entregas.
          </p>
        </>
      }
      ctaButtons={[
        { text: "Hablar con un Asesor", href: "#contacto-asesor", variant: 'secondary', className: 'font-sans' }
      ]}
      backgroundType="image"
      backgroundImageUrl="/bannerenvios.png"
      backgroundImageAlt="Banner Delivery Gastronómico"
      backgroundOverlayOpacity={0.75}
      textColorClassName="text-primary-foreground"
      layout="center-stacked"
      textAlignment="text-center"
      minHeight="min-h-[60vh]"
      className="py-12 md:py-16"
      titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold font-display"
      descriptionClassName="mb-8"
    />
  );
}
