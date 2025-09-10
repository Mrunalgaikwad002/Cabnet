"use client";

export default function SummaryStats({ totalEarnings, totalRides, averageRating }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-teal-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-teal-600">Total Earnings</p>
            <p className="text-xl font-bold text-teal-900">₹{totalEarnings.toLocaleString()}</p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600">Total Rides</p>
            <p className="text-xl font-bold text-blue-900">{totalRides}</p>
          </div>
          <div className="text-3xl">🚖</div>
        </div>
      </div>
      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-600">Average Rating</p>
            <p className="text-xl font-bold text-yellow-900">{averageRating} ⭐</p>
          </div>
          <div className="text-3xl">⭐</div>
        </div>
      </div>
    </div>
  );
}


