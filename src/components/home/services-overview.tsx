
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Clock, Shield, MapPin, Zap, Package } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function ServicesOverview() {
  const services = [
    {
      icon: Zap,
      title: "Envíos Express",
      description: "Entregas el mismo día para cuando necesitas velocidad máxima.",
      features: ["Entrega en en el día (Solicitalo antes de 15hs)", "Seguimiento en tiempo real", "Prioridad máxima"],
      link: "/servicios/envios-express",
      color: "from-red-500 to-red-600",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: Package,
      title: "Envíos Low Cost",
      description: "La opción más económica sin sacrificar calidad ni seguridad.",
      features: ["Entrega en el día solicitando antes de 13hs", "Rutas optimizadas", "Precio más bajo"],
      link: "/servicios/envios-lowcost",
      color: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Truck,
      title: "Moto Fija",
      description: "Servicio dedicado para tu negocio con repartidor exclusivo.",
      features: ["Repartidor dedicado", "Horarios personalizados", "Ideal para negocios"],
      link: "/servicios/moto-fija",
      color: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ]

  const additionalFeatures = [
    {
      icon: Clock,
      title: "Disponibilidad Amplia",
      description: "Servicio dedicado para tu negocio con repartidor exclusivo.",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Shield,
      title: "Envíos Confiables",
      description: "Seguimiento de envío, para que sepas donde esta tu envió a todo momento.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: MapPin,
      title: "Cobertura Total MDP",
      description: "Llegamos a toda la ciudad de Mar del Plata y zonas aledañas.",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
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

  const cardVariants = {
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
    <section className="py-16 md:py-20 lg:py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">Nuestros Servicios Principales</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Soluciones adaptadas a cada necesidad, desde entregas urgentes hasta servicios dedicados para tu negocio.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                className="h-full"
              >
                <Card className="group transition-all duration-300 ease-in-out flex flex-col h-full bg-white rounded-lg overflow-hidden">
                  <CardContent className="p-6 md:p-8 flex flex-col flex-grow">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${service.iconBg} rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-5`}
                    >
                      <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${service.iconColor}`} />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-center text-sm sm:text-base leading-relaxed flex-grow">{service.description}</p>

                    <ul className="space-y-1.5 mb-6 text-sm sm:text-base">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2.5 flex-shrink-0 ${service.color.replace("from-", "bg-")}`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button asChild className={`w-full mt-auto bg-gradient-to-r ${service.color} text-white font-semibold transform hover:scale-105 transition-transform duration-200 py-2.5 text-sm sm:text-base`}>
                      <Link href={service.link}>Ver Más Detalles</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {additionalFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                className="h-full"
              >
                <Card
                  className="group bg-white border-gray-200 h-full"
                >
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5`}
                    >
                      <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.iconColor}`} />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
