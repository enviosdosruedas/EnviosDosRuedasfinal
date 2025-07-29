import { Bike, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-muted py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Bike className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Envios DosRuedas</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Entregas rápidas y seguras para tu negocio y para ti.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#servicios" className="text-muted-foreground hover:text-primary">Servicios</Link></li>
              <li><Link href="#soluciones" className="text-muted-foreground hover:text-primary">Soluciones</Link></li>
              <li><Link href="#solicitar" className="text-muted-foreground hover:text-primary">Solicitar Envío</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Síguenos</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Envios DosRuedas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
