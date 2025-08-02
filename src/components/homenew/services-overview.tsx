
"use client"

import { Button } from "@/components/ui/button"
import { Truck, Zap, Package, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function ServicesOverview() {
  const services = [
    {
      icon: Zap,
      title: "Envíos Express",
      description: "Entregas urgentes en minutos. La solución perfecta para cuando el tiempo apremia.",
      features: ["Entrega en el día (antes de 15hs)", "Seguimiento en tiempo real", "Máxima prioridad"],
      link: "/servicios/envios-express",
      imageUrl: "/servicios/enviosexpress.jpg",
      imageHint: "fast motorcycle"
    },
    {
      icon: Package,
      title: "Envíos Low Cost",
      description: "La opción más inteligente para tus envíos programados. Calidad y ahorro garantizados.",
      features: ["Entrega en 24hs", "Rutas optimizadas", "El mejor precio del mercado"],
      link: "/servicios/envios-lowcost",
      imageUrl: "/servicios/envios_low_cost.jpg",
      imageHint: "saving money"
    },
    {
      icon: Truck,
      title: "Moto Fija para Empresas",
      description: "Un repartidor exclusivo para tu negocio. Optimiza tus entregas recurrentes.",
      features: ["Repartidor 100% dedicado", "Horarios y rutas a medida", "Ideal para alto volumen"],
      link: "/servicios/moto-fija",
      imageUrl: "/servicios/moto_fija.jpg",
      imageHint: "dedicated courier"
    },
  ]

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            Tu Logística, Simplificada
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubrí cómo podemos potenciar tu negocio. Ofrecemos velocidad, economía y un servicio dedicado para que solo te concentres en crecer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-2xl h-[480px] bg-slate-800"
            >
              <Image
                src={service.imageUrl}
                alt={`Imagen de fondo para ${service.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                data-ai-hint={service.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/70" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-500" />
              
              <div className="relative z-10 p-6 flex flex-col h-full justify-end text-white">
                <motion.div>
                  <service.icon className="w-10 h-10 mb-4 text-secondary transition-all duration-500 group-hover:scale-110 group-hover:text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-2 font-heading">{service.title}</h3>
                </motion.div>
                
                <AnimatePresence>
                  <motion.div
                    className="overflow-hidden"
                    variants={{
                      collapsed: { height: 0, opacity: 0 },
                      expanded: { height: "auto", opacity: 1 },
                    }}
                    initial="collapsed"
                    animate={ "expanded"}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate={"visible"}
                      className="space-y-4 pt-4"
                    >
                      <motion.p variants={itemVariants} className="text-primary-foreground/80">
                        {service.description}
                      </motion.p>
                      <motion.ul variants={itemVariants} className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="text-sm text-primary-foreground/90">{feature}</span>
                          </li>
                        ))}
                      </motion.ul>
                      <motion.div variants={itemVariants}>
                        <Button asChild variant="secondary" className="mt-4 font-semibold w-full sm:w-auto">
                          <Link href={service.link}>Conocer Más</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
