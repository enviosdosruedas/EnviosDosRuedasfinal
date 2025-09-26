
'use client';

import { HeroSection } from "@/components/ui/HeroSection";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { BusinessHours } from "@/components/contact/business-hours";
import { ContactMap } from "@/components/contact/contact-map";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function ContactPageClient() {
  return (
    <>
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <HeroSection
          title={
            <span className="text-yellow-400">Contacta con Nosotros</span>
          }
          description={
            <>
              <h2 className="text-2xl md:text-3xl text-primary-foreground/90 mb-4 font-semibold font-display">Envios DosRuedas</h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-sans">Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Contáctanos y obtén una respuesta rápida.</p>
            </>
          }
          backgroundType="image"
          backgroundImageUrl="/bannerenvios.png"
          backgroundImageAlt="Banner contacto Envios DosRuedas"
          backgroundOverlayOpacity={0.75}
          textColorClassName="text-primary-foreground"
          textAlignment="text-center"
          minHeight="min-h-[40vh] sm:min-h-[50vh]"
          contentMaxWidth="max-w-3xl"
          titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display"
          descriptionClassName="text-base sm:text-lg md:text-xl"
          className="py-10 sm:py-12 md:py-16"
        />
      </motion.div>
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <ContactInfo />
      </motion.div>
      <motion.div
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">¿Tienes alguna consulta?</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">Completa el formulario y te responderemos a la brevedad.</p>
          </div>
          <ContactForm />
        </div>
      </motion.div>
      <motion.div
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <BusinessHours />
      </motion.div>
      <motion.div
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <ContactMap />
      </motion.div>
    </>
  );
}
