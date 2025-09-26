
// src/components/admin/cotizaciones/PriceRangeTable.tsx
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, PlusCircle } from "lucide-react";
import { ServiceTypeEnum } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import { deletePriceRange } from '@/app/admin/cotizaciones/actions';
import { PriceRangeForm } from './PriceRangeForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type PriceRange = {
  id: number;
  distanciaMinKm: number;
  distanciaMaxKm: number;
  precioRango: number;
  serviceType: ServiceTypeEnum;
  isActive: boolean;
};

interface PriceRangeTableProps {
  initialData: PriceRange[];
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'true': 'default',
  'false': 'destructive',
};

const serviceTypeMap: Record<ServiceTypeEnum, string> = {
  [ServiceTypeEnum.EXPRESS]: 'Express',
  [ServiceTypeEnum.LOW_COST]: 'Low Cost',
};

export function PriceRangeTable({ initialData }: PriceRangeTableProps) {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  
  const handleEdit = (priceRange: PriceRange) => {
    setSelectedPriceRange(priceRange);
    setIsFormOpen(true);
  };
  
  const handleAddNew = () => {
    setSelectedPriceRange(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este rango de precios?')) {
      return;
    }
    const result = await deletePriceRange(id);
    if (result.success) {
      toast({ title: "Rango Eliminado", description: "El rango de precios ha sido eliminado." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };
  
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Gestión de Cotizaciones</h1>
         <DialogTrigger asChild>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Rango
          </Button>
        </DialogTrigger>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableCaption>Listado de todos los rangos de precios.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Distancia (Km)</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((pr) => (
              <TableRow key={pr.id}>
                <TableCell className="font-medium">{pr.id}</TableCell>
                <TableCell>{serviceTypeMap[pr.serviceType]}</TableCell>
                <TableCell>{`${pr.distanciaMinKm} - ${pr.distanciaMaxKm}`}</TableCell>
                <TableCell className="text-right">${pr.precioRango.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={statusVariantMap[String(pr.isActive)]}>
                    {pr.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => handleEdit(pr)}>
                        <Pencil className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleDelete(pr.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedPriceRange ? 'Editar' : 'Agregar'} Rango de Precios</DialogTitle>
        </DialogHeader>
        <PriceRangeForm 
          priceRange={selectedPriceRange} 
          onSuccess={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
