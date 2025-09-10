"use client";

import { useState } from 'react';
import RideRequestCard from './RideRequestCard';

export default function LiveRideRequests({ onAccept }) {
  const [requests, setRequests] = useState([
    {
      id: 1,
      passengerName: 'Rahul Sharma',
      pickup: 'Shivajinagar, Pune, Maharashtra',
      drop: 'Viman Nagar, Pune, Maharashtra',
      distance: '5.2 km',
      estimatedFare: '₹180',
      estimatedTime: '12 mins',
      passengerRating: 4.8,
      requestTime: '2 mins ago'
    },
    {
      id: 2,
      passengerName: 'Aisha Khan',
      pickup: 'Andheri West, Mumbai, Maharashtra',
      drop: 'Bandra Kurla Complex, Mumbai, Maharashtra',
      distance: '3.8 km',
      estimatedFare: '₹140',
      estimatedTime: '8 mins',
      passengerRating: 4.9,
      requestTime: '5 mins ago'
    }
  ]);

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

        {requests.length === 0 ? (
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
