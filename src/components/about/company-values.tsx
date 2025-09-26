import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, Shield, Users } from "lucide-react"

export function CompanyValues() {
  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Nos comprometemos con cada envÃ­o como si fuera nuestro, garantizando el mejor servicio posible.",
    },
    {
      icon: Zap,
      title: "Rapidez",
      description: "Entendemos que el tiempo es valioso, por eso optimizamos cada ruta para entregas mÃ¡s rÃ¡pidas.",
    },
    {
      icon: Shield,
      title: "Confiabilidad",
      description: "Tu tranquilidad es nuestra prioridad. Cada paquete estÃ¡  monitoreado en tiempo real.",
    },
    {
      icon: Users,
      title: "CercanÃ­a",
      description: "Somos una empresa local que entiende las necesidades especÃ­ficas de Mar del Plata y su gente.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">Nuestros Valores</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los principios que guÃ­an nuestro trabajo diario y nos permiten brindar un servicio excepcional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-display">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
