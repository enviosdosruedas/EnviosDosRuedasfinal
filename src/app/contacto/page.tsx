import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/contact-page-client";

export const metadata: Metadata = {
  title: "Contacto | EnviosDosRuedas",
  description:
    "Contactate con EnviosDosRuedas para tus envíos en Mar del Plata. Escribinos por WhatsApp, email o llamanos. Estamos para ayudarte.",
  keywords: "contacto enviosdosruedas, telefono mensajeria, whatsapp delivery, mar del plata, direccion, email",
};

export default function ContactPage() {
  return (
    <main>
      <ContactPageClient />
    </main>
  );
}
