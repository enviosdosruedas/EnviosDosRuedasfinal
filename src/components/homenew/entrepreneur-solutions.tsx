"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function EntrepreneurSolutions() {
  const solutions = [
    {
      title: "Plan Emprendedores",
      description: "Tarifas preferenciales y servicios adaptados para tu negocio.",
      link: "/servicios/plan-emprendedores",
      image: "/cards/card1.png",
      badge: { text: "Popular", variant: "orange" },
    },
    {
      title: "Envíos Flex MercadoLibre",
      description: "Integración perfecta con MercadoLibre para potenciar tus ventas.",
      link: "/servicios/enviosflex",
      image: "/cards/card2.png",
      badge: { text: "Nuevo", variant: "indigo" },
    },
    {
      title: "Moto Fija para Negocios",
      description: "Un repartidor dedicado exclusivamente para tu empresa.",
      link: "/servicios/moto-fija",
      image: "/cards/card3.png",
      badge: { text: "Premium", variant: "pink" },
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
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Soluciones para Emprendedores
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Servicios diseñados para potenciar tu negocio, con tarifas preferenciales e integración con plataformas de
            venta.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={cardVariants}
              className="flex justify-center"
            >
              <Link href={solution.link} className="block w-full max-w-[280px] group">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl",
                    "bg-card",
                    "border border-border/50",
                    "shadow-lg",
                    "transition-all duration-300",
                    "hover:shadow-xl hover:shadow-primary/10",
                    "hover:-translate-y-1",
                    "hover:border-primary/20",
                  )}
                >
                  <div className="relative h-[320px] overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
                    )}
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-medium",
                        "bg-background/90 text-foreground",
                        "backdrop-blur-md",
                        "shadow-sm",
                        "border border-border/50",
                      )}
                    >
                      {solution.badge.text}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-white leading-snug">{solution.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2">{solution.description}</p>
                      </div>
                      <div
                        className={cn(
                          "p-2.5 rounded-full",
                          "bg-white/10 dark:bg-zinc-800/50",
                          "backdrop-blur-md",
                          "group-hover:bg-primary group-hover:text-primary-foreground",
                          "transition-all duration-300",
                        )}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
