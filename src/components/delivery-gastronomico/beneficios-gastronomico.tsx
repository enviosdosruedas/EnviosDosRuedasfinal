
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck, PhoneCall, Zap, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Disponibilidad Garantizada",
    description: "Tu repartidor fijo estará disponible durante todo tu horario de servicio. Si surge un imprevisto, te asignamos un reemplazo capacitado de inmediato, asegurando que tu operación nunca se detenga.",
  },
  {
    icon: UserCheck,
    title: "Reducción de Riesgos y Costos",
    description: "Olvídate de los costos y riesgos laborales. Nosotros nos hacemos cargo de la relación contractual, seguros y todo lo necesario. Tú solo pagas un abono mensual fijo por el servicio.",
  },
  {
    icon: PhoneCall,
    title: "Comunicación Directa y Constante",
    description: "Tendrás el número directo de tu repartidor asignado para una coordinación perfecta y una resolución de problemas al instante. La comunicación fluida es clave para un servicio de excelencia.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export function BeneficiosGastronomico() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display">Beneficios Clave para tu Negocio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ventajas competitivas diseñadas para optimizar tu operación de delivery.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-secondary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground font-display">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
