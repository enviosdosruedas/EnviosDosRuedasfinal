import { Card, CardContent } from "@/components/ui/card"
import { UtensilsCrossed, Store, Building, Package } from "lucide-react"

export function IdealClients() {
  const clientTypes = [
    {
      icon: UtensilsCrossed,
      title: "Restaurantes",
      description: "Delivery constante con horarios específicos y necesidad de rapidez y calidad en el servicio.",
      benefits: ["Entregas en caliente", "Horarios de almuerzo y cena", "Conocimiento de rutas rápidas"],
    },
    {
      icon: Store,
      title: "Comercios",
      description: "Tiendas con envíos regulares a clientes frecuentes que requieren un servicio personalizado.",
      benefits: ["Clientes habituales", "Horarios comerciales", "Entregas programadas"],
    },
    {
      icon: Building,
      title: "Empresas",
      description: "Compañías con necesidades logísticas regulares entre oficinas o con clientes corporativos.",
      benefits: ["Documentación urgente", "Entregas corporativas", "Horarios de oficina"],
    },
    {
      icon: Package,
      title: "E-commerce",
      description: "Tiendas online con alto volumen de pedidos que necesitan optimizar sus entregas diarias.",
      benefits: ["Alto volumen", "Entregas programadas", "Seguimiento detallado"],
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Para Quién es Ideal?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            El servicio de Moto Fija está diseñado para negocios con necesidades específicas de delivery
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {clientTypes.map((client, index) => {
            const IconComponent = client.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{client.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{client.description}</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <h4 className="font-semibold text-gray-700 mb-2">Beneficios específicos:</h4>
                    <ul className="space-y-1">
                      {client.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
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
