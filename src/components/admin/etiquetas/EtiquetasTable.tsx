// src/components/admin/etiquetas/EtiquetasTable.tsx
'use client';

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
import { Pencil } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Etiqueta as PrismaEtiqueta, ServiceTypeEnum } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type FormattedEtiqueta = Omit<PrismaEtiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
  orderNumber: string | null;
};

interface EtiquetasTableProps {
  etiquetas: FormattedEtiqueta[];
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

export function EtiquetasTable({ etiquetas }: EtiquetasTableProps) {
  const { toast } = useToast();

  const handleDelete = async (etiquetaId: number) => {
    // This would call a server action, e.g., deleteEtiqueta(etiquetaId)
    // For now, it's just a placeholder.
    if (!confirm('¿Estás seguro de que deseas eliminar esta etiqueta? Esta acción no se puede deshacer.')) {
      return;
    }
    // const result = await deleteEtiqueta(etiquetaId);
    toast({
      title: "Función no implementada",
      description: "La eliminación de etiquetas aún no está disponible.",
      variant: "destructive",
    });
  };

  if (etiquetas.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-50 rounded-lg border-2 border-dashed">
        <h3 className="text-lg font-medium text-gray-800">No hay etiquetas para mostrar</h3>
        <p className="text-sm text-gray-500 mt-2">Cuando se creen nuevas etiquetas, aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-background">
      <Table>
        <TableCaption>Un listado de las etiquetas más recientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">N° Orden</TableHead>
            <TableHead>Remitente</TableHead>
            <TableHead>Destinatario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Monto a Cobrar</TableHead>
            <TableHead className="text-center w-[100px]">Acciones</TableHead>
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
                {format(new Date(etiqueta.createdAt), "dd MMM yyyy, p", { locale: es })}
              </TableCell>
              <TableCell className="text-right">
                {etiqueta.montoACobrar !== null ? `$${etiqueta.montoACobrar.toFixed(2)}` : 'N/A'}
              </TableCell>
              <TableCell className="text-center">
                 <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/etiquetas/${etiqueta.id}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Link>
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
