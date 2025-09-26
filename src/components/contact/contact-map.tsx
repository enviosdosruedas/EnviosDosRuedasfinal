
'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactMap() {
  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/place/Mar+del+Plata,+Provincia+de+Buenos+Aires,+Argentina/@-38.0174516,-57.7653431,10z`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Nuestra Zona de Cobertura
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Operamos en toda la ciudad de Mar del Plata, listos para llegar a donde nos necesites.
          </p>
        </div>
        <div className="relative h-[450px] md:h-[550px] w-full rounded-lg overflow-hidden shadow-xl border border-border">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201169.3703163874!2d-57.765343077742365!3d-38.01745163613915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d94d19d34209%3A0xdd9670804bfed126!2sMar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2suy!4v1758905842912!5m2!1ses-419!2suy" 
            width="100%" 
            height="100%" 
            style={{ border:0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de cobertura de Envios DosRuedas en Mar del Plata"
          ></iframe>
        </div>
        <div className="text-center mt-6">
          <Button onClick={openInGoogleMaps} variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver en Google Maps
          </Button>
        </div>
      </div>
    </section>
  );
}
