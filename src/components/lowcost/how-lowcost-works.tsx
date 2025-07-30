import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HowLowcostWorks() {
  const steps = [
    {
      step: "1",
      title: "Solicita tu Envío",
      description: "Completa el formulario con los detalles de tu envío y elige la fecha de entrega.",
    },
    {
      step: "2",
      title: "Programamos la Ruta",
      description: "Agrupamos tu envío con otros en la misma zona para optimizar costos.",
    },
    {
      step: "3",
      title: "Recolectamos",
      description: "Pasamos a buscar tu paquete en el horario acordado, sin costo adicional.",
    },
    {
      step: "4",
      title: "Entregamos",
      description: "Entrega en el día solicitando antes de 13hs",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="bg-blue-600 text-white hover:bg-blue-700 mb-6 px-4 py-2 text-sm font-medium">
            Proceso Optimizado
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Cómo Funciona Low Cost?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestro proceso optimizado te permite ahorrar dinero sin complicaciones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
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
