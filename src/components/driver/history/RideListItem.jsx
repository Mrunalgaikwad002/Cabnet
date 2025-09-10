"use client";

export default function RideListItem({ ride }) {
  return (
    <div className="p-5 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2.5">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base">{ride.passengerName}</h3>
              <p className="text-sm text-gray-600">{ride.date} at {ride.time}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Pickup</span>
              </div>
              <p className="text-gray-900 text-sm">{ride.pickup}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Drop</span>
              </div>
              <p className="text-gray-900 text-sm">{ride.drop}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span>Distance: {ride.distance}</span>
            <span>Payment: {ride.paymentMethod}</span>
            <div className="flex items-center space-x-1">
              <span>Rating:</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < ride.rating ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">₹{ride.fare}</p>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            ride.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {ride.status}
          </div>
        </div>
      </div>
    </div>
  );
}


