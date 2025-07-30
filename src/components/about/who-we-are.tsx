import { Star } from "lucide-react"

export function WhoWeAre() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-6">Quiénes Somos</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Envios DosRuedas es tu aliado confiable en mensajería y delivery en Mar del Plata.
            </p>

            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-1 mr-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800">4.9 estrellas en Google Reviews</span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Mantenemos una calificación de 4.9 estrellas en Google Reviews gracias a la confianza de nuestros
              clientes. Nos dedicamos a brindar soluciones rápidas, seguras y económicas para todas tus necesidades de
              envío.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
