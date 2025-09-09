"use client";
export default function OffersRefunds() {
  const refunds = [
    { id: 'rf1', rideId: 'r12390', method: 'UPI', status: 'In process', eta: '2-3 days' },
  ];

  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-blue-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-gray-900">Active offer</div>
            <div className="text-sm text-gray-800 mt-1">Use code <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-blue-100">SAVE20</span> for 20% off up to ₹/ $50.</div>
          </div>
          <button className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900">Apply</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
        <div className="text-base font-semibold text-gray-900">Refunds</div>
        {refunds.length === 0 ? (
          <div className="mt-2 text-sm text-gray-700">No refunds at the moment.</div>
        ) : (
          <ul className="mt-3 space-y-2">
            {refunds.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm">
                <div>
                  <div className="text-gray-900">Ride {r.rideId} • Refund to {r.method}</div>
                  <div className="text-gray-600 text-xs">Expected in {r.eta}</div>
                </div>
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">{r.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}


