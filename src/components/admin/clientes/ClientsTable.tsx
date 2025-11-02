// src/components/admin/clientes/ClientsTable.tsx
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
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, UserCheck, UserX, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { toggleClientStatus } from '@/app/admin/clientes/actions';
import type { Client as PrismaClient } from "@prisma/client";

type FormattedClient = Omit<PrismaClient, 'addressLat' | 'addressLng'> & {
  addressLat: number | null;
  addressLng: number | null;
};

interface ClientsTableProps {
  clients: FormattedClient[];
}

const statusConfig = {
  active: { variant: "default" as const, text: 'Activo', icon: UserCheck },
  inactive: { variant: "destructive" as const, text: 'Inactivo', icon: UserX },
};

function StatusChanger({ client }: { client: FormattedClient }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const newStatus = client.isActive ? 'Inactivo' : 'Activo';

  const handleChangeStatus = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    
    const result = await toggleClientStatus(client.id, client.isActive);

    if (result.success) {
      toast({
        title: 'Estado Actualizado',
        description: `El cliente #${client.id} ahora está ${newStatus.toLowerCase()}.`,
        className: 'bg-green-100 border-green-400 text-green-700',
      });
      router.refresh(); // Refreshes server components
    } else {
      toast({
        title: 'Error al Actualizar',
        description: result.error || 'No se pudo cambiar el estado.',
        variant: 'destructive',
      });
    }
    setIsUpdating(false);
  };


  return (
    <DropdownMenuItem
      disabled={isUpdating}
      onSelect={(e) => { e.preventDefault(); handleChangeStatus(); }}
      className="text-sm"
    >
      {isUpdating ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        client.isActive ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />
      )}
      Marcar como {newStatus}
    </DropdownMenuItem>
  );
}

export function ClientsTable({ clients }: ClientsTableProps) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const clientsPerPage = 10;

    const filteredClients = clients.filter(client =>
        `${client.name} ${client.lastName || ''} ${client.phone} ${client.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (clients.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">No hay clientes registrados aún.</p>
      </div>
    );
  }

  return (
    <div>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Buscar cliente por nombre, teléfono o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
        </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClients.map((client) => {
                const statusInfo = client.isActive ? statusConfig.active : statusConfig.inactive;
                return (
                    <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name} {client.lastName}</TableCell>
                        <TableCell>
                            <div className="text-sm">{client.phone}</div>
                            <div className="text-xs text-muted-foreground">{client.email}</div>
                        </TableCell>
                        <TableCell>
                        <Badge variant={statusInfo.variant} className="capitalize">
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
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/clientes/${client.id}`}><Pencil className="mr-2 h-4 w-4" /> Editar</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <StatusChanger client={client} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </div>
       <div className="flex justify-center items-center space-x-2 mt-4">
          <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} size="sm">
            Anterior
          </Button>
          <span className="text-sm">Página {currentPage} de {totalPages}</span>
          <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} size="sm">
            Siguiente
          </Button>
        </div>
    </div>
  );
}
