import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary mb-6">
            Envios DosRuedas 1806
          </h2>
          <p className="text-lg text-foreground mb-4">
            Tu Aliado en Entregas RÃ¡pidas y Seguras en la Ciudad.
          </p>
          <p className="text-md text-muted-foreground mb-8">
            Soluciones de mensajerÃ­a y paqueterÃ­a Ã¡giles, confiables y ecolÃ³gicas, adaptadas a tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#calculator">Cotiza tu EnvÃ­o Ahora</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Link href="#services">Ver Servicios</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Entrega en bicicleta por la ciudad" 
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
              data-ai-hint="city delivery bicycle"
            />
        </div>
      </div>
    </section>
  );
}
