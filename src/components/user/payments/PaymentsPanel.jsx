export default function PaymentsPanel() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-base font-semibold text-gray-900">Payments</div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Payment methods</div>
          <div className="mt-2 text-xs text-gray-600">Add card / UPI</div>
          <button className="mt-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Add method</button>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Transactions</div>
          <div className="mt-2 text-xs text-gray-600">Your payment history</div>
          <button className="mt-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">View all</button>
        </div>
      </div>
    </div>
  );
}


