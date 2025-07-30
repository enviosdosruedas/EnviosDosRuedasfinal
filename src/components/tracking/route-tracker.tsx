"use client";

import { useEffect, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface RoutePoint {
  location: Location;
  title: string;
  type: 'pickup' | 'delivery' | 'driver';
  completed?: boolean;
}

interface RouteTrackerProps {
  map: google.maps.Map | null;
  isLoaded: boolean;
  routePoints: RoutePoint[];
  driverLocation?: Location;
}

export function RouteTracker({ map, isLoaded, routePoints, driverLocation }: RouteTrackerProps) {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!map || !isLoaded || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];

    // Add route point markers
    routePoints.forEach((point) => {
      const marker = new window.google.maps.Marker({
        position: point.location,
        map,
        title: point.title,
        icon: getMarkerIcon(point.type, point.completed),
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${point.title}</h3>
            <p class="text-xs text-gray-600">${point.type === 'pickup' ? 'Punto de Recogida' : 'Punto de Entrega'}</p>
            ${point.completed ? '<p class="text-xs text-green-600">✓ Completado</p>' : ''}
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    // Add driver location marker if available
    if (driverLocation) {
      const driverMarker = new window.google.maps.Marker({
        position: driverLocation,
        map,
        title: 'Conductor',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="3"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🚗</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16),
        },
        animation: window.google.maps.Animation.BOUNCE,
      });

      const driverInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">Conductor</h3>
            <p class="text-xs text-gray-600">Ubicación actual</p>
          </div>
        `
      });

      driverMarker.addListener('click', () => {
        driverInfoWindow.open(map, driverMarker);
      });

      newMarkers.push(driverMarker);
    }

    setMarkers(newMarkers);

    // Draw route if we have pickup and delivery points
    const pickupPoint = routePoints.find(p => p.type === 'pickup');
    const deliveryPoint = routePoints.find(p => p.type === 'delivery');

    if (pickupPoint && deliveryPoint) {
      drawRoute(pickupPoint.location, deliveryPoint.location, driverLocation);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isLoaded, routePoints, driverLocation]);

  const getMarkerIcon = (type: string, completed?: boolean) => {
    const colors = {
      pickup: completed ? '#10B981' : '#F59E0B',
      delivery: completed ? '#10B981' : '#EF4444',
      driver: '#3B82F6'
    };

    const icons = {
      pickup: '📦',
      delivery: '🏠',
      driver: '🚗'
    };

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.164 0 0 7.164 0 16c0 16 16 24 16 24s16-8 16-24C32 7.164 24.836 0 16 0z" fill="${colors[type as keyof typeof colors]}"/>
          <circle cx="16" cy="16" r="10" fill="white"/>
          <text x="16" y="20" text-anchor="middle" font-size="12">${icons[type as keyof typeof icons]}</text>
        </svg>
      `),
      scaledSize: new window.google.maps.Size(32, 40),
      anchor: new window.google.maps.Point(16, 40),
    };
  };

  const drawRoute = (pickup: Location, delivery: Location, driver?: Location) => {
    if (!map || !window.google) return;

    // Clear existing route
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }

    const directionsService = new window.google.maps.DirectionsService();
    const renderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true, // We're using custom markers
      polylineOptions: {
        strokeColor: '#3B82F6',
        strokeWeight: 4,
        strokeOpacity: 0.7,
      }
    });

    renderer.setMap(map);
    setDirectionsRenderer(renderer);

    // If driver location is available, show route from driver to delivery
    // Otherwise show route from pickup to delivery
    const origin = driver || pickup;
    const destination = delivery;

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          renderer.setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      markers.forEach(marker => marker.setMap(null));
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    };
  }, [markers, directionsRenderer]);

  return null; // This component doesn't render anything directly
}
