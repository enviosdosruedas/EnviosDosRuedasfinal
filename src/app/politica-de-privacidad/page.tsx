import type { Metadata } from "next";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { CarruselRedes } from "@/components/homenew/carrusel-redes";
import { Footer } from "@/components/homenew/footer";
import { HeroSection } from "@/components/ui/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo Envios DosRuedas protege y gestiona tus datos personales. Nuestra política de privacidad detalla la información que recopilamos y su uso.",
  robots: {
    index: true,
    follow: true,
  }
};

export default function PoliticaDePrivacidadPage() {
  const sections = [
    {
      title: "1. Información que Recopilamos",
      content: [
        "Recopilamos información que nos proporcionas directamente, como tu nombre, número de teléfono, dirección de correo electrónico y direcciones de recogida/entrega al utilizar nuestros servicios.",
        "También podemos recopilar información técnica sobre tu dispositivo y uso de nuestro sitio web a través de cookies y tecnologías similares para mejorar la experiencia del usuario.",
      ],
    },
    {
      title: "2. Uso de la Información",
      content: [
        "Utilizamos tu información para proveer y gestionar nuestros servicios de envío, incluyendo la cotización, programación, seguimiento y finalización de entregas.",
        "Para comunicarnos contigo sobre el estado de tus envíos, ofertas promocionales y actualizaciones importantes de nuestros servicios.",
        "Para mejorar y personalizar nuestro sitio web y servicios, así como para fines de análisis y estadísticos internos.",
      ],
    },
    {
      title: "3. Cómo Compartimos tu Información",
      content: [
        "No vendemos ni alquilamos tu información personal a terceros. Podemos compartir información con nuestros repartidores y socios logísticos con el único fin de completar tu servicio de envío.",
        "Podemos divulgar tu información si es requerido por ley o en respuesta a solicitudes válidas de autoridades públicas.",
      ],
    },
    {
      title: "4. Seguridad de los Datos",
      content: [
        "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción.",
      ],
    },
    {
      title: "5. Tus Derechos",
      content: [
        "Tienes derecho a acceder, rectificar o suprimir tus datos personales. También puedes oponerte al tratamiento de tus datos en determinadas circunstancias. Para ejercer estos derechos, por favor contáctanos.",
      ],
    },
     {
      title: "6. Cambios en esta Política",
      content: [
        "Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos de cualquier cambio publicando la nueva política en esta página. Se te aconseja revisar esta política periódicamente.",
      ],
    },
     {
      title: "7. Contacto",
      content: [
        "Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a través de nuestro formulario de contacto o en matiascejas@enviosdosruedas.com.",
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
          }
          title={<span className="text-primary">Política de Privacidad</span>}
          description="En Envios DosRuedas, tu confianza es nuestra prioridad. Aquí te explicamos cómo protegemos y utilizamos tu información personal."
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
                 Detalles de nuestra política
               </CardTitle>
                <div className="text-sm text-muted-foreground pt-2">
                    <p>Última actualización: 1 de Agosto de 2024</p>
                    <p>
                        Bienvenido a Envios DosRuedas. Nos comprometemos a proteger tu privacidad y a manejar tus datos personales de manera transparente y segura.
                    </p>
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
      <CarruselRedes />
      <Footer />
    </div>
  );
}
