export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cab-net-backend.vercel.app';

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers, cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || `Request failed: ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    if (res.status === 401 && typeof window !== 'undefined') {
      // Auto-logout on unauthorized
      localStorage.removeItem('authToken');
      // Keep role/email to help login UX
    }
    throw error;
  }
  return data;
}

export function generateClientClerkId() {
  // Temporary client-side ID until Clerk is integrated
  // Format: cli_ + 24 hex chars
  const random = Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `cli_${random}`;
}


