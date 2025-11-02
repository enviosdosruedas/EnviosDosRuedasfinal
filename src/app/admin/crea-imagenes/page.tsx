// src/app/admin/crea-imagenes/page.tsx
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { ImagePromptGenerator } from "@/components/admin/crea-imagenes/ImagePromptGenerator";
import { Wand2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Prompts de Imagen",
  description: "Herramienta de IA para crear prompts para generación de imágenes consistentes con la marca.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreaImagenesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
         <Card className="max-w-4xl mx-auto mb-8 bg-background shadow-lg">
            <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3">
                    <Wand2 className="w-7 h-7 text-primary" />
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                       Generador de Prompts con IA
                    </CardTitle>
                </div>
                 <CardDescription>
                    Crea prompts detallados para generar imágenes que mantengan la coherencia visual de tu marca.
                </CardDescription>
            </CardHeader>
        </Card>
        <ImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
