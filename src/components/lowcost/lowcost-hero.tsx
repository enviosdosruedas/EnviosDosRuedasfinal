
import { HeroSection } from "@/components/ui/HeroSection";
import Link from "next/link";

export function LowcostHero() {
  return (
    <HeroSection
      title={<span className="text-secondary">Mensajería - Envíos Low-cost</span>}
      description={
        <>
          <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mt-4 mb-2 font-semibold font-heading">Envios DosRuedas</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-4xl mx-auto">
            Descubre nuestros servicios de mensajería rápida y económica. Envíos seguros y a precios bajos para todas tus necesidades.
          </p>
        </>
      }
      ctaButtons={[
        { text: "Cotiza el servicio", href: "/cotizar/lowcost", variant: 'secondary' }
      ]}
      backgroundType="image"
      backgroundImageUrl="/bannerenvios.png"
      backgroundImageAlt="Banner Envíos Low Cost Envios DosRuedas"
      backgroundOverlayOpacity={0.7}
      textColorClassName="text-primary-foreground"
      layout="center-stacked"
      textAlignment="text-center"
      minHeight="min-h-[60vh]"
      className="py-12 md:py-16"
      titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold font-heading"
      descriptionClassName="mb-8"
    />
  );
}
