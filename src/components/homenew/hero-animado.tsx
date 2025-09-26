"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import RotatingCard from "@/components/homenew/rotating-card"
import { ArrowRightIcon, PlayIcon, Sparkles, Zap } from "lucide-react"
import { Space_Mono } from "next/font/google"
import Image from "next/image"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

export default function HeroAnimado() {
  return (
    <div className={`min-h-screen relative text-white ${spaceMono.variable} font-mono`}>
      <Image
        src="/bannerenvios.png"
        alt="Fondo de banner de envíos"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      <main className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 z-10 lg:py-24 gap-12">
        <div className="flex-1 lg:pr-16 text-center lg:text-left mt-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Tu Solución Confiable</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-wide text-white">
            Servicio confiable de mensajería y delivery
            <span className="block text-secondary mt-2">EnviosDosruedas</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones
            rápidas, seguras y económicas para todas tus necesidades de envío.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-3 rounded-lg flex items-center gap-2 font-bold">
              Solicitar Servicio <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Link
              href="#"
              className="flex items-center gap-3 text-lg text-white/80 hover:text-white transition-colors font-normal"
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-colors">
                <PlayIcon className="w-6 h-6 text-white" />
              </div>
              Ver Servicios
            </Link>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 text-center lg:text-left">
            <div>
              <div className="text-4xl font-bold tracking-wide text-white">500+</div>
              <div className="text-white/70 text-sm font-normal">Entregas Diarias</div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-wide text-white">24/7</div>
              <div className="text-white/70 text-sm font-normal">Servicio Disponible</div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-wide text-white">100%</div>
              <div className="text-white/70 text-sm font-normal">Mar del Plata</div>
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex justify-center items-center min-h-[300px] sm:min-h-[400px] lg:min-h-0 lg:w-1/2">
          <div className="relative w-[280px] h-[175px] sm:w-[320px] sm:h-[200px] lg:w-[400px] lg:h-[250px] transform-gpu scale-105">
            <RotatingCard frontImageSrc="/hero/delante.png" backImageSrc="/hero/detras.png" className="w-full h-full" />
          </div>
        </div>
      </main>
    </div>
  )
}
