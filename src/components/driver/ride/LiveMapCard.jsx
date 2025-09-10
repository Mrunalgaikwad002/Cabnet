"use client";

import dynamic from 'next/dynamic';
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });

export default function LiveMapCard({ center=[18.5204,73.8567] }) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <div className="h-64">
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} attributionControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center} />
        </MapContainer>
      </div>
      <div className="px-4 py-2 bg-gray-50 text-xs text-gray-600 border-t border-gray-200">Live map view</div>
    </div>
  );
}


