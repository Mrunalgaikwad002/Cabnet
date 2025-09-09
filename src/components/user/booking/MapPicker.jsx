'use client';

import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const MapClicker = dynamic(
  () =>
    Promise.resolve(function MapClicker({ onClick }) {
      const { useMapEvents } = require('react-leaflet');
      useMapEvents({ click: (e) => onClick([e.latlng.lat, e.latlng.lng]) });
      return null;
    }),
  { ssr: false }
);

export default function MapPicker({ isOpen, pickerFor, pickerPos, setPickerPos, onCancel, onUse }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-lg">
        <div className="text-sm font-semibold text-gray-900">Choose on map ({pickerFor})</div>
        <div className="mt-2 h-80 w-full overflow-hidden rounded-lg">
          <MapContainer center={pickerPos} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={pickerPos} />
            <MapClicker onClick={(pos)=>setPickerPos(pos)} />
          </MapContainer>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="text-gray-700">Selected: {pickerPos[0].toFixed(5)}, {pickerPos[1].toFixed(5)}</div>
          <div className="flex gap-2">
            <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-gray-50" onClick={onCancel}>Cancel</button>
            <button className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900" onClick={onUse}>Use this location</button>
          </div>
        </div>
      </div>
    </div>
  );
}


