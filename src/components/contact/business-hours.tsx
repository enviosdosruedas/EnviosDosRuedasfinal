// src/components/contact/business-hours.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export function BusinessHours() {
  const schedule = [
    { day: "Lunes - Viernes", hours: "9:00 - 18:00" },
    { day: "Sábados", hours: "10:00 - 15:00 " },
    { day: "Domingos", hours: "Cerrado" },
  ]

  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 font-display">Horarios de Atención</h2>
            <p className="text-base sm:text-lg text-muted-foreground font-sans">Estamos disponibles para atenderte en los siguientes horarios.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Schedule Card */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full border-border">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl text-primary font-display">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Horarios Regulares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 font-sans">
                    {schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0 text-sm sm:text-base"
                      >
                        <span className="font-medium text-foreground">{item.day}</span>
                        <span className="text-muted-foreground">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
             
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
