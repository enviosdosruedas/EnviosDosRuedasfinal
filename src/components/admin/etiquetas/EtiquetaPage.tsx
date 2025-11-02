// src/components/admin/etiquetas/EtiquetaPage.tsx
'use client';

import { useState } from 'react';
import { ShippingForm, type ShippingData } from '@/components/admin/etiquetas/shipping-form';
import { ShippingLabel } from '@/components/admin/etiquetas/shipping-label';
import { BatchShippingForm } from '@/components/admin/etiquetas/batch-shipping-form';
import { Package, Copy, Zap, Printer, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Mode = 'single' | 'batch';

export function EtiquetaPage() {
  const [labelData, setLabelData] = useState<ShippingData[]>([]);
  const [mode, setMode] = useState<Mode>('single');

  const handleGenerateLabel = (data: ShippingData) => {
    setLabelData([data]);
  };
  
  const handleGenerateBatchLabels = (data: ShippingData[]) => {
    setLabelData(data);
  };

  const handleNewRequest = () => {
    setLabelData([]);
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-8 md:mb-12 no-print">
        <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-display">
            Envios DosRuedas
            </h1>
        </div>
        <p className="text-lg text-muted-foreground">Generador de Etiquetas</p>
      </header>
      
      {labelData.length > 0 ? (
        <div className="space-y-8">
          <div className="labels-container print:space-y-4">
            {labelData.map((data, index) => (
              <ShippingLabel 
                key={data.orderNumber} 
                data={data}
                isMultiple={labelData.length > 1}
                isLast={index === labelData.length - 1}
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center no-print">
            <Button onClick={handleNewRequest} variant="outline" size="lg">
              <FilePlus className="mr-2 h-5 w-5" />
              Generar Nuevas Etiquetas
            </Button>
            <Button onClick={handlePrint} size="lg" variant="secondary">
              <Printer className="mr-2 h-5 w-5" />
              Imprimir o Guardar PDF
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-8 no-print">
              <Button onClick={() => setMode('single')} variant={mode === 'single' ? 'default' : 'outline'} size="lg">
                <Package className="mr-2" /> Generar Una Etiqueta
              </Button>
              <Button onClick={() => setMode('batch')} variant={mode === 'batch' ? 'default' : 'outline'} size="lg">
                <Copy className="mr-2" /> Generar Varias Etiquetas
              </Button>
          </div>

          {mode === 'single' ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-center font-display flex items-center justify-center gap-2">
                <Package className="h-6 w-6" />
                Generar Nueva Etiqueta de Envío
              </h2>
              <ShippingForm onFormSubmit={handleGenerateLabel} />
            </>
          ) : (
             <>
              <h2 className="text-2xl font-semibold mb-6 text-center font-display flex items-center justify-center gap-2">
                <Copy className="h-6 w-6" />
                Generar Múltiples Etiquetas
              </h2>
              <BatchShippingForm onFormSubmit={handleGenerateBatchLabels} />
            </>
          )}
        </div>
      )}
       <style jsx global>{`
          @media print {
            .no-print {
              display: none;
            }
            .printable-label-wrapper {
              page-break-after: always;
            }
             .printable-label-wrapper:last-child {
              page-break-after: auto;
            }
            body {
              background-color: #fff;
            }
            main {
              padding: 0;
              margin: 0;
            }
          }
      `}</style>
    </main>
  );
}
