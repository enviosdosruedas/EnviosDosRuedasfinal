"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Package } from 'lucide-react';

const solutions = [
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    title: 'Plan Emprendedores',
    description: 'Tarifas preferenciales y servicios adaptados para hacer crecer tu negocio online.',
    href: '/servicios/plan-emprendedores',
  },
  {
    icon: <Package className="w-8 h-8 text-white" />,
    title: 'Envíos Flex MercadoLibre',
    description: 'Integración perfecta con MercadoLibre para potenciar tus ventas.',
    href: '/servicios/enviosflex',
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: 'Moto Fija para Negocios',
    description: 'Repartidor dedicado exclusivamente para tu empresa.',
    href: '/servicios/moto-fija',
  },
];

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

export function EntrepreneurSolutions() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">Especial para Emprendedores</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Soluciones Especiales para Emprendedores</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñamos servicios específicos para ayudar a crecer tu negocio online. Desde tarifas preferenciales hasta integración con plataformas de venta.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
             <motion.div
              key={solution.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <Card className="h-full flex flex-col text-center bg-gray-800 text-white shadow-xl hover:bg-gray-700 transition-colors duration-300">
                <CardHeader className="items-center">
                  <div className="bg-white/10 p-4 rounded-full mb-4">
                    {solution.icon}
                  </div>
                  <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="text-gray-300 mb-6">{solution.description}</CardDescription>
                  <Button asChild variant="secondary">
                    <Link href={solution.href}>Conocer Más</Link>
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
