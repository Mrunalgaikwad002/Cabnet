"use client";

export default function RideStats({ distance, fare, elapsedText }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Distance</p>
        <p className="text-lg font-bold text-gray-900">{distance}</p>
      </div>
      <div className="text-center bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Fare</p>
        <p className="text-lg font-bold text-gray-900">{fare}</p>
      </div>
      <div className="text-center bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">Time</p>
        <p className="text-lg font-bold text-gray-900">{elapsedText}</p>
      </div>
    </div>
  );
}


