import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, Shield, Users } from "lucide-react"

export function CompanyValues() {
  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Nos comprometemos con cada envío como si fuera nuestro, garantizando el mejor servicio posible.",
    },
    {
      icon: Zap,
      title: "Rapidez",
      description: "Entendemos que el tiempo es valioso, por eso optimizamos cada ruta para entregas más rápidas.",
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Tu tranquilidad es nuestra prioridad. Cada paquete está  monitoreado en tiempo real.",
    },
    {
      icon: Users,
      title: "Cercanía",
      description: "Somos una empresa local que entiende las necesidades específicas de Mar del Plata y su gente.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Los principios que guían nuestro trabajo diario y nos permiten brindar un servicio excepcional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
