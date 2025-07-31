
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function VisionSection() {
  const images = [
    "/Emprendedoresbanner.webp",
    "/Emprendedoresbannerrapidas.webp",
    "/Emprendedoresbannerrapidas2.webp",
    "/Emprendedoresbannerrapidas3.webp",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="relative flex h-[80vh] flex-col items-center justify-center overflow-hidden bg-primary px-4 py-16">
        {/* Animated background images */}
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
                  className="h-[150px] w-auto rounded-lg object-cover md:h-[200px]"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/50" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl"
          >
            Nuestra <span className="text-yellow-400">Visión Global</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg text-primary-foreground/90 md:text-xl lg:text-2xl"
          >
            Datos que respaldan nuestra calidad y compromiso. ¡Descubre por qué
            somos la solución confiable para tus envíos!
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="bg-yellow-400 font-bold text-primary-foreground hover:bg-yellow-500">
              <Link href="/nosotros/sobre-nosotros">
                Conocé más
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
      <style jsx global>{`
        @keyframes h-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-h-scroll {
          animation: h-scroll 45s linear infinite;
        }
      `}</style>
    </>
  );
}
