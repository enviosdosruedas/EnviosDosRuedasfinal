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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScanBarcode, Loader2, Search, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarcodeScanner } from './BarcodeScanner';

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
  const [isScannerOpen, setIsScannerOpen] = useState(false);

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
  
  const handleBarcodeScanned = (barcode: string) => {
    form.setValue('orderNumber', barcode);
    setIsScannerOpen(false);
    // Automatically submit the form after scanning
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanBarcode className="w-6 h-6 text-primary" />
            Asignar Nuevas Entregas
          </CardTitle>
          <CardDescription>
            Ingresa el número de orden o escanéalo para añadir una entrega a tu hoja de ruta.
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
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Ej: EXP-1722..." {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" size="icon" onClick={() => setIsScannerOpen(true)} title="Escanear Código de Barras">
                        <Camera className="h-5 w-5" />
                      </Button>
                    </div>
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
      
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Escanear Código de Barras</DialogTitle>
            <DialogDescription>
              Apunta la cámara al código de barras de la etiqueta.
            </DialogDescription>
          </DialogHeader>
          <BarcodeScanner onScan={handleBarcodeScanned} />
        </DialogContent>
      </Dialog>
    </>
  );
}
