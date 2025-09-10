"use client";

export default function PerformanceStats({ avgPerRide, rating, onlineHours }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Performance</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Average per ride</span>
          <span className="font-semibold text-gray-900">₹{avgPerRide}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Rating</span>
          <span className="font-semibold text-gray-900">{rating} ⭐</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Online hours</span>
          <span className="font-semibold text-gray-900">{onlineHours} hrs</span>
        </div>
      </div>
    </div>
  );
}


