"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Package, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function EntrepreneurSolutions() {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Plan Emprendedores",
      description: "Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online",
      features: ["Tarifas LowCost", "Facturación mensual", "Soporte dedicado", "Reportes detallados"],
      link: "/servicios/plan-emprendedores",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      glowColor: "blue-500/20",
    },
    {
      icon: Package,
      title: "Envíos Flex MercadoLibre",
      description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
      features: ["Entregas el mismo día", "Mejora tu reputación", "Tarifas LowCost", "API integrada"],
      link: "/servicios/enviosflex",
      gradient: "from-secondary via-yellow-500 to-yellow-600",
      glowColor: "yellow-500/20",
    },
    {
      icon: Users,
      title: "Moto Fija para Negocios",
      description: "Repartidor dedicado exclusivamente para tu empresa",
      features: ["Repartidor exclusivo", "Horarios personalizados", "Rutas optimizadas", "Seguimiento GPS"],
      link: "/servicios/moto-fija",
      gradient: "from-green-500 via-green-600 to-green-700",
      glowColor: "green-500/20",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      },
    },
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Especial para Emprendedores</span>
            <TrendingUp className="w-5 h-5 text-secondary" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(90deg, #1e40af, #fbbf24, #1e40af)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Soluciones Especiales para <span className="text-secondary">Emprendedores</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Diseñamos servicios específicos para ayudar a crecer tu negocio online. Desde{" "}
            <span className="text-primary font-semibold">tarifas preferenciales</span> hasta{" "}
            <span className="text-secondary font-semibold">integración con plataformas</span> de venta.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    whileHover={{ opacity: 0.1 }}
                  />

                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${solution.gradient}`} />

                  <div className="p-8 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${solution.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold font-heading mb-4 text-center text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h3>

                    <p className="text-gray-600 mb-6 text-center leading-relaxed flex-grow">{solution.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {solution.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * featureIndex, duration: 0.4 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${solution.gradient} hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300 group/btn`}
                      >
                        <Link href={solution.link} className="flex items-center justify-center gap-2">
                          Conocer Más
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-${solution.glowColor} rounded-full opacity-0 group-hover:opacity-100`}
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg text-gray-600 mb-6">¿Necesitas una solución personalizada para tu negocio?</p>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/contacto" className="flex items-center gap-3">
                Hablemos de tu proyecto
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
