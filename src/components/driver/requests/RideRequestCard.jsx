"use client";

export default function RideRequestCard({ request, onAccept, onReject }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{request.passengerName}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(request.passengerRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">{request.passengerRating}</span>
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-500">{request.requestTime}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Pickup</span>
          </div>
          <p className="text-gray-900 text-sm">{request.pickup}</p>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Drop</span>
          </div>
          <p className="text-gray-900 text-sm">{request.drop}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="text-center">
          <p className="text-sm text-gray-600">Distance</p>
          <p className="font-semibold text-gray-900 text-base">{request.distance}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Fare</p>
          <p className="font-semibold text-gray-900 text-base">{request.estimatedFare}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Time</p>
          <p className="font-semibold text-gray-900 text-base">{request.estimatedTime}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onAccept}
          className="flex-1 bg-teal-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Accept Ride
        </button>
        <button
          onClick={onReject}
          className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}


