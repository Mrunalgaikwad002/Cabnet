export default function RideHistory() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-base font-semibold text-gray-900">Ride history</div>
      <div className="mt-3 divide-y divide-gray-200 text-sm">
        <div className="py-3 flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">No rides yet</div>
            <div className="text-xs text-gray-600">Your rides will appear here</div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">Receipt</button>
            <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-800 hover:bg-gray-50">Book again</button>
          </div>
        </div>
      </div>
    </div>
  );
}


