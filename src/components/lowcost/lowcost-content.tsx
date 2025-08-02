"use client";

import { motion } from "framer-motion";
import { DollarSign, CalendarDays, Route, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LowcostContent() {
  const features = [
    {
      icon: DollarSign,
      title: "El Mejor Precio Garantizado",
      description: "Al agrupar envíos en rutas optimizadas, te ofrecemos la tarifa más baja del mercado para tus entregas no urgentes.",
    },
    {
      icon: CalendarDays,
      title: "Ideal para Envíos Programados",
      description: "Perfecto para e-commerce y negocios que planifican sus entregas con 24hs o más de anticipación.",
    },
    {
      icon: Route,
      title: "Misma Calidad y Confianza",
      description: "Ahorrás dinero, pero nunca sacrificás la seguridad y el cuidado que le damos a cada uno de tus paquetes.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Content - Image */}
          <motion.div
            variants={imageVariants}
            className="relative h-[500px] w-full"
          >
            <Image
              src="/cards/card2.png"
              alt="Ilustración sobre ahorro y planificación de envíos"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right Content - Features */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
                Planificá tus Envíos y Ahorrá al Máximo
              </h2>
              <p className="text-lg text-muted-foreground">
                Nuestro servicio Low Cost es la opción inteligente para optimizar tu presupuesto de logística sin comprometer la calidad.
              </p>
            </motion.div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                <Link href="/cotizar/lowcost">
                  Ver Precios Low Cost
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
