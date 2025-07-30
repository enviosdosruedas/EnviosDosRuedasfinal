
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Client } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Loader2, Search, Phone } from 'lucide-react';
import { searchClientByPhone } from '@/app/ordenes/actions';
import { useToast } from '@/hooks/use-toast';

const searchClientSchema = z.object({
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido. Ej: 2231234567 o +5492231234567'),
});

type SearchClientFormValues = z.infer<typeof searchClientSchema>;

interface ClientSearchFormProps {
  onClientFound: (client: Client) => void;
  onClientNotFound: (phone: string) => void;
  setIsParentProcessing: (isProcessing: boolean) => void;
}

export function ClientSearchForm({ onClientFound, onClientNotFound, setIsParentProcessing }: ClientSearchFormProps) {
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const form = useForm<SearchClientFormValues>({
    resolver: zodResolver(searchClientSchema),
    defaultValues: {
      phone: '',
    },
  });

  async function onSubmit(data: SearchClientFormValues) {
    setIsSearching(true);
    setIsParentProcessing(true);
    toast({ title: 'Buscando Cliente...', description: `Buscando por teléfono: ${data.phone}` });

    try {
      const result = await searchClientByPhone({ phone: data.phone });
      if (result.success) {
        if (result.data) {
          toast({
            title: 'Cliente Encontrado',
            description: `Cliente: ${result.data.name} ${result.data.lastName || ''}`,
            variant: 'default',
            className: 'bg-green-100 border-green-400 text-green-700',
          });
          onClientFound(result.data);
        } else {
          toast({
            title: 'Cliente No Encontrado',
            description: 'Puedes registrarlo en el siguiente paso.',
            variant: 'default',
          });
          onClientNotFound(data.phone);
        }
      } else {
        toast({
          title: 'Error en la Búsqueda',
          description: result.error || 'Ocurrió un error inesperado.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error al buscar cliente:', error);
      toast({
        title: 'Error de Conexión',
        description: 'No se pudo conectar con el servidor. Intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
      setIsParentProcessing(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="client-phone" className="flex items-center text-md">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                Número de Teléfono del Cliente
              </FormLabel>
              <FormControl>
                <Input
                  id="client-phone"
                  type="tel"
                  placeholder="Ej: 2231234567 o +5492231234567"
                  {...field}
                  className="text-base py-3"
                />
              </FormControl>
              <FormDescription className="text-xs">
                Ingresa el número completo, incluyendo código de área si aplica.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSearching} className="w-full py-3 text-base bg-primary hover:bg-primary/90">
          {isSearching ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Search className="mr-2 h-5 w-5" />
          )}
          {isSearching ? 'Buscando...' : 'Buscar Cliente'}
        </Button>
        <p className="text-sm text-center text-muted-foreground mt-4">
          Si el cliente no existe, podrás registrarlo en el siguiente paso.
        </p>
      </form>
    </Form>
  );
}
