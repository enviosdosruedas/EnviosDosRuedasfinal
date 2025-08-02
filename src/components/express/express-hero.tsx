"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function ExpressHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="text-center md:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-6"
            >
              <Zap className="w-5 h-5 text-secondary" />
              <span className="font-semibold text-sm text-secondary">ENTREGAS EN MINUTOS</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight"
            >
              La <span className="text-secondary">Velocidad</span> que tu Negocio Necesita
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-lg mx-auto md:mx-0"
            >
              Cuando cada segundo cuenta, nuestro servicio Express garantiza que tus paquetes lleguen a destino en Mar del Plata con la máxima prioridad y en tiempo récord.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-secondary to-yellow-400 hover:from-yellow-400 hover:to-secondary text-black font-bold shadow-lg">
                <Link href="/cotizar/express">
                  <Clock className="mr-2 h-5 w-5" />
                  Cotizar Envío Urgente
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="#express-benefits">
                  Ver Beneficios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            variants={imageVariants}
            className="relative h-80 md:h-full w-full"
          >
            <div className="absolute -inset-8 bg-secondary/10 rounded-full blur-3xl" />
            <Image
              src="/servicios/enviosexpress.jpg"
              alt="Repartidor de EnviosDosRuedas moviéndose a alta velocidad"
              fill
              className="object-cover rounded-3xl shadow-2xl ring-4 ring-white/10"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
