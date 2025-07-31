import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function LowcostCta() {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-background">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Listo para Ahorrar en tus Envíos?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtén una cotización personalizada y descubre cuánto puedes ahorrar con nuestro servicio Low Cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                <Link href="/cotizar/lowcost">
                  <Calculator className="w-5 h-5 mr-2" />
                  Cotizar Ahora
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Ver Ejemplos de Precios
              </Button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground mb-4">¿Tienes preguntas sobre nuestros precios? Contáctanos:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={16} height={16} className="w-4 h-4 mr-2" />
                  WhatsApp: 223-660-2699
                </Button>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar para Consultas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
