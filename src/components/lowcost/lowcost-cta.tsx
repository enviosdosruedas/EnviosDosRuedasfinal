"use client";

import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function LowcostCta() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699";
    const message = "Hola, me gustaría hacer una consulta sobre el servicio Low Cost.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <motion.div
              className="p-8 md:p-12 lg:p-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Comenzá a Ahorrar Hoy
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
                Descubrí cuánto podés ahorrar en tus envíos recurrentes. Obtené una cotización al instante o contactanos para un plan a medida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-secondary to-yellow-400 hover:from-yellow-400 hover:to-secondary text-black font-bold shadow-lg">
                  <Link href="/cotizar/lowcost">
                    <Calculator className="mr-2 h-5 w-5" />
                    Cotizar Envío Low Cost
                  </Link>
                </Button>
                <Button onClick={handleWhatsAppClick} size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp" width={20} height={20} className="mr-2" />
                  Consultar
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative h-64 md:h-full w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/servicios/envios_low_cost.jpg"
                alt="Ahorro en envíos Low Cost"
                fill
                className="object-cover md:rounded-r-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-primary/30 via-primary/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
