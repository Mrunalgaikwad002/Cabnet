'use client';

import { useState } from 'react';
import { apiRequest } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) return setError('Email is required');
    if (!newPassword) return setError('New password is required');
    if (newPassword.length < 6) return setError('Password must be at least 6 characters');
    if (newPassword !== confirmPassword) return setError('Passwords do not match');

    setLoading(true);
    try {
      // Inform backend; for now backend just validates email exists
      await apiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.toLowerCase() })
      });
      // Update local demo password so login works until real hashing is added
      if (typeof window !== 'undefined') {
        const key = email.toLowerCase();
        const passMapRaw = localStorage.getItem('passwordByEmail');
        const passMap = passMapRaw ? JSON.parse(passMapRaw) : {};
        passMap[key] = newPassword;
        localStorage.setItem('passwordByEmail', JSON.stringify(passMap));
      }
      setSuccess('Password updated. Redirecting to login...');
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Something went wrong');
    } finally {
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
      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="text-sm text-green-800">{success}</div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <div className="mt-1">
          <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="block w-full appearance-none rounded-md border border-gray-300 bg-white text-gray-900 caret-black px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New password</label>
        <div className="mt-1">
          <input id="newPassword" name="newPassword" type="password" required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="block w-full appearance-none rounded-md border border-gray-300 bg-white text-gray-900 caret-black px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Enter a new password" />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
        <div className="mt-1">
          <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="block w-full appearance-none rounded-md border border-gray-300 bg-white text-gray-900 caret-black px-3 py-2 placeholder-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm" placeholder="Re-enter the new password" />
        </div>
      </div>

      <div>
        <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </div>
    </form>
  );
}


