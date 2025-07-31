import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
          ¿Listo para tu Próximo Envío?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/80 font-sans">
          En Envios DosRuedas estamos listos para ayudarte con tus necesidades de mensajería y paquetería. 
          Contáctanos hoy mismo o calcula tu envío.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg transform hover:scale-105 transition-transform">
            <Link href="/contacto">
              Solicitar Cotización Personalizada
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
            <Link href="/servicios/envios-express">
              Explorar Nuestros Servicios
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
