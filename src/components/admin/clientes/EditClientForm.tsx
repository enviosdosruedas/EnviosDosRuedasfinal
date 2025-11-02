// src/components/admin/clientes/EditClientForm.tsx
'use client';

import React, { useActionState, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateClient, geocodeAddress } from '@/app/admin/clientes/actions';
import type { ClientFormState } from '@/app/admin/clientes/actions';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Search, CheckCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import type { Client as PrismaClient } from "@prisma/client";

type FormattedClient = Omit<PrismaClient, 'addressLat' | 'addressLng'> & {
  addressLat: number | null;
  addressLng: number | null;
};

interface EditClientFormProps {
  client: FormattedClient;
}

const clientSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(2, 'El nombre es requerido.'),
  lastName: z.string().optional(),
  phone: z.string().min(7, 'El teléfono es requerido.').regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.').optional().or(z.literal('')),
  email: z.string().email('Email inválido.').optional().or(z.literal('')),
  address: z.string().min(5, 'La dirección es requerida.'),
  addressLat: z.coerce.number({ invalid_type_error: 'La latitud es requerida para guardar.' }),
  addressLng: z.coerce.number({ invalid_type_error: 'La longitud es requerida para guardar.' }),
});

type ClientFormValues = z.infer<typeof clientSchema>;

const initialState: ClientFormState = {};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
      {isPending ? 'Guardando Cambios...' : 'Guardar Cambios'}
    </Button>
  );
}

export function EditClientForm({ client }: EditClientFormProps) {
  const [state, formAction] = useActionState(updateClient, initialState);
  const [isPending, startTransition] = useTransition();
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingResult, setGeocodingResult] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const { toast } = useToast();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: client.id,
      name: client.name,
      lastName: client.lastName || '',
      phone: client.phone || '',
      email: client.email || '',
      address: client.address,
      addressLat: client.addressLat || undefined,
      addressLng: client.addressLng || undefined,
    },
  });

  const { setError, setValue, clearErrors } = form;

  useEffect(() => {
    if (state?.message) {
      toast({ title: 'Éxito', description: state.message, className: 'bg-green-100 border-green-400 text-green-700' });
    }
    if (state?.error) {
      toast({ title: 'Error al Guardar', description: state.error, variant: 'destructive' });
    }
    if (state?.fieldErrors) {
      for (const [field, errors] of Object.entries(state.fieldErrors)) {
        setError(field as keyof ClientFormValues, { type: 'server', message: errors?.join(', ') });
      }
    }
  }, [state, toast, setError]);

  const handleGeocode = async () => {
    const address = form.getValues('address');
    if (!address || address.length < 5) {
      form.setError('address', { message: 'Ingresa una dirección válida para verificar.' });
      return;
    }

    setIsGeocoding(true);
    setGeocodingResult(null);
    const result = await geocodeAddress(address);
    setIsGeocoding(false);

    if (result.success && result.data) {
      setValue('addressLat', result.data.lat);
      setValue('addressLng', result.data.lng);
      setValue('address', result.data.formatted_address);
      setGeocodingResult({ message: `Dirección verificada: ${result.data.formatted_address}`, type: 'success' });
      clearErrors(['addressLat', 'addressLng']);
    } else {
      setGeocodingResult({ message: result.error || 'No se pudo verificar la dirección.', type: 'error' });
      form.setError('address', { message: 'La dirección no pudo ser verificada.' });
    }
  };

  const onFormSubmit = form.handleSubmit((data) => {
    if (typeof data.addressLat !== 'number' || typeof data.addressLng !== 'number') {
      form.setError('address', { message: 'Por favor, verifica la dirección antes de guardar.' });
      return;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    startTransition(() => formAction(formData));
  });

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit} className="space-y-6">
        <input type="hidden" {...form.register('id')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Nombre *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem><FormLabel>Apellido</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem><FormLabel>Email (Opcional)</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <div className="space-y-2">
            <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                    <FormLabel>Dirección *</FormLabel>
                    <div className="flex gap-2">
                        <FormControl><Input {...field} /></FormControl>
                        <Button type="button" onClick={handleGeocode} disabled={isGeocoding} variant="secondary" className="shrink-0">
                            {isGeocoding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Verificar
                        </Button>
                    </div>
                    <FormDescription>Ingresa la dirección y verifícala para obtener las coordenadas.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
             {geocodingResult && (
                <Alert variant={geocodingResult.type === 'error' ? 'destructive' : 'default'} className={geocodingResult.type === 'success' ? 'bg-green-50 border-green-200' : ''}>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>{geocodingResult.type === 'success' ? 'Verificación Exitosa' : 'Error de Verificación'}</AlertTitle>
                    <AlertDescription>{geocodingResult.message}</AlertDescription>
                </Alert>
            )}
        </div>
        
        <input type="hidden" {...form.register('addressLat')} />
        <input type="hidden" {...form.register('addressLng')} />

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/admin/clientes">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Volver al listado
                </Link>
            </Button>
            <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
