
// src/components/repartidor/BarcodeScanner.tsx
'use client';

import React, { useState } from 'react';
import { BarcodeReader } from 'react-zxing';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CameraOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = (result: any) => {
    if (result && !isProcessing) {
      const barcodeText = result.getText();
      if (barcodeText) {
        setIsProcessing(true);
        onScan(barcodeText);
      }
    }
  };

  const handlePermission = (permission: boolean) => {
    setHasPermission(permission);
    if (!permission) {
      toast({
        variant: 'destructive',
        title: 'Acceso a la Cámara Denegado',
        description: 'Por favor, habilita el permiso de la cámara en tu navegador para usar el escáner.',
      });
    }
  };

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden border bg-muted">
       {hasPermission === false ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <CameraOff className="h-12 w-12 text-destructive mb-4" />
              <Alert variant="destructive">
                  <AlertTitle>Permiso de Cámara Requerido</AlertTitle>
                  <AlertDescription>
                    No se pudo acceder a la cámara. Por favor, habilita los permisos en la configuración de tu navegador.
                  </AlertDescription>
              </Alert>
          </div>
      ) : (
          <>
              <BarcodeReader onDecode={handleScan} onPermission={handlePermission} />
              {hasPermission === null && !isProcessing && (
                  <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="mt-2 text-sm text-muted-foreground">Iniciando cámara...</p>
                  </div>
              )}
               {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="mt-2 text-sm text-muted-foreground">Procesando código...</p>
                  </div>
              )}
          </>
      )}
      {/* Visual guide for scanning */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-3/4 h-1/2 border-4 border-dashed border-primary/50 rounded-lg" />
      </div>
    </div>
  );
}

