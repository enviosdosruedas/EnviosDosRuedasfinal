"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            className="lg:col-span-3 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Truck className="absolute -left-8 -top-8 w-32 h-32 text-primary/5 -z-10" />
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-6">
                ¿Listo para tu Próximo Envío?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0 text-muted-foreground font-sans">
                En Envios DosRuedas estamos listos para ayudarte con tus
                necesidades de mensajería y paquetería. Contáctanos hoy mismo o
                calcula tu envío.
              </p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="lg:col-span-2 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-bold shadow-lg transform hover:scale-105 transition-transform"
            >
              <Link href="/cotizar/express">
                Solicitar Cotización Personalizada
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 shadow-lg transform hover:scale-105 transition-transform"
            >
              <Link href="/servicios/envios-express">
                Explorar Nuestros Servicios
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
