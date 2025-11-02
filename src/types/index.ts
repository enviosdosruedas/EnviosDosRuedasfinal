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
}

export type Etiqueta = PrismaEtiqueta & {
    status: EtiquetaStatus;
};

// Client-safe version with numbers instead of Decimals
export type FormattedEtiqueta = Omit<Etiqueta, 'montoACobrar'> & {
  montoACobrar: number | null;
};
