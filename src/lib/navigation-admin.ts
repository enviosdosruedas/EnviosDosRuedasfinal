// src/lib/navigation-admin.ts
import {
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  Ticket,
  PlusSquare,
  Wand2,
  type LucideIcon,
  ListOrdered,
  BarChart2,
  Users,
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  color: string;
  bgColor: string;
}

export const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Vista general del panel de administración.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    href: "/admin/ordenes",
    label: "Gestión de Órdenes",
    icon: ListOrdered,
    description: "Visualiza, crea y modifica las órdenes de envío.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    href: "/admin/clientes",
    label: "Gestión de Clientes",
    icon: Users,
    description: "Administra la base de datos de clientes.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    href: "/admin/cotizaciones",
    label: "Gestión de Tarifas",
    icon: BarChart2,
    description: "Administra los rangos de precios para los servicios.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    href: "/admin/etiquetas",
    label: "Gestión de Etiquetas",
    icon: Ticket,
    description: "Crea y administra etiquetas de envío.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    href: "/admin/add-post",
    label: "Agregar Publicación",
    icon: PlusSquare,
    description: "Añade nuevos posts al feed de redes sociales.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    href: "/admin/crea-imagenes",
    label: "Generador de Prompts IA",
    icon: Wand2,
    description: "Crea prompts para generar imágenes de marca.",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
];