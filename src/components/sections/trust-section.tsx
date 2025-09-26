
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, PackageCheck, Smile, Award, Leaf, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Pérez",
    avatar: "AP",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait",
    quote: "¡Servicio increíblemente rápido y confiable! Siempre a tiempo y con una sonrisa. Los recomiendo totalmente.",
    rating: 5,
  },
  {
    name: "Carlos López",
    avatar: "CL",
    image: "https://placehold.co/100x100.png",
    imageHint: "man portrait",
    quote: "La mejor opción para envíos en la ciudad. Muy profesionales y cuidadosos con los paquetes.",
    rating: 5,
  },
  {
    name: "Laura Gómez",
    avatar: "LG",
    image: "https://placehold.co/100x100.png",
    imageHint: "person smiling",
    quote: "Excelente atención al cliente y mis paquetes siempre llegan en perfecto estado. ¡Gracias Envios DosRuedas!",
    rating: 4,
  },
];

const stats = [
  { icon: <PackageCheck className="h-8 w-8 text-primary" />, value: "5,000+", label: "Entregas Exitosas" },
  { icon: <Smile className="h-8 w-8 text-primary" />, value: "98%", label: "Clientes Satisfechos" },
  { icon: <Award className="h-8 w-8 text-primary" />, value: "5+", label: "Años de Experiencia" },
  { icon: <Leaf className="h-8 w-8 text-primary" />, value: "100%", label: "Envíos Ecológicos" },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Nuestros Clientes Confían en Nosotros</h2>
          <p className="text-lg text-muted-foreground mt-2">Descubre por qué somos la opción preferida para envíos.</p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground/80">Testimonios Reales</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <div className="flex items-center mt-1">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground flex-grow relative pt-0">
                  <Quote className="absolute top-0 left-0 h-8 w-8 text-primary/20 transform -translate-x-2 -translate-y-2" />
                  <p className="italic relative z-10">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground/80">Nuestros Logros en Números</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
