"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Package, Users, Clock, Star } from 'lucide-react';

const stats = [
  { icon: Package, value: 15000, label: 'Envíos Realizados', suffix: '+' },
  { icon: Users, value: 2500, label: 'Clientes Satisfechos', suffix: '+' },
  { icon: Clock, value: 98, label: 'Entregas a Tiempo', suffix: '%' },
  { icon: Star, value: 4.9, label: 'Calificación en Google Reviews', suffix: '/5' },
];

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const isInteger = Number.isInteger(value);
      
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          if (isInteger) {
            setDisplayValue(Math.round(latest));
          } else {
            setDisplayValue(parseFloat(latest.toFixed(1)));
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold tracking-tighter">
      {displayValue.toLocaleString('es-AR')}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Números que Hablan</h2>
          <p className="mt-4 text-lg text-blue-200">
            Nuestra experiencia y compromiso se reflejan en cada estadística.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <stat.icon className="w-12 h-12 text-yellow-400" />
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-blue-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
