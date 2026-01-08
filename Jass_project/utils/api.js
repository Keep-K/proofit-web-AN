import { API, getAccessToken } from '../config/api.js';

export async function fetchJSON(url, options = {}) {
  const headers = { 
    "Content-Type": "application/json", 
    ...(options.headers || {}) 
  };

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(API + url, { ...options, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }
  return res.json();
}