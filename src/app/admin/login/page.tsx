
// src/app/admin/login/page.tsx
import { LoginForm } from "@/components/admin/LoginForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Acceso de Administrador",
  description: "Inicia sesión para acceder al panel de administración de Envios DosRuedas.",
   robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <LoginForm />
    </div>
  );
}
