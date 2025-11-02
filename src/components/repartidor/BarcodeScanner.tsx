// src/components/repartidor/BarcodeScanner.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CameraOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const { ref, error } = useZxing({
    onResult(result) {
      if (!isProcessing) {
        const barcodeText = result.getText();
        if (barcodeText) {
          setIsProcessing(true);
          onScan(barcodeText);
        }
      }
    },
    onError(err) {
      console.error('Scanner Error:', err);
      if (err.name === 'NotAllowedError') {
        toast({
          variant: 'destructive',
          title: 'Acceso a la Cámara Denegado',
          description: 'Por favor, habilita el permiso de la cámara en tu navegador para usar el escáner.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error de Cámara',
          description: 'No se pudo iniciar la cámara. Asegúrate de que no esté en uso por otra aplicación.',
        });
      }
    },
  });

  if (error) {
     return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <CameraOff className="h-12 w-12 text-destructive mb-4" />
            <Alert variant="destructive">
                <AlertTitle>Error al Iniciar Cámara</AlertTitle>
                <AlertDescription>
                  {error.message.includes('permission') 
                    ? 'Permiso de cámara denegado. Por favor, habilítalo en tu navegador.'
                    : 'No se pudo acceder a la cámara.'
                  }
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
       <video ref={ref} className="w-full h-full object-cover" />
        {isProcessing && (
            <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Procesando código...</p>
            </div>
        )}
      {/* Visual guide for scanning */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-3/4 h-1/2 border-4 border-dashed border-primary/50 rounded-lg" />
      </div>
    </div>
  );
}
