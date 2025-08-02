"use client";

import { motion } from "framer-motion";
import { Calculator, Package, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ExpressContent() {
  const steps = [
    {
      icon: Calculator,
      title: "1. Cotizá y Programá",
      description: "Ingresá los detalles de tu envío en nuestra calculadora online y elegí el horario de retiro que más te convenga.",
    },
    {
      icon: Package,
      title: "2. Retiramos tu Paquete",
      description: "Uno de nuestros riders profesionales pasará a buscar tu paquete puntualmente en la dirección y hora acordadas.",
    },
    {
      icon: ShieldCheck,
      title: "3. Entrega Rápida y Segura",
      description: "Tu envío se entrega directamente, con seguimiento en tiempo real y confirmación de entrega para tu tranquilidad.",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
          {/* Left Content - Steps */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
                Tu Envío Express en 3 Simples Pasos
              </h2>
              <p className="text-lg text-muted-foreground">
                Simplificamos la logística para que puedas enviar lo que necesites, cuando lo necesites, sin complicaciones.
              </p>
            </motion.div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="mt-6">
                <Link href="/cotizar/express">
                  Comenzar mi Envío
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div
            variants={imageVariants}
            className="relative h-[500px] w-full hidden lg:block"
          >
            <Image
              src="/servicios/moto-cta.jpg"
              alt="Repartidor de EnviosDosRuedas preparando un paquete para entrega express"
              fill
              className="object-cover rounded-3xl shadow-2xl"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
