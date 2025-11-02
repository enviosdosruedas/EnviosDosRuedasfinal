// src/components/admin/repartidores/HojaDeRuta.tsx
'use client';

import { useState, useMemo, useTransition } from 'react';
import type { Repartidor } from "@prisma/client";
import type { FormattedEtiqueta } from "@/types";
import { EtiquetaStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Printer, Search, Map, Truck, Check, Package, X, Loader2 } from 'lucide-react';
import { updateStatusDelivered, updateStatusOnTheWay, assignEtiquetaToRepartidor } from '@/app/admin/repartidores/actions';
import { useToast } from '@/hooks/use-toast';

interface HojaDeRutaProps {
    repartidor: Repartidor;
    etiquetas: FormattedEtiqueta[];
}

const statusConfig = {
    [EtiquetaStatus.PENDIENTE]: { text: 'Pendiente', color: 'bg-gray-200 text-gray-800' },
    [EtiquetaStatus.IMPRESA]: { text: 'Lista para Salir', color: 'bg-yellow-200 text-yellow-800' },
    [EtiquetaStatus.EN_CAMINO]: { text: 'En Camino', color: 'bg-blue-200 text-blue-800' },
    [EtiquetaStatus.ENTREGADA]: { text: 'Entregada', color: 'bg-green-200 text-green-800' },
    [EtiquetaStatus.NO_ENTREGADA]: { text: 'No Entregada', color: 'bg-red-200 text-red-800' },
};


export function HojaDeRuta({ repartidor, etiquetas: allEtiquetas }: HojaDeRutaProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [filter, setFilter] = useState<string>('hoy'); // 'hoy', 'todas'
    const [statusFilter, setStatusFilter] = useState<string>('todos'); // 'todos', 'pendientes', 'en_camino', 'entregadas'
    const [searchTerm, setSearchTerm] = useState('');
    const [etiquetas, setEtiquetas] = useState(allEtiquetas);


    const etiquetasAsignadas = useMemo(() => {
        return etiquetas
            .filter(e => e.repartidorId === repartidor.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [etiquetas, repartidor.id]);

    const etiquetasFiltradas = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return etiquetasAsignadas.filter(e => {
            const dateMatch = filter === 'todas' || new Date(e.createdAt).setHours(0,0,0,0) === today.getTime();
            
            const statusMatch = statusFilter === 'todos' || 
                               (statusFilter === 'pendientes' && (e.status === EtiquetaStatus.IMPRESA)) ||
                               (statusFilter === 'en_camino' && e.status === EtiquetaStatus.EN_CAMINO) ||
                               (statusFilter === 'entregadas' && e.status === EtiquetaStatus.ENTREGADA);
            
            const searchMatch = searchTerm === '' ||
                                e.destinatarioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                e.destinatarioDireccion.toLowerCase().includes(searchTerm.toLowerCase());

            return dateMatch && statusMatch && searchMatch;
        });
    }, [etiquetasAsignadas, filter, statusFilter, searchTerm]);

    const handleUpdateStatus = (etiquetaId: number, currentStatus: EtiquetaStatus) => {
        startTransition(async () => {
            let result;
            let nextStatus: EtiquetaStatus | null = null;

            if (currentStatus === EtiquetaStatus.IMPRESA) {
                result = await updateStatusOnTheWay(etiquetaId);
                nextStatus = EtiquetaStatus.EN_CAMINO;
            } else if (currentStatus === EtiquetaStatus.EN_CAMINO) {
                result = await updateStatusDelivered(etiquetaId);
                nextStatus = EtiquetaStatus.ENTREGADA;
            } else {
                return; // No action for other statuses from this button
            }

            if (result.success && nextStatus) {
                setEtiquetas(prev => prev.map(e => e.id === etiquetaId ? { ...e, status: nextStatus! } : e));
                toast({ title: "Estado Actualizado" });
            } else {
                toast({ title: "Error", description: result.error, variant: 'destructive' });
            }
        });
    };
    
    const ActionButton = ({ etiqueta }: { etiqueta: FormattedEtiqueta }) => {
        const status = etiqueta.status;

        if (status === EtiquetaStatus.IMPRESA) {
            return <Button size="sm" onClick={() => handleUpdateStatus(etiqueta.id, status)} disabled={isPending}><Truck className='mr-2 h-4 w-4' />En Camino</Button>
        }
        if (status === EtiquetaStatus.EN_CAMINO) {
            return <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus(etiqueta.id, status)} disabled={isPending}><Check className='mr-2 h-4 w-4' />Entregada</Button>
        }
        if (status === EtiquetaStatus.ENTREGADA) {
             return <Badge className={statusConfig[EtiquetaStatus.ENTREGADA].color}><Check className='mr-2 h-4 w-4'/> {statusConfig[EtiquetaStatus.ENTREGADA].text}</Badge>
        }
        return <Badge className={statusConfig[status]?.color || 'bg-gray-200'}><X className='mr-2 h-4 w-4'/> {statusConfig[status]?.text || 'Desconocido'}</Badge>
    };

    return (
        <Card className='shadow-lg'>
            <CardHeader>
                <CardTitle>Hoja de Ruta de {repartidor.name}</CardTitle>
                <CardDescription>Visualiza y gestiona las entregas asignadas para el día de hoy.</CardDescription>
                <div className="flex flex-col md:flex-row gap-2 pt-4">
                    <div className="relative w-full md:flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por cliente o dirección..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                     <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos los Estados</SelectItem>
                            <SelectItem value="pendientes">Listas para Salir</SelectItem>
                            <SelectItem value="en_camino">En Camino</SelectItem>
                            <SelectItem value="entregadas">Entregadas</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filtrar por fecha" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hoy">Entregas de Hoy</SelectItem>
                            <SelectItem value="todas">Todas las Entregas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimir Ruta</Button>
                </div>
            </CardHeader>
            <CardContent>
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
                               <TableCell colSpan={4} className="text-center h-24">No hay entregas para los filtros seleccionados.</TableCell>
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
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">Mostrando {etiquetasFiltradas.length} de {etiquetasAsignadas.length} entregas asignadas a {repartidor.name}.</p>
            </CardFooter>
        </Card>
    );
}
