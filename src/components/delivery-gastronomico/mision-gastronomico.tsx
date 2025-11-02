
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function MisionGastronomico() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border-border/50 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <Image 
                    src="/matias-cejas.webp"
                    alt="Matías Cejas, fundador de Envios DosRuedas"
                    width={150}
                    height={150}
                    className="rounded-full ring-4 ring-secondary/50 p-1 object-cover"
                  />
                </div>
                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/10" />
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed italic relative z-10">
                    “Mi nombre es Matías y fundé Envíos DosRuedas con el objetivo de brindar soluciones logísticas a la comunidad de Mar del Plata. Hoy, nuestro foco está puesto en profesionalizar el servicio de delivery para el sector gastronómico, un rubro que vengo estudiando hace tiempo. Queremos ser más que un simple delivery; queremos ser un socio en el que puedas confiar.”
                  </p>
                  <p className="text-right mt-4 font-semibold text-primary font-display">- Matías Cejas, Fundador</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
