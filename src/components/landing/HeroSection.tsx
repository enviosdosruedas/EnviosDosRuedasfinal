import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
      <div className="flex flex-col items-start space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl xl:text-7xl font-headline">
          Entregas rápidas y seguras,
          <span className="block text-primary">siempre en dos ruedas.</span>
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Conectamos tu negocio con tus clientes a través de un servicio de delivery eficiente, confiable y adaptado a tus necesidades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#solicitar">Solicitar Envío Ahora</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#servicios">Nuestros Servicios</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="https://placehold.co/600x600.png"
          alt="Delivery en motocicleta"
          data-ai-hint="motorcycle delivery city"
          width={600}
          height={600}
          className="rounded-xl shadow-2xl"
        />
      </div>
    </section>
  );
}
