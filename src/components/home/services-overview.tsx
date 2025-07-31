
"use client"

import { Card, CardContent } from "@/components/ui/card"
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
      features: ["Entrega en en el día (Solicitalo antes de 15hs)", "Seguimiento en tiempo real", "Prioridad máxima"],
      link: "/servicios/envios-express",
      imageUrl: "/servicios/enviosexpress.jpg",
      imageHint: "fast motorcycle"
    },
    {
      icon: Package,
      title: "Envíos Low Cost",
      description: "La opción más económica sin sacrificar calidad ni seguridad.",
      features: ["Entrega en el día solicitando antes de 13hs", "Rutas optimizadas", "Precio más bajo"],
      link: "/servicios/envios-lowcost",
      imageUrl: "/servicios/envios_low_cost.jpg",
      imageHint: "saving money"
    },
    {
      icon: Truck,
      title: "Moto Fija",
      description: "Servicio dedicado para tu negocio con repartidor exclusivo.",
      features: ["Repartidor dedicado", "Horarios personalizados", "Ideal para negocios"],
      link: "/servicios/moto-fija",
      imageUrl: "/servicios/moto_fija.jpg",
      imageHint: "dedicated courier"
    },
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary mb-3 sm:mb-4">Nuestros Servicios Principales</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Soluciones adaptadas a cada necesidad, desde entregas urgentes hasta servicios dedicados para tu negocio.
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <div className="flex space-x-6 md:space-x-0 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 w-full md:contents">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow-lg h-[450px] w-[80vw] sm:w-[60vw] md:w-auto flex-shrink-0"
                  whileHover="hover"
                  initial="initial"
                  variants={{
                    initial: { y: 0 },
                    hover: { y: -5 },
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={service.imageUrl}
                      alt={`Imagen de fondo para ${service.title}`}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      data-ai-hint={service.imageHint}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  <motion.div
                    className="relative z-10 p-6 flex flex-col h-full justify-end md:group-hover:translate-y-0 md:translate-y-[calc(100%-80px)] transition-transform duration-500 ease-in-out"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{service.title}</h3>
                    
                    <div className="md:opacity-0 group-hover:md:opacity-100 transition-opacity duration-300 delay-100">
                      <p
                        className="text-primary-foreground/80"
                      >
                        {service.description}
                      </p>
                      
                      <div
                      >
                        <Button asChild variant="secondary" className="mt-4 font-semibold">
                          <Link href={service.link}>Conocer Más</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
