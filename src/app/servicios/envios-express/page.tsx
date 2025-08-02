import type { Metadata } from "next";
import { ExpressPageClient } from "@/components/express/express-page-client";

export const metadata: Metadata = {
  title: "Envíos Express Inmediatos en Mar del Plata | EnviosDosRuedas",
  description:
    "Servicio de Envíos Express en Mar del Plata. Entrega garantizada en el día para tus paquetes urgentes. La solución más rápida y confiable. ¡Cotizá ahora!",
  keywords: "envios express mar del plata, mensajeria urgente, delivery rapido, entrega mismo dia, paqueteria express, envios urgentes",
};

export default function EnviosExpressPage() {
  return (
    <ExpressPageClient />
  );
}
