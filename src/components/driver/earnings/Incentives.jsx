"use client";

export default function Incentives({ incentives }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Incentives & Bonuses</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Peak hour bonus</span>
          <span className="font-semibold text-green-600">+₹{Math.round(incentives * 0.6)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Rating bonus</span>
          <span className="font-semibold text-green-600">+₹{Math.round(incentives * 0.4)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Referral bonus</span>
          <span className="font-semibold text-green-600">+₹0</span>
        </div>
      </div>
    </div>
  );
}


