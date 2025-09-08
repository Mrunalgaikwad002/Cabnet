export default function Testimonials() {
  return (
    <section className="bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">What riders say</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-700">"Booking a ride takes seconds and my driver arrives fast every time."</p>
            <div className="mt-4 text-xs text-gray-500">Aarav, Pune</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-700">"Payments are smooth and I love the live tracking for safety."</p>
            <div className="mt-4 text-xs text-gray-500">Ishita, Mumbai</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-700">"Great support and reliable drivers. CabNet has been super handy."</p>
            <div className="mt-4 text-xs text-gray-500">Rohan, Delhi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
