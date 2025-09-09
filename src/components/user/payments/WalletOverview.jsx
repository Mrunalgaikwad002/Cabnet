"use client";
import { useMemo } from 'react';

export default function WalletOverview() {
  const balance = useMemo(() => 0, []);
  const recent = [
    { id: 't1', type: 'debit', label: 'Ride #12410', amount: 24900, currency: 'INR', time: 'Today, 10:20 AM' },
    { id: 't2', type: 'credit', label: 'Wallet Top-up', amount: 50000, currency: 'INR', time: 'Yesterday, 6:15 PM' },
  ];

  const formatINR = (paise) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format((paise || 0) / 100);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">Wallet balance</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{formatINR(balance)}</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900">Add money</button>
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">Withdraw</button>
        </div>
      </div>
      <div className="mt-5">
        <div className="text-sm font-medium text-gray-900">Recent activity</div>
        <ul className="mt-3 divide-y divide-gray-200">
          {recent.map((r) => (
            <li key={r.id} className="py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>{r.type === 'debit' ? '🔻' : '🔺'}</span>
                <span className="text-gray-800">{r.label}</span>
                <span className="text-gray-500">• {r.time}</span>
              </div>
              <div className={r.type === 'debit' ? 'text-red-600 font-medium' : 'text-green-700 font-medium'}>
                {r.type === 'debit' ? '-' : '+'} {formatINR(r.amount)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


