"use client";

export default function TodayRides({ rides }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Today's Rides</h3>
      <div className="space-y-3">
        {rides.map((ride, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-sm">🚖</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{ride.passenger}</p>
                <p className="text-sm text-gray-600">{ride.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">₹{ride.fare}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


