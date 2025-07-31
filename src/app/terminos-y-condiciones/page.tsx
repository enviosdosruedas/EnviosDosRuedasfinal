import type { Metadata } from "next";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import { HeroSection } from "@/components/ui/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Lee los términos y condiciones del servicio de Envios DosRuedas. Al utilizar nuestros servicios, aceptas nuestras políticas y procedimientos.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function TerminosYCondicionesPage() {
  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content: [
        "Al solicitar o utilizar cualquiera de los servicios de envío proporcionados por Envios DosRuedas ('nosotros', 'nuestro'), usted ('el cliente', 'usuario') acepta y se compromete a cumplir con los siguientes términos y condiciones. Si no está de acuerdo con estos términos, no utilice nuestros servicios.",
      ],
    },
    {
      title: "2. Descripción del Servicio",
      content: [
        "Envios DosRuedas proporciona servicios de mensajería y paquetería local en Mar del Plata y áreas circundantes. Los detalles específicos de cada servicio (Express, Low-Cost, etc.) se describen en las secciones correspondientes de nuestro sitio web.",
      ],
    },
    {
      title: "3. Obligaciones del Usuario",
      content: [
        "El cliente es responsable de proporcionar información precisa y completa para la recogida y entrega, incluyendo nombres, direcciones y números de teléfono.",
        "El cliente debe asegurarse de que el contenido del paquete sea legal y cumpla con nuestras políticas. No transportamos artículos ilegales, peligrosos o prohibidos.",
        "El embalaje adecuado del paquete para su transporte seguro es responsabilidad del cliente.",
      ],
    },
    {
      title: "4. Tarifas y Pago",
      content: [
        "Las tarifas se calculan en base a la distancia, el tipo de servicio y las características del paquete, según se indica en nuestro cotizador. Las tarifas son finales a menos que haya cambios significativos en el servicio solicitado.",
        "El pago debe realizarse en el momento de la solicitud o según los términos acordados para clientes corporativos.",
      ],
    },
     {
      title: "5. Limitación de Responsabilidad",
      content: [
        "No seremos responsables por retrasos causados por circunstancias fuera de nuestro control, como condiciones climáticas extremas, accidentes o cortes de tráfico.",
      ],
    },
     {
      title: "6. Modificaciones de los Términos",
      content: [
        "Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en nuestro sitio web. El uso continuado de nuestros servicios constituirá la aceptación de los nuevos términos.",
      ],
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <OptimizedHeader />
      <main className="flex-grow">
        <HeroSection
          preTitle={
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
          }
          title={<span className="text-primary">Términos y Condiciones</span>}
          description="Las reglas del juego. Al usar nuestros servicios, aceptas estos términos. Te recomendamos leerlos detenidamente."
          backgroundType="color"
          backgroundColor="bg-gray-50 dark:bg-gray-900"
          textColorClassName="text-foreground"
          minHeight="min-h-fit"
          className="py-12 md:py-16"
          titleClassName="text-3xl md:text-4xl font-bold"
        />

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
               <CardTitle className="flex items-center gap-3 text-2xl">
                 <FileText className="h-6 w-6 text-primary" />
                 Acuerdo de Servicio
               </CardTitle>
                <div className="text-sm text-muted-foreground pt-2">
                    <p>Última actualización: 1 de Agosto de 2024</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-lg dark:prose-invert max-w-none">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-xl mb-2 text-primary">{section.title}</h3>
                  <div className="space-y-2 text-base text-muted-foreground">
                    {section.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
