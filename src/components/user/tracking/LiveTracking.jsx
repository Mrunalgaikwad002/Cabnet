'use client';

import { useEffect, useMemo, useState } from 'react';
import { LiveStatusBanner } from '.';
import LiveMap from './LiveMap';
import DriverInfoCard from './DriverInfoCard';

export default function LiveTracking({ mode = 'full', active = true, ride }) {
  const [driverPos, setDriverPos] = useState([18.524, 73.85]);
  const [pickupPos] = useState([18.52, 73.8567]);
  const [dropPos] = useState([18.53, 73.87]);
  const [statusText, setStatusText] = useState('Driver is arriving in 3 mins');
  const [userPos, setUserPos] = useState([18.5204, 73.8567]);
  const [geoReady, setGeoReady] = useState(mode !== 'preview');

  // Geolocation for preview mode
  useEffect(() => {
    if (mode !== 'preview') return;
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { setUserPos([pos.coords.latitude, pos.coords.longitude]); setGeoReady(true); },
        () => setGeoReady(true),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGeoReady(true);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'preview' || !active) return;
    const id = setInterval(() => {
      setDriverPos(([lat, lng]) => [lat - 0.0007, lng + 0.0006]);
    }, 1500);
    const t1 = setTimeout(() => setStatusText('Driver has arrived'), 12000);
    const t2 = setTimeout(() => setStatusText('Ride in progress'), 18000);
    const t3 = setTimeout(() => setStatusText('Ride completed'), 30000);
    return () => { clearInterval(id); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const route = useMemo(() => [driverPos, pickupPos, dropPos].filter(Boolean), [driverPos, pickupPos, dropPos]);

  if (mode === 'preview') {
    if (!geoReady) {
      return (
        <div className="h-56 w-full rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-600">Locating you...</div>
      );
    }
    return (
      <div className="h-56 w-full rounded-lg overflow-hidden">
        <LiveMap driverPos={null} pickupPos={userPos} dropPos={null} route={null} />
      </div>
    );
  }

  if (!active) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">No active ride. Book a ride to start live tracking.</div>
    );
  }

  return (
    <div className="space-y-3">
      <LiveStatusBanner statusText={statusText} />
      <div className="h-64 w-full rounded-xl overflow-hidden">
        <LiveMap driverPos={driverPos} pickupPos={pickupPos} dropPos={dropPos} route={route} />
      </div>
      <DriverInfoCard
        driver={{ name: 'Rahul Sharma', rating: 4.9, car: 'Sedan', plate: 'MH12 AB 1234', photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=128&h=128&fit=crop&crop=faces' }}
        eta={'5 mins'}
        distance={'2.3 km'}
        payment={'Cash'}
        onCall={() => {}}
        onChat={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}


