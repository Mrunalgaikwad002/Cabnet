export default function HowItWorks() {
  return (
    <section id="how" className="bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">How it works</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <div className="rounded-lg p-6 border border-gray-200 bg-white shadow-sm">
            <div className="text-base font-semibold text-gray-900">1. Set pickup & drop‑off</div>
            <p className="mt-2 text-sm text-gray-700">Choose locations on the map or enter addresses manually.</p>
          </div>
          <div className="rounded-lg p-6 border border-gray-200 bg-white shadow-sm">
            <div className="text-base font-semibold text-gray-900">2. Get matched instantly</div>
            <p className="mt-2 text-sm text-gray-700">We connect you to the nearest available driver.</p>
          </div>
          <div className="rounded-lg p-6 border border-gray-200 bg-white shadow-sm">
            <div className="text-base font-semibold text-gray-900">3. Track and pay</div>
            <p className="mt-2 text-sm text-gray-700">Track your trip live and pay securely in the app.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
