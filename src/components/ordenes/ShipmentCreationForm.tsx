
// src/components/ordenes/ShipmentCreationForm.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Client } from '@prisma/client';
import { ServiceTypeEnum } from '@prisma/client'; 
import { quoteShipment, saveShipment } from '@/app/ordenes/actions';
import type { QuoteDetails, SaveShipmentInput } from '@/types/order-actions';
import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import RouteMap from '@/components/calculator/route-map';
import { MapPin, Truck, Package, Calculator as CalculatorIcon, Loader2, CalendarIcon, User, Phone, Mail, Clock, PackagePlus, ArrowLeft } from 'lucide-react';
import { format, isValid, parse, addDays, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const shipmentCreationZodSchema = z.object({
  originFullName: z.string().min(3, 'Nombre del punto de recogida es requerido.'),
  originPhone: z.string().regex(/^\+?\d{7,15}$/, 'Teléfono de recogida inválido. Ej: 2231234567'),
  originAddress: z.string().min(5, 'Dirección de recogida es requerida.'),
  
  destinationContactName: z.string().min(3, 'Nombre del destinatario es requerido.'),
  destinationContactPhone: z.string().regex(/^\+?\d{7,15}$/, 'Teléfono del destinatario inválido. Ej: 2231234567'),
  destinationContactEmail: z.string().email('Email del destinatario inválido.').optional().or(z.literal('')),
  destinationAddress: z.string().min(5, 'Dirección de destino es requerida.'),

  serviceType: z.nativeEnum(ServiceTypeEnum), 
  pickupDate: z.date({ required_error: "Fecha de retiro es requerida." }), 
  deliveryDate: z.date({ required_error: "Fecha de entrega es requerida." }),
  pickupTimeFrom: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para retiro desde."),
  pickupTimeTo: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para retiro hasta."),
  deliveryTimeFrom: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para entrega desde."),
  deliveryTimeTo: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato HH:MM inválido para entrega hasta."),
})
.refine(data => data.pickupTimeFrom < data.pickupTimeTo, { 
  message: "La hora 'desde' de retiro debe ser anterior a la hora 'hasta'.", 
  path: ["pickupTimeTo"] 
})
.refine(data => data.deliveryTimeFrom < data.deliveryTimeTo, { 
  message: "La hora 'desde' de entrega debe ser anterior a la hora 'hasta'.", 
  path: ["deliveryTimeTo"] 
})
.refine(data => data.pickupDate <= data.deliveryDate, {
    message: "La fecha de entrega no puede ser anterior a la fecha de retiro.",
    path: ["deliveryDate"],
})
.refine(data => {
    if (data.pickupDate.getTime() === data.deliveryDate.getTime()) { 
        const pickupEndMinutes = parseInt(data.pickupTimeTo.split(':')[0], 10) * 60 + parseInt(data.pickupTimeTo.split(':')[1], 10);
        const deliveryStartMinutes = parseInt(data.deliveryTimeFrom.split(':')[0], 10) * 60 + parseInt(data.deliveryTimeFrom.split(':')[1], 10);
        return deliveryStartMinutes > pickupEndMinutes;
    }
    return true;
}, {
    message: "Si la entrega es el mismo día, la hora 'desde' de entrega debe ser posterior a la hora 'hasta' de retiro.",
    path: ["deliveryTimeFrom"],
});


type ShipmentCreationFormValues = z.infer<typeof shipmentCreationZodSchema>;

interface ShipmentCreationFormProps {
  initialClientData: Client | null;
  onOrderCreated: (orderId: number) => void;
  onBack: () => void; 
  setIsParentProcessing: (isProcessing: boolean) => void;
}

export function ShipmentCreationForm({ initialClientData, onOrderCreated, onBack, setIsParentProcessing }: ShipmentCreationFormProps) {
  const [isQuoting, setIsQuoting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  const [showMap, setShowMap] = useState(false);
  const { toast } = useToast();

  const today = useMemo(() => startOfDay(new Date()), []);

  const defaultFormValues = useMemo(() => ({
    originFullName: '',
    originPhone: '',
    originAddress: '',
    destinationContactName: initialClientData?.name ? `${initialClientData.name} ${initialClientData.lastName || ''}`.trim() : '',
    destinationContactPhone: initialClientData?.phone || '',
    destinationContactEmail: initialClientData?.email || '',
    destinationAddress: initialClientData?.address || '',
    serviceType: ServiceTypeEnum.EXPRESS, 
    pickupDate: today,
    pickupTimeFrom: '09:00',
    pickupTimeTo: '13:00',
    deliveryDate: today,
    deliveryTimeFrom: '14:00',
    deliveryTimeTo: '18:00',
  }), [initialClientData, today]);

  const form = useForm<ShipmentCreationFormValues>({
    resolver: zodResolver(shipmentCreationZodSchema),
    defaultValues: defaultFormValues,
  });
  
  useEffect(() => {
    form.reset(defaultFormValues);
    setQuoteDetails(null); 
    setShowMap(false);
  }, [defaultFormValues, form.reset]);


  const handleCalculateQuote = async () => {
    const isValidQuoteRequest = await form.trigger([
        "originAddress", 
        "destinationAddress", 
        "serviceType"
    ]);
    if (!isValidQuoteRequest) {
        toast({ title: 'Error de Validación', description: 'Por favor, corrige los campos marcados antes de cotizar.', variant: 'destructive' });
        return;
    }

    const origin = form.getValues('originAddress');
    const destination = form.getValues('destinationAddress');
    const service = form.getValues('serviceType');

    setIsQuoting(true);
    setShowMap(true); 
    toast({ title: 'Calculando Cotización...', description: 'Obteniendo detalles de la ruta y precio.' });

    try {
      const result = await quoteShipment({ 
        originAddress: origin, 
        destinationAddress: destination, 
        serviceType: service 
      });
      if (result.success && result.data) {
        setQuoteDetails(result.data);
        const priceDisplay = result.data.price !== null ? `$${result.data.price.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "Consultar";
        toast({ title: 'Cotización Calculada', description: `Precio: ${priceDisplay}. Distancia: ${result.data.distanceText}`, variant: 'default' });
      } else {
        setQuoteDetails(null);
        toast({ title: 'Error al Cotizar', description: result.error || 'No se pudo calcular la cotización.', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error al cotizar:', error);
      setQuoteDetails(null);
      toast({ title: 'Error de Conexión', description: 'No se pudo conectar para cotizar. Intenta de nuevo.', variant: 'destructive' });
    } finally {
      setIsQuoting(false);
    }
  };
  
  const handleRouteCalculatedForQuote = (distance: string, duration: string) => {
    // This callback is part of RouteMap, it might be used to update state if needed here
    // But quoteShipment action handles its own logic including pricing.
  };


  async function onSubmit(data: ShipmentCreationFormValues) {
    if (!quoteDetails || quoteDetails.price === null) {
      toast({ title: 'Cotización Requerida', description: 'Debes calcular una cotización válida antes de crear el envío.', variant: 'destructive' });
      return;
    }

    setIsSaving(true);
    setIsParentProcessing(true);
    toast({ title: 'Creando Envío...', description: 'Guardando los detalles del envío.' });

    const submissionData: SaveShipmentInput = {
      clientId: initialClientData?.id, 
      originFullName: data.originFullName,
      originPhone: data.originPhone,
      originAddress: data.originAddress,
      originLat: quoteDetails.originLat, 
      originLng: quoteDetails.originLng,

      destinationContactName: data.destinationContactName,
      destinationContactPhone: data.destinationContactPhone,
      destinationContactEmail: data.destinationContactEmail || undefined,
      destinationAddress: data.destinationAddress,
      destinationLat: quoteDetails.destinationLat,
      destinationLng: quoteDetails.destinationLng,
      
      serviceType: data.serviceType,
      quotedPrice: quoteDetails.price,
      distanceText: quoteDetails.distanceText,
      durationText: quoteDetails.durationText,
      
      clientNameAtOrder: data.destinationContactName,
      clientPhoneAtOrder: data.destinationContactPhone,

      pickupDate: data.pickupDate,
      pickupTimeFrom: data.pickupTimeFrom,
      pickupTimeTo: data.pickupTimeTo,
      
      deliveryDate: data.deliveryDate,
      deliveryTimeFrom: data.deliveryTimeFrom,
      deliveryTimeTo: data.deliveryTimeTo,

      pickupDateTime: parse(`${format(data.pickupDate, 'yyyy-MM-dd')}T${data.pickupTimeFrom}:00`, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
      deliveryDateTime: parse(`${format(data.deliveryDate, 'yyyy-MM-dd')}T${data.deliveryTimeFrom}:00`, "yyyy-MM-dd'T'HH:mm:ss", new Date()),
      
      shippingCost: quoteDetails.price, 
      totalCost: quoteDetails.price, 
    };

    try {
      const result = await saveShipment(submissionData);
      if (result.success && result.shipmentId) {
        onOrderCreated(result.shipmentId);
        form.reset(defaultFormValues); 
        setQuoteDetails(null);
        setShowMap(false);
      } else {
        let errorMessage = result.error || 'Ocurrió un error inesperado al guardar.';
        if (result.fieldErrors) {
          const fieldErrorMessages = result.fieldErrors.map(e => `${(e.path && e.path.length > 0) ? e.path.join('.') : 'general'}: ${e.message}`).join('; ');
          errorMessage = `Error de validación al guardar: ${fieldErrorMessages}`;
          result.fieldErrors.forEach(err => {
            if (err.path && err.path.length > 0 && form.getFieldState(err.path[0] as keyof ShipmentCreationFormValues)) {
               form.setError(err.path[0] as keyof ShipmentCreationFormValues, { message: err.message });
            }
          });
        }
        toast({
          title: 'Error al Crear Envío',
          description: errorMessage,
          variant: 'destructive',
          duration: 7000,
        });
      }
    } catch (error) {
      console.error('Error al guardar envío:', error);
      toast({
        title: 'Error de Conexión',
        description: 'No se pudo conectar para guardar el envío. Intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
      setIsParentProcessing(false);
    }
  }
  
  const originAddressForMap = form.watch('originAddress');
  const destinationAddressForMap = form.watch('destinationAddress');
  const pickupDateValue = form.watch('pickupDate');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {initialClientData && (
          <Card className="bg-blue-50 border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700 flex items-center"><User className="mr-2 h-5 w-5"/>Cliente Seleccionado</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-blue-600">
              <p><strong>Nombre:</strong> {initialClientData.name} {initialClientData.lastName || ''}</p>
              <p><strong>Teléfono:</strong> {initialClientData.phone}</p>
              {initialClientData.email && <p><strong>Email:</strong> {initialClientData.email}</p>}
              <p><strong>Dirección Registrada:</strong> {initialClientData.address}</p>
            </CardContent>
          </Card>
        )}

        {/* Recogida Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><MapPin className="mr-2 h-5 w-5 text-primary" />Detalles de Recogida</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="originFullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Contacto en Recogida *</FormLabel>
                <FormControl><Input placeholder="Ej: Nombre de la tienda o persona" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="originPhone" render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono del Contacto en Recogida *</FormLabel>
                <FormControl><Input type="tel" placeholder="Ej: 2231234567" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="originAddress" render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección de Recogida *</FormLabel>
                <FormControl><Input placeholder="Calle, Número, Localidad (Ej: Av. Colón 1234, Mar del Plata)" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <FormField control={form.control} name="pickupDate" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Retiro *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("w-full pl-3 text-left font-normal h-10", !field.value && "text-muted-foreground")}>
                          {field.value && isValid(field.value) ? format(field.value, "PPP", { locale: es }) : <span>Selecciona fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus disabled={(date) => date < today} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="pickupTimeFrom" render={({ field }) => (
                <FormItem>
                  <FormLabel>Retiro Desde *</FormLabel>
                  <FormControl><Input type="time" {...field} className="h-10"/></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="pickupTimeTo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Retiro Hasta *</FormLabel>
                  <FormControl><Input type="time" {...field} className="h-10"/></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </CardContent>
        </Card>

        {/* Destinatario Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><User className="mr-2 h-5 w-5 text-primary" />Información del Destinatario</CardTitle>
            <CardDescription>
              {initialClientData ? "Datos precargados del cliente. Edita si es necesario para este envío específico." : "Ingresa los datos del destinatario."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="destinationContactName" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo del Destinatario *</FormLabel>
                <FormControl><Input placeholder="Nombre y Apellido" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="destinationContactPhone" render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono del Destinatario *</FormLabel>
                <FormControl><Input type="tel" placeholder="Ej: 2237654321" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="destinationContactEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Email del Destinatario (Opcional)</FormLabel>
                <FormControl><Input type="email" placeholder="correo@ejemplo.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="destinationAddress" render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección de Entrega *</FormLabel>
                <FormControl><Input placeholder="Calle, Número, Localidad (Ej: San Martín 5678, Mar del Plata)" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <FormField control={form.control} name="deliveryDate" render={({ field }) => (
                 <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Entrega *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("w-full pl-3 text-left font-normal h-10", !field.value && "text-muted-foreground")}>
                           {field.value && isValid(field.value) ? format(field.value, "PPP", { locale: es }) : <span>Selecciona fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus disabled={(date) => date < (pickupDateValue || today)} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="deliveryTimeFrom" render={({ field }) => (
                <FormItem>
                  <FormLabel>Entrega Desde *</FormLabel>
                  <FormControl><Input type="time" {...field} className="h-10"/></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="deliveryTimeTo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Entrega Hasta *</FormLabel>
                  <FormControl><Input type="time" {...field} className="h-10"/></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </CardContent>
        </Card>

        {/* Servicio y Cotizacion Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-xl"><Truck className="mr-2 h-5 w-5 text-primary" />Tipo de Servicio y Cotización</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="serviceType" render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Servicio *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger className="h-10"><SelectValue placeholder="Selecciona un tipo de servicio" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value={ServiceTypeEnum.EXPRESS}>Express (Entrega Rápida)</SelectItem>
                    <SelectItem value={ServiceTypeEnum.LOW_COST}>Low Cost (Económico)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="button" onClick={handleCalculateQuote} 
            disabled={isQuoting || !originAddressForMap || !destinationAddressForMap} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-10">
              {isQuoting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalculatorIcon className="mr-2 h-4 w-4" />}
              {isQuoting ? 'Calculando...' : 'Calcular Ruta y Precio'}
            </Button>
          </CardContent>
        </Card>
        
        {showMap && originAddressForMap && destinationAddressForMap && (
          <div className="rounded-lg overflow-hidden shadow-md">
            <RouteMap
              originAddress={originAddressForMap}
              destinationAddress={destinationAddressForMap}
              isCalculating={isQuoting} 
              onRouteCalculated={handleRouteCalculatedForQuote} 
            />
          </div>
        )}

        {quoteDetails && !isQuoting && (
            <Card className={`mt-6 shadow-md ${quoteDetails.price === null  ? "bg-orange-50 border-orange-300" : "bg-green-50 border-green-300"}`}>
            <CardHeader>
                <CardTitle className={`flex items-center text-lg ${quoteDetails.price === null ? "text-orange-700" : "text-green-700"}`}>
                <Package className="mr-2 h-5 w-5" /> Cotización del Envío
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Distancia:</span> <span className="font-semibold">{quoteDetails.distanceText}</span></div>
                <div className="flex justify-between"><span>Tiempo Estimado:</span> <span className="font-semibold">{quoteDetails.durationText}</span></div>
                <div className="flex justify-between items-baseline pt-2 border-t mt-2">
                    <span className="text-base">Precio Estimado:</span> 
                    <span className={`text-xl font-bold ${quoteDetails.price === null ? "text-orange-600" : "text-green-600"}`}>
                        {quoteDetails.price !== null ? `$${quoteDetails.price.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "Consultar"}
                    </span>
                </div>
                {quoteDetails.price === null && (
                <p className="text-xs text-orange-600 mt-1 text-center">
                    Distancia fuera de rango para cotización automática o error en cálculo. Por favor, contacta para confirmar precio.
                </p>
                )}
            </CardContent>
            </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <Button type="button" onClick={onBack} variant="outline" className="w-full sm:w-auto h-10" disabled={isSaving || isQuoting}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button type="submit" disabled={isSaving || isQuoting || !quoteDetails || quoteDetails.price === null} className="w-full sm:flex-1 bg-primary hover:bg-primary/90 h-10">
            {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <PackagePlus className="mr-2 h-5 w-5" />}
            {isSaving ? 'Guardando Envío...' : 'Confirmar y Guardar Envío'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
