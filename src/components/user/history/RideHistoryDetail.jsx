'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });

export default function RideHistoryDetail({ ride, onClose, onSubmitReview }) {
  if (!ride) return null;
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    try {
      setSaving(true);
      await onSubmitReview?.({ rideId: ride.id, rating, text });
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold text-gray-900">Ride details</div>
        <button onClick={onClose} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">Close</button>
      </div>
      <div className="mt-3 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-56 w-full overflow-hidden rounded-lg">
            <MapContainer center={ride.route?.[0] || [18.52,73.8567]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {Array.isArray(ride.route) && ride.route.length >= 2 && (
                <Polyline positions={ride.route} color="blue" />
              )}
            </MapContainer>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="rounded-md bg-gray-50 p-3">
            <div className="font-medium text-gray-900">Driver</div>
            <div className="text-gray-700">{ride.driver?.name} • ⭐ {ride.driver?.rating} • {ride.vehicle} • {ride.driver?.plate}</div>
          </div>
          <div className="rounded-md bg-gray-50 p-3">
            <div className="font-medium text-gray-900">Invoice</div>
            <div className="text-gray-700">Base: ₹{ride.invoice?.base} • Distance: ₹{ride.invoice?.distance} • Taxes: ₹{ride.invoice?.tax} • Discount: -₹{ride.invoice?.discount} • Total: ₹{ride.fare}</div>
            <div className="mt-2 flex gap-2">
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">Download PDF</button>
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">Rebook</button>
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">Report issue</button>
            </div>
          </div>
          <div className="rounded-md bg-gray-50 p-3">
            <div className="font-medium text-gray-900 mb-2">Rate & review</div>
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map((s)=> (
                <button key={s} onClick={()=>setRating(s)} aria-label={`Rate ${s}`} className={`h-6 w-6 rounded-full border ${rating>=s?'bg-yellow-400 border-yellow-400':'border-gray-300 bg-white'}`}></button>
              ))}
              <span className="ml-2 text-xs text-gray-700">{rating ? `${rating}/5` : 'Select rating'}</span>
            </div>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a short review (optional)" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"></textarea>
            <button disabled={!rating || saving} onClick={submit} className="mt-2 rounded-md bg-black px-3 py-1.5 text-white text-xs disabled:opacity-50">{saving?'Saving...':'Submit review'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}


