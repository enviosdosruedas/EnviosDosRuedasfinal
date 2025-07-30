"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { navGroups } from "@/lib/navigation"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

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

  const socialLinks = [
    { label: "Facebook", Icon: Facebook, href: "https://facebook.com/enviosdosruedas" },
    { label: "Instagram", Icon: Instagram, href: "https://instagram.com/enviosdosruedas" },
    { label: "Twitter", Icon: Twitter, href: "https://twitter.com/enviosdosruedas" },
  ]

  return (
    <motion.footer 
      className="bg-gradient-to-t from-[#1A2B4E] to-[#21345d] text-white/80 border-t border-blue-900 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2.5 mb-4 group">
              <Image
                src="/LogoEnviosDosRuedas.webp"
                alt="Envios DosRuedas Logo"
                width={40}
                height={40}
                className="rounded-full transform group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <h3 className="text-lg font-bold text-secondary group-hover:text-yellow-300 transition-colors">
                Envios DosRuedas
              </h3>
            </Link>
            <p className="text-sm mb-6 leading-relaxed">
              Tu solución confiable para mensajería y delivery en Mar del Plata y alrededores.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map(social => (
                 <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="p-2 rounded-full text-white/80 hover:bg-white/10 hover:text-secondary transition-all duration-200"
                    aria-label={`${social.label} de Envios DosRuedas`}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Menus */}
          {navGroups.slice(0, 2).map(group => (
            <div key={group.label}>
              <h4 className="font-heading text-base font-semibold text-white mb-4 pb-2 border-b-2 border-secondary inline-block">{group.label}</h4>
              <ul className="space-y-2 text-sm">
                {group.items.map(item => (
                    <li key={item.href}>
                        <motion.div whileHover={{ x: 4 }}>
                            <Link href={item.href} className="block text-white/80 hover:text-white transition-colors duration-200 py-1.5">
                                {item.label}
                            </Link>
                        </motion.div>
                    </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="lg:pl-3">
             <h4 className="font-heading text-base font-semibold text-white mb-4 pb-2 border-b-2 border-secondary inline-block">Contacto Rápido</h4>
            <ul className="space-y-3">
              {[
                {Icon: MapPin, text: "Mar del Plata, Argentina"},
                {Icon: Phone, text: "223-660-2699", href: "tel:2236602699"},
                {Icon: Mail, text: "matiascejas@enviosdosruedas.com", href: "mailto:matiascejas@enviosdosruedas.com"},
              ].map(({Icon, text, href}) => (
                <li key={text}>
                    <motion.a
                        href={href || undefined}
                        className="flex items-start space-x-3 group text-sm"
                        whileHover={href ? { x: 4 } : {}}
                    >
                        <Icon className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                        <span className={cn("transition-colors", href && "group-hover:text-white")}>{text}</span>
                    </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
         {currentYear !== null && (
            <p className="text-sm">
              &copy; {currentYear} Envios DosRuedas. Todos los derechos reservados.
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50"
          >
            <Button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-secondary text-primary shadow-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Volver arriba"
              variant="secondary"
              size="icon"
            >
              <ChevronUp className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  )
}
