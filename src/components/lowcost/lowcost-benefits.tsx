"use client";

import { motion } from "framer-motion";
import { Wallet, Route, ShieldCheck, Clock, Users, Award } from "lucide-react";

export function LowcostBenefits() {
  const benefits = [
    {
      icon: Wallet,
      title: "Máximo Ahorro",
      description: "Hasta 50% menos que los envíos express, sin comprometer la calidad del servicio.",
    },
    {
      icon: Route,
      title: "Rutas Inteligentes",
      description: "Optimizamos las rutas para reducir costos y tiempos, beneficiándote con mejores precios.",
    },
    {
      icon: ShieldCheck,
      title: "Seguridad Garantizada",
      description: "Todos los envíos incluyen seguro y seguimiento, sin importar el precio.",
    },
    {
      icon: Clock,
      title: "Flexibilidad Horaria",
      description: "Programa tus envíos con anticipación y elegí el horario que más te convenga.",
    },
    {
      icon: Users,
      title: "Ideal para Negocios",
      description: "Perfecto para e-commerce y negocios que manejan grandes volúmenes de envíos.",
    },
    {
      icon: Award,
      title: "Calidad Comprobada",
      description: "La misma calidad y confiabilidad de siempre, a un precio más accesible.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="lowcost-benefits" className="py-20 md:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Ahorro Inteligente, Misma Calidad
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestro servicio Low Cost no recorta en confianza ni seguridad, solo en el precio.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className="group"
                variants={cardVariants}
              >
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-8 h-full transition-all duration-300 border-2 border-transparent hover:border-primary/50 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
