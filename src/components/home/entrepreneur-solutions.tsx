
"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Package, Zap, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function EntrepreneurSolutions() {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Plan Emprendedores",
      description: "Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online",
      features: ["Tarifas LowCost", "Facturación mensual", "Soporte dedicado"],
      link: "/servicios/plan-emprendedores",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-t-blue-500"
    },
    {
      icon: Package,
      title: "Envíos Flex MercadoLibre",
      description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
      features: ["Entregas el mismo día", "Mejora tu reputación", "Tarifas LowCost"],
      link: "/servicios/enviosflex",
      color: "from-yellow-500 to-yellow-600",
      borderColor: "border-t-yellow-500"
    },
    {
      icon: Users,
      title: "Moto Fija para Negocios",
      description: "Repartidor dedicado exclusivamente para tu empresa",
      features: ["Repartidor exclusivo", "Horarios personalizados", "Rutas optimizadas"],
      link: "/servicios/moto-fija",
      color: "from-green-500 to-green-600",
      borderColor: "border-t-green-500"
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Ahorra hasta 35%",
      description: "En costos de envío con nuestros planes especiales",
    },
    {
      icon: Clock,
      title: "Entregas Garantizadas",
      description: "Todas tus entregas realizadas en tiempo y forma",
    },
    {
      icon: Zap,
      title: "Crecimiento Acelerado",
      description: "Impulsa tus ventas con envíos profesionales y confiables",
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
    <section className="py-20 px-4 bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 mb-6 px-6 py-3 text-base font-semibold rounded-full">
            <TrendingUp className="w-5 h-5 mr-2" />
            Especial para Emprendedores
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Soluciones Especiales para Emprendedores
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Diseñamos servicios específicos para ayudar a crecer tu negocio online. Desde tarifas preferenciales hasta integración con plataformas de venta.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
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
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                className="h-full"
              >
                <Card
                  className={`group transition-all duration-300 bg-white/80 backdrop-blur-sm border-t-4 ${solution.borderColor}`}
                >
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{solution.title}</h3>
                    <p className="text-gray-600 mb-6 text-center leading-relaxed">{solution.description}</p>

                    <ul className="space-y-3 mb-8">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold transform hover:scale-105 transition-transform duration-200">
                      <Link href={solution.link}>Conocer Más</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por Qué Elegir Nuestras Soluciones para Emprendedores?
            </h3>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            ¿Por Qué Elegir Nuestras Soluciones para Emprendedores?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                  <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">¿Listo para Hacer Crecer tu Negocio?</h4>
              <p className="text-blue-100 mb-6">
                Únete a cientos de emprendedores que ya optimizaron sus envíos con nosotros
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold transition-colors duration-200">
                  <Link href="/servicios/plan-emprendedores">Ver Plan Emprendedores</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 transition-colors duration-200">
                  <Link href="/contacto">Consultar Ahora</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Emprendedores Activos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
            <div className="text-gray-600">Ahorro Promedio</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfacción</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Soporte Dedicado</div>
          </div>
        </div>
      </div>
    </section>
  )
}
