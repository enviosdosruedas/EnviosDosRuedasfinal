import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Image src="/LogoEnviosDosRuedas.webp" alt="Envios DosRuedas 1806 Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold font-headline">Envios DosRuedas 1806</h1>
        </Link>
        <nav className="hidden md:flex gap-4">
          <Link href="#services" className="text-foreground hover:text-primary transition-colors">Servicios</Link>
          <Link href="#calculator" className="text-foreground hover:text-primary transition-colors">Calculadora</Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition-colors">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
