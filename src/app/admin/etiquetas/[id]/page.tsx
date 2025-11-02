// src/app/admin/etiquetas/[id]/page.tsx
import type { Metadata } from 'next';
import { EtiquetaPage } from "@/components/admin/etiquetas/EtiquetaPage";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
            <header className="p-4 no-print">
                <Button asChild variant="outline">
                    <Link href="/admin/etiquetas">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al listado
                    </Link>
                </Button>
            </header>
            <main className="flex-grow">
               <EtiquetaPage />
            </main>
        </div>
    );
}
