"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Package, Truck } from 'lucide-react';

const services = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Envíos Express',
    description: 'Entregas el mismo día para cuando necesitas velocidad máxima.',
    href: '/servicios/envios-express',
  },
  {
    icon: <Package className="w-8 h-8 text-primary" />,
    title: 'Envíos Low Cost',
    description: 'La opción más económica sin sacrificar calidad ni seguridad.',
    href: '/servicios/envios-lowcost',
  },
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: 'Moto Fija',
    description: 'Servicio dedicado para tu negocio con repartidor exclusivo.',
    href: '/servicios/moto-fija',
  },
];

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

export function ServicesOverview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nuestros Servicios Principales</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluciones adaptadas a cada necesidad, desde entregas urgentes hasta servicios dedicados para tu negocio.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Card className="h-full flex flex-col text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="mb-6">{service.description}</CardDescription>
                  <Button asChild variant="outline">
                    <Link href={service.href}>Ver Más Detalles</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
