// src/components/admin/AdminDashboard.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, PlusCircle, BarChart2, Ticket, Wand2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const adminSections = [
  {
    title: "Gestión de Órdenes",
    description: "Visualiza, crea y modifica las órdenes de envío.",
    href: "/admin/ordenes",
    icon: ListOrdered,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Gestión de Tarifas",
    description: "Administra los rangos de precios para los servicios.",
    href: "/admin/cotizaciones",
    icon: BarChart2,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
   {
    title: "Gestión de Etiquetas",
    description: "Crea y administra etiquetas de envío.",
    href: "/admin/etiquetas",
    icon: Ticket,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "Agregar Publicación",
    description: "Añade nuevos posts al feed de redes sociales.",
    href: "/admin/add-post",
    icon: PlusCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Generador de Prompts IA",
    description: "Crea prompts para generar imágenes de marca.",
    href: "/admin/crea-imagenes",
    icon: Wand2,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];

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
        type: 'spring',
        stiffness: 100,
    }
  },
};

export function AdminDashboard() {
  return (
    <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      {adminSections.map((section, index) => {
        const Icon = section.icon;
        return (
          <motion.div key={section.title} variants={itemVariants}>
            <Link href={section.href} className="block group">
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-8 w-8 ${section.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-sans">{section.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
