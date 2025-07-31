import type { Metadata } from "next";
import { OptimizedHeader } from "@/components/homenew/optimized-header";
import { CarruselRedes } from "@/components/homenew/carrusel-redes";
import { Footer } from "@/components/homenew/footer";
import { ContactPageClient } from "@/components/contact/contact-page-client";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para servicios de mensajería y delivery en Mar del Plata. Respuesta rápida y atención personalizada. WhatsApp, teléfono y email disponibles.",
  keywords: "contacto, envios mar del plata, mensajeria, delivery, whatsapp, telefono, email",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OptimizedHeader />
      <main className="flex-grow">
        <ContactPageClient />
      </main>
      <CarruselRedes />
      <Footer />
    </div>
  );
}
