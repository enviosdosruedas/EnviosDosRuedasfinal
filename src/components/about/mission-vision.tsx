import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Lightbulb } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mission */}
          <Card className="hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Nuestra Misión</h3>
              <p className="text-muted-foreground leading-relaxed">
                Conectar personas y negocios en Mar del Plata a través de un servicio de mensajería y delivery
                confiable, rápido y accesible, contribuyendo al crecimiento de nuestra comunidad local.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Nuestra Visión</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser la empresa líder en servicios de mensajería y delivery en la región, reconocida por nuestra
                excelencia, innovación y compromiso con la satisfacción del cliente.
              </p>
            </CardContent>
          </Card>

          {/* Innovation */}
          <Card className="hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">Innovación</h3>
              <p className="text-muted-foreground leading-relaxed">
                Incorporamos constantemente nuevas tecnologías y metodologías para mejorar nuestros servicios y ofrecer
                soluciones cada vez más eficientes a nuestros clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
