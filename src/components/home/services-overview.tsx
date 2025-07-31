
"use client"

import { Button } from "@/components/ui/button"
import { Truck, Clock, Shield, MapPin, Zap, Package } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function ServicesOverview() {
  const services = [
    {
      icon: Zap,
      title: "Envíos Express",
      description: "Entregas el mismo día para cuando necesitas velocidad máxima.",
      link: "/servicios/envios-express",
      imageUrl: "https://placehold.co/600x800/dc2626/ffffff?text=Express",
      imageHint: "fast motorcycle"
    },
    {
      icon: Package,
      title: "Envíos Low Cost",
      description: "La opción más económica sin sacrificar calidad ni seguridad.",
      link: "/servicios/envios-lowcost",
      imageUrl: "https://placehold.co/600x800/16a34a/ffffff?text=Low+Cost",
      imageHint: "saving money"
    },
    {
      icon: Truck,
      title: "Moto Fija",
      description: "Servicio dedicado para tu negocio con repartidor exclusivo.",
      link: "/servicios/moto-fija",
      imageUrl: "https://placehold.co/600x800/2563eb/ffffff?text=Moto+Fija",
      imageHint: "dedicated courier"
    },
  ]

  const contentVariants = {
    initial: { y: "calc(100% - 80px)" },
    hover: { y: "0%" },
  }

  const textAndButtonVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">Nuestros Servicios Principales</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones adaptadas a cada necesidad, desde entregas urgentes hasta servicios dedicados para tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative group rounded-lg overflow-hidden shadow-lg h-[450px]"
              whileHover="hover"
              initial="initial"
            >
              <div className="absolute inset-0">
                <Image
                  src={service.imageUrl}
                  alt={`Imagen de fondo para ${service.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  data-ai-hint={service.imageHint}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <motion.div
                className="relative z-10 p-6 flex flex-col h-full justify-end"
                variants={contentVariants}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                
                <motion.p
                  variants={textAndButtonVariants}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-white/80"
                >
                  {service.description}
                </motion.p>
                
                <motion.div
                  variants={textAndButtonVariants}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Button asChild variant="secondary" className="mt-4">
                    <Link href={service.link}>Conocer Más</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
