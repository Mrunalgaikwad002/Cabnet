"use client";
const rows = [
  { id: 'p1001', datetime: '2025-09-01 10:20', rideId: 'r12410', amount: 24900, method: 'Card', status: 'Success' },
  { id: 'p1002', datetime: '2025-08-30 18:45', rideId: 'r12390', amount: 45000, method: 'UPI', status: 'Refunded' },
  { id: 'p1003', datetime: '2025-08-28 09:05', rideId: 'r12340', amount: 19900, method: 'Wallet', status: 'Failed' },
];

const formatINR = (paise) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((paise || 0) / 100);

export default function TransactionsList() {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold text-gray-900">Transactions</div>
        <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50">Export</button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 pr-6">Date & Time</th>
              <th className="py-2 pr-6">Ride</th>
              <th className="py-2 pr-6">Amount</th>
              <th className="py-2 pr-6">Method</th>
              <th className="py-2 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="py-2 pr-6 text-gray-800">{r.datetime}</td>
                <td className="py-2 pr-6">
                  <button className="text-blue-600 hover:underline">{r.rideId}</button>
                </td>
                <td className="py-2 pr-6 font-medium text-gray-900">{formatINR(r.amount)}</td>
                <td className="py-2 pr-6 text-gray-800">{r.method}</td>
                <td className="py-2 pr-6">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.status === 'Success' ? 'bg-green-100 text-green-800 border border-green-200' :
                    r.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    r.status === 'Refunded' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-red-100 text-red-800 border border-red-200'
                  }`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


