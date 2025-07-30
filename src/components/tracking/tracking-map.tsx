"use client";

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  location: Location;
}

export function TrackingMap({ location }: TrackingMapProps) {
  // Generate Google Maps static image URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=600x400&maptype=roadmap&markers=color:red%7Clabel:D%7C${location.lat},${location.lng}&key=AIzaSyBroadly`;

  // Fallback to a placeholder map since we don't have a real API key
  const placeholderMapUrl = "https://via.placeholder.com/600x400/94d5e5/ffffff?text=Mapa+de+Seguimiento";

  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://maps.google.com/maps?ll=${location.lat},${location.lng}&z=13&t=m`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative">
        {/* Map Image */}
        <div
          className="w-full h-96 bg-cover bg-center cursor-pointer relative"
          onClick={openInGoogleMaps}
          style={{
            backgroundImage: `url(${placeholderMapUrl})`,
            backgroundColor: '#94d5e5'
          }}
        >
          {/* Map overlay with location pin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
              📍
            </div>
          </div>

          {/* Map controls overlay */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="bg-white shadow-md rounded p-2 hover:bg-gray-50" title="Ampliar">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="bg-white shadow-md rounded p-2 hover:bg-gray-50" title="Reducir">
              <span className="text-lg font-bold">-</span>
            </button>
          </div>
        </div>

        {/* Map footer */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Datos del mapa 2025</span>
            <div className="space-x-4">
              <button
                onClick={openInGoogleMaps}
                className="text-blue-600 hover:underline"
              >
                Abrir en Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
