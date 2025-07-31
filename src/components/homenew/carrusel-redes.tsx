"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Users, Heart, Share2 } from "lucide-react"
import Image from "next/image"

export function CarruselRedes() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699"
    const message = "Hola, me gustaría obtener información sobre sus servicios de envío."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const socialNetworks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/enviosdosruedas",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      description: "Síguenos en Facebook",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/enviosdosruedas",
      color: "from-pink-500 via-purple-500 to-orange-500",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      description: "Síguenos en Instagram",
    },
    {
      name: "WhatsApp",
      icon: null,
      onClick: handleWhatsAppClick,
      href: "#",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      description: "Chateá con nosotros",
    },
  ]

  // Duplicamos las redes sociales para el efecto de loop infinito
  const duplicatedNetworks = [...socialNetworks, ...socialNetworks, ...socialNetworks, ...socialNetworks]

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
          >
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Conectá con Nosotros</span>
            <Heart className="w-5 h-5 text-secondary" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4"
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
            Seguinos en Nuestras <span className="text-secondary">Redes Sociales</span>
          </motion.h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantente al día con nuestras novedades, promociones y consejos de envío. ¡Únete a nuestra comunidad!
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

          {/* Carousel */}
          <div className="overflow-hidden py-8">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1200], // Ajustamos según el ancho de los elementos
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              whileHover={{
                animationPlayState: "paused",
              }}
              style={{
                width: `${duplicatedNetworks.length * 300}px`, // 300px por cada elemento
              }}
            >
              {duplicatedNetworks.map((network, index) => {
                const IconComponent = network.icon;
                return (
                <motion.div
                  key={`${network.name}-${index}`}
                  className="flex-shrink-0 w-72 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={network.onClick || (() => window.open(network.href, "_blank"))}
                >
                  <div
                    className={`${network.bgColor} ${network.hoverColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-64 flex flex-col items-center justify-center text-center group-hover:border-primary/30`}
                  >
                    {/* Icon with gradient background */}
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${network.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {IconComponent ? <IconComponent className="w-10 h-10 text-white" /> : <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp" width={40} height={40} />}
                    </motion.div>

                    {/* Network name */}
                    <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {network.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">{network.description}</p>

                    {/* Hover indicator */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Conectar</span>
                    </motion.div>
                  </div>
                </motion.div>
              )})}
            </motion.div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-gray-600">
            ¿Tenés alguna consulta? <span className="text-primary font-semibold">¡Escribinos por WhatsApp!</span>
          </p>
        </motion.div>
      </div>

      {/* Custom CSS for the carousel animation */}
      <style jsx>{`
        @media (max-width: 768px) {
          .flex-shrink-0 {
            width: 240px;
          }
        }
        @media (max-width: 480px) {
          .flex-shrink-0 {
            width: 200px;
          }
        }
      `}</style>
    </section>
  )
}
