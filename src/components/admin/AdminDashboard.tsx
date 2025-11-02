// src/components/admin/AdminDashboard.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { adminNavItems } from "@/lib/navigation-admin";


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
      {adminNavItems.map((section) => {
        const Icon = section.icon;
        return (
          <motion.div key={section.label} variants={itemVariants}>
            <Link href={section.href} className="block group">
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-8 w-8 ${section.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                        {section.label}
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
