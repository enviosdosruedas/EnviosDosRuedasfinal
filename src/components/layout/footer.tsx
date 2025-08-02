"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { navGroups } from "@/lib/navigation"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "5492236602699"
    const message = "Hola, me gustaría obtener información sobre sus servicios de envío."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const socialLinks = [
    { label: "Facebook", Icon: Facebook, href: "https://facebook.com/enviosdosruedas" },
    { label: "Instagram", Icon: Instagram, href: "https://instagram.com/enviosdosruedas" },
    { label: "WhatsApp", Icon: null, onClick: handleWhatsAppClick, href: "#" },
  ]

  return (
    <motion.footer
      className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground/90 border-t border-secondary/20 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Company Info */}
          <motion.div
            className="md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} className="mb-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/30 to-secondary/10 blur-sm"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <Image
                    src="/LogoEnviosDosRuedas.webp"
                    alt="Envios DosRuedas Logo"
                    width={44}
                    height={44}
                    className="rounded-full relative z-10 ring-2 ring-secondary/20 group-hover:ring-secondary/40 transition-all duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary group-hover:text-yellow-300 transition-colors duration-300 font-heading">
                    Envios DosRuedas
                  </h3>
                  <p className="text-xs text-primary-foreground/70 -mt-0.5">Tu Solución Confiable</p>
                </div>
              </Link>
            </motion.div>

            <p className="text-sm mb-6 leading-relaxed text-primary-foreground/80">
              Tu solución confiable para mensajería y delivery en Mar del Plata y alrededores. Ofrecemos servicios
              rápidos, seguros y económicos.
            </p>

            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={social.onClick}
                  whileHover={{ scale: 1.15, rotate: 5, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  className="p-3 rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-secondary/20 hover:text-secondary border border-primary-foreground/10 hover:border-secondary/30 transition-all duration-300 backdrop-blur-sm"
                  aria-label={`${social.label} de Envios DosRuedas`}
                >
                  {social.Icon ? <social.Icon className="w-5 h-5" /> : <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Menus */}
          {navGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + groupIndex * 0.1, duration: 0.6 }}
            >
              <div className="relative mb-6">
                <h4 className="font-heading text-lg font-bold text-primary-foreground mb-2">{group.label}</h4>
                <motion.div
                  className="h-0.5 w-12 bg-gradient-to-r from-secondary to-secondary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + groupIndex * 0.1, duration: 0.5 }}
                />
              </div>
              <ul className="space-y-3">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + groupIndex * 0.1 + itemIndex * 0.05, duration: 0.4 }}
                    >
                      <motion.div whileHover={{ x: 6, scale: 1.02 }} className="group">
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 py-2 px-3 rounded-lg hover:bg-primary-foreground/5"
                        >
                          {Icon && (
                            <Icon className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform duration-200" />
                          )}
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            className="lg:pl-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative mb-6">
              <h4 className="font-heading text-lg font-bold text-primary-foreground mb-2">Contacto Rápido</h4>
              <motion.div
                className="h-0.5 w-12 bg-gradient-to-r from-secondary to-secondary/50 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </div>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: "Mar del Plata, Argentina" },
                { Icon: Phone, text: "223-660-2699", href: "tel:2236602699" },
                { Icon: Mail, text: "matiascejas@enviosdosruedas.com", href: "mailto:matiascejas@enviosdosruedas.com" },
              ].map(({ Icon, text, href }, index) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  <motion.div whileHover={href ? { x: 6, scale: 1.02 } : {}} className="group">
                    {href ? (
                      <a
                        href={href}
                        className="flex items-start space-x-3 text-sm py-2 px-3 rounded-lg hover:bg-primary-foreground/5 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-200">
                          {text}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-start space-x-3 text-sm py-2 px-3">
                        <Icon className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-primary-foreground/80">{text}</span>
                      </div>
                    )}
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-primary-foreground/10 mt-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {currentYear !== null && (
                <p className="text-sm text-primary-foreground/70">
                  &copy; {currentYear} Envios DosRuedas. Todos los derechos reservados.
                </p>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/politica-de-privacidad"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos-y-condiciones"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
              >
                Términos
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-2xl hover:shadow-secondary/25 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary border border-secondary/20"
              aria-label="Volver arriba"
              size="icon"
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ChevronUp className="w-6 h-6" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  )
}
