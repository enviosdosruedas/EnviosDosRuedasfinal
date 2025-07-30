
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Users, Clock, Star } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    {
      icon: Package,
      number: 15000,
      suffix: "+",
      label: "Envíos Realizados",
      description: "Paquetes entregados con éxito",
    },
    {
      icon: Users,
      number: 2500,
      suffix: "+",
      label: "Clientes Satisfechos",
      description: "Confían en nuestro servicio",
    },
    {
      icon: Clock,
      number: 98,
      suffix: "%",
      label: "Entregas a Tiempo",
      description: "Puntualidad garantizada",
    },
    {
      icon: Star,
      number: 4.9,
      suffix: "/5",
      label: "Calificación",
      description: "En Google Reviews",
    },
  ]

  const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
      if (!isInView) return

      let startValue = 0
      const duration = 2000 // 2 seconds
      const startTime = Date.now()

      const animate = () => {
        const now = Date.now()
        const elapsedTime = now - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        
        let currentValue = progress * (target - startValue) + startValue
        
        if (target % 1 !== 0) {
             currentValue = parseFloat(currentValue.toFixed(1));
        } else {
            currentValue = Math.floor(currentValue);
        }

        setCurrent(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCurrent(target)
        }
      }

      requestAnimationFrame(animate)
    }, [isInView, target])
    
    const displayValue = target % 1 !== 0 ? current.toFixed(1) : current;

    return (
      <span className="text-4xl md:text-5xl font-bold text-yellow-400">
        {displayValue}
        {suffix}
      </span>
    )
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary via-gray-900 to-black" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Números que Hablan</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Nuestra experiencia y compromiso se reflejan en cada estadística
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 h-full"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="mb-2">
                      <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
                    <p className="text-white/70 text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
