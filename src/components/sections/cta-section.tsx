
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-24 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              {/* Columna de Texto */}
              <div className="p-8 md:p-10 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
                  ¿Listos para tu Próximo Envío?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md">
                  En Envios DosRuedas estamos listos para ayudarte con tus
                  necesidades de mensajería y paquetería. Contáctanos hoy
                  mismo o calcula tu envío.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="font-bold shadow-lg transform hover:scale-105 transition-transform"
                  >
                    <Link href="/cotizar/express">
                      Solicitar Cotización
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="shadow-lg transform hover:scale-105 transition-transform"
                  >
                    <Link href="/servicios/envios-express">
                      Explorar Servicios
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Columna de Imagen */}
              <div className="relative h-64 md:h-full w-full">
                <Image
                  src="/servicios/moto-cta.jpg"
                  alt="Repartidor en moto listo para una entrega"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  data-ai-hint="delivery motorcycle"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
