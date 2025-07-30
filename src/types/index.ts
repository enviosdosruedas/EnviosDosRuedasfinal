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
