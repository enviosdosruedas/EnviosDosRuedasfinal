import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Registrate",
      description: "Completa el formulario de registro y valida tu cuenta de MercadoLibre.",
    },
    {
      step: "2",
      title: "Configura",
      description: "Configura tu cuenta para que funcione con Envios Flex según la distancia de entregas que prefieras.",
    },
    {
      step: "3",
      title: "Vende",
      description: "Publica tus productos con la opción de Envios Flex habilitada.",
    },
    {
      step: "4",
      title: "Nosotros Entregamos",
      description: "Recibimos la orden y entregamos en el día o al día siguiente según el horario.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 mb-6 px-4 py-2 text-sm font-medium">
            Proceso Simple
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Cómo Funciona?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En solo 4 pasos simples estarás vendiendo con Envios Flex y mejorando tu reputación en MercadoLibre
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
