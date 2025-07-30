
'use client';

import { HeroSection } from "@/components/ui/HeroSection";
import { ServicesOverview } from "@/components/home/services-overview";
import { EntrepreneurSolutions } from "@/components/home/entrepreneur-solutions";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Image from "next/image";
import { Star, Calculator as CalculatorIcon, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";


const HomePageLogo = () => (
  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] mx-auto lg:mx-0">
    <Image
      src="/LogoEnviosDosRuedas.webp"
      alt="Envios DosRuedas Logo"
      fill
      sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, (min-width: 640px) 256px, 224px"
      style={{ objectFit: 'contain' }}
      className="rounded-full filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      priority
    />
    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/30 rounded-full animate-pulse opacity-70"></div>
    <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 bg-blue-400/20 rounded-full animate-pulse opacity-70 delay-1000"></div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection
          preTitle={
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6 sm:mb-8 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-md">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Tu Solución Confiable para Envíos
            </Badge>
          }
          title={
            <span className="text-yellow-400">Envios DosRuedas</span>
          }
          description="Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones rápidas, seguras y económicas para todas tus necesidades de envío."
          ctaButtons={[
            { text: "Cotiza tu Envío", href: "/cotizar/express", icon: "Calculator", variant: 'secondary', className:"text-sm sm:text-lg py-2.5 sm:py-3 px-5 sm:px-7" },
            { text: "Contacto", href: "/contacto", icon: "Mail", variant: 'outline', className: "bg-transparent border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary text-sm sm:text-lg py-2.5 sm:py-3 px-5 sm:px-7" },
          ]}
          layout="split-visual-right"
          visualElement={<HomePageLogo />}
          backgroundType="image"
          backgroundImageUrl="/bannerenvios.png"
          backgroundImageAlt="Banner principal Envios DosRuedas"
          backgroundOverlayOpacity={0.75}
          textColorClassName="text-primary-foreground"
          minHeight="min-h-screen"
          textAlignment="text-center"
          titleClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          descriptionClassName="text-lg sm:text-xl md:text-2xl"
          className="pt-20 md:pt-24"
          priority={true}
          disableAnimation={true}
        />
        <HeroSection
          title="Nuestra Visión Global"
          description="Datos que respaldan nuestra calidad y compromiso. ¡Descubre por qué somos la solución confiable para tus envíos!"
          backgroundType="image"
          backgroundImageUrl="/bannerenvios.png"
          backgroundImageAlt="Banner visión Envios DosRuedas"
          backgroundOverlayOpacity={0.8}
          textColorClassName="text-primary-foreground"
          textAlignment="text-center"
          titleClassName="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400"
          descriptionClassName="text-lg sm:text-xl md:text-2xl opacity-90"
          minHeight="min-h-[40vh] sm:min-h-[50vh]"
          contentMaxWidth="max-w-4xl"
          className="py-12 sm:py-16 md:py-20"
        >
          <div className="w-24 sm:w-32 h-1 bg-yellow-400 mx-auto mt-6 sm:mt-8"></div>
        </HeroSection>
        <ServicesOverview />
        <EntrepreneurSolutions />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
