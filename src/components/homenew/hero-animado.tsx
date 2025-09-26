"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import RotatingCard from "@/components/homenew/rotating-card"
import { ArrowRightIcon, PlayIcon, Sparkles, Zap } from "lucide-react"
import { Space_Mono } from "next/font/google"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

export default function HeroAnimado() {
  return (
    <div className={`min-h-screen bg-gray-50 text-gray-800 ${spaceMono.variable} font-mono`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <main className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 z-10 lg:py-24 gap-12">
        <div className="flex-1 lg:pr-16 text-center lg:text-left mt-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-800/90">Tu Solución Confiable</span>
            <Zap className="w-4 h-4 text-blue-500" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-wide text-gray-900">
            Servicio confiable de mensajería y delivery
            <span className="block text-[#1E40AF] mt-2">EnviosDosruedas</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones
            rápidas, seguras y económicas para todas tus necesidades de envío.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-16">
            <Button className="bg-[#F9A825] text-black hover:bg-[#F9A825]/90 text-lg px-8 py-3 rounded-lg flex items-center gap-2 font-bold">
              Solicitar Servicio <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Link
              href="#"
              className="flex items-center gap-3 text-lg text-gray-600 hover:text-[#1E40AF] transition-colors font-normal"
            >
              <div className="w-12 h-12 rounded-full border border-blue-500/50 flex items-center justify-center hover:border-blue-500 transition-colors">
                <PlayIcon className="w-6 h-6 text-gray-800" />
              </div>
              Ver Servicios
            </Link>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 text-center lg:text-left">
            <div>
              <div className="text-4xl font-bold tracking-wide text-gray-900">500+</div>
              <div className="text-gray-500 text-sm font-normal">Entregas Diarias</div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-wide text-gray-900">24/7</div>
              <div className="text-gray-500 text-sm font-normal">Servicio Disponible</div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-wide text-gray-900">100%</div>
              <div className="text-gray-500 text-sm font-normal">Mar del Plata</div>
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex justify-center items-center min-h-[400px] lg:min-h-[auto] lg:w-1/2">
          <div className="relative w-[350px] h-[220px] transform rotate-[-20deg] scale-105">
            <RotatingCard frontImageSrc="/hero/delante.png" backImageSrc="/hero/detras.png" className="w-full h-full" />
          </div>
        </div>
      </main>
    </div>
  )
}
