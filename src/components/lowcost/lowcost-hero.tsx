"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PiggyBank, Package } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function LowcostHero() {
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
    <section className="relative bg-white dark:bg-slate-900 text-slate-800 dark:text-white overflow-hidden">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <PiggyBank className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm text-primary">MÁXIMO AHORRO, MISMA CONFIANZA</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-primary dark:text-white"
            >
              La Manera <span className="text-secondary">Inteligente</span> de Enviar
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0"
            >
              Ideal para tus envíos programados y no urgentes. Optimizamos nuestras rutas para ofrecerte el mejor precio sin sacrificar la calidad y seguridad que nos caracterizan.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/cotizar/lowcost">
                  <Package className="mr-2 h-5 w-5" />
                  Cotizar Envío Low Cost
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                <Link href="#lowcost-benefits">
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
            <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl" />
            <Image
              src="/servicios/envios_low_cost.jpg"
              alt="Repartidor de EnviosDosRuedas planificando una ruta económica"
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
