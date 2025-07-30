import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section id="contact" className="bg-primary text-primary-foreground py-20 md:py-28">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          ¿Listos para tu Próximo Envío?
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-primary-foreground/90 mb-8">
          En Envios DosRuedas estamos listos para ayudarte con tus necesidades de mensajería y paquetería. Contáctanos hoy mismo o calcula tu envío.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">
              Solicitar Cotización Personalizada
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/servicios/envios-express">Explorar Nuestros Servicios</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
