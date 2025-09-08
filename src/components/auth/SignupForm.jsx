'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
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
      if (typeof window !== 'undefined') {
        const rolesMapRaw = localStorage.getItem('rolesByEmail');
        const rolesMap = rolesMapRaw ? JSON.parse(rolesMapRaw) : {};
        rolesMap[formData.email.toLowerCase()] = formData.role;
        localStorage.setItem('rolesByEmail', JSON.stringify(rolesMap));
        sessionStorage.setItem('role', formData.role);
        localStorage.setItem('role', formData.role);
      }
      setTimeout(() => {
        setLoading(false);
        router.push(`/${formData.role}/dashboard`);
      }, 600);
    } catch (err) {
      setError('Signup failed. Please try again.');
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
        <div className="mt-1">
          <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Your name" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <div className="mt-1">
          <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
          <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="block w-full appearance-none rounded-md border border-gray-300 bg-white text-gray-900 caret-black px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Create a password" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900">Sign up as</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-900 font-medium">
            <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} className="h-4 w-4 accent-black" />
            <span>User</span>
          </label>
          <label className="flex items-center justify-center gap-2 rounded-md border border-gray-300 p-2 text-sm cursor-pointer hover:bg-gray-50 text-gray-900 font-medium">
            <input type="radio" name="role" value="driver" checked={formData.role === 'driver'} onChange={handleChange} className="h-4 w-4 accent-black" />
            <span>Driver</span>
          </label>
        </div>
      </div>

      <div>
        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
}


