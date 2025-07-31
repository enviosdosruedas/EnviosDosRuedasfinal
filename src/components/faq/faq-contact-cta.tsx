import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Mail } from "lucide-react"

export function FaqContactCta() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">¿No encontraste lo que buscabas?</h2>
            <p className="text-lg mb-8 text-primary-foreground/80">
              Nuestro equipo está listo para ayudarte con cualquier consulta específica sobre nuestros servicios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <a
                  href="https://wa.me/5492236602699?text=Hola, tengo una consulta que no encontré en las FAQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <a href="tel:+542236602699">
                  <Phone className="w-5 h-5 mr-2" />
                  223-660-2699
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/contacto">
                  <Mail className="w-5 h-5 mr-2" />
                  Contacto
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
