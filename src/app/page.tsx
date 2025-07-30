"use client";

import Image from 'next/image';
import { HeroSection } from '@/components/ui/HeroSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function HomePageLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Animated pulse circles */}
      <div className="absolute h-80 w-80 animate-pulse rounded-full bg-primary/20" />
      <div className="absolute h-96 w-96 animate-pulse rounded-full bg-primary/10 delay-150" />
      <Image
        src="/LogoEnviosDosRuedas.webp"
        alt="Envios DosRuedas Logo"
        width={380}
        height={380}
        priority
        className="relative rounded-full"
      />
    </div>
  );
}


export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
       <HeroSection
        layout="split-visual-right"
        preTitle={
          <Badge>Tu Solución Confiable para Envíos</Badge>
        }
        title={
          <>
            <span className="text-yellow-400">Envios DosRuedas</span>
          </>
        }
        description="Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones rápidas, seguras y económicas para todas tus necesidades de envío."
        ctaButtons={
          <>
            <Button asChild size="lg">
              <Link href="/cotizar/express">Cotiza tu Envío</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contacto">Contacto</Link>
            </Button>
          </>
        }
        visualElement={<HomePageLogo />}
        backgroundImageUrl="/bannerenvios.png"
        backgroundOverlayOpacity={0.75}
      />
    </div>
  );
}
