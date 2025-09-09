"use client";
import { useState } from 'react';

export default function SecurityPrivacy() {
  const [twofa, setTwofa] = useState(false);
  const logoutAll = () => alert('Logged out from all devices (demo)');
  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.href = '/';
      }
    }
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="text-base font-semibold text-gray-900">Security & Privacy</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
          <div>
            <div className="text-sm text-gray-900">Two-Factor Authentication</div>
            <div className="text-xs text-gray-600">Add an extra layer of security</div>
          </div>
          <input type="checkbox" checked={twofa} onChange={(e) => setTwofa(e.target.checked)} />
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Connected Devices</div>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-gray-800">Windows Chrome • Pune</span>
              <button className="text-gray-600 hover:text-gray-900">Logout</button>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-800">Android App • Mumbai</span>
              <button className="text-gray-600 hover:text-gray-900">Logout</button>
            </li>
          </ul>
          <button onClick={logoutAll} className="mt-3 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50">Logout all devices</button>
        </div>
        <div className="rounded-md border border-red-200 bg-red-50 p-3 sm:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-red-800">Delete / Deactivate Account</div>
              <div className="text-xs text-red-700">This action is irreversible</div>
            </div>
            <button onClick={deleteAccount} className="rounded-md bg-red-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-red-700">Continue</button>
          </div>
        </div>
      </div>
    </section>
  );
}


