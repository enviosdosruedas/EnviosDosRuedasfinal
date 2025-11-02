// src/components/admin/cotizaciones/EditablePriceTable.tsx
'use client';

import { useState, useEffect, useActionState, useTransition } from 'react';
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
import { Input } from '@/components/ui/input';
import { Save, Loader2, AlertCircle } from "lucide-react";
import { ServiceTypeEnum } from '@prisma/client';
import { useToast } from '@/hooks/use-toast';
import { updateMultiplePriceRanges } from '@/app/admin/cotizaciones/actions';
import type { MultiplePriceRangesState } from '@/app/admin/cotizaciones/actions';

type PriceRange = {
  id: number;
  distanciaMinKm: number;
  distanciaMaxKm: number;
  precioRango: number;
  serviceType: ServiceTypeEnum;
  isActive: boolean;
};

interface EditablePriceTableProps {
  initialData: PriceRange[];
  serviceType: ServiceTypeEnum;
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'true': 'default',
  'false': 'destructive',
};

const serviceTypeMap: Record<ServiceTypeEnum, string> = {
  [ServiceTypeEnum.EXPRESS]: 'Express',
  [ServiceTypeEnum.LOW_COST]: 'Low Cost',
  [ServiceTypeEnum.PUNTO_DE_RETIRO]: 'Punto de Retiro'
};

const initialState: MultiplePriceRangesState = {};

function SubmitButton({ isPending, hasChanges }: { isPending: boolean; hasChanges: boolean }) {
  return (
    <Button type="submit" disabled={isPending || !hasChanges}>
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
      {isPending ? 'Guardando...' : 'Guardar Cambios'}
    </Button>
  );
}

export function EditablePriceTable({ initialData, serviceType }: EditablePriceTableProps) {
  const { toast } = useToast();
  const [data, setData] = useState(initialData);
  const [changes, setChanges] = useState<Record<number, number>>({});
  const [state, formAction] = useActionState(updateMultiplePriceRanges, initialState);
  const [isPending, startTransition] = useTransition();

  const hasChanges = Object.keys(changes).length > 0;

  useEffect(() => {
    if (state?.message) {
      toast({ title: 'Éxito', description: state.message });
      setChanges({}); // Clear changes after successful save
    }
    if (state?.error) {
      toast({ title: 'Error', description: state.error, variant: 'destructive' });
    }
  }, [state, toast]);

  const handlePriceChange = (id: number, value: string) => {
    const newPrice = parseFloat(value);
    if (!isNaN(newPrice) && newPrice > 0) {
      setChanges(prev => ({ ...prev, [id]: newPrice }));
      setData(currentData =>
        currentData.map(row =>
          row.id === id ? { ...row, precioRango: newPrice } : row
        )
      );
    } else if (value === '') {
        // Allow clearing the input, but it won't be a valid change
        const { [id]: _, ...rest } = changes;
        setChanges(rest);
        setData(currentData =>
            currentData.map(row =>
            row.id === id ? { ...row, precioRango: 0 } : row // Use 0 or some placeholder
            )
        );
    }
  };
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const updates = Object.entries(changes).map(([id, precioRango]) => ({
      id: parseInt(id, 10),
      precioRango,
    }));
    formData.append('updates', JSON.stringify(updates));
    
    startTransition(() => {
        formAction(formData);
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex justify-end items-center mb-4 gap-4">
        {hasChanges && (
            <div className='flex items-center gap-2 text-sm text-yellow-600'>
                <AlertCircle className='h-4 w-4' />
                Tienes cambios sin guardar.
            </div>
        )}
        <SubmitButton isPending={isPending} hasChanges={hasChanges}/>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableCaption>Listado de las tarifas para el servicio {serviceTypeMap[serviceType]}.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Distancia (Km)</TableHead>
              <TableHead className="text-right w-48">Precio ($)</TableHead>
              <TableHead className="text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((pr) => (
              <TableRow key={pr.id} className={changes[pr.id] !== undefined ? 'bg-yellow-100/50' : ''}>
                <TableCell className="font-medium">{pr.id}</TableCell>
                <TableCell>{`${pr.distanciaMinKm.toFixed(2)} - ${pr.distanciaMaxKm.toFixed(2)}`}</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    step="0.01"
                    value={pr.precioRango > 0 ? pr.precioRango : ''}
                    onChange={(e) => handlePriceChange(pr.id, e.target.value)}
                    className="h-8 text-right bg-transparent"
                    onFocus={(e) => e.target.select()}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={statusVariantMap[String(pr.isActive)]}>
                    {pr.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </form>
  );
}
