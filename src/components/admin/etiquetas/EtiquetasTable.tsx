// src/components/admin/etiquetas/EtiquetasTable.tsx
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Printer, MoreVertical, Check, X, Loader2, Truck, PackageCheck, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ServiceTypeEnum } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { EtiquetaStatus, type FormattedEtiqueta } from '@/types';
import { updateEtiquetaStatus } from '@/app/admin/etiquetas/actions';
import { useRouter } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";


interface EtiquetasTableProps {
  etiquetas: FormattedEtiqueta[];
  onPrint: (etiqueta: FormattedEtiqueta) => void;
}

const serviceTypeMap: Record<ServiceTypeEnum, string> = {
  [ServiceTypeEnum.EXPRESS]: 'Express',
  [ServiceTypeEnum.LOW_COST]: 'Low Cost',
  [ServiceTypeEnum.PUNTO_DE_RETIRO]: 'Punto de Retiro',
};

const serviceTypeVariantMap: { [key in ServiceTypeEnum]: "default" | "secondary" | "outline" } = {
  [ServiceTypeEnum.EXPRESS]: 'default',
  [ServiceTypeEnum.LOW_COST]: 'secondary',
  [ServiceTypeEnum.PUNTO_DE_RETIRO]: 'outline',
};

const statusConfig = {
  [EtiquetaStatus.PENDIENTE]: { variant: "destructive" as "destructive", text: 'Pendiente', icon: X },
  [EtiquetaStatus.IMPRESA]: { variant: "default" as "default", text: 'Impresa', icon: Check },
  [EtiquetaStatus.EN_CAMINO]: { variant: "secondary" as "secondary", text: 'En Camino', icon: Truck },
  [EtiquetaStatus.ENTREGADA]: { variant: "outline" as "outline", text: 'Entregada', icon: PackageCheck },
  [EtiquetaStatus.NO_ENTREGADA]: { variant: "destructive" as "destructive", text: 'No Entregada', icon: AlertCircle },
};

const ClientFormattedDate = ({ date }: { date: Date | string }) => {
    const [formattedDate, setFormattedDate] = React.useState<string>('Cargando...');
  
    React.useEffect(() => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      setFormattedDate(format(dateObj, "dd MMM yyyy, p", { locale: es }));
    }, [date]);
  
    return <>{formattedDate}</>;
};

function StatusChanger({ etiqueta }: { etiqueta: FormattedEtiqueta }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const currentStatusInfo = statusConfig[etiqueta.status];

  const handleChangeStatus = async (newStatus: EtiquetaStatus) => {
    if (newStatus === etiqueta.status || isUpdating) return;
    setIsUpdating(true);

    const result = await updateEtiquetaStatus(etiqueta.id, newStatus);
    
    if (result.success) {
      toast({
        title: 'Estado Actualizado',
        description: `La etiqueta #${etiqueta.id} ahora está ${statusConfig[newStatus].text}.`,
        className: 'bg-green-100 border-green-400 text-green-700',
      });
      router.refresh();
    } else {
      toast({
        title: 'Error al Actualizar',
        description: result.error || 'No se pudo cambiar el estado.',
        variant: 'destructive',
      });
    }
    setIsUpdating(false);
  };

  const StatusIcon = currentStatusInfo?.icon || X;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={currentStatusInfo?.variant || 'destructive'}
          size="sm"
          className="capitalize h-7 px-2"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <StatusIcon className="mr-1 h-3 w-3" />
          )}
          {currentStatusInfo?.text || 'Desconocido'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(EtiquetaStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            disabled={status === etiqueta.status || isUpdating}
            onSelect={() => handleChangeStatus(status)}
          >
            {statusConfig[status].text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function EtiquetasTable({ etiquetas, onPrint }: EtiquetasTableProps) {
  if (etiquetas.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-50 rounded-lg border-2 border-dashed mt-8">
        <h3 className="text-lg font-medium text-gray-800">No se encontraron etiquetas</h3>
        <p className="text-sm text-gray-500 mt-2">Prueba a cambiar los filtros o crea una nueva etiqueta.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-background mt-8">
      <Table>
        <TableCaption>Un listado de las etiquetas que coinciden con tu búsqueda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">N° Orden</TableHead>
            <TableHead>Remitente</TableHead>
            <TableHead>Destinatario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Monto a Cobrar</TableHead>
            <TableHead className="text-center w-[150px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {etiquetas.map((etiqueta) => (
            <TableRow key={etiqueta.id}>
              <TableCell className="font-medium">{etiqueta.orderNumber || `#${etiqueta.id}`}</TableCell>
              <TableCell>{etiqueta.remitenteNombre}</TableCell>
              <TableCell>{etiqueta.destinatarioNombre}</TableCell>
              <TableCell>
                <Badge variant={serviceTypeVariantMap[etiqueta.tipoEnvio]}>
                  {serviceTypeMap[etiqueta.tipoEnvio]}
                </Badge>
              </TableCell>
               <TableCell>
                <StatusChanger etiqueta={etiqueta} />
              </TableCell>
              <TableCell>
                <ClientFormattedDate date={etiqueta.createdAt} />
              </TableCell>
              <TableCell className="text-right">
                {etiqueta.montoACobrar !== null ? `$${etiqueta.montoACobrar.toFixed(2)}` : 'N/A'}
              </TableCell>
              <TableCell className="text-center space-x-1">
                 <Button asChild variant="ghost" size="icon" title="Editar">
                    <Link href={`/admin/etiquetas/${etiqueta.id}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Link>
                  </Button>
                  <Button onClick={() => onPrint(etiqueta)} variant="ghost" size="icon" title="Imprimir">
                      <Printer className="h-4 w-4" />
                      <span className="sr-only">Imprimir</span>
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
