"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative bg-white dark:bg-slate-900 pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
          >
            <span className="font-semibold text-sm text-secondary">NUESTRA HISTORIA</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-primary dark:text-white"
          >
            Más que Envíos, <br />
            Creamos <span className="text-secondary">Conexiones</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Nacimos en Mar del Plata con una misión: ser el aliado logístico que los negocios locales merecen. Conocé al equipo y la pasión que nos impulsa cada día.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 relative h-[400px] md:h-[550px] w-full"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/redes/fac1.webp"
            alt="El equipo de EnviosDosRuedas"
            fill
            className="object-cover rounded-3xl shadow-2xl"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
