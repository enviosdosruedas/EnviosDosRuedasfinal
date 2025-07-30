import { Card, CardContent } from "@/components/ui/card"
import { FileText, Heart, Briefcase, Gift } from "lucide-react"

export function UrgentScenarios() {
  const scenarios = [
    {
      icon: FileText,
      title: "Documentos",
      description: "Contratos, documentos legales, certificados que no pueden esperar.",
      examples: ["Documentos notariales", "Contratos comerciales", "Certificados médicos"],
    },
    {
      icon: Heart,
      title: "Emergencias Médicas",
      description: "Medicamentos, análisis médicos y suministros de salud con prioridad de entrega.",
      examples: ["Medicamentos especiales", "Resultados de laboratorio", "Suministros médicos"],
    },
    {
      icon: Briefcase,
      title: "Negocios Críticos",
      description: "Entregas comerciales que no pueden retrasarse sin afectar operaciones.",
      examples: ["Repuestos", "Muestras comerciales", "Productos perecederos"],
    },
    {
      icon: Gift,
      title: "Ocasiones Especiales",
      description: "Regalos y sorpresas que deben llegar en un rango horario acotado",
      examples: ["Regalos de cumpleaños", "Desayunos/Meriendas", "Comida especial"],
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Cuándo Necesitas Express?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Situaciones donde cada minuto cuenta y la rapidez es fundamental
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {scenarios.map((scenario, index) => {
            const IconComponent = scenario.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{scenario.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{scenario.description}</p>
                    </div>
                  </div>
                  <div className="ml-16">
                    <h4 className="font-semibold text-gray-700 mb-2">Ejemplos comunes:</h4>
                    <ul className="space-y-1">
                      {scenario.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                          {example}
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
