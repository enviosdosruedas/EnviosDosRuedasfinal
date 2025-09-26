"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, Pagination, EffectFade, Autoplay, Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { TrendingUp, Package, Users, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Import Swiper styles
import "swiper/css"
import "swiper/css/parallax"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import "swiper/css/navigation"

const slides = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Plan Emprendedores",
    subtitle: "Emprendedores",
    description: "Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online",
    features: ["Tarifas LowCost", "Facturación mensual", "Soporte dedicado", "Reportes detallados"],
    gradient: "from-blue-600 to-blue-800",
    glowColor: "bg-blue-500/20",
    link: "/servicios/plan-emprendedores",
  },
  {
    id: 2,
    icon: Package,
    title: "Envíos Flex MercadoLibre",
    subtitle: "MercadoLibre",
    description: "Integración perfecta con MercadoLibre para potenciar tus ventas",
    features: ["Entregas el mismo día", "Mejora tu reputación", "Tarifas LowCost", "API integrada"],
    gradient: "from-yellow-500 to-orange-600",
    glowColor: "bg-yellow-500/20",
    link: "/servicios/enviosflex",
  },
  {
    id: 3,
    icon: Users,
    title: "Moto Fija para Negocios",
    subtitle: "Dedicado",
    description: "Repartidor dedicado exclusivamente para tu empresa",
    features: ["Repartidor exclusivo", "Horarios personalizados", "Rutas optimizadas", "Seguimiento GPS"],
    gradient: "from-green-500 to-teal-600",
    glowColor: "bg-green-500/20",
    link: "/servicios/moto-fija",
  },
]

export default function SliderServicios() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef<SwiperType>()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 50) 
    return () => clearInterval(interval)
  }, [activeIndex])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
    setProgress(0)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      <Swiper
        modules={[Parallax, Pagination, EffectFade, Autoplay, Navigation]}
        parallax={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1200}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {slides.map((slide) => {
          const IconComponent = slide.icon
          return (
            <SwiperSlide key={slide.id} className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} data-swiper-parallax="-300" />
              <div className="absolute inset-0 opacity-10" data-swiper-parallax="-200">
                <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${slide.glowColor} rounded-full blur-3xl animate-pulse`} />
                <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 ${slide.glowColor} rounded-full blur-3xl animate-pulse delay-1000`} />
              </div>

              <div className="relative z-10 flex items-center justify-center h-full px-8">
                <motion.div 
                  className="text-center max-w-4xl"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div className="mb-6 flex justify-center" variants={itemVariants}>
                    <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm ring-2 ring-white/20">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  <motion.div className="mb-4" variants={itemVariants}>
                    <span className="text-white/70 text-lg font-medium tracking-wider uppercase font-display">{slide.subtitle}</span>
                  </motion.div>

                  <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-display" variants={itemVariants}>
                    {slide.title}
                  </motion.h1>

                  <motion.p className="text-lg md:text-xl text-white/80 font-normal leading-relaxed max-w-2xl mx-auto mb-10" variants={itemVariants}>
                    {slide.description}
                  </motion.p>
                  
                  <motion.div className="flex flex-wrap items-center justify-center gap-4 max-w-lg mx-auto mb-10" variants={itemVariants}>
                    {slide.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                        initial={{ opacity: 0, y: 10}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ delay: 0.3 + featureIndex * 0.1}}
                      >
                         <CheckCircle className="w-4 h-4 text-green-300 mr-2" />
                         <span className="text-white/90 text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg transform hover:scale-105 transition-transform">
                      <Link href={slide.link}>Ver más detalles</Link>
                    </Button>
                  </motion.div>

                </motion.div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => { swiperRef.current?.slideToLoop(index); setProgress(0) }}
              className={`relative group transition-all duration-300 ${index === activeIndex ? "scale-110" : "scale-100 hover:scale-105"}`}
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${index === activeIndex ? "border-white bg-white" : "border-white/40 bg-transparent hover:border-white/60"}`} />
              {index === activeIndex && (
                <div className="absolute inset-0 -m-2">
                  <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
                    <circle
                      cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" fill="none"
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
      </div>

      <div className="swiper-button-prev absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 group cursor-pointer">
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm">
          <ArrowLeft className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
        </div>
      </div>
      <div className="swiper-button-next absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 group cursor-pointer">
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm">
          <ArrowRight className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  )
}
