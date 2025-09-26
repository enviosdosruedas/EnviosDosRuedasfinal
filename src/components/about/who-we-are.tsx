import { Star } from "lucide-react"

export function WhoWeAre() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 font-display">QuiÃ©nes Somos</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              Envios DosRuedas es tu aliado confiable en mensajerÃ­a y delivery en Mar del Plata.
            </p>

            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-1 mr-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">4.9 estrellas en Google Reviews</span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Mantenemos una calificaciÃ³n de 4.9 estrellas en Google Reviews gracias a la confianza de nuestros
              clientes. Nos dedicamos a brindar soluciones rÃ¡pidas, seguras y econÃ³micas para todas tus necesidades de
              envÃ­o.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
