
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

  const duplicatedImages = [...images, ...images];

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
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28 flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-center gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-5xl overflow-hidden group"
        >
          <div className="flex animate-h-scroll group-hover:[animation-play-state:paused] w-max">
            {duplicatedImages.map((src, index) => (
              <div key={index} className="w-[clamp(250px,40vw,350px)] flex-shrink-0 p-3">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={src}
                    alt={`Banner de emprendedores ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center font-heading"
        >
          Nuestra <span className="text-secondary">Visión Global</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl text-center font-sans"
        >
          Datos que respaldan nuestra calidad y compromiso. ¡Descubre por qué
          somos la solución confiable para tus envíos!
        </motion.p>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Button asChild size="lg" variant="secondary" className="font-bold px-8 py-3 text-base rounded-full">
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
