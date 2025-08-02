"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function CompanyValues() {
  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Nos comprometemos con cada envío como si fuera nuestro, garantizando el mejor servicio posible.",
      color: "text-red-500",
      bg: "bg-red-500/5",
    },
    {
      icon: Zap,
      title: "Rapidez",
      description: "Entendemos que el tiempo es valioso, por eso optimizamos cada ruta para entregas más rápidas.",
      color: "text-blue-500",
      bg: "bg-blue-500/5",
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Tu tranquilidad es nuestra prioridad. Cada paquete está monitoreado para tu seguridad.",
      color: "text-green-500",
      bg: "bg-green-500/5",
    },
    {
      icon: Users,
      title: "Cercanía",
      description: "Somos una empresa local que entiende las necesidades específicas de Mar del Plata y su gente.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/5",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
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
            Los Pilares de Nuestro Servicio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estos son los valores que nos guían cada día y la promesa que te hacemos en cada envío.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center h-full overflow-hidden border border-gray-100 dark:border-slate-800"
              >
                <IconComponent
                  className={cn(
                    "absolute -bottom-8 -right-8 w-32 h-32 opacity-5",
                    value.color
                  )}
                />
                <div className="relative z-10">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6",
                      value.bg,
                      value.color
                    )}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
