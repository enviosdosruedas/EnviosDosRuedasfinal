import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
});

export const metadata: Metadata = {
  title: "EnviosDosRuedas | Mensajería y Delivery Express en Mar del Plata",
  description: "Servicio confiable de mensajería y delivery en moto. Envíos express y low-cost para e-commerce, pymes y Mercado Libre Flex en Mar del Plata. Cotizá online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ptSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
