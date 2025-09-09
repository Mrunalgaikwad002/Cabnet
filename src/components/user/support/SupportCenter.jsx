export default function SupportCenter() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-base font-semibold text-gray-900">Support & help</div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-md border border-gray-200 p-3">
          <div className="font-medium text-gray-900">FAQs</div>
          <div className="text-xs text-gray-600">Common questions</div>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="font-medium text-gray-900">Lost item</div>
          <div className="text-xs text-gray-600">Report a lost item</div>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="font-medium text-gray-900">Fare dispute</div>
          <div className="text-xs text-gray-600">Raise a ticket</div>
        </div>
      </div>
    </div>
  );
}


