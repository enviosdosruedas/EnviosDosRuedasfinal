// src/components/repartidor/AssignEtiqueta.tsx
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignEtiquetaByOrderNumber } from '@/app/admin/repartidores/actions';
import type { FormattedEtiqueta } from '@/types';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScanBarcode, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssignEtiquetaProps {
  repartidorId: number;
  onEtiquetaAssigned: (etiqueta: FormattedEtiqueta) => void;
}

const assignSchema = z.object({
  orderNumber: z.string().min(3, { message: 'El número de orden es requerido.' }),
});

type AssignFormValues = z.infer<typeof assignSchema>;

export function AssignEtiqueta({ repartidorId, onEtiquetaAssigned }: AssignEtiquetaProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<AssignFormValues>({
    resolver: zodResolver(assignSchema),
    defaultValues: { orderNumber: '' },
  });

  const onSubmit = (data: AssignFormValues) => {
    startTransition(async () => {
      const result = await assignEtiquetaByOrderNumber(repartidorId, data.orderNumber);

      if (result.success && result.etiqueta) {
        onEtiquetaAssigned(result.etiqueta);
        form.reset();
      } else {
        toast({
          title: 'Error al Asignar',
          description: result.error || 'No se pudo asignar la etiqueta.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScanBarcode className="w-6 h-6 text-primary" />
          Asignar Nuevas Entregas
        </CardTitle>
        <CardDescription>
          Ingresa el número de orden de la etiqueta para añadirla a tu hoja de ruta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Número de Orden</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: EXP-1722..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {isPending ? 'Buscando...' : 'Asignar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
