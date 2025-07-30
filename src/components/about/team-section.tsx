import { Card, CardContent } from "@/components/ui/card"
import { User, Bike, Headphones, Settings } from "lucide-react"

export function TeamSection() {
  const teamRoles = [
    {
      icon: User,
      title: "Equipo Directivo",
      description: "Liderazgo comprometido con la excelencia en el servicio y la satisfacción del cliente.",
      count: "3",
    },
    {
      icon: Bike,
      title: "Repartidores",
      description: "Profesionales capacitados que conocen cada rincón de Mar del Plata para entregas eficientes.",
      count: "15+",
    },
    {
      icon: Headphones,
      title: "Atención al Cliente",
      description: "Equipo dedicado a resolver consultas y brindar soporte personalizado las 24 horas.",
      count: "5",
    },
    {
      icon: Settings,
      title: "Soporte Técnico",
      description: "Especialistas en logística y tecnología que optimizan nuestros procesos continuamente.",
      count: "4",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nuestro Equipo</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un equipo de profesionales apasionados por brindar el mejor servicio de mensajería y delivery
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamRoles.map((role, index) => {
            const IconComponent = role.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                      {role.count}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{role.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{role.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
