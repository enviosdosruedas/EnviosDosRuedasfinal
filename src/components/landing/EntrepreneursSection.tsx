import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function EntrepreneursSection() {
  const benefits = [
    "Tarifas preferenciales por volumen.",
    "Integración fácil con tu e-commerce.",
    "Plataforma de gestión de envíos.",
    "Soporte prioritario para tu negocio.",
  ];

  return (
    <section id="soluciones" className="py-20 md:py-28">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x450.png"
              alt="Emprendedor preparando un paquete"
              data-ai-hint="small business owner package"
              width={600}
              height={450}
              className="rounded-xl shadow-2xl"
            />
        </div>
        <div className="flex flex-col items-start space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Soluciones a la medida de tu emprendimiento
          </h2>
          <p className="max-w-prose text-muted-foreground">
            Sabemos lo que significa emprender. Por eso, te ofrecemos herramientas y precios especiales para que hacer llegar tus productos sea tu menor preocupación.
          </p>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contacto">Quiero saber más</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
