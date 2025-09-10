"use client";

import { useState } from 'react';
import SummaryCards from './SummaryCards';
import EarningsChart from './EarningsChart';
import TodayRides from './TodayRides';
import PerformanceStats from './PerformanceStats';
import Incentives from './Incentives';

export default function EarningsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const earningsData = {
    today: {
      total: 1250,
      rides: 8,
      incentives: 150,
      breakdown: [
        { time: '9:00 AM', fare: 180, passenger: 'John Doe' },
        { time: '10:30 AM', fare: 220, passenger: 'Jane Smith' },
        { time: '12:15 PM', fare: 160, passenger: 'Mike Johnson' },
        { time: '2:45 PM', fare: 190, passenger: 'Sarah Wilson' },
        { time: '4:20 PM', fare: 210, passenger: 'David Brown' },
        { time: '6:00 PM', fare: 175, passenger: 'Lisa Davis' },
        { time: '7:30 PM', fare: 200, passenger: 'Tom Miller' },
        { time: '9:15 PM', fare: 115, passenger: 'Anna Garcia' }
      ]
    },
    week: {
      total: 8750,
      rides: 45,
      incentives: 800
    },
    month: {
      total: 32000,
      rides: 180,
      incentives: 2500
    }
  };

  const currentData = earningsData[selectedPeriod];

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' }
  ];

  return (
    <div className="space-y-6 text-sm">
      {/* Period Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Earnings Overview</h2>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === period.key
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Earnings Summary */}
      <SummaryCards total={currentData.total} rides={currentData.rides} incentives={currentData.incentives} />

      {/* Earnings Chart */}
      <EarningsChart selectedPeriod={selectedPeriod} data={currentData} />

      {/* Recent Rides */}
      {selectedPeriod === 'today' && currentData.breakdown && (
        <TodayRides rides={currentData.breakdown} />
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceStats avgPerRide={Math.round(currentData.total / currentData.rides)} rating={4.8} onlineHours={8.5} />
        <Incentives incentives={currentData.incentives} />
      </div>
    </div>
  );
}
