
// src/components/ordenes/ClientRegistrationForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Client } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Loader2, UserPlus, Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { registerClient } from '@/app/ordenes/actions'; 
import type { RegisterClientInput } from '@/types/order-actions';
import { useToast } from '@/hooks/use-toast';

const clientRegistrationZodSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres.'),
  lastName: z.string().min(2, 'El apellido es requerido y debe tener al menos 2 caracteres.').optional().or(z.literal('')),
  phone: z.string().min(1, 'El número de teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  email: z.string().email('El email no es válido.').optional().or(z.literal('')), 
  address: z.string().min(5, 'La dirección es requerida y debe tener al menos 5 caracteres.'),
});

type ClientRegistrationFormValues = z.infer<typeof clientRegistrationZodSchema>;

interface ClientRegistrationFormProps {
  initialPhone: string;
  onClientRegistered: (client: Client) => void;
  onCancel: () => void;
  setIsParentProcessing: (isProcessing: boolean) => void;
}

export function ClientRegistrationForm({ initialPhone, onClientRegistered, onCancel, setIsParentProcessing }: ClientRegistrationFormProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const form = useForm<ClientRegistrationFormValues>({
    resolver: zodResolver(clientRegistrationZodSchema),
    defaultValues: {
      name: '',
      lastName: '',
      phone: initialPhone, 
      email: '',
      address: '',
    },
  });

  async function onSubmit(data: ClientRegistrationFormValues) {
    setIsRegistering(true);
    setIsParentProcessing(true);
    toast({ title: 'Registrando Cliente...', description: `Registrando a ${data.name} ${data.lastName || ''}` });

    const submissionData: RegisterClientInput = {
        ...data,
        lastName: data.lastName || undefined, 
        email: data.email || undefined,       
    };

    try {
      const result = await registerClient(submissionData);
      if (result.success && result.data) {
        toast({
          title: 'Cliente Registrado Exitosamente',
          description: `${result.data.name} ${result.data.lastName || ''} ha sido registrado.`,
          variant: 'default',
          className: 'bg-green-100 border-green-400 text-green-700',
        });
        onClientRegistered(result.data);
      } else {
        let errorMessage = result.error || 'Ocurrió un error inesperado.';
        if (result.fieldErrors) {
          result.fieldErrors.forEach(err => {
            if (err.path && err.path.length > 0) {
              form.setError(err.path[0] as keyof ClientRegistrationFormValues, { message: err.message });
            }
          });
          errorMessage = `Error de validación: ${result.fieldErrors.map(e => e.message).join(', ')}`;
        }
        toast({
          title: 'Error al Registrar Cliente',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      toast({
        title: 'Error de Conexión',
        description: 'No se pudo conectar con el servidor. Intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsRegistering(false);
      setIsParentProcessing(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-center text-muted-foreground">
        No se encontró un cliente para el teléfono: <strong>{initialPhone}</strong>.
        <br />
        Por favor, completa los siguientes datos para registrarlo.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reg-name">Nombre *</FormLabel>
                  <FormControl>
                    <Input id="reg-name" placeholder="Nombre del cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reg-lastName">Apellido</FormLabel>
                  <FormControl>
                    <Input id="reg-lastName" placeholder="Apellido del cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="reg-phone" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  Teléfono *
                </FormLabel>
                <FormControl>
                  <Input id="reg-phone" type="tel" {...field} readOnly className="bg-muted/50 cursor-not-allowed" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="reg-email" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  Email (Opcional)
                </FormLabel>
                <FormControl>
                  <Input id="reg-email" type="email" placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="reg-address" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  Dirección Completa *
                </FormLabel>
                <FormControl>
                  <Input id="reg-address" placeholder="Calle, Número, Localidad (Ej: Av. Colón 1234, Mar del Plata)" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Esta dirección se geolocalizará para futuras referencias.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isRegistering} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancelar y Volver a Buscar
            </Button>
            <Button type="submit" disabled={isRegistering} className="w-full sm:flex-1 bg-primary hover:bg-primary/90">
              {isRegistering ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-5 w-5" />
              )}
              {isRegistering ? 'Registrando...' : 'Registrar Cliente'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
