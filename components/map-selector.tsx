'use client';

import dynamic from 'next/dynamic';

interface MapSelectorProps {
  position: [number, number] | null;
  onPositionChange: (lat: number, lng: number) => void;
  center?: [number, number];
  zoom?: number;
}

// Import dynamique de Leaflet pour éviter les erreurs SSR
const MapSelector = dynamic<MapSelectorProps>(() => import('./map-selector-client'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-muted animate-pulse rounded-md" />,
});

export default MapSelector;
