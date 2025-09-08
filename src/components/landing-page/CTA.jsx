export default function CTA() {
  return (
    <section id="cta" className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <div className="rounded-2xl border border-gray-200 p-8 sm:p-10 bg-white text-center shadow-sm">
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Ready to ride?</h3>
        <p className="mt-3 text-base text-gray-700">Join thousands moving with CabNet today.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="/signup"
            className="inline-flex rounded-full px-5 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-900"
          >
            Sign up
          </a>
          <a
            href="/login"
            className="inline-flex rounded-full px-5 py-2.5 border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            Login
          </a>
        </div>
        <div className="mt-4 text-xs text-gray-500">No hidden fees • Cancel anytime • 24/7 support</div>
      </div>
    </section>
  );
}
