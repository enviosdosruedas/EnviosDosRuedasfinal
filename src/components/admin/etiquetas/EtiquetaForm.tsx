// src/components/admin/etiquetas/EtiquetaForm.tsx
'use client';

import { useActionState, useEffect, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { ServiceTypeEnum, type Etiqueta as PrismaEtiqueta } from '@prisma/client';

import { upsertEtiqueta } from '@/app/admin/etiquetas/actions';
import type { EtiquetaFormState } from '@/app/admin/etiquetas/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, Send, User, MapPin, Phone, MessageSquare, Briefcase, Clock } from 'lucide-react';

const PUNTO_RETIRO_ADDRESS = "11 de Septiembre 3317, Mar del Plata";

const timeStringToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const EtiquetaFormSchema = z.object({
  id: z.coerce.number().int().optional(),
  orderNumber: z.string().optional(),
  tipoEnvio: z.nativeEnum(ServiceTypeEnum, { required_error: 'El tipo de servicio es requerido.' }),
  
  remitenteNombre: z.string().min(3, { message: 'El nombre del remitente es requerido.' }),
  remitenteDireccion: z.string().min(5, { message: 'La dirección de retiro es requerida.' }),
  remitenteNotas: z.string().optional(),
  
  destinatarioNombre: z.string().min(3, { message: 'El nombre del destinatario es requerido.' }),
  destinatarioDireccion: z.string().min(5, { message: 'La dirección de entrega es requerida.' }),
  destinatarioTelefono: z.string().regex(/^\+?\d{7,15}$/, 'Formato de teléfono inválido.'),
  montoACobrar: z.coerce.number().min(0, "El monto no puede ser negativo.").optional().or(z.literal('')),
  destinatarioNotas: z.string().optional(),
  deliveryStartTime: z.string().optional(),
  deliveryEndTime: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.tipoEnvio === ServiceTypeEnum.EXPRESS) {
    if (!data.deliveryStartTime || !data.deliveryEndTime) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El rango horario es requerido para envíos Express.", path: ["deliveryStartTime"] });
    } else {
      const start = timeStringToMinutes(data.deliveryStartTime);
      const end = timeStringToMinutes(data.deliveryEndTime);
      if (end <= start) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La hora final debe ser posterior a la inicial.", path: ["deliveryEndTime"] });
      } else if (end - start < 120) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El rango horario debe ser de al menos 2 horas.", path: ["deliveryEndTime"] });
      }
    }
  }

  if (data.tipoEnvio === ServiceTypeEnum.PUNTO_DE_RETIRO && data.destinatarioDireccion !== PUNTO_RETIRO_ADDRESS) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La dirección debe ser la del punto de retiro.", path: ["destinatarioDireccion"] });
  }
});


type EtiquetaFormValues = z.infer<typeof EtiquetaFormSchema>;

interface EtiquetaFormProps {
  initialData?: (Omit<PrismaEtiqueta, 'montoACobrar'> & { montoACobrar: number | null }) | null;
}

const initialState: EtiquetaFormState = {};

function SubmitButton({ isPending, isNew }: { isPending: boolean, isNew: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isNew ? <Send className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />)}
      {isPending ? (isNew ? 'Generando Etiqueta...' : 'Guardando Cambios...') : (isNew ? 'Generar Etiqueta' : 'Guardar Cambios')}
    </Button>
  );
}

export function EtiquetaForm({ initialData }: EtiquetaFormProps) {
  const [state, formAction] = useActionState(upsertEtiqueta, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const isNew = !initialData?.id;

  const form = useForm<EtiquetaFormValues>({
    resolver: zodResolver(EtiquetaFormSchema),
    defaultValues: {
      id: initialData?.id,
      orderNumber: initialData?.orderNumber ?? '',
      tipoEnvio: initialData?.tipoEnvio || ServiceTypeEnum.LOW_COST,
      remitenteNombre: initialData?.remitenteNombre || '',
      remitenteDireccion: initialData?.remitenteDireccion || '',
      remitenteNotas: initialData?.remitenteNotas || '',
      destinatarioNombre: initialData?.destinatarioNombre || '',
      destinatarioDireccion: initialData?.destinatarioDireccion || '',
      destinatarioTelefono: initialData?.destinatarioTelefono || '',
      montoACobrar: initialData?.montoACobrar ?? '',
      destinatarioNotas: initialData?.destinatarioNotas || '',
      deliveryStartTime: initialData?.deliveryStartTime || '09:00',
      deliveryEndTime: initialData?.deliveryEndTime || '11:00',
    },
  });

  const tipoEnvio = form.watch('tipoEnvio');

  useEffect(() => {
    if (tipoEnvio === ServiceTypeEnum.PUNTO_DE_RETIRO) {
      form.setValue('destinatarioDireccion', PUNTO_RETIRO_ADDRESS);
    }
  }, [tipoEnvio, form]);

  useEffect(() => {
    if (state?.message) {
      toast({ title: 'Éxito', description: state.message });
      if (isNew && state.etiquetaId) {
        router.push(`/admin/etiquetas/${state.etiquetaId}`);
      }
       if (state.etiquetaId) {
        router.refresh();
      }
    }
    if (state?.error) {
      toast({ title: 'Error', description: state.error, variant: 'destructive' });
    }
    if (state?.fieldErrors) {
      for (const [fieldName, errors] of Object.entries(state.fieldErrors)) {
        if (errors) {
          form.setError(fieldName as keyof EtiquetaFormValues, { type: 'server', message: errors.join(', ') });
        }
      }
    }
  }, [state, toast, isNew, router, form]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof typeof data];
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }
    startTransition(() => formAction(formData));
  });

  return (
    <Card className="max-w-4xl mx-auto shadow-lg bg-background">
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="p-6 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Briefcase /> Tipo de Envío</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField control={form.control} name="tipoEnvio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seleccione una opción</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecciona un tipo de envío" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value={ServiceTypeEnum.EXPRESS}>Envío Express</SelectItem>
                        <SelectItem value={ServiceTypeEnum.LOW_COST}>Envío Lowcost</SelectItem>
                        <SelectItem value={ServiceTypeEnum.PUNTO_DE_RETIRO}>Punto de Retiro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                 {tipoEnvio === ServiceTypeEnum.EXPRESS && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField control={form.control} name="deliveryStartTime" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2"><Clock />Desde</FormLabel>
                                <FormControl><Input type="time" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="deliveryEndTime" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2"><Clock />Hasta</FormLabel>
                                <FormControl><Input type="time" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><User /> Datos del Remitente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField name="remitenteNombre" render={({ field }) => (
                    <FormItem><FormLabel>Nombre / Cliente</FormLabel><FormControl><Input placeholder="Ej: Juan Pérez" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="remitenteDireccion" render={({ field }) => (
                    <FormItem><FormLabel>Dirección de Retiro</FormLabel><FormControl><Input placeholder="Ej: Av. Colón 1234" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="remitenteNotas" render={({ field }) => (
                    <FormItem><FormLabel>Notas adicionales</FormLabel><FormControl><Textarea placeholder="Ej: Tocar timbre depto 5B" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><User /> Datos del Destinatario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField name="destinatarioNombre" render={({ field }) => (
                    <FormItem><FormLabel>Nombre y Apellido</FormLabel><FormControl><Input placeholder="Ej: María Gonzalez" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="destinatarioDireccion" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección de Entrega</FormLabel>
                      <FormControl><Input placeholder="Ej: Rivadavia 5678" {...field} disabled={tipoEnvio === ServiceTypeEnum.PUNTO_DE_RETIRO} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="destinatarioTelefono" render={({ field }) => (
                    <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input type="tel" placeholder="Ej: 2235123456" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="montoACobrar" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto a Cobrar (Opcional)</FormLabel>
                      <FormControl><Input type="number" step="0.01" placeholder="Ej: 1500" {...field} /></FormControl>
                      <FormDescription>Dejar en blanco si no se debe cobrar nada.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="destinatarioNotas" render={({ field }) => (
                    <FormItem><FormLabel>Notas adicionales</FormLabel><FormControl><Textarea placeholder="Ej: Entregar en recepción" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="p-6">
            <SubmitButton isPending={isPending} isNew={isNew} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
