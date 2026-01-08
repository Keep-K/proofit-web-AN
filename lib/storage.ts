// localStorage 유틸리티 - SSR 안전

export function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error(`Error reading localStorage key "${key}":`, e)
    return null
  }
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error(`Error setting localStorage key "${key}":`, e)
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error(`Error removing localStorage key "${key}":`, e)
  }
}

export function getStorageJSON<T>(key: string, defaultValue: T): T {
  const item = getStorageItem(key)
  if (!item) return defaultValue
  try {
    return JSON.parse(item) as T
  } catch (e) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, e)
    return defaultValue
  }
}

export function setStorageJSON<T>(key: string, value: T): void {
  try {
    setStorageItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Error stringifying JSON for localStorage key "${key}":`, e)
  }
}
