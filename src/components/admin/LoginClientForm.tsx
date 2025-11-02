// src/components/admin/LoginClientForm.tsx
'use client';

import { useActionState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { login, type LoginFormState } from '@/app/admin/login/actions';

const loginSchema = z.object({
  username: z.string().min(1, { message: 'El nombre de usuario es requerido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const initialState: LoginFormState = {
  error: undefined,
  fieldErrors: {},
  success: false,
};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full font-bold font-sans">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <LogIn className="mr-2 h-4 w-4"/>}
      {isPending ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
    </Button>
  );
}

export function LoginClientForm() {
  const [state, formAction] = useActionState(login, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "EnviosAdmin",
      password: "Vendetta_3317_10",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Inicio de Sesión Exitoso',
        description: 'Redirigiendo al panel de administración...',
        variant: 'default',
        className: 'bg-green-100 border-green-400 text-green-700'
      });
      router.push('/admin');
    }
    if (state.error) {
      toast({
        title: 'Error de Autenticación',
        description: state.error,
        variant: 'destructive',
      });
      form.setError('username', {});
      form.setError('password', { message: ' ' }); // Add a space to show the field is in error state without a message below
    }
    if (state.fieldErrors) {
      for (const [field, errors] of Object.entries(state.fieldErrors)) {
        form.setError(field as keyof LoginSchema, {
          type: 'server',
          message: errors?.[0],
        });
      }
    }
  }, [state, toast, router, form]);

  const onFormSubmit = (data: LoginSchema) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    startTransition(() => {
      formAction(formData);
    });
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center font-sans">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      Nombre de Usuario
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center font-sans">
                      <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton isPending={isPending} />
              <p className="mt-4 text-center text-xs text-muted-foreground font-sans">
                <Link href="/" className="underline hover:text-primary">
                  Volver a la página de inicio
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
