"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Clock, Shield, Award, TrendingUp, Heart } from "lucide-react"

export function VisionSection() {
  const images = [
    "/Emprendedoresbanner.webp",
    "/Emprendedoresbannerrapidas.webp",
    "/Emprendedoresbannerrapidas2.webp",
    "/Emprendedoresbannerrapidas3.webp",
  ]

  const duplicatedImages = [...images, ...images]

  const stats = [
    {
      icon: Users,
      number: "5000+",
      label: "Clientes Satisfechos",
      description: "Empresas y emprendedores confÃ­an en nosotros",
    },
    {
      icon: Clock,
      number: "98%",
      label: "Entregas a Tiempo",
      description: "Puntualidad garantizada en cada envÃ­o",
    },
    {
      icon: Shield,
      number: "100%",
      label: "EnvÃ­os Seguros",
      description: "ProtecciÃ³n total de tus paquetes",
    },
    {
      icon: Award,
      number: "7+",
      label: "AÃ±os de Experiencia",
      description: "LÃ­deres en mensajerÃ­a en Mar del Plata",
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 flex flex-col items-center gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 backdrop-blur-sm mb-4"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 191, 36, 0.2)" }}
          >
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground/90">Creciendo Juntos</span>
            <Heart className="w-4 h-4 text-secondary" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center font-display"
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
            Nuestra <span className="text-secondary">VisiÃ³n Global</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl text-center font-sans leading-relaxed"
          >
            Datos que respaldan nuestra calidad y compromiso. Descubre por quÃ© somos la{" "}
            <span className="text-secondary font-semibold">soluciÃ³n confiable</span> para tus envÃ­os en Mar del Plata.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statsVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-foreground/20 hover:border-secondary/50 transition-all duration-300 group"
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 mb-4 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-secondary" />
              </motion.div>

              <motion.div
                className="text-3xl md:text-4xl font-bold text-secondary mb-2 font-display"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.number}
              </motion.div>

              <h3 className="text-lg font-semibold text-primary-foreground mb-2 font-display">{stat.label}</h3>

              <p className="text-sm text-primary-foreground/70 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Carousel */}
        <motion.div variants={itemVariants} className="w-full max-w-6xl overflow-hidden group">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary to-transparent z-10" />

            <motion.div
              className="flex animate-h-scroll group-hover:[animation-play-state:paused] w-max"
              whileHover={{ scale: 1.02 }}
            >
              {duplicatedImages.map((src, index) => (
                <motion.div
                  key={index}
                  className="w-[clamp(280px,35vw,380px)] flex-shrink-0 p-4"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-2xl ring-2 ring-secondary/20 hover:ring-secondary/50 transition-all duration-300">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Banner de emprendedores ${(index % 3) + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto" variants={itemVariants}>
            Â¿Listo para formar parte de nuestra familia de clientes satisfechos?
          </motion.p>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 text-secondary-foreground font-bold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-secondary/25 border border-secondary/20"
            >
              <Link href="/nosotros/sobre-nosotros" className="flex items-center gap-3">
                ConocÃ© mÃ¡s sobre nosotros
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
