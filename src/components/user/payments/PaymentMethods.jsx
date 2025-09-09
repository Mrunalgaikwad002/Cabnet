"use client";
import { useState } from 'react';

export default function PaymentMethods() {
  const [cards, setCards] = useState([
    { id: 'c1', brand: 'Visa', last4: '4521' },
  ]);
  const [upi, setUpi] = useState([
    { id: 'u1', handle: 'jack@okhdfcbank' },
  ]);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="text-base font-semibold text-gray-900">Saved payment methods</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-gray-800">Cards</div>
          <ul className="mt-2 space-y-2">
            {cards.map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm">
                <span className="text-gray-800">{c.brand} •••• {c.last4}</span>
                <button className="text-gray-600 hover:text-gray-900" onClick={() => setCards((arr) => arr.filter((x) => x.id !== c.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="mt-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Add card</button>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-800">UPI IDs</div>
          <ul className="mt-2 space-y-2">
            {upi.map((u) => (
              <li key={u.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 text-sm">
                <span className="text-gray-800">{u.handle}</span>
                <button className="text-gray-600 hover:text-gray-900" onClick={() => setUpi((arr) => arr.filter((x) => x.id !== u.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="mt-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Add UPI</button>
        </div>
      </div>
    </section>
  );
}


