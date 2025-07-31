import type { Metadata } from "next";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { Footer } from "@/components/homenew/footer";
import { ExpressPageClient } from "@/components/express/express-page-client";

export const metadata: Metadata = {
  title: "Envíos Express Inmediatos en Mar del Plata",
  description:
    "Servicio de Envíos Express en Mar del Plata. Entrega rápida y garantizada el mismo día para tus paquetes y documentos. Cotiza ahora.",
  keywords: "envios express mar del plata, mensajeria urgente, delivery rapido, entrega mismo dia, paqueteria express",
};

export default function EnviosExpressPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OptimizedHeader />
      <main className="flex-grow">
        <ExpressPageClient />
      </main>
      <Footer />
    </div>
  );
}
