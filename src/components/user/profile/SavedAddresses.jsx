export default function SavedAddresses() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-base font-semibold text-gray-900">Saved addresses</div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Home</div>
          <div className="text-xs text-gray-600">Add your home</div>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Work</div>
          <div className="text-xs text-gray-600">Add your workplace</div>
        </div>
      </div>
      <div className="mt-3">
        <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Add address</button>
      </div>
    </div>
  );
}


