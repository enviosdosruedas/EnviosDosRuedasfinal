import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, TrendingUp, Award } from "lucide-react"

export function CompanyStory() {
  const milestones = [
    {
      icon: Calendar,
      year: "2020",
      title: "Nuestros Inicios",
      description: "Comenzamos como un pequeño servicio de mensajería local con una sola moto y mucha pasión.",
    },
    {
      icon: TrendingUp,
      year: "2021",
      title: "Crecimiento",
      description: "Expandimos nuestra flota y comenzamos a ofrecer servicios especializados para emprendedores.",
    },
    {
      icon: Award,
      year: "2022",
      title: "Reconocimiento",
      description: "Alcanzamos las 4.9 estrellas en Google Reviews y nos convertimos en referentes locales.",
    },
    {
      icon: MapPin,
      year: "2024",
      title: "Expansión",
      description: "Hoy cubrimos toda Mar del Plata y localidades cercanas con un equipo de profesionales.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desde nuestros humildes comienzos hasta convertirnos en la empresa de confianza en Mar del Plata
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-2xl font-bold text-yellow-500">{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
