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
  ChevronDown,
  Home as HomeIcon,
  Truck,
  Calculator as CalculatorIcon,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Define NavItem and NavGroup types locally for the Footer
interface NavItem {
  label: string
  href: string
  icon?: React.ElementType
  children?: NavItem[]
}

interface NavGroup {
  label: string
  icon?: React.ElementType; // Optional icon for the group itself
  items: NavItem[]
  basePath?: string 
}

// Define navGroups directly in footer.tsx
const navGroups: NavGroup[] = [
  {
    label: "Servicios",
    icon: Truck,
    basePath: "/servicios",
    items: [
      { href: "/servicios/envios-express", label: "Envíos Express" },
      { href: "/servicios/envios-lowcost", label: "Envíos LowCost" },
      { href: "/servicios/moto-fija", label: "Moto Fija" },
      { href: "/servicios/plan-emprendedores", label: "Plan Emprendedores" },
      { href: "/servicios/enviosflex", label: "Envíos Flex MercadoLibre" },
    ],
  },
  {
    label: "Nosotros", // Grouping "Sobre Nosotros", "FAQ", "Redes"
    icon: Users,
    basePath: "/nosotros",
    items: [
      { href: "/nosotros/sobre-nosotros", label: "Sobre Nosotros" },
      { href: "/nosotros/preguntas-frecuentes", label: "Preguntas Frecuentes" },
      { href: "/nosotros/nuestras-redes", label: "Nuestras Redes" },
    ],
  },
   {
    label: "Cotizar", // Grouping "Cotizar Express", "Cotizar LowCost"
    icon: CalculatorIcon,
    basePath: "/cotizar",
    items: [
      { href: "/cotizar/express", label: "Cotizar Express" },
      { href: "/cotizar/lowcost", label: "Cotizar LowCost" },
    ],
  },
];


const NavList = ({ items, isSubmenu = false, className }: { items: NavItem[]; isSubmenu?: boolean, className?: string }) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <ul className={cn("space-y-2", isSubmenu ? "ml-3 mt-2 border-l border-gray-700 pl-3" : "", className)}>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0
        return (
          <li key={item.label}>
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="flex w-full items-center justify-between text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-1.5 text-sm"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform duration-200", openSubmenus[item.label] ? "rotate-180" : "")}
                  />
                </button>
                {openSubmenus[item.label] && <NavList items={item.children!} isSubmenu={true} className="text-sm"/>}
              </>
            ) : (
              <Link
                href={item.href}
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-1.5 text-sm"
              >
                {item.label}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // This ensures new Date() is only called on the client side after hydration
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


  return (
    <footer className="bg-gray-900 border-t border-gray-800 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
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
              <h3 className="text-lg font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                Envios DosRuedas
              </h3>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Tu solución confiable para mensajería y delivery en Mar del Plata y alrededores.
            </p>
            <div className="flex space-x-2">
              {[
                { label: "Facebook", Icon: Facebook, href: "https://facebook.com/enviosdosruedas" },
                { label: "Instagram", Icon: Instagram, href: "https://instagram.com/enviosdosruedas" },
                { label: "Twitter", Icon: Twitter, href: "https://twitter.com/enviosdosruedas" },
                { label: "WhatsApp", Icon: "whatsapp", href: "https://wa.me/5492236602699" },
              ].map(social => (
                 <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-yellow-400 transform hover:scale-110 transition-all duration-200"
                    aria-label={`${social.label} de Envios DosRuedas`}
                  >
                    {social.label === "WhatsApp" ? (
                      <Image src="/icon/icon-whatsapp.svg" alt="WhatsApp Icon" width={20} height={20} className="w-5 h-5" />
                    ) : (
                      <social.Icon className="w-5 h-5" />
                    )}
                  </a>
              ))}
            </div>
          </div>

          {/* Navigation Menus */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <h4 className="text-base font-semibold text-white mb-3">Servicios</h4>
              <NavList items={navGroups.find(g => g.label === "Servicios")?.items || []} />
            </div>
             <div>
              <h4 className="text-base font-semibold text-white mb-3">Empresa</h4>
               <NavList items={navGroups.find(g => g.label === "Nosotros")?.items || []} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-3">Legal & Otros</h4>
             <ul className="space-y-2 text-sm">
                <li><Link href="/terminos-y-condiciones" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-1.5">Términos y Condiciones</Link></li>
                <li><Link href="/politica-de-privacidad" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-1.5">Política de Privacidad</Link></li>
                <li><Link href="/cotizar/express" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-1.5">Cotizar Envío</Link></li>
             </ul>
            </div>
          </div>


          {/* Contact Info */}
          <div className="lg:pl-3">
            <h4 className="text-base font-semibold text-white mb-3">Contacto Rápido</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-gray-300 group">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0 transform group-hover:scale-110 transition-transform" />
                <span className="text-sm">Mar del Plata, Argentina</span>
              </div>
              <a
                href="tel:2236602699"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group text-sm"
              >
                <Phone className="w-4 h-4 text-yellow-400 transform group-hover:scale-110 transition-transform" />
                <span>223-660-2699</span>
              </a>
              <a
                href="mailto:matiascejas@enviosdosruedas.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group text-sm"
              >
                <Mail className="w-4 h-4 text-yellow-400 transform group-hover:scale-110 transition-transform" />
                <span>matiascejas@enviosdosruedas.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 md:mt-10 pt-6 md:pt-8 text-center">
         {currentYear !== null && (
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Envios DosRuedas. Todos los derechos reservados.
            </p>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
       <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50"
          >
            <Button
              onClick={scrollToTop}
              className="p-2 sm:p-2.5 rounded-full bg-yellow-500 text-gray-900 shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Volver arriba"
              variant="secondary"
              size="icon"
            >
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
