'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allDeliveryTimes, deliveryStartTimes } from '@/lib/data';
import { ArrowRight, PlusCircle, Trash2 } from 'lucide-react';
import { generateOrderNumber } from '@/lib/utils';
import type { ShippingData } from './shipping-form';

const shippingTypes = ['Envio Express', 'Envio Lowcost', 'Punto de retiro'] as const;

const receiverSchema = z.object({
  shippingType: z.enum(shippingTypes),
  receiverName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  receiverAddress: z.string(),
  receiverPhone: z.string().min(6, { message: 'El teléfono debe ser válido.' }),
  receiverAmount: z.string().optional(),
  receiverNotes: z.string().optional(),
  deliveryStartTime: z.string().optional(),
  deliveryEndTime: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.shippingType === 'Punto de retiro') {
        // No extra validation needed as address will be auto-filled
    } else if (data.shippingType === 'Envio Lowcost' || data.shippingType === 'Envio Express') {
        if (!data.receiverAddress || data.receiverAddress.length < 5) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'La dirección de entrega debe tener al menos 5 caracteres.',
                path: ['receiverAddress'],
            });
        }
    }
    
    if (data.shippingType === 'Envio Express') {
      if (!data.deliveryStartTime) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Requerido.', path: ['deliveryStartTime'] });
      }
      if (!data.deliveryEndTime) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Requerido.', path: ['deliveryEndTime'] });
      }
      if (data.deliveryStartTime && data.deliveryEndTime) {
        const startTime = new Date(`1970-01-01T${data.deliveryStartTime}:00`);
        const endTime = new Date(`1970-01-01T${data.deliveryEndTime}:00`);
        const diffHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        if (diffHours < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El rango debe ser de al menos 2 horas.',
            path: ['deliveryEndTime'],
          });
        }
      }
    }
});

const batchFormSchema = z.object({
  senderName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  senderAddress: z.string().min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
  senderNotes: z.string().optional(),
  receivers: z.array(receiverSchema).min(1, { message: 'Debe agregar al menos un destinatario.' }),
});

type BatchFormValues = z.infer<typeof batchFormSchema>;

type BatchShippingFormProps = {
  onFormSubmit: (data: ShippingData[]) => void;
};

export function BatchShippingForm({ onFormSubmit }: BatchShippingFormProps) {
  const form = useForm<BatchFormValues>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      senderName: '',
      senderAddress: '',
      senderNotes: '',
      receivers: [{ 
        shippingType: 'Envio Lowcost',
        receiverName: '',
        receiverAddress: '',
        receiverPhone: '',
        receiverAmount: '',
        receiverNotes: '',
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'receivers',
  });

  const watchedReceivers = form.watch('receivers');

  function onSubmit(values: BatchFormValues) {
    const generatedLabels: ShippingData[] = values.receivers.map(receiver => {
      let prefix = 'LOW';
      if (receiver.shippingType === 'Envio Express') prefix = 'EXP';
      if (receiver.shippingType === 'Punto de retiro') prefix = 'PR';
      const orderNumber = generateOrderNumber(prefix);
      
      return {
        ...values,
        ...receiver,
        receiverAddress: receiver.shippingType === 'Punto de retiro' ? '11 de Septiembre 3317, Mar del Plata' : receiver.receiverAddress,
        orderNumber,
      };
    });
    onFormSubmit(generatedLabels);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Datos del Remitente (para todos los envíos)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre / Cliente</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Juan Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="senderAddress"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Dirección de Retiro</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Av. Colón 1234" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="senderNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas adicionales para el retiro</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Tocar timbre depto 5B (esta nota se aplica a todos los retiros)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </CardContent>
        </Card>

        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Destinatarios</h3>
            {fields.map((field, index) => {
              const currentShippingType = watchedReceivers[index]?.shippingType;
              const currentDeliveryStartTime = watchedReceivers[index]?.deliveryStartTime;

              let deliveryEndTimes = allDeliveryTimes;
              if (currentDeliveryStartTime) {
                  const [hour, minute] = currentDeliveryStartTime.split(':').map(Number);
                  const startTime = new Date();
                  startTime.setHours(hour, minute, 0, 0);
                  startTime.setHours(startTime.getHours() + 2);

                  deliveryEndTimes = allDeliveryTimes.filter(time => {
                      const [endHour, endMinute] = time.split(':').map(Number);
                      const endTime = new Date();
                      endTime.setHours(endHour, endMinute, 0, 0);
                      return endTime >= startTime;
                  });
              }

            return (
                <Card key={field.id} className="relative bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Envío #{index + 1}</CardTitle>
                    {fields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name={`receivers.${index}.shippingType`}
                    render={({ field: selectField }) => (
                        <FormItem>
                        <FormLabel>Tipo de Envío</FormLabel>
                        <Select 
                            onValueChange={(value) => {
                                selectField.onChange(value);
                                if (value === 'Punto de retiro') {
                                    form.setValue(`receivers.${index}.receiverAddress`, '11 de Septiembre 3317, Mar del Plata');
                                } else {
                                    if(form.getValues(`receivers.${index}.receiverAddress`) === '11 de Septiembre 3317, Mar del Plata') {
                                        form.setValue(`receivers.${index}.receiverAddress`, '');
                                    }
                                }
                            }} 
                            defaultValue={selectField.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {shippingTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                     {currentShippingType === 'Envio Express' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <FormField
                                control={form.control}
                                name={`receivers.${index}.deliveryStartTime`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desde</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Inicio" /></SelectTrigger></FormControl>
                                        <SelectContent>{deliveryStartTimes.map(time => <SelectItem key={time} value={time}>{time} hs</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`receivers.${index}.deliveryEndTime`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hasta</FormLabel>
                                     <Select onValueChange={field.onChange} value={field.value} disabled={!currentDeliveryStartTime}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Fin" /></SelectTrigger></FormControl>
                                        <SelectContent>{deliveryEndTimes.map(time => <SelectItem key={time} value={time}>{time} hs</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    )}


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name={`receivers.${index}.receiverName`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre Destinatario</FormLabel>
                            <FormControl><Input placeholder="Ej: María Gonzalez" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`receivers.${index}.receiverPhone`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl><Input placeholder="Ej: 2235123456" type="tel" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                     <FormField
                        control={form.control}
                        name={`receivers.${index}.receiverAddress`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección de Entrega</FormLabel>
                            <FormControl>
                            <Input placeholder="Ej: Rivadavia 5678" {...field} disabled={currentShippingType === 'Punto de retiro'} />
                            </FormControl>
                             {currentShippingType === 'Punto de retiro' && <FormDescription>Dirección de nuestro punto de retiro.</FormDescription>}
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`receivers.${index}.receiverAmount`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monto a Cobrar (Opcional)</FormLabel>
                            <FormControl><Input placeholder="Ej: 1500" type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`receivers.${index}.receiverNotes`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notas para la entrega</FormLabel>
                            <FormControl><Textarea placeholder="Ej: Entregar en recepción" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                </CardContent>
                </Card>
            )})}
        </div>
        
        <div className="flex justify-between items-center">
             <Button
                type="button"
                variant="outline"
                onClick={() => append({ 
                    shippingType: 'Envio Lowcost',
                    receiverName: '',
                    receiverAddress: '',
                    receiverPhone: '',
                    receiverAmount: '',
                    receiverNotes: ''
                })}
                >
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Otro Destinatario
            </Button>

            <Button type="submit" size="lg">
                Generar {fields.length} Etiqueta(s)
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
        {form.formState.errors.receivers?.root && (
            <FormMessage>{form.formState.errors.receivers.root.message}</FormMessage>
        )}
      </form>
    </Form>
  );
}
