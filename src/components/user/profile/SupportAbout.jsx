"use client";

export default function SupportAbout() {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="text-base font-semibold text-gray-900">Support & About</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Help & Support</div>
          <div className="mt-1 text-sm text-gray-700">FAQs, contact support</div>
          <button onClick={()=>alert('Opening help (demo)')} className="mt-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50">Open</button>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">Terms & Privacy</div>
          <div className="mt-1 text-sm text-gray-700">Read policies</div>
          <button onClick={()=>alert('Viewing policies (demo)')} className="mt-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50">View</button>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="text-sm font-medium text-gray-900">App Info</div>
          <div className="mt-1 text-sm text-gray-700">CabNet v1.0.0</div>
          <button onClick={()=>alert('You are on the latest version (demo)')} className="mt-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-50">Check updates</button>
        </div>
      </div>
    </section>
  );
}


