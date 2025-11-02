// src/app/admin/etiquetas/[id]/page.tsx
import type { Metadata } from 'next';
import { EtiquetaPage } from "@/components/admin/etiquetas/EtiquetaPage";

export const metadata: Metadata = {
  title: "Generar Etiquetas de Envío",
  description: "Crea etiquetas de envío individuales o en lote para tus pedidos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GenerarEtiquetasPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <main className="flex-grow">
               <EtiquetaPage />
            </main>
        </div>
    );
}
