export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-2 sm:py-4">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Why choose CabNet</h2>
      <p className="mt-3 text-gray-700 max-w-2xl">Modern, safe, and fast — everything you need to move with confidence.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <img src="https://png.pngtree.com/png-clipart/20220823/original/pngtree-man-tracking-taxi-driver-cab-on-tablet-map-png-image_8459365.png" alt="Real-time tracking" className="h-28 w-full object-contain" />
          <div className="mt-3 text-base font-semibold text-gray-900">Real‑time tracking</div>
          <p className="mt-2 text-sm text-gray-700">Follow your driver's live location and share trip status with friends.</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/secure-payment-8620595-6830373.png" alt="Secure payments" className="h-28 w-full object-contain" />
          <div className="mt-3 text-base font-semibold text-gray-900">Secure payments</div>
          <p className="mt-2 text-sm text-gray-700">Pay safely with cards or wallets, powered by Stripe.</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-cab-booking-3606535-3013176.png" alt="Fast matching" className="h-28 w-full object-contain" />
          <div className="mt-3 text-base font-semibold text-gray-900">Fast matching</div>
          <p className="mt-2 text-sm text-gray-700">Get matched to nearby drivers in seconds with smart routing.</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <img src="https://tse4.mm.bing.net/th/id/OIP.p2ANTtrDQ3iTia-KOV_kPgHaEK?pid=Api&P=0&h=180" alt="Reliable support" className="h-28 w-full object-contain" />
          <div className="mt-3 text-base font-semibold text-gray-900">Reliable support</div>
          <p className="mt-2 text-sm text-gray-700">In‑app help and quick resolutions for a hassle‑free experience.</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <img src="https://tse1.mm.bing.net/th/id/OIP.c7-pm4eSKbtB05ZzxMx7KQAAAA?pid=Api&P=0&h=180" alt="Driver safety" className="h-28 w-full object-contain" />
          <div className="mt-3 text-base font-semibold text-gray-900">Driver safety</div>
          <p className="mt-2 text-sm text-gray-700">Verified profiles, ratings, and community guidelines.</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <img src="https://media.istockphoto.com/vectors/young-man-raising-his-arm-to-call-a-taxi-vector-id842477368?k=6&m=842477368&s=612x612&w=0&h=Sh8S5-uhplcafISBSUcMpvdBmQQapptWC8tQ_kNaLBs=" alt="Low wait times" className="h-28 w-full object-contain" />
          <div className="mt-3 text-base font-semibold text-gray-900">Low wait times</div>
          <p className="mt-2 text-sm text-gray-700">City‑optimized dispatching to get you moving faster.</p>
        </div>
      </div>
    </section>
  );
}
