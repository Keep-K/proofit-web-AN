// API 유틸리티 함수

function getAPIBase(): string {
  if (typeof window === 'undefined') return '';
  
  const fromLS = localStorage.getItem('PROOFIT_API_BASE');
  if (fromLS) return fromLS;
  
  const isProduction =
    window.location.hostname.includes('firebaseapp.com') ||
    window.location.hostname.includes('web.app');
  
  if (isProduction) {
    return 'https://backend-production-6ff4.up.railway.app';
  }
  
  if (window.location.port === '4000') return '';
  return 'http://localhost:4000';
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('proofit_access_token');
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('proofit_access_token', token);
}

export function removeAccessToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('proofit_access_token');
}

export async function fetchJSON<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(getAPIBase() + url, { ...options, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }
  return res.json();
}
