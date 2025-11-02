'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { generateOrderNumber } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const shippingTypes = ['Envio Express', 'Envio Lowcost', 'Punto de retiro'] as const;

const formSchema = z
  .object({
    shippingType: z.enum(shippingTypes),
    // Sender
    senderName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    senderAddress: z.string().min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
    senderNotes: z.string().optional(),
    // Receiver
    receiverName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
    receiverAddress: z.string(),
    receiverPhone: z.string().min(6, { message: 'El teléfono debe ser válido.' }),
    receiverAmount: z.string().optional(),
    receiverNotes: z.string().optional(),
    // Express
    deliveryStartTime: z.string().optional(),
    deliveryEndTime: z.string().optional(),
  })
  .superRefine((data, ctx) => {
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
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe seleccionar una hora de inicio.',
          path: ['deliveryStartTime'],
        });
      }
      if (!data.deliveryEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe seleccionar una hora de fin.',
          path: ['deliveryEndTime'],
        });
      }
      if (data.deliveryStartTime && data.deliveryEndTime) {
        const startTime = new Date(`1970-01-01T${data.deliveryStartTime}:00`);
        const endTime = new Date(`1970-01-01T${data.deliveryEndTime}:00`);
        const diffHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        if (diffHours < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'El rango horario mínimo de entrega es de 2 horas.',
            path: ['deliveryEndTime'],
          });
        }
      }
    }
  });

export type ShippingData = z.infer<typeof formSchema> & { orderNumber: string };

type ShippingFormProps = {
  onFormSubmit: (data: ShippingData) => void;
};

export function ShippingForm({ onFormSubmit }: ShippingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingType: 'Envio Lowcost',
      senderName: '',
      senderAddress: '',
      senderNotes: '',
      receiverName: '',
      receiverAddress: '',
      receiverPhone: '',
      receiverAmount: '',
      receiverNotes: '',
    },
  });

  const shippingType = form.watch('shippingType');
  const deliveryStartTime = form.watch('deliveryStartTime');
  
  const [deliveryEndTimes, setDeliveryEndTimes] = useState<string[]>(allDeliveryTimes);

  useEffect(() => {
    if (shippingType === 'Punto de retiro') {
      form.setValue('receiverAddress', 'Rawson 2860');
    } else {
        if(form.getValues('receiverAddress') === 'Rawson 2860'){
           form.setValue('receiverAddress', '');
        }
    }
  }, [shippingType, form]);

  useEffect(() => {
    if (deliveryStartTime) {
        const [hour, minute] = deliveryStartTime.split(':').map(Number);
        const startTime = new Date();
        startTime.setHours(hour, minute, 0, 0);
        startTime.setHours(startTime.getHours() + 2); // Add 2 hours minimum

        const filteredEndTimes = allDeliveryTimes.filter(time => {
            const [endHour, endMinute] = time.split(':').map(Number);
            const endTime = new Date();
            endTime.setHours(endHour, endMinute, 0, 0);
            return endTime >= startTime;
        });
        setDeliveryEndTimes(filteredEndTimes);
        
        const currentEndTime = form.getValues('deliveryEndTime');
        if (currentEndTime && !filteredEndTimes.includes(currentEndTime)) {
            form.setValue('deliveryEndTime', undefined);
        }

    } else {
        setDeliveryEndTimes(allDeliveryTimes);
    }
  }, [deliveryStartTime, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    let prefix = 'LOW';
    if (values.shippingType === 'Envio Express') prefix = 'EXP';
    if (values.shippingType === 'Punto de retiro') prefix = 'PR';

    const orderNumber = generateOrderNumber(prefix);
    onFormSubmit({ ...values, orderNumber });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Envío</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="shippingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccione una opción</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de envío" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shippingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             {shippingType === 'Envio Express' && (
              <div className="mt-6 space-y-4">
                 <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Horario de Entrega Express</AlertTitle>
                    <AlertDescription>
                     El rango mínimo de entrega es de 2 horas. Por ejemplo, si el retiro es a las 9:00hs, la entrega puede ser a partir de las 11:00hs.
                    </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="deliveryStartTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desde</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Inicio" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {deliveryStartTimes.map(time => <SelectItem key={time} value={time}>{time} hs</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deliveryEndTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hasta</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!deliveryStartTime}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Fin" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {deliveryEndTimes.map(time => <SelectItem key={time} value={time}>{time} hs</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Remitente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <FormField
                control={form.control}
                name="senderNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas adicionales</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Tocar timbre depto 5B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Datos del Destinatario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="receiverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: María Gonzalez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiverAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Entrega</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ej: Rivadavia 5678" 
                        {...field} 
                        disabled={shippingType === 'Punto de retiro'}
                      />
                    </FormControl>
                    {shippingType === 'Punto de retiro' && <FormDescription>Dirección de nuestro punto de retiro.</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiverPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 2235123456" {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="receiverAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto a Cobrar (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: 1500" {...field} type="number" />
                    </FormControl>
                     <FormDescription>Dejar en blanco si no se debe cobrar nada.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="receiverNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas adicionales</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Entregar en recepción" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Generar Etiqueta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
