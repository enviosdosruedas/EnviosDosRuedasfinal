import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function SuccessStories() {
  const testimonials = [
    {
      name: "María González",
      business: "Tienda de Ropa Online",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "Desde que uso el Plan Emprendedor, mis ventas aumentaron un 40%. Los clientes confían más en mi tienda porque saben que sus pedidos llegarán rápido y seguro.",
      results: "40% aumento en ventas",
    },
    {
      name: "Carlos Rodríguez",
      business: "Productos Artesanales",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "La flexibilidad horaria me permite coordinar mejor con mis clientes. El soporte es excelente y siempre resuelven mis consultas rápidamente.",
      results: "95% satisfacción del cliente",
    },
    {
      name: "Ana Martínez",
      business: "Cosmética Natural",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      testimonial:
        "Las tarifas preferenciales me permiten ofrecer envío gratis a mis clientes sin afectar mis márgenes. Es una ventaja competitiva importante.",
      results: "30% más pedidos",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Historias de Éxito</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce cómo otros emprendedores han hecho crecer sus negocios con nuestro Plan Emprendedor
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Foto</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-blue-200 mb-3" />
                <p className="text-gray-700 mb-4 leading-relaxed italic">"{testimonial.testimonial}"</p>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-blue-800">Resultado: {testimonial.results}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
