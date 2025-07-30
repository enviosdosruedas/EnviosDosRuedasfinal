
import {
  Truck,
  Calculator,
  Users,
  Home,
  Mail,
  ChevronDown,
  Menu,
  X,
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
      { href: "/servicios/envios-express", label: "Envíos Express" },
      { href: "/servicios/envios-lowcost", label: "Envíos LowCost" },
      { href: "/servicios/moto-fija", label: "Moto Fija" },
      { href: "/servicios/plan-emprendedores", label: "Plan Emprendedores" },
      { href: "/servicios/enviosflex", label: "Envíos Flex MercadoLibre" },
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
