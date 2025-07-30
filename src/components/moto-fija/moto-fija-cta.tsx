import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MotoFijaCta() {
  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Listo para Optimizar tus Entregas?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contáctanos para una consulta personalizada y descubre cómo el servicio de Moto Fija puede transformar la
              logística de tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                <Link href="/contacto">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Consulta
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Solicitar Cotización
              </Button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4">¿Necesitas más información? Estamos aquí para ayudarte:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={16} height={16} className="w-4 h-4 mr-2" />
                  WhatsApp: 223-660-2699
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Ahora
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
