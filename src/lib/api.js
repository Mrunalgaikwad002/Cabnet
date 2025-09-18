// Resolve API base URL with safe production fallback
const ENV_API = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_API = 'https://cab-net-backend.vercel.app';
export const API_BASE_URL = (typeof window !== 'undefined')
  ? (() => {
      // If running on non-localhost but env points to localhost, override to deployed API
      const isProdLike = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      if (isProdLike && ENV_API && /localhost|127\.0\.0\.1/.test(ENV_API)) {
        return DEFAULT_API;
      }
      return ENV_API || DEFAULT_API;
    })()
  : (ENV_API || DEFAULT_API);

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


