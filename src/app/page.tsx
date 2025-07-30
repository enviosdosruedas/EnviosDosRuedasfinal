
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
import { motion } from 'framer-motion';


const HeroVisual = () => (
    <div className="relative w-full h-80 lg:h-full flex items-center justify-center">
      <motion.div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary to-accent rounded-full filter blur-xl opacity-30"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/LogoEnviosDosRuedas.webp"
          alt="Envios DosRuedas Logo"
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, (min-width: 640px) 256px, 224px"
          style={{ objectFit: 'contain' }}
          className="rounded-full filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-float"
          priority
        />
      </motion.div>
    </div>
  );


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection
          preTitle={
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge className="bg-secondary text-primary hover:bg-secondary/90 mb-6 sm:mb-8 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-md">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Tu Solución Confiable para Envíos
              </Badge>
            </motion.div>
          }
          title={
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Envios DosRuedas
            </span>
          }
          description="Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones rápidas, seguras y económicas para todas tus necesidades de envío."
          ctaButtons={[
            { text: "Cotiza tu Envío", href: "/cotizar/express", icon: "Calculator", variant: 'secondary', className:"text-primary text-sm sm:text-lg py-3 sm:py-4 px-7 sm:px-9" },
            { text: "Contacto", href: "/contacto", icon: "Mail", variant: 'ghost', className: "text-primary hover:bg-primary/5 text-sm sm:text-lg py-3 sm:py-4 px-7 sm:px-9" },
          ]}
          layout="split-visual-right"
          visualElement={<HeroVisual />}
          backgroundType="gradient"
          backgroundGradient="bg-gradient-to-br from-background via-blue-50 to-background"
          textColorClassName="text-primary"
          minHeight="min-h-screen"
          textAlignment="text-left"
          titleClassName="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold"
          descriptionClassName="text-lg sm:text-xl md:text-2xl text-foreground/80"
          className="pt-20 md:pt-24"
          priority={true}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection
            title={<span className="text-yellow-400">Nuestra Visión Global</span>}
            description="Datos que respaldan nuestra calidad y compromiso. ¡Descubre por qué somos la solución confiable para tus envíos!"
            backgroundType="color"
            backgroundColor="bg-primary"
            textColorClassName="text-primary-foreground"
            textAlignment="text-center"
            titleClassName="text-3xl sm:text-4xl md:text-5xl font-bold"
            descriptionClassName="text-lg sm:text-xl md:text-2xl opacity-90"
            minHeight="min-h-fit"
            contentMaxWidth="max-w-4xl"
            className="py-12 sm:py-16 md:py-20"
          >
            <div className="w-24 sm:w-32 h-1 bg-yellow-400 mx-auto mt-6 sm:mt-8"></div>
          </HeroSection>
        </motion.div>
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
