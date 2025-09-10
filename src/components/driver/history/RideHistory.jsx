"use client";

import { useState } from 'react';
import Filters from './Filters';
import SummaryStats from './SummaryStats';
import RideListItem from './RideListItem';

export default function RideHistory() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const rides = [
    {
      id: 1,
      date: '2024-01-15',
      time: '9:30 AM',
      passengerName: 'John Doe',
      pickup: '123 Main St, Downtown',
      drop: '456 Oak Ave, Uptown',
      distance: '5.2 km',
      fare: 180,
      paymentMethod: 'Online',
      rating: 5,
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '11:15 AM',
      passengerName: 'Jane Smith',
      pickup: '789 Pine St, Midtown',
      drop: '321 Elm St, Eastside',
      distance: '3.8 km',
      fare: 140,
      paymentMethod: 'Cash',
      rating: 4,
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-14',
      time: '2:45 PM',
      passengerName: 'Mike Johnson',
      pickup: '555 Broadway, Westside',
      drop: '777 Park Ave, Northside',
      distance: '7.1 km',
      fare: 220,
      paymentMethod: 'Online',
      rating: 5,
      status: 'completed'
    },
    {
      id: 4,
      date: '2024-01-14',
      time: '6:20 PM',
      passengerName: 'Sarah Wilson',
      pickup: '999 Central Ave, Downtown',
      drop: '111 River St, Southside',
      distance: '4.5 km',
      fare: 160,
      paymentMethod: 'Online',
      rating: 4,
      status: 'completed'
    },
    {
      id: 5,
      date: '2024-01-13',
      time: '8:10 AM',
      passengerName: 'David Brown',
      pickup: '333 Market St, Midtown',
      drop: '666 Hill St, Uptown',
      distance: '6.3 km',
      fare: 200,
      paymentMethod: 'Cash',
      rating: 5,
      status: 'completed'
    }
  ];

  const filteredRides = rides.filter(ride => {
    const rideDate = new Date(ride.date);
    const today = new Date();
    
    switch (selectedFilter) {
      case 'today':
        return rideDate.toDateString() === today.toDateString();
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return rideDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return rideDate >= monthAgo;
      default:
        return true;
    }
  });

  const totalEarnings = filteredRides.reduce((sum, ride) => sum + ride.fare, 0);
  const totalRides = filteredRides.length;
  const averageRating = filteredRides.length > 0 
    ? (filteredRides.reduce((sum, ride) => sum + ride.rating, 0) / filteredRides.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Ride History</h2>
          <Filters selected={selectedFilter} onChange={setSelectedFilter} />
        </div>
        <SummaryStats totalEarnings={totalEarnings} totalRides={totalRides} averageRating={averageRating} />
      </div>

      {/* Rides List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredRides.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rides found</h3>
            <p className="text-gray-600">No rides match the selected filter</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRides.map((ride) => (
              <RideListItem key={ride.id} ride={ride} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
