
import {
  Truck,
  Calculator,
  Users,
  Home,
  Mail,
  ChevronDown,
  Menu,
  X,
  Zap,
  DollarSign,
  Bike,
  TrendingUp,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import type React from "react";

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
}

export interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
  basePath?: string;
}

export const navGroups: NavGroup[] = [
  {
    label: "Servicios",
    icon: Truck,
    basePath: "/servicios",
    items: [
      { href: "/servicios/envios-express", label: "Envíos Express", icon: Zap },
      { href: "/servicios/envios-lowcost", label: "Envíos LowCost", icon: DollarSign },
      { href: "/servicios/moto-fija", label: "Moto Fija", icon: Bike },
      { href: "/servicios/plan-emprendedores", label: "Plan Emprendedores", icon: TrendingUp },
      { href: "/servicios/enviosflex", label: "Mercado Libre Flex", icon: ShoppingCart },
    ],
  },
  {
    label: "Cotizar",
    icon: Calculator,
    basePath: "/cotizar",
    items: [
      { href: "/cotizar/express", label: "Cotizar Express" },
      { href: "/cotizar/lowcost", label: "Cotizar LowCost" },
    ],
  },
  {
    label: "Nosotros",
    icon: Users,
    basePath: "/nosotros",
    items: [
      { href: "/nosotros/sobre-nosotros", label: "Sobre Nosotros" },
      { href: "/nosotros/preguntas-frecuentes", label: "Preguntas Frecuentes" },
      { href: "/nosotros/nuestras-redes", label: "Nuestras Redes" },
    ],
  },
];
