import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import { motoFijaPlans } from "@/lib/motofija"

export function PricingPlans() {
  const plans = motoFijaPlans;

  return (
    <section className="py-16 px-4 bg-gray-50 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-display">Planes y Tarifas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu negocio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-lg transition-shadow duration-300 ${
                plan.popular ? "border-blue-500 border-2" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Más Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 font-display">{plan.name}</CardTitle>
                <div className="text-sm text-gray-500 mb-2">{plan.duration}</div>
                <div className="text-3xl font-bold text-blue-600 my-2 font-display">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {plan.price === "Consultar" ? "Solicitar Cotización" : "Contratar Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
