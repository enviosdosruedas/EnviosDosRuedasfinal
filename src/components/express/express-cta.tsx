"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Calculator } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ExpressCta() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699"
    const message = "Necesito un envío express prioritario. ¿Pueden ayudarme?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 px-4 bg-red-600">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-white">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">¿Necesitas un Envío?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-sans">
            No esperes más. Nuestro equipo está listo para manejar tu envío express y garantizar que llegue a tiempo. ¡Cada minuto cuenta!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold font-sans">
                <Link href="/cotizar/express">
                  <Zap className="w-5 h-5 mr-2" />
                  Cotizar Express Ahora
                </Link>
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold font-sans"
              >
                <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={20} height={20} className="w-5 h-5 mr-2" />
                WhatsApp Prioritario
              </Button>
            </div>

          
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
