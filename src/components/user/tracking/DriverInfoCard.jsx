'use client';

export default function DriverInfoCard({ driver, eta, distance, payment, onCall, onChat, onCancel }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3 text-sm">
      <div className="flex items-center gap-3">
        <img src={driver.photo} alt="Driver" className="h-12 w-12 rounded-full object-cover" />
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{driver.name}</div>
          <div className="text-xs text-gray-700">⭐ {driver.rating} · {driver.plate} · {driver.car}</div>
        </div>
        {payment && (
          <span className="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs text-green-700">{payment}</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md bg-gray-50 p-2">
          <div className="text-xs text-gray-700">Estimated arrival</div>
          <div className="font-medium text-gray-900">{eta}</div>
        </div>
        <div className="rounded-md bg-gray-50 p-2">
          <div className="text-xs text-gray-700">Distance remaining</div>
          <div className="font-medium text-gray-900">{distance}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={onCall} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-800 hover:bg-gray-50">Call</button>
        <button onClick={onChat} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-800 hover:bg-gray-50">Chat</button>
        <button onClick={onCancel} className="ml-auto rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-800 hover:bg-gray-50">Cancel ride</button>
      </div>
    </div>
  );
}


