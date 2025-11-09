'use client';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapSelectorProps {
  position: [number, number] | null;
  onPositionChange: (lat: number, lng: number) => void;
  center?: [number, number];
  zoom?: number;
}

function MapUpdater({ center, zoom }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 19, {
        duration: 1.5,
      });
    }
  }, [center, zoom, map]);

  return null;
}

function LocationMarker({ position, onPositionChange }: { position: [number, number] | null; onPositionChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapSelectorClient({ position, onPositionChange, center, zoom = 13 }: MapSelectorProps) {
  const defaultCenter: [number, number] = [48.8566, 2.3522]; // Paris par défaut
  const mapCenter = center || position || defaultCenter;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className="w-full h-[400px] rounded-md z-0"
    >
      {/* Vue satellite ESRI World Imagery */}
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        maxZoom={19}
      />
      {/* Overlay avec labels pour faciliter la navigation */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.3}
      />
      <MapUpdater center={center} zoom={zoom} />
      <LocationMarker position={position} onPositionChange={onPositionChange} />
    </MapContainer>
  );
}
