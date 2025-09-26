
// src/components/admin/LoginForm.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export function LoginForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual login logic
    alert('Login functionality not implemented yet.');
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
    >
        <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <Link href="/" className="mb-4 inline-block">
                <Image 
                    src="/LogoEnviosDosRuedas.webp" 
                    alt="Logo Envios DosRuedas" 
                    width={64} 
                    height={64} 
                    className="mx-auto rounded-full"
                />
            </Link>
            <CardTitle className="text-2xl font-bold font-display">Acceso de Administrador</CardTitle>
            <CardDescription className="font-sans">Ingresa tus credenciales para continuar.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center font-sans">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    Correo Electrónico
                </Label>
                <Input id="email" type="email" placeholder="admin@ejemplo.com" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center font-sans">
                    <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                    Contraseña
                </Label>
                <Input id="password" type="password" required />
            </div>
            </CardContent>
            <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full font-bold font-sans">
                <LogIn className="mr-2 h-4 w-4"/>
                Iniciar Sesión
            </Button>
             <p className="mt-4 text-center text-xs text-muted-foreground font-sans">
                <Link href="/" className="underline hover:text-primary">
                    Volver a la página de inicio
                </Link>
            </p>
            </CardFooter>
        </form>
        </Card>
    </motion.div>
  );
}
