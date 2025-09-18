'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../../lib/api';
import dynamic from 'next/dynamic';
import MapPicker from './MapPicker';
import RideSummary from './RideSummary';
import AssignedView from './AssignedView';

// Client-only react-leaflet parts
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });
const MapClicker = dynamic(
  () =>
    Promise.resolve(function MapClicker({ onClick }) {
      const { useMapEvents } = require('react-leaflet');
      useMapEvents({ click: (e) => onClick([e.latlng.lat, e.latlng.lng]) });
      return null;
    }),
  { ssr: false }
);

async function reverseGeocode(lat, lng) {
  try {
    // Use a CORS proxy to avoid CORS issues
    const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

const formatINR = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v ?? 0);

export default function BookingForm({ onRideConfirmed, onRideToast, onGoLive }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [scheduleLater, setScheduleLater] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [rideType, setRideType] = useState('economy');
  const [payment, setPayment] = useState('cash');
  const [promo, setPromo] = useState('');
  const [savingAs, setSavingAs] = useState('none');

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerFor, setPickerFor] = useState('pickup');
  const [pickerPos, setPickerPos] = useState([18.5204, 73.8567]);

  // Post-confirm flow
  const [flowOpen, setFlowOpen] = useState(false);
  const [flowStep, setFlowStep] = useState('summary'); // 'summary' | 'search' | 'assigned'
  const [driverPos, setDriverPos] = useState(null);
  const [assignedDriver, setAssignedDriver] = useState({
    name: 'Rahul Sharma',
    rating: 4.9,
    car: 'Sedan',
    plate: 'MH12 AB 1234',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=128&h=128&fit=crop&crop=faces',
    carImg: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=256&h=144&fit=crop'
  });

  useEffect(() => {
    if (!pickup && typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setPickupCoords([latitude, longitude]);
          setPickerPos([latitude, longitude]);
          const name = await reverseGeocode(latitude, longitude);
          setPickup(name);
        },
        () => undefined,
        { enableHighAccuracy: true, timeout: 7000 }
      );
    }
  }, [pickup]);

  const estimate = useMemo(() => {
    if (!pickup || !drop) return null;
    const base = rideType === 'premium' ? 300 : rideType === 'comfort' ? 250 : 200;
    const eta = rideType === 'premium' ? 10 : 15;
    return { fare: base, eta };
  }, [pickup, drop, rideType]);

  const startFlow = () => {
    setFlowOpen(true);
    setFlowStep('summary');
    
    // Auto-progress through the flow
    setTimeout(() => {
      setFlowStep('search');
    }, 2000);
    
    setTimeout(() => {
      setFlowStep('assigned');
      const p = pickupCoords || pickerPos;
      setDriverPos([ (p?.[0] || 18.52) + 0.005, (p?.[1] || 73.85) - 0.006 ]);
      // Update active ride status if parent provided a handler
      if (onRideConfirmed) {
        onRideConfirmed({ pickup, drop, status: 'Driver assigned' });
      }
      if (onGoLive) onGoLive();
    }, 4000);
    
    if (onRideToast) onRideToast();
  };

  const handleConfirm = async () => {
    if (!pickup || !drop) {
      alert('Please enter both pickup and drop locations');
      return;
    }
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please login first');
        return;
      }
      
      // Construct minimal payload matching backend schema (omit empty strings)
      const payload = {
        pickup: {
          location: {
            coordinates: pickupCoords || pickerPos,
            address: pickup,
            city: 'Pune',
            state: 'Maharashtra',
            zipCode: '411001'
          }
        },
        dropoff: {
          location: {
            coordinates: dropCoords || pickerPos,
            address: drop,
            city: 'Pune',
            state: 'Maharashtra',
            zipCode: '411001'
          }
        },
        rideType
      };
      console.log('Sending payload:', payload);
      const { ride } = await apiRequest('/api/rides/request', { method: 'POST', body: JSON.stringify(payload) });
      console.log('Ride created:', ride);
      // Start the UI flow after backend confirms
      startFlow();
    } catch (e) {
      console.error('Ride request error:', e);
      console.error('Error details:', e?.data);
      alert(e?.data?.message || e?.data?.errors || e?.message || 'Failed to request ride');
    }
  };

  const useGps = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    // Check if we're on HTTPS or localhost
    const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    if (!isSecure) {
      alert('GPS location requires HTTPS. Please use the map picker instead.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPickupCoords([latitude, longitude]);
        const name = await reverseGeocode(latitude, longitude);
        setPickup(name);
      },
      (err) => {
        console.error('GPS error:', err);
        let errorMessage = 'Unable to get location. ';
        
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings and try again.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        alert(errorMessage + '\n\nYou can use "Choose on map" instead.');
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const openPicker = (field) => { setPickerFor(field); setPickerOpen(true); };
  const handlePay = async () => {
    try {
      const amountPaise = Math.round((estimate?.fare || 0) * 100);
      const payload = {
        amount: amountPaise,
        currency: 'inr',
        description: 'CabNet Ride Fare',
        billingAddressCollection: 'required',
        shippingAddressCollection: 'none',
        successUrl: `${window.location.origin}/user/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/user/dashboard?payment=cancel`
      };
      const data = await apiRequest('/api/payments/create-checkout-session', { method: 'POST', body: JSON.stringify(payload) });
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Unable to start payment');
      }
    } catch (e) {
      alert('Payment error: ' + (e?.data?.error || e.message));
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="text-base font-semibold text-gray-900">Book a ride</div>
      

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Pickup (From)</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-black focus:outline-none" placeholder="Use current location or enter address" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          {pickupCoords && (
            <div className="mt-1 text-xs text-gray-600">Coords: {pickupCoords[0].toFixed(5)}, {pickupCoords[1].toFixed(5)}</div>
          )}
          <div className="mt-2 flex gap-2 text-xs">
            <button type="button" className="rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-800 hover:bg-gray-50" onClick={useGps}>Use GPS</button>
            <button type="button" className="rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-800 hover:bg-gray-50" onClick={() => openPicker('pickup')}>Choose on map</button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Drop (To)</label>
          <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-black focus:outline-none" placeholder="Search destination or click choose on map" value={drop} onChange={(e) => setDrop(e.target.value)} />
          {dropCoords && (
            <div className="mt-1 text-xs text-gray-600">Coords: {dropCoords[0].toFixed(5)}, {dropCoords[1].toFixed(5)}</div>
          )}
          <div className="mt-2 flex gap-2 text-xs">
            <button type="button" className="rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-800 hover:bg-gray-50" onClick={() => openPicker('drop')}>Choose on map</button>
          </div>
          <div className="mt-1 text-xs text-gray-600">Autocomplete/Mapbox can be plugged here.</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700">When</div>
        <div className="mt-2 flex items-center gap-3 text-sm">
          <label className="inline-flex items-center gap-2"><input type="radio" name="when" checked={!scheduleLater} onChange={() => setScheduleLater(false)} />Now</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="when" checked={scheduleLater} onChange={() => setScheduleLater(true)} />Schedule for later</label>
        </div>
        {scheduleLater && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <input type="date" className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700">Ride options</div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <label className={`rounded-xl border ${rideType==='economy'?'border-black':'border-gray-200'} bg-white p-3 cursor-pointer hover:shadow-sm`}><input type="radio" name="ride" className="mr-2" checked={rideType==='economy'} onChange={()=>setRideType('economy')} />🚕 Economy</label>
          <label className={`rounded-xl border ${rideType==='comfort'?'border-black':'border-gray-200'} bg-white p-3 cursor-pointer hover:shadow-sm`}><input type="radio" name="ride" className="mr-2" checked={rideType==='comfort'} onChange={()=>setRideType('comfort')} />🚘 Comfort</label>
          <label className={`rounded-xl border ${rideType==='premium'?'border-black':'border-gray-200'} bg-white p-3 cursor-pointer hover:shadow-sm`}><input type="radio" name="ride" className="mr-2" checked={rideType==='premium'} onChange={()=>setRideType('premium')} />🚐 Premium</label>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <label className="block font-medium text-gray-700">Payment method</label>
          <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none" value={payment} onChange={(e)=>setPayment(e.target.value)}>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block font-medium text-gray-700">Promo code</label>
          <div className="mt-1 flex gap-2">
            <input className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none" placeholder="Enter code (optional)" value={promo} onChange={(e)=>setPromo(e.target.value)} />
            <button type="button" className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-gray-50">Apply</button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
        {estimate ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Estimated fare</div>
              <div className="text-gray-700">{`${formatINR(estimate.fare)} · ETA ${estimate.eta} mins`}</div>
            </div>
            <button 
              disabled={!pickup || !drop} 
              onClick={handleConfirm}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
            >
              Confirm Ride
            </button>
          </div>
        ) : (
          <div className="text-gray-700">Enter pickup and drop to see fare estimate and ETA.</div>
        )}
      </div>

      {/* Map Picker Modal */}
      <MapPicker
        isOpen={pickerOpen}
        pickerFor={pickerFor}
        pickerPos={pickerPos}
        setPickerPos={setPickerPos}
        onCancel={() => setPickerOpen(false)}
        onUse={async () => {
          const name = await reverseGeocode(pickerPos[0], pickerPos[1]);
          if (pickerFor === 'pickup') { setPickup(name); setPickupCoords(pickerPos); } else { setDrop(name); setDropCoords(pickerPos); }
          setPickerOpen(false);
        }}
      />

      {/* Post-confirm flow modal */}
      {flowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
            {flowStep === 'summary' && (
              <RideSummary
                pickup={pickup}
                drop={drop}
                rideType={rideType}
                payment={payment}
                estimate={estimate}
                onConfirm={() => {
                  setFlowStep('search');
                  // Auto-progress to assigned after 5 seconds
                  setTimeout(() => {
                    setFlowStep('assigned');
                    const p = pickupCoords || pickerPos;
                    setDriverPos([ (p?.[0] || 18.52) + 0.005, (p?.[1] || 73.85) - 0.006 ]);
                    if (onRideConfirmed) {
                      onRideConfirmed({ pickup, drop, status: 'Driver assigned' });
                    }
                    if (onGoLive) onGoLive();
                  }, 5000);
                }}
              />
            )}
            {flowStep === 'search' && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Finding a driver nearby...</h3>
                <p className="text-gray-600">Please wait while we connect you with the best available driver</p>
                <div className="mt-3 h-60 w-full overflow-hidden rounded-lg">
                  <MapContainer center={pickupCoords || pickerPos} zoom={14} style={{ height: '100%', width: '100%' }}>
                    <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {(pickupCoords || pickerPos) && <Marker position={pickupCoords || pickerPos} />}
                  </MapContainer>
                </div>
              </div>
            )}
            {flowStep === 'assigned' && (
              <AssignedView
                driver={assignedDriver}
                pickup={pickup}
                drop={drop}
                pickupCoords={pickupCoords || pickerPos}
                driverPos={driverPos}
                payment={payment}
                onPaymentChange={setPayment}
                onPay={handlePay}
                onCancel={() => setFlowOpen(false)}
              />
            )}
            <div className="mt-4 flex justify-end">
              <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-gray-50 text-sm" onClick={() => setFlowOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



