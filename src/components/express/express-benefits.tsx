import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, MapPin, Phone, Clock, Award } from "lucide-react"

export function ExpressBenefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Velocidad Máxima",
      description: "Entregas en el mismo día con la mayor rapidez posible, priorizando tus envíos.",
    },
    {
      icon: MapPin,
      title: "Seguimiento en Tiempo Real",
      description: "Monitorea tu envío en vivo desde la recolección hasta la entrega final.",
    },
    {
      icon: Phone,
      title: "Soporte Prioritario",
      description: "Línea directa de atención para clientes express con respuesta inmediata.",
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Elige el rango horario que mejor se adapte a tu agenda y necesidades.",
    },
    {
      icon: Award,
      title: "Garantía de Entrega",
      description: "Tu envió será entregado en tiempo y forma.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Por Qué Elegir Express?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre todas las ventajas de nuestro servicio premium de entregas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
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
