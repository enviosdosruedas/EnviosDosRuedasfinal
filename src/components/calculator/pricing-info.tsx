
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Clock } from "lucide-react";

export default function PricingInfo() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl md:max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-3 md:mb-4 text-xs sm:text-sm py-1 px-3 font-sans">
            Transparencia de Precios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 font-display">
            ¿Cómo Calculamos el Precio?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 font-sans">
            Nuestros precios se basan en la distancia. Queremos que siempre sepas qué estás pagando.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <Card className="shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center text-xl md:text-2xl text-primary font-display">
                <Scale className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
                Basado en la Distancia
              </CardTitle>
            </CardHeader>
            <CardContent className="font-sans">
              <p className="text-muted-foreground text-sm md:text-base">
                Utilizamos la distancia calculada entre origen y destino para determinar la tarifa base.
                Contamos con rangos de precios predefinidos.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-muted-foreground list-disc list-inside">
                <li>Rangos claros y sin sorpresas.</li>
                <li>Precio justo por la distancia recorrida.</li>
                <li>Cubre el esfuerzo y tiempo del repartidor.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center text-xl md:text-2xl text-primary font-display">
                <Clock className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
                Tiempo Estimado (Informativo)
              </CardTitle>
            </CardHeader>
            <CardContent className="font-sans">
              <p className="text-muted-foreground text-sm md:text-base">
                El tiempo de entrega estimado se calcula utilizando datos de tráfico (cuando la API lo permite) y la distancia.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-muted-foreground list-disc list-inside">
                <li>Te ayuda a planificar mejor.</li>
                <li>No afecta directamente el precio estándar.</li>
                <li>Para servicios con espera, podrían aplicarse cargos.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
         <div className="mt-8 md:mt-10 text-center">
            <p className="text-sm md:text-base text-muted-foreground font-sans">
                Para distancias muy largas o fuera de cobertura habitual, el cotizador podría indicar &quot;Consultar&quot;.
                En estos casos, te invitamos a <a href="/contacto" className="text-primary hover:underline font-semibold">contactarnos</a> para una cotización personalizada.
            </p>
        </div>
      </div>
    </section>
  );
}
