
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function VisionSection() {
  const images = [
    "/Emprendedoresbanner.webp",
    "/Emprendedoresbannerrapidas.webp",
    "/Emprendedoresbannerrapidas2.webp",
    "/Emprendedoresbannerrapidas3.webp",
  ];

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[70vh] px-4 py-16 overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-20">
        <div className="flex h-full items-center relative overflow-hidden">
          <div className="flex-shrink-0 flex gap-4 animate-h-scroll">
            {[...images, ...images, ...images].map((src, index) => (
              <Image
                key={`row1-${index}`}
                src={src}
                alt={`Imagen de servicio de fondo ${index + 1}`}
                width={400}
                height={300}
                className="h-[150px] md:h-[200px] w-auto rounded-lg object-cover"
                unoptimized
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-0" />
      
      <motion.div 
        className="relative z-10 flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <h2 className="font-bold text-secondary text-4xl md:text-5xl lg:text-6xl">
          Nuestra Visión Global
        </h2>
        <p className="text-primary-foreground/90 text-lg md:text-xl lg:text-2xl max-w-2xl">
          Datos que respaldan nuestra calidad y compromiso. ¡Descubre por qué somos la solución confiable para tus envíos!
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
           <Button asChild variant="secondary" size="lg" className="font-bold">
            <Link href="/nosotros/sobre-nosotros">
              Conocé más
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
