import { Card, CardContent } from "@/components/ui/card"
import { User, Clock, Route, MessageCircle, Calendar, Shield } from "lucide-react"

export function ServiceFeatures() {
  const features = [
    {
      icon: User,
      title: "Repartidor Dedicado",
      description: "Un profesional asignado exclusivamente a tu negocio que conoce tus procesos y necesidades.",
    },
    {
      icon: Clock,
      title: "Horarios Personalizados",
      description: "Adaptamos los horarios de trabajo a tu operatoria y picos de demanda específicos.",
    },
    {
      icon: Route,
      title: "Rutas Optimizadas",
      description: "Mayor eficiencia al conocer perfectamente tus rutas habituales y zonas de entrega.",
    },
    {
      icon: MessageCircle,
      title: "Comunicación Directa",
      description: "Línea directa con tu repartidor para coordinación inmediata y resolución de incidencias.",
    },
    {
      icon: Calendar,
      title: "Planificación Avanzada",
      description: "Programa entregas recurrentes y gestiona tu logística con anticipación.",
    },
    {
      icon: Shield,
      title: "Servicio Garantizado",
      description: "Respaldo completo con seguro, seguimiento y reemplazo inmediato en caso necesario.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">Características del Servicio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
            Descubre todas las ventajas de tener un servicio de delivery dedicado para tu negocio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 font-display">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-sans">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
