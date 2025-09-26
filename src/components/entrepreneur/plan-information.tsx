import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Settings, List, CheckCircle } from "lucide-react"

export function PlanInformation() {
  const planDetails = [
    {
      icon: Clock,
      title: "Horarios",
      items: ["Lunes a Viernes de 9:00 a 19:00 hrs.", "Sábados de 10:00 a 15:00 hrs."],
    },
    {
      icon: Settings,
      title: "¿Cómo Funciona?",
      items: ["Elige tu franja de entrega: mañana (9-13hrs) o tarde (15-19hrs)"],
    },
    {
      icon: List,
      title: "Requisitos",
      items: [
        "Ser vendedor online activo",
        "Tener un mínimo de envíos semanales",
        "Mínimo de 6 envíos semanales (Lunes a Sábado)",
      ],
    },
  ]

  return (
    <section className="py-16 px-4 bg-white font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 mb-6 px-4 py-2 text-sm font-medium">
            Información Importante
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 font-display">Plan Emprendedores</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {planDetails.map((detail, index) => {
            const IconComponent = detail.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">{detail.title}</h3>
                  <div className="space-y-3">
                    {detail.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start text-left">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-600 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
