"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, Phone, Sparkles, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main Card */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="grid md:grid-cols-2 items-center min-h-[400px]">
              {/* Content Column */}
              <div className="p-8 md:p-12 lg:p-16 relative z-20">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 backdrop-blur-sm mb-6"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 191, 36, 0.2)" }}
                >
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium text-white/90">¡Empezá Ahora!</span>
                  <Zap className="w-4 h-4 text-secondary" />
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    background: "linear-gradient(90deg, #ffffff, #fbbf24, #ffffff)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Impulsá tu Negocio <span className="text-secondary">Hoy Mismo</span>
                </motion.h2>

                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                  No dejes que la logística te detenga. Cotizá tu envío en segundos o contactanos para diseñar un plan a la medida de tu empresa.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-secondary/25 border border-secondary/20"
                    >
                      <Link href="/cotizar/express" className="flex items-center gap-3">
                        <Calculator className="w-5 h-5" />
                        Cotizar Mi Envío
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-4 text-lg rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
                    >
                      <Link href="/contacto" className="flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        Contactanos
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  className="flex items-center gap-8 mt-8 pt-8 border-t border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">5000+</div>
                    <div className="text-sm text-white/70">Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">98%</div>
                    <div className="text-sm text-white/70">A Tiempo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">100%</div>
                    <div className="text-sm text-white/70">Seguridad</div>
                  </div>
                </motion.div>
              </div>

              {/* Image Column */}
              <div className="relative h-64 md:h-full min-h-[400px] w-full">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/20 to-primary/60 z-10" />

                <Image
                  src="/servicios/repartidor.jpg"
                  alt="Repartidor en moto listo para una entrega"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover md:rounded-r-3xl"
                />

                {/* Floating elements on image */}
                <motion.div
                  className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 z-20"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-6 h-6 text-secondary" />
                </motion.div>

                <motion.div
                  className="absolute bottom-8 right-12 bg-secondary/20 backdrop-blur-sm rounded-full p-2 z-20"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Calculator className="w-4 h-4 text-secondary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
