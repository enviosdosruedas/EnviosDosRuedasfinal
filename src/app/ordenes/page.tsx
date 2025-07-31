// src/app/ordenes/page.tsx
"use client"; 

import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { GenerarEnvioForm } from "@/components/ordenes/GenerarEnvioForm";
import { Footer } from "@/components/homenew/footer"; 
// Toaster is already in RootLayout, so it's removed from here to avoid redundancy.

export default function OrdenesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <OptimizedHeader />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-8">
        <GenerarEnvioForm />
      </main>
      <Footer />
      {/* <Toaster /> Removed as it's in RootLayout */}
    </div>
  );
}
