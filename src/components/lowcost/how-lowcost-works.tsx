"use client";

import { motion } from "framer-motion";
import { ClipboardList, Route, Package, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function HowLowcostWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "1. Solicitá tu Envío",
      description: "Completá el formulario con los detalles y programá tu entrega con al menos 24hs de anticipación.",
    },
    {
      icon: Route,
      title: "2. Optimizamos la Ruta",
      description: "Agrupamos tu envío con otros en la misma zona para maximizar la eficiencia y reducir costos.",
    },
    {
      icon: Package,
      title: "3. Retiramos tu Paquete",
      description: "Uno de nuestros riders pasará a buscar tu paquete puntualmente en la dirección y fecha acordada.",
    },
    {
      icon: ShieldCheck,
      title: "4. Entregamos con Seguridad",
      description: "Tu paquete se entrega de forma segura, manteniendo la calidad y confianza de siempre.",
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

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Así de Fácil es Ahorrar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestro proceso optimizado está diseñado para ser simple para vos y eficiente para nosotros.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-slate-700 -translate-y-1/2" />

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                variants={itemVariants}
              >
                <div className="relative bg-white dark:bg-slate-900 inline-block">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 text-primary dark:text-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold border-4 border-white dark:border-slate-900 ring-4 ring-gray-200 dark:ring-slate-700">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
