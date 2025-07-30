
"use client";

import { useJsApiLoader } from '@react-google-maps/api';
import { useRef, useEffect, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface UseGoogleMapsProps {
  center: Location;
  zoom?: number;
}

const mapLibraries: ("places" | "geometry" | "marker")[] = ['places', 'geometry', 'marker'];

export function useGoogleMaps({ center, zoom = 13 }: UseGoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const effectiveApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: effectiveApiKey || "",
    libraries: mapLibraries,
  });

  const error = loadError ? `Failed to load Google Maps: "${loadError.message}".`
    : (!effectiveApiKey || effectiveApiKey === "YOUR_GOOGLE_MAPS_API_KEY" || effectiveApiKey === "demo-key") ? "Google Maps API Key no está configurada o es un valor placeholder."
    : null;


  useEffect(() => {
    if (isLoaded && !map && mapRef.current && !error) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          // Modern map styles
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#f0f5f3" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c9e2f3" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#a9c5e8" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#d4efd0" }]
          },
          {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [{ color: "#e0e0e0" }]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      });
      setMap(mapInstance);
    }
  }, [isLoaded, map, center, zoom, error]);

  return {
    mapRef,
    map,
    isLoaded,
    error,
  };
}
