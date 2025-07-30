import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
});

// Tarea 1: Optimizar el objeto metadata
export const metadata: Metadata = {
  title: 'EnviosDosRuedas | Mensajería y Delivery Express en Mar del Plata',
  description: 'Servicio confiable de mensajería y delivery en moto. Envíos express y low-cost para e-commerce, pymes y Mercado Libre Flex en Mar del Plata. Cotizá online.',
  keywords: 'mensajeria mar del plata, delivery mar del plata, envios en moto, cadeteria mar del plata, envios flex, envios low cost, mensajeria express, envios dos ruedas',
  alternates: {
    canonical: 'https://www.enviosdosruedas.com',
  },
  openGraph: {
    title: 'EnviosDosRuedas | Mensajería y Delivery Rápido en Mar del Plata',
    description: 'Envíos express, low-cost, para emprendedores y Mercado Libre Flex. Cotiza online.',
    url: 'https://www.enviosdosruedas.com',
    images: [
      {
        url: 'https://www.enviosdosruedas.com/img/LogoEnviosDosRuedas.webp',
        width: 800,
        height: 600,
        alt: 'Logo de Envios DosRuedas sobre un fondo de un mapa de ciudad.',
      },
    ],
    type: 'website',
    locale: 'es_AR',
  },
  manifest: "/manifest.json"
};


export const viewport = {
  themeColor: "#2563EB",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // Tarea 2: Añadir Datos Estructurados (Schema)
    const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'EnviosDosRuedas',
    image: 'https://www.enviosdosruedas.com/img/LogoEnviosDosRuedas.webp',
    url: 'https://www.enviosdosruedas.com',
    telephone: '+5492231234567',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11 de setiembre',
      addressLocality: 'Mar del Plata',
      postalCode: 'B7600',
      addressCountry: 'AR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${ptSans.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
