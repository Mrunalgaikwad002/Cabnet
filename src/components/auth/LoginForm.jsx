'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [role, setRole] = useState('user');
  const [needsRole, setNeedsRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let resolvedRole = 'user';
      if (typeof window !== 'undefined') {
        const rolesMapRaw = localStorage.getItem('rolesByEmail');
        const rolesMap = rolesMapRaw ? JSON.parse(rolesMapRaw) : {};
        const mapped = rolesMap[formData.email.toLowerCase()];
        if (mapped === 'driver' || mapped === 'user') {
          resolvedRole = mapped;
        } else {
          // no mapping found — require role selection
          setNeedsRole(true);
          resolvedRole = role; // use currently selected radio
          rolesMap[formData.email.toLowerCase()] = resolvedRole;
          localStorage.setItem('rolesByEmail', JSON.stringify(rolesMap));
        }
        sessionStorage.setItem('role', resolvedRole);
        localStorage.setItem('role', resolvedRole);
      }
      setTimeout(() => {
        setLoading(false);
        router.push(`/${resolvedRole}/dashboard`);
      }, 500);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <div className="mt-1">
          <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="block w-full appearance-none rounded-md border border-gray-300 bg-white text-gray-900 caret-black px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Enter your email" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
          <input id="password" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} className="block w-full appearance-none rounded-md border border-gray-300 bg-white text-gray-900 caret-black px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Enter your password" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-black hover:text-gray-700">Forgot password?</a>
        </div>
      </div>

      {needsRole && (
        <div>
          <label className="block text-sm font-medium text-gray-900">Continue as</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-900 font-medium">
              <input type="radio" name="loginRole" value="user" checked={role === 'user'} onChange={() => setRole('user')} className="h-4 w-4 accent-black" />
              <span>User</span>
            </label>
            <label className="flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-900 font-medium">
              <input type="radio" name="loginRole" value="driver" checked={role === 'driver'} onChange={() => setRole('driver')} className="h-4 w-4 accent-black" />
              <span>Driver</span>
            </label>
          </div>
        </div>
      )}

      <div>
        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </form>
  );
}


