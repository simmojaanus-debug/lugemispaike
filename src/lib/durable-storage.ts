import type { StateStorage } from "zustand/middleware";

const empty: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  const hit = document.cookie.split("; ").find((part) => part.startsWith(prefix));
  if (!hit) return null;
  try {
    return decodeURIComponent(hit.slice(prefix.length));
  } catch {
    return null;
  }
}

function writeCookie(name: string, value: string, maxAge = 34_560_000) {
  if (typeof document === "undefined") return;
  const encoded = encodeURIComponent(value);
  if (encoded.length > 3500) return;
  document.cookie = `${encodeURIComponent(name)}=${encoded}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function durableStorage(): StateStorage {
  if (typeof window === "undefined") return empty;
  return {
    getItem: (name) => {
      try {
        const fromLs = window.localStorage.getItem(name);
        if (fromLs) return fromLs;
      } catch {
        /* private mode */
      }
      return readCookie(name);
    },
    setItem: (name, value) => {
      try {
        window.localStorage.setItem(name, value);
      } catch {
        /* quota / private mode */
      }
      writeCookie(name, value);
    },
    removeItem: (name) => {
      try {
        window.localStorage.removeItem(name);
      } catch {
        /* ignore */
      }
      writeCookie(name, "", 0);
    },
  };
}

export function askToKeepStorage() {
  void navigator.storage?.persist?.();
}
