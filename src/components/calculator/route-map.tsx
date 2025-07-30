
'use client';

import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { AlertTriangle } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';

// Use a more specific type from google.maps namespace if available
// For simplicity, using a generic literal type that's compatible.
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

const PLACEHOLDER_API_KEY_MESSAGE = "La clave API de Google Maps no está configurada o es inválida. El mapa no se puede mostrar.";
const GENERIC_API_ERROR_MESSAGE = "Error al cargar Google Maps. Por favor, intenta de nuevo más tarde.";
const INVALID_API_KEY_PLACEHOLDERS = ["YOUR_API_KEY_HERE", "YOUR_GOOGLE_MAPS_API_KEY", ""];

export default function RouteMap({ origin, destination }: RouteMapProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<boolean>(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places'],
  });

  useEffect(() => {
    if (INVALID_API_KEY_PLACEHOLDERS.includes(googleMapsApiKey)) {
      setApiKeyError(true);
    }
  }, [googleMapsApiKey]);

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
        setDirectionsResponse(null);
    }
  }, [origin, destination, calculateRoute]);

  if (apiKeyError) {
    return (
      <Card className="mt-6 border-destructive bg-destructive/10">
        <CardContent className="p-4 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
            <p className="text-destructive text-sm">{PLACEHOLDER_API_KEY_MESSAGE}</p>
        </CardContent>
      </Card>
    );
  }

  if (loadError) {
     return (
      <Card className="mt-6 border-destructive bg-destructive/10">
         <CardContent className="p-4 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
            <p className="text-destructive text-sm">{GENERIC_API_ERROR_MESSAGE}</p>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
        <div className="mt-6 space-y-4">
            <Skeleton className="h-[320px] w-full rounded-md" />
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
      <div className="rounded-lg overflow-hidden">
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            options={mapOptions}
            center={origin || mapOptions.center}
            zoom={mapOptions.zoom}
        >
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} options={{ suppressMarkers: true }} />}
        </GoogleMap>
      </div>
    </div>
  );
}
