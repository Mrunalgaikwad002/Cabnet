'use client';

export default function RideSummary({ pickup, drop, rideType, payment, estimate, onConfirm }) {
  return (
    <div>
      <div className="text-base font-semibold text-gray-900">Ride summary</div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-gray-200 p-3">
          <div className="font-medium text-gray-900">Pickup</div>
          <div className="text-gray-700">{pickup}</div>
        </div>
        <div className="rounded-xl border border-gray-200 p-3">
          <div className="font-medium text-gray-900">Drop</div>
          <div className="text-gray-700">{drop}</div>
        </div>
        <div className="rounded-xl border border-gray-200 p-3">
          <div className="font-medium text-gray-900">Ride type</div>
          <div className="text-gray-700">{rideType}</div>
        </div>
        <div className="rounded-xl border border-gray-200 p-3">
          <div className="font-medium text-gray-900">Payment</div>
          <div className="text-gray-700">{payment}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-700">{`Estimated ₹${estimate?.fare} · ETA ${estimate?.eta} mins`}</div>
        <button className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900" onClick={onConfirm}>Confirm & search driver</button>
      </div>
    </div>
  );
}


