import { useEffect, useState } from "react";

/**
 * A React hook that syncs state with localStorage.
 * @param key The localStorage key
 * @param initialValue Default value if nothing in storage
 */
export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (err) {
      console.error("useLocalStorage get error", err);
      return initialValue;
    }
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("useLocalStorage set error", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
