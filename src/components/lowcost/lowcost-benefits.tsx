import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Route, Shield, Clock, Users, Award } from "lucide-react"

export function LowcostBenefits() {
  const benefits = [
    {
      icon: Wallet,
      title: "Máximo Ahorro",
      description: "Hasta 50% menos que los envíos express, sin comprometer la calidad del servicio.",
    },
    {
      icon: Route,
      title: "Rutas Inteligentes",
      description: "Optimizamos las rutas para reducir costos y tiempos, beneficiándote con mejores precios.",
    },
    {
      icon: Shield,
      title: "Seguridad Garantizada",
      description: "Todos los envíos incluyen seguro y seguimiento, sin importar el precio.",
    },
    {
      icon: Clock,
      title: "Flexibilidad Horaria",
      description: "Programa tus envíos con anticipación y elige el horario que más te convenga.",
    },
    {
      icon: Users,
      title: "Ideal para Negocios",
      description: "Perfecto para e-commerce y negocios que manejan grandes volúmenes de envíos.",
    },
    {
      icon: Award,
      title: "Calidad Comprobada",
      description: "La misma calidad y confiabilidad de siempre, a un precio más accesible.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">¿Por Qué Elegir Low Cost?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Descubre todas las ventajas de nuestro servicio de envíos económicos sin sacrificar calidad
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
                  <p className="text-gray-600 leading-relaxed font-sans">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
