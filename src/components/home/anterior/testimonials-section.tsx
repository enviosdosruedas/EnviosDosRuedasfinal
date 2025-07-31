
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "María González",
      business: "Tienda Online",
      rating: 5,
      text: "Excelente servicio. Siempre puntuales y muy profesionales. Mis clientes están muy contentos con las entregas.",
      image: "https://placehold.co/80x80.png",
      aiHint: "woman smiling"
    },
    {
      name: "Carlos Rodríguez",
      business: "Restaurante",
      rating: 5,
      text: "Usamos el servicio de moto fija y es increíble. Nuestro repartidor conoce perfectamente nuestras rutas.",
      image: "https://placehold.co/80x80.png",
      aiHint: "man friendly"
    },
    {
      name: "Ana Martínez",
      business: "Farmacia",
      rating: 5,
      text: "Para envíos de medicamentos, no hay mejor opción. Rápidos, seguros y confiables.",
      image: "https://placehold.co/80x80.png",
      aiHint: "professional person"
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-muted-foreground font-sans">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="relative">
          <Card className="bg-gradient-to-r from-blue-50 to-yellow-50 border-0 shadow-xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-secondary/50 mb-6 mx-auto" />

              <div className="text-center min-h-[200px] md:min-h-[150px] flex flex-col justify-center">
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic font-sans">
                  "{testimonials[currentTestimonial].text}"
                </p>
              </div>

              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
                ))}
              </div>

              <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Image
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  data-ai-hint={testimonials[currentTestimonial].aiHint}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold font-heading text-foreground text-center sm:text-left">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-muted-foreground text-center sm:text-left font-sans">{testimonials[currentTestimonial].business}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-card shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-secondary scale-125" : "bg-muted hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
