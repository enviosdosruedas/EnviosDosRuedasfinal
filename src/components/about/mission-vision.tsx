"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export function MissionVision() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Mission */}
          <motion.div
            className="bg-gray-50 dark:bg-slate-800/50 p-8 md:p-12 rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Target className="absolute -bottom-8 -left-8 w-40 h-40 text-primary/5 dark:text-white/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-primary dark:text-white font-heading mb-4">
                Nuestra Misión
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Conectar personas y negocios en Mar del Plata a través de un servicio de mensajería y delivery <span className="font-semibold text-primary/80 dark:text-white/80">confiable, rápido y accesible</span>, impulsando el crecimiento y el éxito de nuestra comunidad local.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="bg-gray-50 dark:bg-slate-800/50 p-8 md:p-12 rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eye className="absolute -bottom-8 -right-8 w-40 h-40 text-secondary/5 dark:text-white/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-secondary font-heading mb-4">
                Nuestra Visión
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ser la empresa líder y más querida en servicios de logística de última milla de la región, reconocida por nuestra <span className="font-semibold text-primary/80 dark:text-white/80">excelencia, innovación tecnológica</span> y un compromiso inquebrantable con la satisfacción del cliente.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
