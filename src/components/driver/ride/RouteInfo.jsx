"use client";

export default function RouteInfo({ pickup, drop }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        <div>
          <p className="text-sm font-medium text-gray-700">Pickup Location</p>
          <p className="text-gray-900">{pickup}</p>
        </div>
      </div>
      <div className="ml-2 border-l-2 border-gray-300 h-8"></div>
      <div className="flex items-center space-x-4">
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <div>
          <p className="text-sm font-medium text-gray-700">Drop Location</p>
          <p className="text-gray-900">{drop}</p>
        </div>
      </div>
    </div>
  );
}


