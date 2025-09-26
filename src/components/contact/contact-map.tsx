
'use client';

import { Loader2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const MAP_CENTER = { lat: -38.0054771, lng: -57.5426106 }; // Center of Mar del Plata

export function ContactMap() {
  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${MAP_CENTER.lat},${MAP_CENTER.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Nuestra Ubicación
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Nos encontramos en el corazón de Mar del Plata, listos para llegar a donde nos necesites.
          </p>
        </div>
        <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-xl border border-border">
          <Image
            src="https://picsum.photos/seed/map/1200/800"
            alt="Mapa de Mar del Plata"
            layout="fill"
            objectFit="cover"
            className="filter grayscale"
            data-ai-hint="city map"
          />
          <div className="absolute inset-0 bg-primary/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Base de Operaciones
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-md">
              Aunque nuestra base está en el centro, nuestra flota cubre toda la ciudad para estar siempre cerca tuyo.
            </p>
            <Button onClick={openInGoogleMaps} variant="secondary" size="lg">
              <ExternalLink className="mr-2 h-5 w-5" />
              Ver en Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
