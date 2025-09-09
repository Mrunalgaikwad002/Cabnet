"use client";
import { useState } from 'react';

export default function RidePreferences() {
  const [pickup, setPickup] = useState('Home');
  const [method, setMethod] = useState('UPI');
  const [music, setMusic] = useState(true);
  const [ac, setAc] = useState(true);
  const [silent, setSilent] = useState(false);
  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pref_pickup', pickup);
      localStorage.setItem('pref_method', method);
      localStorage.setItem('pref_music', String(music));
      localStorage.setItem('pref_ac', String(ac));
      localStorage.setItem('pref_silent', String(silent));
    }
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="text-base font-semibold text-gray-900">Ride Preferences</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs text-gray-600">Default Pickup</label>
          <select value={pickup} onChange={(e) => setPickup(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900">
            <option>Home</option>
            <option>Work</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-600">Preferred Payment</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900">
            <option>UPI</option>
            <option>Card</option>
            <option>Cash</option>
            <option>Wallet</option>
          </select>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Options</div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>Music</span>
            <input type="checkbox" checked={music} onChange={(e) => setMusic(e.target.checked)} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>AC</span>
            <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>Silent ride</span>
            <input type="checkbox" checked={silent} onChange={(e) => setSilent(e.target.checked)} />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button onClick={save} className="rounded-md bg-black text-white px-3 py-1.5 text-sm font-medium hover:bg-gray-900">Save preferences</button>
      </div>
    </section>
  );
}


