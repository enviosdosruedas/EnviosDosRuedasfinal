import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"

export function EntrepreneurCta() {
  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">¿Listo para Hacer Crecer tu Negocio?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-sans">
              Únete a cientos de emprendedores que ya confían en nosotros para sus envíos. Comienza hoy mismo y
              experimenta la diferencia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 font-sans">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="w-5 h-5 mr-2" />
                Solicitar Plan Ahora
              </Button>
              <Button variant="outline" size="lg">
                Calcular Ahorros
              </Button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4 font-sans">¿Tienes preguntas? Contáctanos:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center font-sans">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  <Image src="/icon/icon-whatsapp-verde.svg" alt="WhatsApp Icon" width={16} height={16} className="w-4 h-4 mr-2" />
                  WhatsApp: 223-660-2699
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
