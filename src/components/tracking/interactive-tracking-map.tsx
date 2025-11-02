
"use client";

import { useEffect, useState } from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { RouteTracker } from './route-tracker';
import { Button } from '@/components/ui/button';
import { RefreshCw, Navigation, AlertTriangle, Loader2 } from 'lucide-react';
import { GoogleMap } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface InteractiveTrackingMapProps {
  center: Location;
  pickupLocation?: Location;
  deliveryLocation?: Location;
  driverLocation?: Location;
  orderId?: string;
}

export function InteractiveTrackingMap({
  center,
  pickupLocation,
  deliveryLocation,
  driverLocation,
}: InteractiveTrackingMapProps) {
  const { map, isLoaded, error: mapError } = useGoogleMaps({ center });
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  const routePoints = [
    ...(pickupLocation ? [{
      location: pickupLocation,
      title: 'Punto de Recogida',
      type: 'pickup' as const,
      completed: !!driverLocation 
    }] : []),
    ...(deliveryLocation ? [{
      location: deliveryLocation,
      title: 'Punto de Entrega',
      type: 'delivery' as const,
      completed: false 
    }] : [])
  ];

  const handleRefresh = () => {
    setLastUpdate(new Date());
    if (map && driverLocation) {
        map.panTo(driverLocation);
    }
  };

  const handleCenterOnDriver = () => {
    if (map && driverLocation) {
      map.panTo(driverLocation);
      map.setZoom(15);
    } else if (map && pickupLocation) {
      map.panTo(pickupLocation);
      map.setZoom(15);
    }
  };
  
  useEffect(() => {
    if (isLoaded && map && driverLocation) {
        map.panTo(driverLocation);
    } else if (isLoaded && map && pickupLocation) {
        map.panTo(pickupLocation);
    }
  }, [isLoaded, map, driverLocation, pickupLocation]);


  if (mapError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Error al Cargar el Mapa
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {mapError}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Intente recargar la página. Si el problema persiste, verifique su conexión a internet y asegúrese de que la API Key de Google Maps (<code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>) sea válida, esté configurada correctamente en su proyecto de Google Cloud (con la &quot;Maps JavaScript API&quot; habilitada y facturación activa) y no tenga restricciones que impidan su uso. Consulte la consola para más detalles.
            </p>
             <Button
                onClick={() => window.open(`https://maps.google.com/maps?ll=${center.lat},${center.lng}&z=13&t=m`, '_blank')}
                variant="outline"
                size="sm"
              >
                Abrir en Google Maps
              </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${driverLocation ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            <span className="text-sm font-medium">
              {driverLocation ? 'Conductor en Ruta' : 'Esperando Ubicación'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 hidden sm:inline">
              Actualizado: {lastUpdate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <Button
              onClick={handleRefresh}
              size="icon"
              variant="outline"
              className="h-8 w-8"
              title="Actualizar ubicación del mapa"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCenterOnDriver}
              size="icon"
              variant="outline"
              className="h-8 w-8"
              title="Centrar en conductor"
              disabled={!driverLocation && !pickupLocation}
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative flex-grow">
        {!isLoaded && !mapError ? (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600">Cargando mapa...</p>
                </div>
            </div>
        ) : (
             <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%', minHeight: '300px' }}
                center={center}
                zoom={13}
            >
                {isLoaded && map && (
                <RouteTracker
                    map={map}
                    isLoaded={isLoaded}
                    routePoints={routePoints}
                    driverLocation={driverLocation}
                />
                )}
            </GoogleMap>
        )}
      </div>
    </div>
  );
}
