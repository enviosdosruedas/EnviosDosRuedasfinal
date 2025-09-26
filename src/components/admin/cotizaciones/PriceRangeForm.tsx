
// src/components/admin/cotizaciones/PriceRangeForm.tsx
'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ServiceTypeEnum } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createPriceRange, updatePriceRange } from '@/app/admin/cotizaciones/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { PriceRangeState } from '@/app/admin/cotizaciones/actions';

const PriceRangeSchema = z.object({
  id: z.coerce.number().int().optional(),
  distanciaMinKm: z.coerce.number({ required_error: "Requerido" }).min(0, 'No puede ser negativo.'),
  distanciaMaxKm: z.coerce.number({ required_error: "Requerido" }).positive('Debe ser mayor que cero.'),
  precioRango: z.coerce.number({ required_error: "Requerido" }).positive('Debe ser mayor que cero.'),
  serviceType: z.nativeEnum(ServiceTypeEnum, { required_error: 'Requerido.' }),
  isActive: z.boolean(),
}).refine(data => data.distanciaMinKm < data.distanciaMaxKm, {
  message: 'Máxima debe ser mayor que mínima.',
  path: ['distanciaMaxKm'],
});

type PriceRangeFormValues = z.infer<typeof PriceRangeSchema>;

type PriceRange = {
  id: number;
  distanciaMinKm: number;
  distanciaMaxKm: number;
  precioRango: number;
  serviceType: ServiceTypeEnum;
  isActive: boolean;
} | null;

interface PriceRangeFormProps {
  priceRange: PriceRange;
  onSuccess: () => void;
}

const initialState: PriceRangeState = {};

function SubmitButton({ isPending, isEditing }: { isPending: boolean, isEditing: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isPending ? 'Guardando...' : isEditing ? 'Actualizar Rango' : 'Crear Rango'}
    </Button>
  );
}

export function PriceRangeForm({ priceRange, onSuccess }: PriceRangeFormProps) {
  const isEditing = !!priceRange;
  const formAction = isEditing ? updatePriceRange : createPriceRange;
  const [state, action] = useActionState(formAction, initialState);
  const { toast } = useToast();

  const form = useForm<PriceRangeFormValues>({
    resolver: zodResolver(PriceRangeSchema),
    defaultValues: {
      id: priceRange?.id,
      distanciaMinKm: priceRange?.distanciaMinKm ?? 0,
      distanciaMaxKm: priceRange?.distanciaMaxKm ?? 0,
      precioRango: priceRange?.precioRango ?? 0,
      serviceType: priceRange?.serviceType ?? ServiceTypeEnum.EXPRESS,
      isActive: priceRange?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({ title: 'Éxito', description: state.message });
      onSuccess();
    }
    if (state?.error) {
      toast({ title: 'Error', description: state.error, variant: 'destructive' });
    }
    if (state?.fieldErrors) {
      for (const [field, errors] of Object.entries(state.fieldErrors)) {
        if(errors) form.setError(field as keyof PriceRangeFormValues, { type: 'server', message: errors.join(', ') });
      }
    }
  }, [state, toast, onSuccess, form]);

  return (
    <Form {...form}>
      <form action={action} className="grid gap-4 py-4">
        {isEditing && <input type="hidden" name="id" value={priceRange.id} />}
        
        <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Tipo de Servicio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger><SelectValue placeholder="Selecciona un servicio" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value={ServiceTypeEnum.EXPRESS}>Express</SelectItem>
                    <SelectItem value={ServiceTypeEnum.LOW_COST}>Low Cost</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />
        
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="distanciaMinKm" render={({ field }) => (
                <FormItem><FormLabel>Dist. Mínima (Km)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="distanciaMaxKm" render={({ field }) => (
                <FormItem><FormLabel>Dist. Máxima (Km)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
        
        <FormField control={form.control} name="precioRango" render={({ field }) => (
            <FormItem><FormLabel>Precio</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField control={form.control} name="isActive" render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5"><FormLabel>Activo</FormLabel></div>
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            </FormItem>
        )} />
        
        <SubmitButton isPending={form.formState.isSubmitting} isEditing={isEditing} />
      </form>
    </Form>
  );
}
