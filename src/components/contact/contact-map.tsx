'use client';

import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const MAP_CENTER = { lat: -38.0054771, lng: -57.5426106 }; // Center of Mar del Plata
const BUSINESS_LOCATION = { lat: -38.002287, lng: -57.557540 }; // A central location, e.g., Av. Colón

export function ContactMap() {
  const { mapRef, map, isLoaded, error: mapError } = useGoogleMaps({
    center: MAP_CENTER,
    zoom: 13,
  });

  useEffect(() => {
    if (isLoaded && map && window.google) {
      // Add a custom marker for the business
      const marker = new window.google.maps.Marker({
        position: BUSINESS_LOCATION,
        map: map,
        title: 'Envios DosRuedas',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="48">
              <path fill="#1E40AF" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
              <circle cx="192" cy="192" r="64" fill="#F9A825"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 48),
          anchor: new window.google.maps.Point(20, 48)
        },
        animation: window.google.maps.Animation.BOUNCE,
      });

      // Stop the bouncing after a few seconds to avoid being distracting
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2100); // ~3 bounces

      // Add an InfoWindow
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="display: flex; align-items: center; gap: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; padding: 8px; max-width: 250px;">
            <img src="/LogoEnviosDosRuedas.webp" alt="Logo Envios DosRuedas" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #3B82F6;">
            <div>
              <h3 style="font-weight: 600; font-size: 1rem; margin: 0 0 4px 0; color: #1E40AF;">Envios DosRuedas</h3>
              <p style="font-size: 0.8rem; color: #4A5568; margin: 0;">Nuestra base de operaciones.</p>
              <p style="font-size: 0.8rem; color: #4A5568; margin: 0;">Mar del Plata, Buenos Aires</p>
            </div>
          </div>
        `,
        ariaLabel: "Envios DosRuedas",
      });
      
      // Open the info window by default
      infoWindow.open({
        anchor: marker,
        map,
      });

      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
        // Optional: restart bounce on click
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2100);
      });
    }
  }, [isLoaded, map]);

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
          {mapError ? (
            <div className="bg-destructive/10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Error al Cargar el Mapa
              </h3>
              <p className="text-sm text-destructive/80 mb-4 max-w-md">
                {mapError}
              </p>
              <Button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${MAP_CENTER.lat},${MAP_CENTER.lng}`, '_blank')}
                variant="destructive"
                size="sm"
              >
                Abrir en Google Maps
              </Button>
            </div>
          ) : !isLoaded ? (
             <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Cargando mapa...</p>
                </div>
            </div>
          ) : null}
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
}
