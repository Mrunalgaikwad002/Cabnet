'use client';

export default function RideHistoryList({ rides = [], onSelect }) {
  if (!rides.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700">
        No rides yet. Book your first ride to see it here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rides.map((r) => (
        <button key={r.id} onClick={() => onSelect?.(r)} className="w-full text-left rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-900">{r.pickup} → {r.drop}</div>
            <div className="text-sm text-gray-900 font-medium">₹{r.fare}</div>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            {r.date} • {r.duration} • {r.vehicle} • {r.payment} • {r.status}
          </div>
        </button>
      ))}
    </div>
  );
}


