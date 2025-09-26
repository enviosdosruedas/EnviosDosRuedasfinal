"use client"

import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, Pagination, EffectFade, Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { TrendingUp, Package, Users } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/parallax"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const slides = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Plan Emprendedores",
    subtitle: "Emprendedores",
    description: "Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online",
    features: ["Tarifas LowCost", "Facturación mensual", "Soporte dedicado", "Reportes detallados"],
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    glowColor: "blue-500/20",
  },
  {
    id: 2,
    icon: Package,
    title: "Envíos Flex MercadoLibre",
    subtitle: "MercadoLibre",
    description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
    features: ["Entregas el mismo día", "Mejora tu reputación", "Tarifas LowCost", "API integrada"],
    gradient: "from-secondary via-yellow-500 to-yellow-600",
    glowColor: "yellow-500/20",
  },
  {
    id: 3,
    icon: Users,
    title: "Moto Fija para Negocios",
    subtitle: "Dedicado",
    description: "Repartidor dedicado exclusivamente para tu empresa",
    features: ["Repartidor exclusivo", "Horarios personalizados", "Rutas optimizadas", "Seguimiento GPS"],
    gradient: "from-green-500 via-green-600 to-green-700",
    glowColor: "green-500/20",
  },
]

export default function SliderServicios() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef<SwiperType>()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [activeIndex])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
    setProgress(0)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Parallax, Pagination, EffectFade, Autoplay]}
        parallax={true}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1200}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
        data-swiper-parallax="-23%"
      >
        {slides.map((slide, index) => {
          const IconComponent = slide.icon
          return (
            <SwiperSlide key={slide.id} className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} data-swiper-parallax="-300" />

              <div className="absolute inset-0 opacity-10" data-swiper-parallax="-200">
                <div
                  className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${slide.glowColor} rounded-full blur-3xl animate-pulse`}
                />
                <div
                  className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-${slide.glowColor} rounded-full blur-3xl animate-pulse delay-1000`}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-8">
                <div className="text-center max-w-4xl">
                  <div className="mb-6 flex justify-center" data-swiper-parallax="-50">
                    <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <div className="mb-4 opacity-70" data-swiper-parallax="-100">
                    <span className="text-white/60 text-lg font-light tracking-wider uppercase">{slide.subtitle}</span>
                  </div>

                  <h1
                    className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight"
                    data-swiper-parallax="-200"
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-8"
                    data-swiper-parallax="-300"
                  >
                    {slide.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto" data-swiper-parallax="-400">
                    {slide.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                          <span className="text-white/90 text-sm font-medium">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom Pagination with Progress Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                swiperRef.current?.slideTo(index)
                setProgress(0)
              }}
              className={`relative group transition-all duration-300 ${
                index === activeIndex ? "scale-110" : "scale-100 hover:scale-105"
              }`}
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === activeIndex
                    ? "border-white bg-white"
                    : "border-white/40 bg-transparent hover:border-white/60"
                }`}
              />

              {/* Progress ring for active slide */}
              {index === activeIndex && (
                <div className="absolute inset-0 -m-2">
                  <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 10}`}
                      strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                      className="transition-all duration-75 ease-linear"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div className="text-center mt-4">
          <span className="text-white/60 text-sm font-light">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 group"
      >
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 group"
      >
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  )
}
