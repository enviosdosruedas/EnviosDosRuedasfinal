
import { HeroSection } from "@/components/ui/HeroSection";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function MotoFijaHero() {
  return (
    <HeroSection
      preTitle={
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 mb-6 px-4 py-2 text-sm font-medium font-sans">
          Servicio Premium
        </Badge>
      }
      title={<span className="text-secondary">Servicio de Moto Fija</span>}
      description={
        <>
          <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mt-4 mb-2 font-semibold font-display">Envios DosRuedas</h2>
          <div className="max-w-4xl mx-auto space-y-2">
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-sans">
              Soluciones de delivery personalizadas para tu negocio.
            </p>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-sans">
              Conéctate con nosotros y descubre todo lo que tenemos para ofrecerte.
            </p>
          </div>
        </>
      }
      ctaButtons={[
        { text: "Contactar", href: "/contacto", variant: 'secondary', className: 'font-sans' }
      ]}
      backgroundType="image"
      backgroundImageUrl="/bannerenvios.png"
      backgroundImageAlt="Banner Moto Fija Envios DosRuedas"
      backgroundOverlayOpacity={0.7}
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
