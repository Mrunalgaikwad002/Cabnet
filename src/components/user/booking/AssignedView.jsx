'use client';

import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });

export default function AssignedView({ pickupPos, driverPos, assignedDriver, pickup, drop, rideType, estimate, payment, onPayOnline, onCash, onCancel }) {
  return (
    <div>
      <div className="text-base font-semibold text-gray-900">Driver assigned</div>
      <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-gray-200 p-3 lg:col-span-2">
          <div className="h-56 w-full overflow-hidden rounded-lg">
            <MapContainer center={pickupPos} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {pickupPos && <Marker position={pickupPos} />}
              {driverPos && <Marker position={driverPos} />}            
              {driverPos && pickupPos && <Polyline positions={[driverPos, pickupPos]} color="blue" />}
            </MapContainer>
          </div>
          <div className="mt-2 text-xs text-gray-700">Route to pickup · live updates</div>
          {/* Status timeline and updates under the map (fills left space) */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-1">
              <div className="text-xs font-medium text-gray-900 mb-2">Ride status</div>
              <ol className="relative border-l border-gray-200 pl-3 text-xs text-gray-700">
                <li className="mb-2"><span className="absolute -left-2.5 h-2.5 w-2.5 rounded-full bg-green-500"></span> Requested</li>
                <li className="mb-2"><span className="absolute -left-2.5 h-2.5 w-2.5 rounded-full bg-green-500"></span> Driver assigned</li>
                <li className="mb-2"><span className="absolute -left-2.5 h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></span> On the way</li>
                <li className="mb-2"><span className="absolute -left-2.5 h-2.5 w-2.5 rounded-full bg-gray-300"></span> Arriving</li>
                <li><span className="absolute -left-2.5 h-2.5 w-2.5 rounded-full bg-gray-300"></span> Ride started</li>
              </ol>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs font-medium text-gray-900 mb-2">Live updates</div>
              <div className="rounded-md bg-gray-50 p-3 min-h-[90px]">
                <ul className="list-disc pl-4 space-y-1 text-xs text-gray-700">
                  <li>Driver is 5 mins away</li>
                  <li>Route optimized to avoid traffic</li>
                  <li>Promo SAVE20 applied successfully</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-3 space-y-3">
          <div className="flex items-center gap-3">
            <img src={assignedDriver.photo} alt="Driver" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <div className="font-medium text-gray-900">{assignedDriver.name}</div>
              <div className="text-xs text-gray-700">⭐ {assignedDriver.rating} · {assignedDriver.plate} · {assignedDriver.car}</div>
            </div>
          </div>
          <img src={assignedDriver.carImg} alt="Car" className="w-full rounded-lg object-cover" />
          <div className="rounded-md bg-gray-50 p-2 text-xs">
            <div className="font-medium text-gray-900">Ride details</div>
            <div className="text-gray-700">From: {pickup}</div>
            <div className="text-gray-700">To: {drop}</div>
            <div className="text-gray-700">{`Type: ${rideType} · ETA ${estimate?.eta} mins · Est ₹${estimate?.fare}`}</div>
          </div>
          <div className="text-xs">
            <div className="font-medium text-gray-900 mb-1">Payment method</div>
            <div className="flex gap-2">
              <button onClick={onCash} className={`rounded-md px-3 py-1.5 border ${payment==='cash'?'border-black':'border-gray-300'} bg-white text-gray-900`}>Cash</button>
              <button onClick={onPayOnline} className={`rounded-md px-3 py-1.5 border ${payment==='online'?'border-black':'border-gray-300'} bg-white text-gray-900`}>Pay online</button>
            </div>
          </div>
          <button className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 hover:bg-gray-50" onClick={onCancel}>Cancel ride</button>
        </div>
      </div>
    </div>
  );
}


