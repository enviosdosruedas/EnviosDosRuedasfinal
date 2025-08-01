import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-manrope",
});

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
  manifest: "/manifest.json",
  icons: {
    icon: "/LogoEnviosDosRuedas.webp",
    shortcut: "/LogoEnviosDosRuedas.webp",
    apple: "/LogoEnviosDosRuedas.webp",
  },
};


export const viewport = {
  themeColor: "#1E40AF",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        className={`${inter.variable} ${manrope.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
