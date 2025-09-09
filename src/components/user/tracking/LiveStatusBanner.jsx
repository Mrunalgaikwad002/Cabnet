'use client';

export default function LiveStatusBanner({ statusText }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 text-gray-900 px-4 py-3 text-sm">
      {statusText}
    </div>
  );
}


