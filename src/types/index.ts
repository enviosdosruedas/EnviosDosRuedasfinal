// src/types/index.ts
import type { Etiqueta as PrismaEtiqueta } from "@prisma/client";

export interface Order {
  id: string;
  customerName: string;
  origin: string;
  destination: string;
  status: 'Pendiente' | 'En Tránsito' | 'Entregado' | 'Cancelado';
  creationDate: string; 
  items: number;
  weight: string; // e.g., "5kg"
}

export interface Technology {
  name: string;
  version?: string;
  description: string;
  icon?: React.ElementType; // For Lucide icons
}

export enum EtiquetaStatus {
    PENDIENTE = 'PENDIENTE',
    IMPRESA = 'IMPRESA',
    EN_CAMINO = 'EN_CAMINO',
    ENTREGADA = 'ENTREGADA',
    NO_ENTREGADA = 'NO_ENTREGADA',
}


// Client-safe version with numbers instead of Decimals
export type FormattedEtiqueta = Omit<PrismaEtiqueta, 'montoACobrar' | 'orderNumber' | 'status' | 'repartidorId'> & {
  montoACobrar: number | null;
  orderNumber: string | null;
  status: EtiquetaStatus;
  repartidorId: number | null;
};
