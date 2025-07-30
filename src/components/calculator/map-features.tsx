
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Map, Route } from "lucide-react";

const features = [
  {
    icon: <Map className="h-7 w-7 md:h-8 md:w-8 text-primary" />,
    title: "Visualización en Mapa",
    description: "Observa la ruta exacta que tomará tu envío en un mapa interactivo.",
  },
  {
    icon: <Route className="h-7 w-7 md:h-8 md:w-8 text-primary" />,
    title: "Cálculo Preciso",
    description: "Obtén estimaciones de distancia y tiempo basadas en datos de tráfico actualizados.",
  },
  {
    icon: <CheckCircle className="h-7 w-7 md:h-8 md:w-8 text-primary" />,
    title: "Confirmación Fácil",
    description: "Una vez cotizado, puedes proceder a confirmar tu envío con pocos clics (próximamente).",
  },
];

export default function MapFeatures() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3 md:mb-4">
          Beneficios de Nuestro Cotizador
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-center mb-8 md:mb-10 max-w-xl md:max-w-2xl mx-auto">
          Nuestra herramienta de cotización con mapa integrado te ofrece transparencia y control sobre tus envíos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <CardHeader className="items-center text-center pb-3">
                {feature.icon}
                <CardTitle className="mt-3 text-xl md:text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
