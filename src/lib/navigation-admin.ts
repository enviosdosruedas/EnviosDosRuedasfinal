// src/lib/navigation-admin.ts
import {
  LayoutDashboard,
  Ticket,
  PlusSquare,
  Wand2,
  type LucideIcon,
  ListOrdered,
  BarChart2,
  Users,
  Settings,
  BookImage, // Agregado para el nuevo grupo
} from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  color: string;
  bgColor: string;
}

export interface AdminNavGroup {
    label: string;
    icon: LucideIcon;
    description: string;
    items: AdminNavItem[];
}

export const adminNavItems: (AdminNavItem | AdminNavGroup)[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Vista general del panel de administración.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    label: "Gestión",
    icon: Settings,
    description: "Administra los componentes clave del negocio.",
    items: [
        {
            href: "/admin/ordenes",
            label: "Órdenes",
            icon: ListOrdered,
            description: "Visualiza, crea y modifica las órdenes de envío.",
            color: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            href: "/admin/clientes",
            label: "Clientes",
            icon: Users,
            description: "Administra la base de datos de clientes.",
            color: "text-cyan-500",
            bgColor: "bg-cyan-50",
        },
        {
            href: "/admin/cotizaciones",
            label: "Tarifas",
            icon: BarChart2,
            description: "Administra los rangos de precios para los servicios.",
            color: "text-green-500",
            bgColor: "bg-green-50",
        },
    ],
  },
  {
    href: "/admin/etiquetas",
    label: "Etiquetas",
    icon: Ticket,
    description: "Crea y administra etiquetas de envío.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    label: "Publicaciones",
    icon: BookImage,
    description: "Gestiona el contenido visual y social de la marca.",
    items: [
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
        label: "Prompts IMG",
        icon: Wand2,
        description: "Crea prompts para generar imágenes de marca.",
        color: "text-teal-500",
        bgColor: "bg-teal-50",
      },
    ],
  }
];
