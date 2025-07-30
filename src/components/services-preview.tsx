import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, Shield, MapPin } from "lucide-react"

export function ServicesPreview() {
  const services = [
    {
      icon: Truck,
      title: "Delivery Rápido",
      description: "Entregas en el día para Mar del Plata y alrededores",
    },
    {
      icon: Clock,
      title: "Disponibilidad 24/7",
      description: "Servicio disponible todos los días del año",
    },
    {
      icon: Shield,
      title: "Envíos Seguros",
      description: "Garantía total en todos nuestros servicios",
    },
    {
      icon: MapPin,
      title: "Cobertura Total",
      description: "Llegamos a toda la zona de Mar del Plata",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/80">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
