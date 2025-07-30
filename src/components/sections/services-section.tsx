import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bike, CalendarClock, FileText, Package, Zap } from "lucide-react";

const services = [
  {
    icon: <Bike className="h-10 w-10 text-primary mb-4" />,
    title: "Entrega Express en Bicicleta",
    description: "Para paquetes pequeños y prioritarios en la ciudad. Rápido, ecológico y eficiente.",
  },
  {
    icon: <CalendarClock className="h-10 w-10 text-primary mb-4" />,
    title: "Mensajería Programada",
    description: "Planifica tus envíos recurrentes o importantes con antelación para tu total tranquilidad.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary mb-4" />,
    title: "Gestión de Documentos",
    description: "Entrega segura y confidencial de documentos importantes, contratos y más.",
  },
  {
    icon: <Package className="h-10 w-10 text-primary mb-4" />,
    title: "Paquetería Ligera",
    description: "Envíos de paquetes de hasta 5kg dentro de la zona metropolitana con seguimiento en tiempo real.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground mt-2">Soluciones de entrega adaptadas a cada necesidad.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {service.icon}
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
