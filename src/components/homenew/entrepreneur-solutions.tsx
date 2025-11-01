"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Package, Sparkles, ArrowUpRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
      image: "/cards/card1.png",
      badge: "Emprendedores",
      imageHint: "growing business",
    },
    {
      icon: Package,
      title: "Envíos Flex MercadoLibre",
      description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
      features: ["Entregas el mismo día", "Mejora tu reputación", "Tarifas LowCost", "API integrada"],
      link: "/servicios/enviosflex",
      gradient: "from-secondary via-yellow-500 to-yellow-600",
      glowColor: "yellow-500/20",
      image: "/cards/card2.png",
      badge: "MercadoLibre",
      imageHint: "ecommerce delivery",
    },
    {
      icon: Users,
      title: "Moto Fija para Negocios",
      description: "Repartidor dedicado exclusivamente para tu empresa",
      features: ["Repartidor exclusivo", "Horarios personalizados", "Rutas optimizadas", "Seguimiento GPS"],
      link: "/servicios/moto-fija",
      gradient: "from-green-500 via-green-600 to-green-700",
      glowColor: "green-500/20",
      image: "/cards/card3.png",
      badge: "Dedicado",
      imageHint: "dedicated courier",
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
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 overflow-hidden font-sans">
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-6"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon
            return (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Link href={solution.link} className="block w-full group">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl h-[420px]",
                      "bg-white/80 backdrop-blur-xl",
                      "border border-zinc-200/50 shadow-lg",
                      "transition-all duration-300",
                      "hover:shadow-2xl hover:border-zinc-300/50",
                    )}
                  >
                    {/* Image Section */}
                    <div className="relative h-[280px] overflow-hidden">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={solution.imageHint}
                      />
                       {/* Gradient overlay */}
                      <div
                        className={cn("absolute inset-0", `bg-gradient-to-t from-black/90 via-black/40 to-transparent`)}
                      />
                       {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold",
                            "bg-white/90 text-zinc-800 backdrop-blur-md",
                            "shadow-lg border border-white/20",
                          )}
                        >
                          {solution.badge}
                        </span>
                      </div>
                       {/* Icon */}
                      <div className="absolute top-4 left-4">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-r ${solution.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                       {/* Arrow button */}
                      <div className="absolute bottom-4 right-4">
                        <div
                          className={cn(
                            "p-2.5 rounded-full",
                            "bg-white/10 backdrop-blur-md",
                            "group-hover:bg-white/20 transition-colors duration-300",
                          )}
                        >
                          <ArrowUpRight className="w-5 h-5 text-white group-hover:-rotate-12 transition-transform duration-300" />
                        </div>
                      </div>
                       {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white leading-tight font-display">{solution.title}</h3>
                          <p className="text-sm text-zinc-200 line-clamp-2 leading-relaxed">{solution.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features Section */}
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-2 gap-2">
                        {solution.features.slice(0, 4).map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center text-xs text-gray-600"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * featureIndex, duration: 0.3 }}
                          >
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                      whileHover={{ opacity: 0.1 }}
                    />
                  </motion.div>
                </Link>
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
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
