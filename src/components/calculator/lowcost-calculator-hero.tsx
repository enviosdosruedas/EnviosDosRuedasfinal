
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins } from "lucide-react";
import Link from "next/link";

export default function LowCostCalculatorHero() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge variant="secondary" className="text-sm sm:text-base py-1.5 px-4 shadow-lg mb-6">
          <Coins className="mr-2 h-4 w-4" />
          Cotizador Low Cost
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Cotizador Envíos <span className="text-secondary">Low Cost</span> 💰
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
          Encuentra la opción más económica para tus envíos programados. Ingresa origen y destino para ver tu cotización.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link href="/servicios/envios-lowcost">
              Más Información sobre Envíos Low Cost
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
