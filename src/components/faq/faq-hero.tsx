
import { HeroSection } from "@/components/ui/HeroSection";
import { HelpCircle } from "lucide-react";

export function FaqHero() {
  return (
    <HeroSection
      preTitle={
        <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10 text-yellow-400" />
        </div>
      }
      title={<span className="text-yellow-400">Preguntas Frecuentes</span>}
      description={
        <>
          <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mt-4 mb-2 font-semibold">Envios DosRuedas</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de mensajería y delivery en Mar del Plata.
          </p>
        </>
      }
      backgroundType="image"
      backgroundImageUrl="/bannerenvios.png"
      backgroundImageAlt="Banner FAQ Envios DosRuedas"
      backgroundOverlayOpacity={0.7}
      textColorClassName="text-primary-foreground"
      layout="center-stacked"
      textAlignment="text-center"
      minHeight="min-h-[50vh]"
      className="py-12 md:py-16"
      titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold"
    />
  );
}
