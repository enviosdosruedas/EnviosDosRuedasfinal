// src/components/admin/ordenes/OrdenesTable.tsx
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Order as PrismaOrder, Client } from "@prisma/client";
import { deleteOrder } from '@/app/admin/ordenes/actions';
import { useToast } from "@/hooks/use-toast";

// The formatted order type that the component will receive
type FormattedOrder = Omit<PrismaOrder, 'quotedPrice' | 'shippingCost' | 'totalCost' | 'originLat' | 'originLng' | 'destinationLat' | 'destinationLng' | 'client'> & {
  quotedPrice: number;
  shippingCost: number;
  totalCost: number;
  originLat: number | null;
  originLng: number | null;
  destinationLat: number | null;
  destinationLng: number | null;
  client: (Omit<Client, 'addressLat' | 'addressLng'> & {
    addressLat: number | null;
    addressLng: number | null;
  }) | null;
};

interface OrdenesTableProps {
  orders: FormattedOrder[];
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'pendiente': 'outline',
  'en_curso': 'secondary',
  'entregado': 'default',
  'cancelado': 'destructive',
};

export function OrdenesTable({ orders }: OrdenesTableProps) {
  const { toast } = useToast();

  const handleDelete = async (orderId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta orden? Esta acción no se puede deshacer.')) {
      return;
    }

    const result = await deleteOrder(orderId);

    if (result.success) {
      toast({
        title: "Orden Eliminada",
        description: `La orden #${orderId} ha sido eliminada. La lista se actualizará.`,
        variant: 'default',
        className: "bg-green-100 border-green-400 text-green-700",
      });
    } else {
      toast({
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la orden.",
        variant: "destructive",
      });
    }
  };

  if (orders.length === 0) {
    return (
        <div className="text-center py-10 px-4 bg-gray-50 rounded-lg border-2 border-dashed">
            <h3 className="text-lg font-medium text-gray-800">No hay órdenes para mostrar</h3>
            <p className="text-sm text-gray-500 mt-2">Cuando se creen nuevas órdenes, aparecerán aquí.</p>
        </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>Un listado de las órdenes más recientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Origen</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            <TableHead className="text-center w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.client?.name || order.clientNameAtOrder || "N/A"}</TableCell>
              <TableCell>{order.originAddress}</TableCell>
              <TableCell>{order.destinationAddress}</TableCell>
              <TableCell>
                <Badge variant={statusVariantMap[order.status] || 'default'} className="capitalize">
                  {order.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                  {format(new Date(order.createdAt), "dd MMM yyyy, p", { locale: es })}
              </TableCell>
              <TableCell className="text-right">${order.totalCost.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => alert('Función de editar no implementada.')}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive focus:bg-destructive/10"
                      onSelect={() => handleDelete(order.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
