import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Lightbulb } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mission */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-display">Nuestra MisiÃ³n</h3>
              <p className="text-muted-foreground leading-relaxed">
                Conectar personas y negocios en Mar del Plata a travÃ©s de un servicio de mensajerÃ­a y delivery
                confiable, rÃ¡pido y accesible, contribuyendo al crecimiento de nuestra comunidad local.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-display">Nuestra VisiÃ³n</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser la empresa lÃ­der en servicios de mensajerÃ­a y delivery en la regiÃ³n, reconocida por nuestra
                excelencia, innovaciÃ³n y compromiso con la satisfacciÃ³n del cliente.
              </p>
            </CardContent>
          </Card>

          {/* Innovation */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-display">InnovaciÃ³n</h3>
              <p className="text-muted-foreground leading-relaxed">
                Incorporamos constantemente nuevas tecnologÃ­as y metodologÃ­as para mejorar nuestros servicios y ofrecer
                soluciones cada vez mÃ¡s eficientes a nuestros clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
