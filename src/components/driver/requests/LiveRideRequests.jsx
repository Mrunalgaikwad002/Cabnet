"use client";

import { useEffect, useState } from 'react';
import { apiRequest } from '../../../lib/api';
import RideRequestCard from './RideRequestCard';

export default function LiveRideRequests({ onAccept }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchNearby = async () => {
      setLoading(true);
      setError('');
      try {
        const { drivers } = await apiRequest('/api/rides/drivers/nearby');
        // Map drivers to request-like cards (until real queue exists)
        const mapped = (drivers || []).map((d, idx) => ({
          id: d.id || idx,
          passengerName: 'Rider',
          pickup: d.location_address || 'Nearby area',
          drop: '—',
          distance: '—',
          estimatedFare: '—',
          estimatedTime: '—',
          passengerRating: d.rating_average || 4.8,
          requestTime: 'now'
        }));
        if (!cancelled) setRequests(mapped);
      } catch (e) {
        if (!cancelled) setError(e?.data?.message || e?.message || 'Failed to load nearby requests');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchNearby();
    return () => { cancelled = true; };
  }, []);

  const handleAccept = (requestId) => {
    setRequests(requests.filter(req => req.id !== requestId));
    if (onAccept) onAccept();
  };

  const handleReject = (requestId) => {
    setRequests(requests.filter(req => req.id !== requestId));
    // Handle reject logic here
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Live Ride Requests</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-red-700 mb-3">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No active requests</h3>
            <p className="text-gray-600">New ride requests will appear here when available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <RideRequestCard
                key={request.id}
                request={request}
                onAccept={() => handleAccept(request.id)}
                onReject={() => handleReject(request.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
