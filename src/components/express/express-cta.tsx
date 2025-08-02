"use client";

import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function ExpressCta() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699";
    const message = "Necesito un envío express prioritario. ¿Pueden ayudarme?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-primary to-slate-900 text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/servicios/moto-cta.jpg"
          alt="Fondo de repartidor en movimiento"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-block bg-secondary/20 p-4 rounded-full mb-6">
            <Zap className="w-8 h-8 text-secondary" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
            Tu Envío Urgente, Nuestra <span className="text-secondary">Prioridad</span>.
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            No dejes para mañana lo que podés enviar hoy. Cotizá en segundos y dejá que nuestro equipo se encargue del resto con la máxima velocidad y eficiencia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-secondary to-yellow-400 hover:from-yellow-400 hover:to-secondary text-black font-bold shadow-lg px-8 py-3 text-base">
                <Link href="/cotizar/express">
                  Cotizar Envío Express
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-base"
              >
                <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={20} height={20} className="mr-2" />
                Contactar por WhatsApp
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
