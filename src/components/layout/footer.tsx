export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} Envios DosRuedas 2024. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
