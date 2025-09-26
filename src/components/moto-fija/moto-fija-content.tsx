
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export function MotoFijaContent() {
  const benefits = [
    "Repartidor dedicado y familiarizado con tus necesidades.",
    "Horarios flexibles adaptados a tu operatoria.",
    "Mayor eficiencia en rutas conocidas.",
    "Comunicación directa y ágil.",
    "Ideal para envíos recurrentes y programados.",
  ]

  return (
    <section className="py-16 px-4 bg-white font-sans">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 font-display">
              Servicio de Moto Fija
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Optimiza tus entregas regulares con nuestro servicio de delivery con moto fija. Asignamos un repartidor
              exclusivo para tu negocio, garantizando puntualidad, conocimiento de tus rutas y un servicio
              personalizado. Ideal para restaurantes, comercios y empresas con envíos frecuentes.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3"
            >
              <Link href="/contacto">Consultar por Moto Fija</Link>
            </Button>
          </div>

          {/* Right Content - Large Branding */}
          <div className="flex justify-center lg:justify-end">
            <div className="text-center lg:text-right">
              <div className="space-y-2 font-display">
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text">
                  ENVIOS
                </div>
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800">DOS RUEDAS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
