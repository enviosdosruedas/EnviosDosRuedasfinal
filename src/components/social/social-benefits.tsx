import { Card, CardContent } from "@/components/ui/card"
import { Gift, Bell, Users, Zap } from "lucide-react"

export function SocialBenefits() {
  const benefits = [
    {
      icon: Gift,
      title: "Ofertas Exclusivas",
      description: "Accede a descuentos y promociones especiales solo para nuestros seguidores en redes sociales.",
    },
    {
      icon: Bell,
      title: "Actualizaciones Inmediatas",
      description: "Sé el primero en conocer nuevos servicios, cambios de horarios y noticias importantes.",
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Únete a nuestra comunidad de clientes y comparte experiencias con otros usuarios.",
    },
    {
      icon: Zap,
      title: "Soporte Rápido",
      description: "Obtén respuestas rápidas a tus consultas a través de nuestras redes sociales.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Beneficios de Seguirnos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre todas las ventajas de formar parte de nuestra comunidad en redes sociales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-600" />
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
