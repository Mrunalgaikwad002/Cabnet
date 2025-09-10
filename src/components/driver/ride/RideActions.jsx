"use client";

export default function RideActions({ status, onStart, onEnd }) {
  return (
    <div className="flex space-x-3">
      {status === 'picked_up' && (
        <button
          onClick={onStart}
          className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Ride
        </button>
      )}
      <button
        onClick={onEnd}
        className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
      >
        End Ride
      </button>
    </div>
  );
}


