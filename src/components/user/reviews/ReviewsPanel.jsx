export default function ReviewsPanel() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-base font-semibold text-gray-900">Rate your ride</div>
      <div className="mt-3 grid grid-cols-1 gap-3">
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm text-gray-700">You have no pending ratings.</div>
        </div>
      </div>
    </div>
  );
}


