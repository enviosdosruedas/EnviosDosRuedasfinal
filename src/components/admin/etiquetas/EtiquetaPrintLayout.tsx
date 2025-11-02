// src/components/admin/etiquetas/EtiquetaPrintLayout.tsx
'use client';
import { type Etiqueta, ServiceTypeEnum } from "@prisma/client";
import { Barcode, Package, User, Phone, MapPin, Info, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};

interface EtiquetaPrintLayoutProps {
  etiqueta: FormattedEtiqueta;
  isLast?: boolean;
}

const serviceTypeMap: Record<ServiceTypeEnum, string> = {
  [ServiceTypeEnum.EXPRESS]: 'EXPRESS',
  [ServiceTypeEnum.LOW_COST]: 'LOW COST',
  [ServiceTypeEnum.PUNTO_DE_RETIRO]: 'PUNTO DE RETIRO',
};

export function EtiquetaPrintLayout({ etiqueta, isLast = true }: EtiquetaPrintLayoutProps) {

  const barcodeText = etiqueta.orderNumber || `ID-${etiqueta.id}`;

  return (
    <div className={`bg-white p-4 border border-gray-300 w-[210mm] min-h-[100mm] mx-auto shadow-lg relative ${!isLast ? 'break-after-page' : ''}`}>
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-300 pb-2 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Envios DosRuedas</h1>
          <p className="text-sm text-gray-600">Comprobante de Envío</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">{serviceTypeMap[etiqueta.tipoEnvio]}</p>
          <p className="text-xs text-gray-500">Fecha: {format(new Date(etiqueta.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
        </div>
      </div>

      {/* Barcode and Order Number */}
      <div className="flex items-center justify-center my-4 text-center">
        <div className="flex flex-col items-center">
            {/* Fake Barcode */}
            <div className="flex items-end h-12">
                {[...Array(30)].map((_, i) => (
                <div key={i} className="bg-black" style={{ width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 20 + 20}px`, marginRight: '1px' }}></div>
                ))}
            </div>
            <p className="text-xs font-mono tracking-widest mt-1">{barcodeText}</p>
        </div>
      </div>
      
      {/* Remitente y Destinatario */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-300 pb-2 mb-2">
        {/* Remitente */}
        <div>
          <h2 className="font-bold text-gray-700 border-b mb-2 pb-1">REMITENTE</h2>
          <div className="space-y-1 text-sm">
            <p className="flex items-start"><User className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> <span className="font-semibold">{etiqueta.remitenteNombre}</span></p>
            <p className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> {etiqueta.remitenteDireccion}</p>
            {etiqueta.remitenteNotas && <p className="flex items-start text-xs text-gray-600"><Info className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" /> {etiqueta.remitenteNotas}</p>}
          </div>
        </div>

        {/* Destinatario */}
        <div>
          <h2 className="font-bold text-gray-700 border-b mb-2 pb-1">DESTINATARIO</h2>
          <div className="space-y-1 text-sm">
            <p className="flex items-start"><User className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> <span className="font-semibold">{etiqueta.destinatarioNombre}</span></p>
            <p className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> {etiqueta.destinatarioDireccion}</p>
            <p className="flex items-start"><Phone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> {etiqueta.destinatarioTelefono}</p>
            {etiqueta.destinatarioNotas && <p className="flex items-start text-xs text-gray-600"><Info className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" /> {etiqueta.destinatarioNotas}</p>}
          </div>
        </div>
      </div>
      
      {/* Monto a Cobrar y Notas */}
      <div className="grid grid-cols-2 gap-4">
        {etiqueta.montoACobrar !== null && etiqueta.montoACobrar > 0 && (
            <div className="bg-yellow-100 p-2 rounded-md border border-yellow-300">
                <h3 className="font-bold text-yellow-800 text-sm flex items-center"><DollarSign className="w-4 h-4 mr-1"/>MONTO A COBRAR</h3>
                <p className="text-2xl font-bold text-center text-yellow-900">${etiqueta.montoACobrar.toFixed(2)}</p>
            </div>
        )}
         {etiqueta.tipoEnvio === 'EXPRESS' && (etiqueta.deliveryStartTime || etiqueta.deliveryEndTime) && (
            <div className="bg-blue-100 p-2 rounded-md border border-blue-300">
                 <h3 className="font-bold text-blue-800 text-sm">FRANJA HORARIA (EXPRESS)</h3>
                 <p className="text-lg font-bold text-center text-blue-900">{etiqueta.deliveryStartTime} - {etiqueta.deliveryEndTime}</p>
            </div>
        )}
      </div>

       <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        enviosdosruedas.com
      </div>
    </div>
  );
}
