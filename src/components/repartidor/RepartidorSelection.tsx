// src/components/repartidor/RepartidorSelection.tsx
'use client';

import type { Repartidor } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, User, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';

interface RepartidorSelectionProps {
    repartidores: Repartidor[];
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
        type: 'spring',
        stiffness: 100,
    }
  },
};

export function RepartidorSelection({ repartidores }: RepartidorSelectionProps) {

    return (
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
                <Bike className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="text-2xl font-bold font-display mt-4">Acceso de Repartidor</CardTitle>
                <CardDescription>Selecciona tu perfil para comenzar.</CardDescription>
            </CardHeader>
            <CardContent>
                {repartidores.length === 0 ? (
                    <p className="text-center text-muted-foreground">No hay repartidores activos.</p>
                ) : (
                    <motion.div 
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {repartidores.map(r => (
                            <motion.div key={r.id} variants={itemVariants}>
                                <Button asChild variant="outline" className="w-full justify-between h-14 text-lg">
                                    <Link href={`/repartidor/${r.id}`}>
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-muted-foreground" />
                                            <span>{r.name}</span>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-primary" />
                                    </Link>
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
}
