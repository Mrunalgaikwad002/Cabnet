export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-gray-600">© {new Date().getFullYear()} CabNet. All rights reserved.</div>
        <div className="flex gap-4 text-gray-600">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="#" className="hover:text-gray-900">Support</a>
        </div>
      </div>
    </footer>
  );
}
