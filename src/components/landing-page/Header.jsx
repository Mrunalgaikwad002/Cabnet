export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">C</span>
          <span className="text-lg font-bold tracking-tight text-gray-900">CabNet</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#how" className="hover:text-gray-900">How it works</a>
          <a href="#cta" className="hover:text-gray-900">Get started</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/signup" className="hidden sm:inline-flex rounded-full px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-sm text-gray-800">Sign up</a>
          <a href="/login" className="inline-flex rounded-full px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-sm text-gray-800">Login</a>
        </div>
      </div>
    </header>
  );
}
