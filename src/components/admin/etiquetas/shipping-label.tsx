'use client';

import type { ShippingData } from './shipping-form';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Zap, Phone, Globe, Home, Package, Building, Clock } from 'lucide-react';

type ShippingLabelProps = {
  data: ShippingData;
  isMultiple?: boolean;
  isLast?: boolean;
};

// A simple placeholder for a barcode
const Barcode = () => (
  <svg
    className="w-full h-16"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 40"
    preserveAspectRatio="none"
  >
    <g fill="black">
      <rect x="0" y="0" width="4" height="40" />
      <rect x="6" y="0" width="2" height="40" />
      <rect x="10" y="0" width="2" height="40" />
      <rect x="14" y="0" width="4" height="40" />
      <rect x="20" y="0" width="2" height="40" />
      <rect x="24" y="0" width="4" height="40" />
      <rect x="30" y="0" width="2" height="40" />
      <rect x="34" y="0" width="2" height="40" />
      <rect x="38" y="0" width="4" height="40" />
      <rect x="44" y="0" width="2" height="40" />
      <rect x="48" y="0" width="4" height="40" />
      <rect x="54" y="0" width="2" height="40" />
      <rect x="58" y="0" width="2" height="40" />
      <rect x="62" y="0" width="4" height="40" />
      <rect x="68" y="0" width="2" height="40" />
      <rect x="72" y="0" width="4" height="40" />
      <rect x="78" y="0" width="2" height="40" />
      <rect x="82" y="0" width="4" height="40" />
      <rect x="88" y="0" width="2" height="40" />
      <rect x="92" y="0" width="2" height="40" />
      <rect x="96" y="0" width="4" height="40" />
      <rect x="102" y="0" width="2" height="40" />
      <rect x="106" y="0" width="4" height="40" />
      <rect x="112" y="0" width="2" height="40" />
      <rect x="116" y="0" width="4" height="40" />
      <rect x="122" y="0" width="2" height="40" />
      <rect x="126" y="0" width="2" height="40" />
      <rect x="130" y="0" width="4" height="40" />
      <rect x="136" y="0" width="2" height="40" />
      <rect x="140" y="0" width="4" height="40" />
      <rect x="146" y="0" width="2" height="40" />
      <rect x="150" y="0" width="4" height="40" />
      <rect x="156" y="0" width="2" height="40" />
      <rect x="160" y="0" width="4" height="40" />
      <rect x="166" y="0" width="2" height="40" />
      <rect x="170" y="0" width="2" height="40" />
      <rect x="174" y="0" width="4" height="40" />
      <rect x="180" y="0" width="2" height="40" />
      <rect x="184" y="0" width="4" height="40" />
      <rect x="190" y="0" width="2" height="40" />
      <rect x="194" y="0" width="4" height="40" />
    </g>
  </svg>
);

export function ShippingLabel({ data, isMultiple = false, isLast = true }: ShippingLabelProps) {

  return (
    <div className="printable-label-wrapper">
      <Card className="max-w-4xl mx-auto bg-card printable-area" id="shipping-label">
        <CardContent className="p-4 md:p-6 text-black">
          <header className="flex justify-between items-start pb-4 border-b-2 border-dashed border-gray-300">
            <div className="flex items-center gap-3">
              <Zap className="h-10 w-10 text-black" />
              <div>
                <h2 className="text-2xl font-bold">Envios DosRuedas</h2>
                <p className="text-sm">Tu solución logística</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{data.shippingType}</p>
              <p className="text-xs text-gray-600">Nº Orden:</p>
              <p className="font-mono font-bold text-base">{data.orderNumber}</p>
            </div>
          </header>

          <div className="py-4 text-center">
            <Barcode />
            <p className="font-mono tracking-widest text-lg mt-1">{data.orderNumber}</p>
          </div>

          {(data.shippingType === 'Envio Express' && data.deliveryStartTime && data.deliveryEndTime) ? (
            <div className="text-center bg-gray-100 p-3 rounded-lg my-4 border border-gray-200">
                <p className="font-bold text-lg">ENTREGAR ENTRE LAS {data.deliveryStartTime} Y {data.deliveryEndTime} HS</p>
            </div>
          ) : data.shippingType === 'Envio Lowcost' && (
            <div className="text-center bg-gray-100 p-3 rounded-lg my-4 border border-gray-200">
                <p className="font-bold text-lg flex items-center justify-center gap-2"><Clock className="w-5 h-5"/> HORARIO DE ENTREGA: 10 A 19 HS</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-dashed border-gray-300">
            <div className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2"><Home className="w-5 h-5"/> REMITENTE</h3>
              <div className="pl-7">
                <p className="font-semibold">{data.senderName}</p>
                <p>{data.senderAddress}</p>
                {data.senderNotes && <p className="text-sm text-gray-600 italic mt-1">Nota: {data.senderNotes}</p>}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                {data.shippingType === 'Punto de retiro' ? <Building className="w-5 h-5"/> : <Package className="w-5 h-5"/>}
                DESTINATARIO
              </h3>
              <div className="pl-7">
                <p className="font-semibold">{data.receiverName}</p>
                <p>{data.receiverAddress}</p>
                <p className="flex items-center gap-1"><Phone className="w-3 h-3"/> {data.receiverPhone}</p>
                {data.receiverNotes && <p className="text-sm text-gray-600 italic mt-1">Nota: {data.receiverNotes}</p>}
              </div>
            </div>
          </div>

          {data.receiverAmount && (
            <div className="mt-4 pt-4 border-t border-gray-200 text-center bg-yellow-100 p-4 rounded-lg">
                <p className="text-2xl md:text-3xl font-bold">MONTO A COBRAR: ${parseFloat(data.receiverAmount).toLocaleString('es-AR')}</p>
            </div>
          )}

          <footer className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center text-xs text-gray-500">
            <div className="flex justify-center items-center gap-4">
                 <p className="flex items-center gap-1"><Phone className="w-3 h-3"/> 2236602699</p>
                 <Separator orientation="vertical" className="h-4 bg-gray-400"/>
                 <p className="flex items-center gap-1"><Globe className="w-3 h-3"/> www.enviosdosruedas.com</p>
            </div>
            <p className="mt-2">Gracias por confiar en Envios DosRuedas.</p>
          </footer>

        </CardContent>
      </Card>
      
      {isMultiple && !isLast && (
        <div className="no-print pt-8 text-center">
            <Separator className="max-w-4xl mx-auto" />
        </div>
      )}

    </div>
  );
}
