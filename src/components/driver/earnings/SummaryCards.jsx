"use client";

export default function SummaryCards({ total, rides, incentives }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Rides Completed</p>
            <p className="text-2xl font-bold text-gray-900">{rides}</p>
          </div>
          <div className="text-3xl">🚖</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Incentives</p>
            <p className="text-2xl font-bold text-gray-900">₹{incentives}</p>
          </div>
          <div className="text-3xl">🎁</div>
        </div>
      </div>
    </div>
  );
}


