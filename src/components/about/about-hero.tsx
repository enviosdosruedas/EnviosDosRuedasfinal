
import { HeroSection } from "@/components/ui/HeroSection";

export function AboutHero() {
  return (
    <HeroSection
      title={<span className="text-yellow-400">Envios DosRuedas</span>}
      description={
        <>
          <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mt-4 mb-2 font-semibold">Sobre Nosotros</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Resolvemos tus dudas sobre envíos y delivery. ¿No encuentras lo que buscas? ¡Contáctanos!
          </p>
        </>
      }
      backgroundType="image"
      backgroundImageUrl="/bannerenvios.png"
      backgroundImageAlt="Banner Sobre Nosotros Envios DosRuedas"
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
