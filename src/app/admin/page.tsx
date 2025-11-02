// src/app/admin/page.tsx
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/homenew/footer";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Panel de Administración",
  description: "Panel de control central para la administración de Envios DosRuedas.",
  robots: {
    index: false, // Evitar que las páginas de administración sean indexadas
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-2 font-display">Panel de Administración</h1>
            <p className="text-lg text-muted-foreground font-sans">Gestiona todos los aspectos de la aplicación desde aquí.</p>
        </div>
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
}