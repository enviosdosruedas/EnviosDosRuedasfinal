"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, MapPin, PhoneCall, Clock, Award } from "lucide-react";

export function ExpressBenefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Velocidad Insuperable",
      description: "Tus envíos son nuestra máxima prioridad, garantizando la entrega más rápida en Mar del Plata.",
    },
    {
      icon: MapPin,
      title: "Seguimiento en Tiempo Real",
      description: "Monitoreá tu envío en vivo desde la recolección hasta la puerta de tu cliente.",
    },
    {
      icon: ShieldCheck,
      title: "Máxima Seguridad",
      description: "Tratamos cada paquete con el mayor cuidado, asegurando que llegue en perfectas condiciones.",
    },
    {
      icon: PhoneCall,
      title: "Soporte Prioritario",
      description: "Acceso a una línea de atención exclusiva para resolver tus dudas al instante.",
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Nos adaptamos a tu agenda. Programá retiros y entregas en los horarios que te convengan.",
    },
    {
      icon: Award,
      title: "Garantía de Entrega",
      description: "Nos comprometemos a que tu envío llegará en tiempo y forma, siempre.",
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
    <section id="express-benefits" className="py-20 md:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Ventajas que Marcan la Diferencia
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubrí por qué nuestro servicio Express es la elección preferida de los negocios que no pueden esperar.
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
                <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-8 h-full transition-all duration-300 border border-transparent hover:border-secondary hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:scale-110">
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
