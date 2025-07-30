"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, ChevronUp } from "lucide-react";
import { navGroups } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const socialLinks = {
    facebook: "https://www.facebook.com/profile.php?id=100083211234237",
    instagram: "https://www.instagram.com/enviosdosruedas.mdp/",
    whatsapp: "https://wa.me/5492236602699",
  };

  const serviciosGroup = navGroups.find(g => g.label === "Servicios");
  const nosotrosGroup = navGroups.find(g => g.label === "Nosotros");

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Columna 1: Info Empresa */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/LogoEnviosDosRuedas.webp" alt="Logo" width={40} height={40} className="rounded-full" />
              <span className="font-bold text-lg text-white">Envios DosRuedas</span>
            </Link>
            <p className="text-sm">
              Tu solución confiable para mensajería y delivery en Mar del Plata y alrededores.
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Facebook /></a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Instagram /></a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Phone /></a>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="font-semibold text-white mb-4">Servicios</h3>
            <ul className="space-y-2">
              {serviciosGroup?.items.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Columna 3: Empresa */}
          <div>
            <h3 className="font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              {nosotrosGroup?.items.map(item => (
                 <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contacto Rápido</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Mar del Plata, Argentina</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>223-660-2699</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>matiascejas@enviosdosruedas.com</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="container mx-auto text-center mt-10 border-t border-gray-700 pt-6">
          <p className="text-sm">&copy; {currentYear} Envios DosRuedas. Todos los derechos reservados.</p>
        </div>
      </footer>
      
      {/* Botón Volver Arriba */}
      <Button 
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-4 right-4 rounded-full p-2 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        variant="default"
        size="icon"
        aria-label="Volver arriba"
      >
        <ChevronUp />
      </Button>
    </>
  );
}
