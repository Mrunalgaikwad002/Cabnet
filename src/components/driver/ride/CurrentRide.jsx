"use client";

import { useState, useEffect } from 'react';
import PassengerInfo from './PassengerInfo';
import RouteInfo from './RouteInfo';
import RideStats from './RideStats';
import LiveMapCard from './LiveMapCard';
import RideActions from './RideActions';

export default function CurrentRide({ onViewEarnings }) {
  const [ride, setRide] = useState({
    id: 1,
    passengerName: 'Rahul Sharma',
    passengerPhone: '+91 98765 43210',
    pickup: 'Shivajinagar, Pune, Maharashtra',
    drop: 'Viman Nagar, Pune, Maharashtra',
    distance: '5.2 km',
    fare: '₹180',
    status: 'in_progress', // 'picked_up', 'in_progress', 'completed'
    startTime: new Date(),
    estimatedTime: '12 mins'
  });

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = () => {
    window.open(`tel:${ride.passengerPhone}`);
  };

  const handleEndRide = () => {
    setRide(prev => ({ ...prev, status: 'completed' }));
  };

  const getStatusText = () => {
    switch (ride.status) {
      case 'picked_up':
        return 'Passenger picked up - Ride in progress';
      case 'in_progress':
        return 'Ride in progress';
      case 'completed':
        return 'Ride completed';
      default:
        return 'Ride in progress';
    }
  };

  const getStatusColor = () => {
    switch (ride.status) {
      case 'picked_up':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6 text-sm">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Current Ride</h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

        {ride.status === 'completed' ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Ride Completed</h3>
            <p className="text-gray-600 mb-3">Total fare: {ride.fare}</p>
            <button onClick={() => onViewEarnings && onViewEarnings()} className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
              View Earnings
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Passenger Info */}
            <PassengerInfo name={ride.passengerName} phone={ride.passengerPhone} onCall={handleCall} />

            {/* Route Info */}
            <RouteInfo pickup={ride.pickup} drop={ride.drop} />

            {/* Ride Stats */}
            <RideStats distance={ride.distance} fare={ride.fare} elapsedText={formatTime(elapsedTime)} />

            {/* Live Map */}
            <LiveMapCard center={[18.5204,73.8567]} />

            {/* Action Buttons */}
            <RideActions
              status={ride.status}
              onStart={() => setRide(prev => ({ ...prev, status: 'in_progress' }))}
              onEnd={handleEndRide}
            />
          </div>
        )}
      </div>
    </div>
  );
}
