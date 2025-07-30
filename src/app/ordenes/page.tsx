// src/app/ordenes/page.tsx
"use client"; 

import { Header } from "@/components/header";
import { GenerarEnvioForm } from "@/components/ordenes/GenerarEnvioForm";
import { Footer } from "@/components/footer"; 
// Toaster is already in RootLayout, so it's removed from here to avoid redundancy.

export default function OrdenesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8">
        <GenerarEnvioForm />
      </main>
      <Footer />
      {/* <Toaster /> Removed as it's in RootLayout */}
    </div>
  );
}
