import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

export function Requirements() {
  const requirements = [
    "Ser vendedor activo en MercadoLibre",
    "Tener reputación Amarilla o superior",
    "Productos ubicados en Mar del Plata",
    "Productos que cumplan con las políticas de ML",
  ]

  const restrictions = [
    "No productos frágiles",
    "Peso máximo 25kg por paquete",
    "Dimensiones máximas: 60x60x40cm",
    "No productos prohibidos por MercadoLibre",
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Requisitos y Restricciones</h2>
          <p className="text-lg text-gray-600">
            Asegúrate de cumplir con estos requisitos para poder acceder a Envios Flex
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Requirements */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Requisitos
              </h3>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Restrictions */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Restricciones
              </h3>
              <ul className="space-y-4">
                {restrictions.map((restriction, index) => (
                  <li key={index} className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{restriction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
