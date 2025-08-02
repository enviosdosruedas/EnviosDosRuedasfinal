"use client";

import { motion } from "framer-motion";
import { Star, Users, Award } from "lucide-react";
import CountUp from "react-countup";

export function WhoWeAre() {
  const stats = [
    {
      icon: Star,
      end: 4.9,
      decimals: 1,
      suffix: "",
      label: "Estrellas en Google",
    },
    {
      icon: Users,
      end: 5000,
      suffix: "+",
      label: "Clientes Felices",
    },
    {
      icon: Award,
      end: 7,
      suffix: "+",
      label: "Años de Experiencia",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-4xl font-bold text-primary dark:text-white">
                  <CountUp
                    end={stat.end}
                    duration={2.5}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
            <motion.div
              className="sm:col-span-2 bg-primary text-white p-8 rounded-2xl shadow-xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <h3 className="text-2xl font-bold font-heading mb-2">Tu Aliado Local en Logística</h3>
              <p className="text-primary-foreground/80">
                Comprometidos con el éxito de cada negocio en Mar del Plata.
              </p>
            </motion.div>
          </div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white font-heading mb-6">
              Nacimos para Impulsar el Comercio Local
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Envios DosRuedas no es solo una empresa de mensajería. Somos un equipo de marplatenses apasionados por la logística y dedicados a ofrecer un servicio que realmente entienda las necesidades de nuestra ciudad.
              </p>
              <p>
                Desde el primer día, nuestro objetivo ha sido claro: brindar una solución de envío <span className="font-semibold text-primary dark:text-secondary">rápida, 100% confiable y accesible</span>. Creemos que una logística eficiente es clave para el crecimiento de cualquier emprendimiento, y estamos acá para ser el puente entre tu negocio y tus clientes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
