
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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gray-900 py-20 md:py-24 flex flex-col items-center justify-center">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-center gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
          variants={itemVariants}
        >
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={src}
                alt={`Banner de emprendedores ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
              />
            </div>
          ))}
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-white text-center"
        >
          Nuestra <span className="text-yellow-400">Visión</span> Global
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-300 max-w-2xl text-center"
        >
          Datos que respaldan nuestra calidad y compromiso. ¡Descubre por qué
          somos la solución confiable para tus envíos!
        </motion.p>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-primary-foreground font-bold">
            <Link href="/nosotros/sobre-nosotros">
              Conocé más
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
