// src/components/admin/repartidores/RepartidorForm.tsx
'use client';

import { useActionState, useEffect, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createRepartidor, updateRepartidor } from '@/app/admin/repartidores/actions';
import type { RepartidorFormState } from '@/app/admin/repartidores/actions';
import { useToast } from '@/hooks/use-toast';
import { Repartidor } from '@prisma/client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, UserPlus } from 'lucide-react';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const repartidorSchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.string().min(2, 'El nombre es requerido.'),
  phone: z.string().min(7, 'El teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  vehicleType: z.string().min(3, 'El tipo de vehículo es requerido.'),
  licensePlate: z.string().min(4, 'La patente es requerida.'),
  isActive: z.boolean(),
});

type RepartidorFormValues = z.infer<typeof repartidorSchema>;

interface RepartidorFormProps {
  repartidor?: Repartidor | null;
  onSuccess: () => void;
}

const initialState: RepartidorFormState = {};

function SubmitButton({ isPending, isNew }: { isPending: boolean; isNew: boolean }) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isNew ? <UserPlus className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />)}
      {isPending ? (isNew ? 'Creando...' : 'Guardando...') : (isNew ? 'Crear Repartidor' : 'Guardar Cambios')}
    </Button>
  );
}

export function RepartidorForm({ repartidor, onSuccess }: RepartidorFormProps) {
  const isNew = !repartidor;
  const action = isNew ? createRepartidor : updateRepartidor;

  const [state, formAction] = useActionState(action, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<RepartidorFormValues>({
    resolver: zodResolver(repartidorSchema),
    defaultValues: {
      id: repartidor?.id,
      name: repartidor?.name || '',
      phone: repartidor?.phone || '',
      vehicleType: repartidor?.vehicleType || 'Moto',
      licensePlate: repartidor?.licensePlate || '',
      isActive: repartidor?.isActive ?? true,
    },
  });

  const { setError, reset } = form;

  useEffect(() => {
    if (state?.message) {
      toast({ title: 'Éxito', description: state.message });
      reset({ name: '', phone: '', vehicleType: 'Moto', licensePlate: '', isActive: true });
      onSuccess();
    }
    if (state?.error) {
      toast({ title: 'Error', description: state.error, variant: 'destructive' });
    }
    if (state?.fieldErrors) {
      for (const [field, errors] of Object.entries(state.fieldErrors)) {
        if (errors) {
          setError(field as keyof RepartidorFormValues, { type: 'server', message: errors.join(', ') });
        }
      }
    }
  }, [state, toast, setError, onSuccess, reset]);

  useEffect(() => {
    // Reset form when repartidor prop changes (e.g., clicking edit on another one)
    reset({
      id: repartidor?.id,
      name: repartidor?.name || '',
      phone: repartidor?.phone || '',
      vehicleType: repartidor?.vehicleType || 'Moto',
      licensePlate: repartidor?.licensePlate || '',
      isActive: repartidor?.isActive ?? true,
    });
  }, [repartidor, reset]);

  const onFormSubmit = (data: RepartidorFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    startTransition(() => formAction(formData));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="grid gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="Nombre del repartidor" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input type="tel" placeholder="223..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="vehicleType" render={({ field }) => (
              <FormItem><FormLabel>Tipo de Vehículo</FormLabel><FormControl><Input placeholder="Ej: Moto" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="licensePlate" render={({ field }) => (
              <FormItem><FormLabel>Patente</FormLabel><FormControl><Input placeholder="ABC 123" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="isActive" render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2">
              <div className="space-y-0.5">
                <FormLabel>Estado</FormLabel>
                <FormDescription>Activo para recibir nuevas órdenes.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )} />
        </div>
        
        <DialogFooter className="pt-4">
          <SubmitButton isPending={isPending} isNew={isNew} />
        </DialogFooter>
      </form>
    </Form>
  );
}
