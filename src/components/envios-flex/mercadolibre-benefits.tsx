import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Star, Clock, Shield, Users, Award } from "lucide-react"

export function MercadoLibreBenefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Mejora tu Reputación",
      description: "Cumple con los estándares de MercadoLibre y mejora tu calificación como vendedor.",
    },
    {
      icon: Star,
      title: "Más Ventas",
      description: "Los compradores prefieren vendedores con Envios Flex, aumentando tus oportunidades de venta.",
    },
    {
      icon: Clock,
      title: "Entregas Rápidas",
      description: "Entrega el mismo día para pedidos antes de las 15hs, al día siguiente para el resto.",
    },
    {
      icon: Shield,
      title: "Seguimiento Completo",
      description: "Tracking en tiempo real integrado con la plataforma de MercadoLibre.",
    },
    {
      icon: Users,
      title: "Satisfacción del Cliente",
      description: "Clientes más satisfechos que dejan mejores calificaciones y reseñas.",
    },
    {
      icon: Award,
      title: "Vendedor Premium",
      description: "Accede a beneficios exclusivos de MercadoLibre para vendedores con Envios Flex.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">Beneficios de Envios Flex</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre todas las ventajas de integrar Envios Flex a tu estrategia de ventas en MercadoLibre
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 font-display">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
