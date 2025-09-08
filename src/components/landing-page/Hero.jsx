export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_450px_at_20%_-10%,rgba(59,130,246,0.12),transparent),radial-gradient(900px_450px_at_80%_-10%,rgba(16,185,129,0.12),transparent)]" />
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">Trusted rides, made simple</span>
          <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">Your ride, on time — every time</h1>
          <p className="mt-3 text-base sm:text-lg text-gray-800 max-w-2xl">CabNet connects riders and drivers seamlessly with real‑time tracking, secure payments, and reliable support.</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              3 min avg. pickup
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
              Secure Stripe payments
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
              24/7 support
            </div>
          </div>
        </div>
        {/* Visual collage */}
        <div className="hidden md:block">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blue-100 blur-2xl" />
            <div className="absolute -right-6 -bottom-8 h-24 w-24 rounded-full bg-emerald-100 blur-2xl" />
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
                <img src="https://etimg.etb2bimg.com/photo/93101923.cms" alt="Ride showcase" className="w-full h-80 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
