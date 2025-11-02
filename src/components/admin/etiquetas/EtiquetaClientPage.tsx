// src/components/admin/etiquetas/EtiquetaClientPage.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { EtiquetaForm } from "@/components/admin/etiquetas/EtiquetaForm";
import { type Etiqueta as PrismaEtiqueta } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { EtiquetaPrintLayout } from "@/components/admin/etiquetas/EtiquetaPrintLayout";

type FormattedEtiquetaType = Omit<PrismaEtiqueta, 'montoACobrar' | 'orderNumber'> & {
  montoACobrar: number | null;
  orderNumber: string | null;
};

interface EtiquetaClientPageProps {
  initialData: FormattedEtiquetaType | null;
}

export function EtiquetaClientPage({ initialData }: EtiquetaClientPageProps) {
  const [etiqueta, setEtiqueta] = useState(initialData);
  const router = useRouter();

  // This effect handles the case where a new etiqueta is created and we're redirected.
  // The initialData will update, and we need to reflect that in our state.
  useEffect(() => {
    setEtiqueta(initialData);
  }, [initialData]);

  const handlePrint = () => {
    window.print();
  };

  const handleAfterPrint = () => {
    // Optional: add any logic needed after printing
  };

  useEffect(() => {
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return (
    <>
      <div className="no-print">
        <EtiquetaForm initialData={etiqueta} />
        {etiqueta && (
          <div className="max-w-4xl mx-auto mt-8 flex justify-center">
            <Button onClick={handlePrint} size="lg">
              <Printer className="mr-2 h-5 w-5" />
              Imprimir Etiqueta
            </Button>
          </div>
        )}
      </div>
      
      {etiqueta && (
        <div className="print-only">
          <EtiquetaPrintLayout etiqueta={etiqueta} />
        </div>
      )}

      <style jsx global>{`
          @media print {
            .no-print {
              display: none;
            }
            .print-only {
              display: block;
            }
            body {
              background-color: #fff;
            }
            main {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }
          }
          .print-only {
            display: none;
          }
      `}</style>
    </>
  );
}
