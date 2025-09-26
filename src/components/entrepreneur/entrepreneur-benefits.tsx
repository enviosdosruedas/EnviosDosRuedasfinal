import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Clock, Users, Shield, Zap } from "lucide-react"

export function EntrepreneurBenefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Impulsa tus Ventas",
      description: "Ofrece envíos profesionales que generen confianza en tus clientes y aumenten tus conversiones.",
    },
    {
      icon: DollarSign,
      title: "Tarifas Preferenciales",
      description: "Accedes a Tarifas LowCost con elección de rango horario.",
    },
    {
      icon: Clock,
      title: "Flexibilidad Horaria",
      description: "Elige entre franjas de mañana o tarde según las necesidades de tus clientes.",
    },
    {
      icon: Users,
      title: "Comunicación Clara",
      description: "Comunica de manera transparente tus tarifas fijas de envío a tus clientes.",
    },
    {
      icon: Shield,
      title: "Envíos Confiables",
      description: "Todos los envíos incluyen seguimiento en tiempo real para mayor tranquilidad.",
    },
    {
      icon: Zap,
      title: "Proceso Simplificado",
      description: "Sistema optimizado para procesar múltiples envíos de manera rápida y eficiente.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">Beneficios del Plan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre todas las ventajas diseñadas específicamente para hacer crecer tu negocio online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
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
