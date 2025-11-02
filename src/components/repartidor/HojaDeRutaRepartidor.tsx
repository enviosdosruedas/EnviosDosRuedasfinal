// src/components/repartidor/HojaDeRutaRepartidor.tsx
'use client';

import { useState, useMemo, useTransition } from 'react';
import type { FormattedEtiqueta } from "@/types";
import { EtiquetaStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Printer, Search, Truck, Check, Loader2, Info } from 'lucide-react';
import { updateEtiquetaStatus } from '@/app/admin/etiquetas/actions';
import { useToast } from '@/hooks/use-toast';

interface HojaDeRutaRepartidorProps {
    etiquetas: FormattedEtiqueta[];
    onStatusChange: (etiquetaId: number, newStatus: EtiquetaStatus) => void;
}

const statusConfig = {
    [EtiquetaStatus.IMPRESA]: { text: 'Lista para Salir', color: 'bg-yellow-100 text-yellow-800' },
    [EtiquetaStatus.EN_CAMINO]: { text: 'En Camino', color: 'bg-blue-100 text-blue-800' },
    [EtiquetaStatus.ENTREGADA]: { text: 'Entregada', color: 'bg-green-100 text-green-800' },
    [EtiquetaStatus.NO_ENTREGADA]: { text: 'No Entregada', color: 'bg-red-100 text-red-800' },
    [EtiquetaStatus.PENDIENTE]: { text: 'Pendiente', color: 'bg-gray-100 text-gray-800' },
};


export function HojaDeRutaRepartidor({ etiquetas, onStatusChange }: HojaDeRutaRepartidorProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [statusFilter, setStatusFilter] = useState<string>('pendientes'); // 'todos', 'pendientes', 'en_camino', 'entregadas'
    const [searchTerm, setSearchTerm] = useState('');

    const etiquetasFiltradas = useMemo(() => {
        return etiquetas.filter(e => {
            const statusMatch = statusFilter === 'todos' || 
                               (statusFilter === 'pendientes' && (e.status === EtiquetaStatus.IMPRESA)) ||
                               (statusFilter === 'en_camino' && e.status === EtiquetaStatus.EN_CAMINO) ||
                               (statusFilter === 'entregadas' && e.status === EtiquetaStatus.ENTREGADA);
            
            const searchMatch = searchTerm === '' ||
                                e.destinatarioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                e.destinatarioDireccion.toLowerCase().includes(searchTerm.toLowerCase());

            return statusMatch && searchMatch;
        });
    }, [etiquetas, statusFilter, searchTerm]);

    const handleUpdateStatus = (etiquetaId: number, nextStatus: EtiquetaStatus) => {
        startTransition(async () => {
            const result = await updateEtiquetaStatus(etiquetaId, nextStatus);

            if (result.success) {
                onStatusChange(etiquetaId, nextStatus);
                toast({ title: `Estado Actualizado a "${statusConfig[nextStatus].text}"` });
            } else {
                toast({ title: "Error", description: result.error, variant: 'destructive' });
            }
        });
    };
    
    const ActionButton = ({ etiqueta }: { etiqueta: FormattedEtiqueta }) => {
        const { status, id } = etiqueta;

        if (status === EtiquetaStatus.IMPRESA) {
            return <Button size="sm" onClick={() => handleUpdateStatus(id, EtiquetaStatus.EN_CAMINO)} disabled={isPending}><Truck className='mr-2 h-4 w-4' />En Camino</Button>
        }
        if (status === EtiquetaStatus.EN_CAMINO) {
            return <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus(id, EtiquetaStatus.ENTREGADA)} disabled={isPending}><Check className='mr-2 h-4 w-4' />Entregada</Button>
        }
        if (status === EtiquetaStatus.ENTREGADA) {
             return <Badge className={statusConfig[status].color}><Check className='mr-2 h-4 w-4'/> {statusConfig[status].text}</Badge>
        }
        // Para otros estados como NO_ENTREGADA o PENDIENTE no se muestra acción
        return <Badge variant="outline" className="text-muted-foreground">Sin acción</Badge>
    };

    return (
        <Card className='shadow-lg'>
            <CardHeader>
                <CardTitle>Mi Hoja de Ruta</CardTitle>
                <CardDescription>Visualiza y gestiona tus entregas del día.</CardDescription>
                <div className="flex flex-col md:flex-row gap-2 pt-4">
                    <div className="relative w-full md:flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por cliente o dirección..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                     <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pendientes">Listas para Salir</SelectItem>
                            <SelectItem value="en_camino">En Camino</SelectItem>
                            <SelectItem value="entregadas">Entregadas</SelectItem>
                             <SelectItem value="todos">Todos los Estados</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Dirección</TableHead>
                                <TableHead className='text-center'>Estado</TableHead>
                                <TableHead className="text-right">Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {etiquetasFiltradas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Info className="h-8 w-8" />
                                        <p>No hay entregas para los filtros seleccionados.</p>
                                        <p className="text-xs">Prueba con otro filtro o espera nuevas asignaciones.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            etiquetasFiltradas.map(e => (
                                <TableRow key={e.id}>
                                    <TableCell>
                                        <div className="font-medium">{e.destinatarioNombre}</div>
                                        <div className="text-sm text-muted-foreground">{e.orderNumber}</div>
                                    </TableCell>
                                    <TableCell>{e.destinatarioDireccion}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={statusConfig[e.status]?.color || 'bg-gray-200'}>
                                            {statusConfig[e.status]?.text || 'Desconocido'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {isPending ? <Loader2 className="h-4 w-4 animate-spin ml-auto"/> : <ActionButton etiqueta={e} />}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
