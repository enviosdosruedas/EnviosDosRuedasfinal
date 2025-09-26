import { Button } from "@/components/ui/button"
import { DollarSign, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"

export function LowcostContent() {
  const features = [
    {
      icon: DollarSign,
      title: "Precios Económicos",
      description: "La opción más conveniente para envíos no prioritarios.",
    },
    {
      icon: Calendar,
      title: "Envíos Programados",
      description: "Planifica tus entregas con anticipación y ahorra dinero.",
    },
    {
      icon: BarChart3,
      title: "Rutas Optimizadas",
      description: "Agrupamos envíos para ofrecerte tarifas más bajas.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white font-sans">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Large Branding */}
          <div className="flex justify-center lg:justify-start">
            <div className="text-center lg:text-left font-display">
              <div className="space-y-2">
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text">
                  ENVIOS
                </div>
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800">DOS RUEDAS</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 font-display">Mensajería y Envíos Low Cost</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            ¿No tenés apuro? Ahorrá en tus envíos con nuestro servicio de mensajería low cost. Programamos tus entregas en rutas optimizadas para ofrecerte el mejor precio sin sacrificar la seguridad y confiabilidad.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2 font-display">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3"
            >
              <Link href="/cotizar/lowcost">Cotizar Envío Low Cost</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
