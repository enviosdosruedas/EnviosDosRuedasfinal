"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    name: 'María González',
    business: 'Tienda de Ropa "EstiloUrbano"',
    rating: 5,
    text: 'Excelente servicio. Siempre puntuales y muy profesionales. Mis clientes están muy contentos con las entregas y eso suma muchísimo a mi negocio.',
    image: 'https://placehold.co/80x80.png',
  },
  {
    name: 'Carlos Rodríguez',
    business: 'Emprendimiento Gastronómico',
    rating: 5,
    text: 'La solución perfecta para mi delivery. La opción "Moto Fija" me da la tranquilidad de tener un repartidor de confianza. ¡Totalmente recomendados!',
    image: 'https://placehold.co/80x80.png',
  },
  {
    name: 'Ana Fernandez',
    business: 'Vendedora en MercadoLibre',
    rating: 4,
    text: 'Muy buen servicio Flex. Cumplen con los tiempos y la plataforma para gestionar los envíos es muy clara. Solo mejoraría la comunicación a veces.',
    image: 'https://placehold.co/80x80.png',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const cardVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.8
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0,
      scale: 0.8
    },
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lo que Dicen Nuestros Clientes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 rounded-full h-12 w-12 hidden md:flex"
            onClick={handlePrev}
          >
            <ChevronLeft />
          </Button>

          <div className="w-full h-[320px] relative overflow-hidden">
            <AnimatePresence initial={false} custom={currentIndex}>
                <motion.div
                    key={currentIndex}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute w-full h-full"
                >
                    <Card className="h-full flex flex-col justify-center text-center shadow-lg p-6 md:p-8">
                        <CardHeader className="items-center pb-4">
                            <Image
                                src={currentTestimonial.image}
                                alt={`Foto de ${currentTestimonial.name}`}
                                width={80}
                                height={80}
                                className="rounded-full mb-4 border-4 border-gray-100"
                            />
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                    key={i}
                                    className={cn(
                                        "w-5 h-5",
                                        i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    )}
                                    />
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-lg italic text-gray-700">"{currentTestimonial.text}"</p>
                            <p className="mt-4 font-bold text-gray-900">{currentTestimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{currentTestimonial.business}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-10 rounded-full h-12 w-12 hidden md:flex"
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full bg-gray-300 transition-all duration-300",
                currentIndex === index ? "w-6 bg-primary" : "hover:bg-gray-400"
              )}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
