
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

      const startValue = 0
      const duration = 2500 // Slower animation
      const startTime = Date.now()

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = () => {
        const now = Date.now()
        const elapsedTime = now - startTime
        const progress = easeOutCubic(Math.min(elapsedTime / duration, 1))
        
        let currentValue = progress * (target - startValue) + startValue
        
        if (target % 1 !== 0) {
             currentValue = parseFloat(currentValue.toFixed(1));
        } else {
            currentValue = Math.floor(currentValue);
        }

        setCurrent(currentValue)

        if (elapsedTime < duration) {
          requestAnimationFrame(animate)
        } else {
          setCurrent(target)
        }
      }

      requestAnimationFrame(animate)
    }, [isInView, target])
    
    const displayValue = target % 1 !== 0 ? current.toFixed(1) : current;

    return (
      <span className="text-4xl md:text-5xl font-bold text-secondary">
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
    hidden: { opacity: 0, rotateY: -90, scale: 0.9 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 0.7
      }
    },
  };

  return (
    <section className="py-20 px-4 bg-primary" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary-foreground mb-4">Números que Hablan</h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto font-sans">
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
                  className="group bg-primary-foreground/5 backdrop-blur-sm border-primary-foreground/10 hover:bg-primary-foreground/10 transform hover:scale-105 transition-all duration-300 h-full"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="mb-2">
                      <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                    </div>
                    <h3 className="text-xl font-semibold font-heading text-primary-foreground mb-2">{stat.label}</h3>
                    <p className="text-primary-foreground/70 text-sm font-sans">{stat.description}</p>
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
