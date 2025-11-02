
'use client';

import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { Map, Loader2 } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';


interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface RouteMapProps {
  origin?: LatLngLiteral;
  destination?: LatLngLiteral;
}

const mapContainerStyle = {
  height: '320px',
  width: '100%',
  borderRadius: '0.5rem',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  center: {
    lat: -38.0055,
    lng: -57.5426,
  },
  zoom: 12,
};

const PLACEHOLDER_API_KEY_MESSAGE = "El mapa interactivo no se puede mostrar porque la clave de API de Google Maps no está configurada o es inválida.";
const GENERIC_API_ERROR_MESSAGE = "Error al cargar Google Maps. Por favor, intenta de nuevo más tarde.";
const INVALID_API_KEY_PLACEHOLDERS = ["YOUR_GOOGLE_MAPS_API_KEY", ""];

export default function RouteMap({ origin, destination }: RouteMapProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<boolean>(
    INVALID_API_KEY_PLACEHOLDERS.includes(googleMapsApiKey)
  );

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places'],
  });

  const calculateRoute = useCallback(() => {
    if (!origin || !destination || !isLoaded || apiKeyError || !window.google) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirectionsResponse(result);
          setError(null);
        } else {
          console.error(`Error fetching directions ${result}`, status);
          setError("No se pudo trazar la ruta. Verifica que las direcciones sean válidas y estén dentro de la zona de cobertura.");
          setDirectionsResponse(null);
        }
      }
    );
  }, [origin, destination, isLoaded, apiKeyError]);

  useEffect(() => {
    if (origin && destination) {
        calculateRoute();
    } else {
        if (directionsResponse) {
            setDirectionsResponse(null);
        }
    }
  }, [origin, destination, calculateRoute, directionsResponse]);

  const openInGoogleMaps = () => {
    if (!origin || !destination) return;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
    window.open(url, '_blank');
  };

  if (apiKeyError || loadError) {
    return (
      <Card className="mt-6 border-destructive bg-destructive/10">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-destructive">!</span>
            <p className="text-destructive text-sm font-semibold">{apiKeyError ? PLACEHOLDER_API_KEY_MESSAGE : GENERIC_API_ERROR_MESSAGE}</p>
            <p className="text-destructive/80 text-xs">
              Para habilitar el mapa, el propietario del sitio debe configurar una clave de API válida de Google Maps.
            </p>
             <Button onClick={openInGoogleMaps} variant="destructive" size="sm" className="mt-2" disabled={!origin || !destination}>
                <Map className="mr-2 h-4 w-4" />
                Ver ruta en Google Maps
            </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
        <div className="mt-6 space-y-2 flex flex-col items-center justify-center h-[320px] bg-muted/50 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Cargando mapa...</p>
        </div>
    );
  }

  return (
    <div className="mt-6">
       {error && (
        <Card className="mb-4 border-destructive bg-destructive/10">
            <CardContent className="p-4 text-center text-destructive text-sm">
                {error}
            </CardContent>
        </Card>
      )}
      <div className="rounded-lg overflow-hidden shadow-md border">
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            options={mapOptions}
            center={origin || mapOptions.center}
            zoom={mapOptions.zoom}
        >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} options={{ suppressMarkers: true }} />}
        </GoogleMap>
      </div>
       <div className="text-center mt-2">
            <Button onClick={openInGoogleMaps} variant="ghost" size="sm" disabled={!origin || !destination}>
                Abrir en Google Maps
            </Button>
       </div>
    </div>
  );
}
