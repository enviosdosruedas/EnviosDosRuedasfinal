
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function CalculatorContact() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 md:p-10 lg:p-12 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
            ¿Dudas o Envíos Especiales?
          </h2>
          <p className="text-md sm:text-lg md:text-xl text-primary-foreground/90 mb-6 md:mb-8 max-w-lg md:max-w-2xl mx-auto">
            Si tu envío excede nuestros rangos estándar, necesitas múltiples paradas, o tienes alguna consulta específica, no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Button size="lg" variant="secondary" asChild className="text-sm sm:text-base w-full sm:w-auto">
              <Link href="/contacto">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Formulario de Contacto
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-sm sm:text-base border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary focus-visible:ring-primary-foreground w-full sm:w-auto">
              <a href="tel:2236602699">
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Llámanos: 223-660-2699
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
