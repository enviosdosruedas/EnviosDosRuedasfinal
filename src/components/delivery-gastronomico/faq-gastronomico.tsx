
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo se calculan los kilómetros extra?",
    answer: "Si un envío supera los 2km desde tu local, se cobra un adicional por cada kilómetro extra. Este costo se suma al valor del pedido o se abona aparte, según tu preferencia. Te brindamos una tabla de tarifas claras y predecibles.",
  },
  {
    question: "¿Qué pasa si un cliente quiere pagar en efectivo?",
    answer: "¡No hay problema! El repartidor puede recibir el pago en efectivo. Al final de su turno, te rendirá todo el dinero recaudado. Nos adaptamos a tus formas de cobro.",
  },
  {
    question: "¿Quién se hace cargo en caso de un accidente?",
    answer: "Nosotros asumimos toda la responsabilidad. El repartidor está asegurado y es parte de nuestro equipo. Tu negocio queda completamente cubierto ante cualquier eventualidad.",
  },
  {
    question: "¿Y si tengo un pico de demanda inesperado?",
    answer: "Somos flexibles. Si necesitas un segundo repartidor para cubrir un pico de demanda, podemos proporcionártelo con un costo adicional por hora. Tu operación nunca se verá desbordada.",
  },
];

export function FaqGastronomico() {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display">Preguntas Frecuentes</h2>
          <p className="text-lg text-muted-foreground">
            Respuestas a las dudas más comunes sobre nuestro servicio de delivery gastronómico.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary/80" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pl-10">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
