import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"

export function EnviosFlexCta() {
  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ¿Listo para Potenciar tus Ventas en MercadoLibre?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a los vendedores que ya confían en nosotros para sus envíos Flex. Mejora tu reputación y aumenta tus
              ventas hoy mismo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                <ArrowRight className="w-5 h-5 mr-2" />
                Registrarme Ahora
              </Button>
              <Button variant="outline" size="lg">
                Ver Tarifas
              </Button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">¿Necesitas más información? Contáctanos:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={16} height={16} className="w-4 h-4 mr-2" />
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
