
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, PackageSearch } from "lucide-react";
import Link from "next/link";

export default function CalculatorHero() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge variant="secondary" className="text-sm sm:text-base py-1.5 px-4 shadow-lg mb-4 md:mb-6 font-sans">
          <PackageSearch className="mr-2 h-4 w-4" />
          Cotizador Express
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 md:mb-4 font-display">
          Cotizador Envíos <span className="text-secondary">Express</span> 🚀
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-primary-foreground/90 max-w-2xl lg:max-w-3xl mx-auto mb-6 md:mb-8 font-sans">
          Calcula el costo de tu envío urgente de forma rápida y sencilla. Ingresa las direcciones de origen y destino para obtener tu cotización al instante.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto font-sans">
            <Link href="/servicios/envios-express">
              Más Sobre Envíos Express
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
