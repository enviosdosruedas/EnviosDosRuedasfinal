"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Package, Sparkles, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function EntrepreneurSolutions() {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Plan Emprendedores",
      description: "Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online",
      link: "/servicios/plan-emprendedores",
      image: "/cards/card1.png",
      badge: "Emprendedores",
      imageHint: "growing business",
    },
    {
      icon: Package,
      title: "Envíos Flex MercadoLibre",
      description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
      link: "/servicios/enviosflex",
      image: "/cards/card2.png",
      badge: "MercadoLibre",
      imageHint: "ecommerce delivery",
    },
    {
      icon: Users,
      title: "Moto Fija para Negocios",
      description: "Repartidor dedicado exclusivamente para tu empresa",
      link: "/servicios/moto-fija",
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group/card rounded-lg overflow-hidden shadow-lg h-[450px]"
              >
                <Link href={solution.link} className="block w-full h-full">
                  <div className="absolute inset-0">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      data-ai-hint={solution.imageHint}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  <div className="relative z-10 p-6 flex flex-col h-full justify-end text-white">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/30 backdrop-blur-md shadow-lg border border-white/20">
                          {solution.badge}
                        </span>
                        <div className="w-12 h-12 bg-black/30 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="mt-auto">
                          <h3 className="text-xl font-bold leading-tight font-display mb-2">{solution.title}</h3>
                          <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-4">{solution.description}</p>
                          <div className="flex items-center text-sm font-semibold text-secondary group-hover/card:underline">
                            Conocer más <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" />
                          </div>
                      </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

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
