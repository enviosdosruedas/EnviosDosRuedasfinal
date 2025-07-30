
"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function ExpressContent() {
  const features = [
    {
      title: "Entrega el mismo día",
      description: "Para pedidos realizados antes de las 15:00, garantizamos la entrega en el mismo día.",
    },
    {
      title: "Rango horario personalizado",
      description: "Elige el rango horario que mejor se adapte a tus necesidades para recibir o enviar tu paquete.",
    },
    {
      title: "Servicio prioritario",
      description: "Tus envíos tienen prioridad sobre otros servicios, asegurando la máxima rapidez.",
    },
  ]

  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699"
    const message = "Hola, me gustaría consultar sobre el servicio de Envíos Express."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-4 sm:mb-6">
              Entregas rápidas y eficientes para tus necesidades
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
            Nuestro servicio Express está diseñado para aquellas situaciones donde el tiempo es crucial. Garantizamos la entrega el mismo día para todos los pedidos realizados antes de las 15:00, con la posibilidad de elegir un rango horario específico.
            </p>

            {/* Features */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  custom={index}
                  variants={itemVariants}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
              >
                <Link href="/cotizar/express">Cotiza tu Envío</Link>
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                variant="outline"
                size="lg"
                className="border-green-500 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base"
              >
                <Image src="/icon/icon-whatsapp-verde.svg" alt="WhatsApp Icon" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Consultar por WhatsApp
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Large Branding */}
          <motion.div 
            className="flex justify-center lg:justify-end mt-8 lg:mt-0"
            variants={itemVariants}
            initial={{opacity: 0, x: 20}}
            animate={{opacity:1, x: 0}}
          >
            <div className="text-center lg:text-right">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text">
                  ENVIOS
                </div>
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800">DOS RUEDAS</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
