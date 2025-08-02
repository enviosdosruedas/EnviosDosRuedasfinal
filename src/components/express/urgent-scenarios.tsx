"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Briefcase, Gift, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function UrgentScenarios() {
  const scenarios = [
    {
      icon: FileText,
      title: "Documentación Importante",
      description: "Contratos, documentos legales o certificados que no pueden esperar y requieren entrega inmediata y segura.",
      image: "/cards/card1.png",
    },
    {
      icon: Briefcase,
      title: "Negocios Críticos",
      description: "Repuestos, muestras comerciales o productos que son cruciales para la operación de tu negocio.",
      image: "/servicios/repartidor.jpg",
    },
    {
      icon: Gift,
      title: "Ocasiones Especiales",
      description: "Regalos de último minuto, sorpresas o detalles que deben llegar en un momento y día específico.",
      image: "/cards/card3.png",
    },
    {
      icon: Heart,
      title: "Salud y Bienestar",
      description: "Medicamentos, resultados de laboratorio o cualquier insumo médico que necesites con urgencia.",
      image: "/cards/card2.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Ideal Para Tus Envíos Más Importantes
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestro servicio Express está diseñado para esas situaciones donde cada minuto cuenta y la confianza es clave.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Scenario List */}
          <div className="flex flex-col gap-4">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "p-6 rounded-xl cursor-pointer transition-all duration-300 border-2",
                  activeIndex === index
                    ? "bg-white dark:bg-slate-800 border-secondary shadow-2xl"
                    : "bg-white/50 dark:bg-slate-800/30 border-transparent hover:bg-white dark:hover:bg-slate-800"
                )}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                      activeIndex === index
                        ? "bg-secondary text-white"
                        : "bg-secondary/10 text-secondary"
                    )}
                  >
                    <scenario.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary dark:text-white">{scenario.title}</h3>
                  </div>
                  <ArrowRight
                    className={cn(
                      "w-6 h-6 text-secondary ml-auto transition-all duration-300",
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Content Display */}
          <div className="relative h-[450px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={scenarios[activeIndex].image}
                    alt={scenarios[activeIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{scenarios[activeIndex].title}</h3>
                    <p className="text-lg text-white/80 max-w-md">{scenarios[activeIndex].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
