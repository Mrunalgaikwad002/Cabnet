'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest, generateClientClerkId } from '../../lib/api';

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
      const clerkId = generateClientClerkId();
      const payload = {
        clerkId,
        email: formData.email,
        firstName: formData.name,
        lastName: '',
        phoneNumber: '',
      };
      const endpoint = formData.role === 'driver' ? '/api/auth/signup/driver' : '/api/auth/signup/user';
      const driverExtras = formData.role === 'driver' ? { licenseNumber: '', vehicleInfo: {} } : {};
      const { token } = await apiRequest(endpoint, { method: 'POST', body: JSON.stringify({ ...payload, ...driverExtras }) });

      if (typeof window !== 'undefined') {
        // Persist role mapping
        const rolesMapRaw = localStorage.getItem('rolesByEmail');
        const rolesMap = rolesMapRaw ? JSON.parse(rolesMapRaw) : {};
        rolesMap[formData.email.toLowerCase()] = formData.role;
        localStorage.setItem('rolesByEmail', JSON.stringify(rolesMap));

        // Persist clerkId mapping
        const idsMapRaw = localStorage.getItem('clerkIdByEmail');
        const idsMap = idsMapRaw ? JSON.parse(idsMapRaw) : {};
        idsMap[formData.email.toLowerCase()] = clerkId;
        localStorage.setItem('clerkIdByEmail', JSON.stringify(idsMap));

        // Persist display name mapping
        const namesMapRaw = localStorage.getItem('displayNameByEmail');
        const namesMap = namesMapRaw ? JSON.parse(namesMapRaw) : {};
        namesMap[formData.email.toLowerCase()] = formData.name;
        localStorage.setItem('displayNameByEmail', JSON.stringify(namesMap));

        // Set current session values
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', formData.role);
        localStorage.setItem('currentEmail', formData.email.toLowerCase());
        localStorage.setItem('displayName', formData.name);
        sessionStorage.setItem('role', formData.role);
      }
      setLoading(false);
      router.push(`/${formData.role}/dashboard`);
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Signup failed. Please try again.');
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


