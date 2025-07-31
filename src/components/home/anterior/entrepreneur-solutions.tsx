
"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Package, Zap, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function EntrepreneurSolutions() {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Plan Emprendedores",
      description: "Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online",
      features: ["Tarifas LowCost", "Facturación mensual", "Soporte dedicado"],
      link: "/servicios/plan-emprendedores",
      color: "from-primary to-blue-600",
      borderColor: "border-primary"
    },
    {
      icon: Package,
      title: "Envíos Flex MercadoLibre",
      description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
      features: ["Entregas el mismo día", "Mejora tu reputación", "Tarifas LowCost"],
      link: "/servicios/enviosflex",
      color: "from-secondary to-yellow-600",
      borderColor: "border-secondary"
    },
    {
      icon: Users,
      title: "Moto Fija para Negocios",
      description: "Repartidor dedicado exclusivamente para tu empresa",
      features: ["Repartidor exclusivo", "Horarios personalizados", "Rutas optimizadas"],
      link: "/servicios/moto-fija",
      color: "from-green-500 to-green-600",
      borderColor: "border-green-500"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 12,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 mb-6 px-4 py-2 text-sm sm:text-base font-semibold rounded-full">
            <TrendingUp className="w-5 h-5 mr-2" />
            Especial para Emprendedores
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Soluciones Especiales para Emprendedores
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Diseñamos servicios específicos para ayudar a crecer tu negocio online. Desde tarifas preferenciales hasta integración con plataformas de venta.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <div style={{ perspective: "1000px" }}>
                  <motion.div
                    whileHover={{ rotateY: -15, rotateX: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative h-full rounded-xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-slate-900 rounded-xl shadow-lg" />

                    <div className="absolute inset-0 bg-gradient-radial from-yellow-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative transform-gpu [transform:translateZ(40px)] p-6 md:p-8 flex flex-col h-full text-slate-100">
                      <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${solution.color} rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold font-heading mb-4 text-center text-slate-50">{solution.title}</h3>
                      <p className="text-sm md:text-base text-slate-400 mb-6 text-center leading-relaxed flex-grow">{solution.description}</p>

                      <ul className="space-y-3 mb-8">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button asChild className="w-full mt-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transform hover:scale-105 transition-transform duration-200">
                        <Link href={solution.link}>Conocer Más</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
