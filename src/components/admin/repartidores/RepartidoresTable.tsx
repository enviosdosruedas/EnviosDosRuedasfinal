
// src/components/admin/repartidores/RepartidoresTable.tsx
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { deleteRepartidor } from '@/app/admin/repartidores/actions';
import type { Repartidor } from "@prisma/client";

interface RepartidoresTableProps {
  repartidores: Repartidor[];
  onEdit: (repartidor: Repartidor) => void;
}

const statusConfig = {
  active: { variant: "default" as const, text: 'Activo', icon: UserCheck },
  inactive: { variant: "destructive" as const, text: 'Inactivo', icon: UserX },
};

export function RepartidoresTable({ repartidores, onEdit }: RepartidoresTableProps) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este repartidor? Esta acción no se puede deshacer.')) {
      return;
    }

    const result = await deleteRepartidor(id);

    if (result.success) {
      toast({
        title: "Repartidor Eliminado",
        description: `El repartidor ha sido eliminado exitosamente.`,
      });
    } else {
      toast({
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el repartidor.",
        variant: "destructive",
      });
    }
  };

  if (repartidores.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">No hay repartidores registrados aún. Haz clic en &quot;Añadir Repartidor&quot; para empezar.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Vehículo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repartidores.map((repartidor) => {
            const statusInfo = repartidor.isActive ? statusConfig.active : statusConfig.inactive;
            return (
              <TableRow key={repartidor.id}>
                <TableCell className="font-medium">{repartidor.name}</TableCell>
                <TableCell>
                  <div className="text-sm">{repartidor.phone}</div>
                </TableCell>
                <TableCell>
                    <div className="text-sm">{repartidor.vehicleType}</div>
                    <div className="text-xs text-muted-foreground">{repartidor.licensePlate}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusInfo.variant} className="capitalize">
                    <statusInfo.icon className="mr-1 h-3 w-3" />
                    {statusInfo.text}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => onEdit(repartidor)}>
                        <Pencil className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => handleDelete(repartidor.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
