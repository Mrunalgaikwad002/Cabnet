'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });

export default function LiveMap({ driverPos, pickupPos, dropPos, route }) {
  const mapRef = useRef(null);

  // Fit bounds when positions change
  useEffect(() => {
    const L = require('leaflet');
    if (!mapRef.current) return;
    const map = mapRef.current;
    const points = [driverPos, pickupPos, dropPos].filter(Boolean).map(([lat, lng]) => L.latLng(lat, lng));
    if (points.length >= 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds.pad(0.2));
    }
  }, [driverPos, pickupPos, dropPos]);

  return (
    <MapContainer whenCreated={(m)=> (mapRef.current = m)} center={pickupPos || driverPos} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pickupPos && <Marker position={pickupPos} />}
      {dropPos && <Marker position={dropPos} />}
      {driverPos && <Marker position={driverPos} />}
      {route && route.length >= 2 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
}


