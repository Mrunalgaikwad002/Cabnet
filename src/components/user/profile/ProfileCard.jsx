export default function ProfileCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gray-200" />
        <div>
          <div className="text-base font-semibold text-gray-900">Your profile</div>
          <div className="text-sm text-gray-600">View and edit your details</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Full name" />
        <input className="rounded-md border border-gray-300 px-3 py-2" placeholder="Phone number" />
        <input className="rounded-md border border-gray-300 px-3 py-2 sm:col-span-2" placeholder="Email" />
      </div>
      <div className="mt-4 flex justify-end">
        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">Save changes</button>
      </div>
    </div>
  );
}


