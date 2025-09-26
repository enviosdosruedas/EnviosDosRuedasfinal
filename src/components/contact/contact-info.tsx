// src/components/contact/contact-info.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Home, Mail, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import type React from 'react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Define an interface for the contact methods to solve the TS error
interface ContactMethod {
  icon: React.ElementType | null;
  title: string;
  description: string;
  actionText: string;
  href?: string;
  onClick?: () => void;
  colorClasses: string;
  iconBg: string;
  iconColor: string;
}

export function ContactInfo() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699"
    const message = "Hola, me gustaría obtener información sobre sus servicios de envío."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      title: "Email",
      description: "Para consultas detalladas o corporativas.",
      actionText: "Enviar Email",
      href: "mailto:matiascejas@enviosdosruedas.com",
      colorClasses: "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Facebook,
      title: "Facebook",
      description: "Síguenos para novedades y promociones.",
      actionText: "Ir a Facebook",
      href: "https://facebook.com/enviosdosruedas",
      colorClasses: "border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-800",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Mira nuestro día a día y ofertas visuales.",
      actionText: "Ir a Instagram",
      href: "https://instagram.com/enviosdosruedas",
      colorClasses: "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <Card className="mb-8 sm:mb-10 shadow-lg border-primary/20">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <Home className="w-7 h-7 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-display">Envios DosRuedas</h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 font-sans">Mensajería y Delivery</p>

                <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground font-display">223-660-2699</span>
                </div>

                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-sans"
                >
                  <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.title}
                  custom={index + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1.5 h-full flex flex-col">
                    <CardContent className="p-6 text-center flex flex-col items-center flex-grow">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${method.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                        {IconComponent && <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${method.iconColor}`} />}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 font-display">{method.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow font-sans">{method.description}</p>
                      <Button
                        onClick={method.onClick}
                        asChild={!!method.href}
                        variant="outline"
                        size="sm"
                        className={`mt-auto ${method.colorClasses} transition-all duration-300 w-full text-xs sm:text-sm font-sans`}
                      >
                        {method.href ? (
                          <a href={method.href} target={method.href.startsWith("mailto:") ? "_self" : "_blank"} rel="noopener noreferrer">
                            {method.actionText}
                          </a>
                        ) : (
                          <span>{method.actionText}</span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
