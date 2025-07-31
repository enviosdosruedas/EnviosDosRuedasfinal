
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function VisionSection() {
  const images = [
    "/Emprendedoresbanner.webp",
    "/Emprendedoresbannerrapidas.webp",
    "/Emprendedoresbannerrapidas2.webp",
    "/Emprendedoresbannerrapidas3.webp",
  ];

  return (
    <section className="relative hero-vision flex flex-col justify-center items-center h-screen px-4 gap-6 overflow-hidden">
      <div className="wrap-images">
        <div className="row-images">
          {[...images, ...images].map((src, index) => (
            <Image
              key={`row1-${index}`}
              src={src}
              alt={`Imagen de servicio ${index + 1}`}
              width={400}
              height={300}
              className="h-[150px] md:h-[200px] w-auto rounded-lg opacity-80 object-cover"
              unoptimized
            />
          ))}
        </div>
      </div>
      <motion.div 
        className="wrap-content z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h2 className="main-title-vision text-2xl md:text-4xl lg:text-5xl font-normal text-center leading-tight">
        Nuestra Visi&#243;n Global
        </h2>
        <p className="description-hero-vision text-lg md:text-xl lg:text-2xl text-center max-w-2xl">
        Datos que respaldan nuestra calidad y compromiso. &#161;Descubre por qu&#233; somos la soluci&#243;n confiable para tus env&#237;os!
        </p>
        <Link href="/nosotros/sobre-nosotros" className="btn-primary-vision">
          Conoc&#233; m&#225;s
        </Link>
      </motion.div>
    </section>
  );
}
