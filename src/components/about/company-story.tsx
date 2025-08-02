"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, TrendingUp, Award, GitCommitHorizontal } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function CompanyStory() {
  const milestones = [
    {
      icon: Calendar,
      year: "2020",
      title: "El Comienzo",
      description: "Con una moto y una gran visión, nace Envios DosRuedas para ofrecer una solución de mensajería pensada para Mar del Plata.",
    },
    {
      icon: TrendingUp,
      year: "2021",
      title: "Crecimiento Sostenido",
      description: "Expandimos nuestra flota y lanzamos los primeros servicios especializados para e-commerce y emprendedores locales.",
    },
    {
      icon: Award,
      year: "2022",
      title: "Consolidación y Confianza",
      description: "Alcanzamos las 4.9 estrellas en Google, convirtiéndonos en un referente de confianza y calidad en la ciudad.",
    },
    {
      icon: MapPin,
      year: "2024",
      title: "Liderando el Camino",
      description: "Hoy, nuestro equipo de profesionales cubre toda Mar del Plata y alrededores, impulsando cientos de negocios.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-4">
            Un Viaje Impulsado por la Pasión
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desde nuestros humildes comienzos hasta convertirnos en el aliado logístico de confianza en Mar del Plata.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 dark:bg-slate-700" />

          {milestones.map((milestone, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.5,
            });

            return (
              <motion.div
                key={index}
                ref={ref}
                className="flex items-start gap-8 mb-12"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-gray-200 dark:border-slate-700">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      <milestone.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold text-secondary mb-1">{milestone.year}</p>
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
