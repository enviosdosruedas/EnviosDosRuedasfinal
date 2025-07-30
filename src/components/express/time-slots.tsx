import { Card, CardContent } from "@/components/ui/card"
import { Clock, Zap, Calendar } from "lucide-react"

export function TimeSlots() {
  const timeSlots = [
    {
      icon: Zap,
      title: "Express Inmediato",
      time: "30-60 minutos",
      description: "Para emergencias y documentos",
      price: "Desde $3,500",
      features: ["Máxima prioridad", "Seguimiento en vivo", "Confirmación inmediata"],
    },
    {
      icon: Clock,
      title: "Express Mañana",
      time: "9:00 - 13:00",
      description: "Entrega garantizada en horario matutino",
      price: "Desde $2,800",
      features: ["Horario comercial", "Ideal para oficinas", "Seguimiento completo"],
    },
    {
      icon: Calendar,
      title: "Express Tarde",
      time: "14:00 - 18:00",
      description: "Perfecto para entregas de tarde",
      price: "Desde $2,800",
      features: ["Horario extendido", "Entregas residenciales", "Flexibilidad horaria"],
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Opciones de Horarios Express</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el horario que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {timeSlots.map((slot, index) => {
            const IconComponent = slot.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{slot.title}</h3>
                  <div className="text-2xl font-bold text-red-600 mb-2">{slot.time}</div>
                  <p className="text-gray-600 mb-4">{slot.description}</p>
                  <div className="text-lg font-semibold text-blue-600 mb-4">{slot.price}</div>
                  <ul className="space-y-2">
                    {slot.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
