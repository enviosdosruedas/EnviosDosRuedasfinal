import { Rocket, Package, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ServicesSection() {
  const services = [
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Envío Express",
      description: "Para cuando el tiempo apremia. Entregas en minutos dentro de la ciudad, garantizando la máxima velocidad.",
    },
    {
      icon: <Package className="w-8 h-8 text-primary" />,
      title: "Envío Low-Cost",
      description: "La opción más económica para tus envíos programados. Eficiencia y ahorro sin sacrificar la calidad del servicio.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Seguro y Confiable",
      description: "Todos nuestros envíos están asegurados. Tu tranquilidad es nuestra prioridad. Seguimiento en tiempo real.",
    },
  ];

  return (
    <section id="servicios" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Nuestros Servicios Principales</h2>
          <p className="mt-4 text-muted-foreground">
            Ofrecemos soluciones de entrega flexibles para adaptarnos a cada una de tus necesidades.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
