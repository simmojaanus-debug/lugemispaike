import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayISO(timeZone = "Europe/Tallinn"): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function weekdayEt(timeZone = "Europe/Tallinn"): string {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(new Date());
  const map: Record<string, string> = {
    Sun: "pühapäev",
    Mon: "esmaspäev",
    Tue: "teisipäev",
    Wed: "kolmapäev",
    Thu: "neljapäev",
    Fri: "reede",
    Sat: "laupäev",
  };
  return map[day] ?? "";
}

export function yesterdayISO(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() - 1);
  return dt.toISOString().slice(0, 10);
}

export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickN<T>(arr: readonly T[], seed: number, n: number, salt = 0): T[] {
  if (arr.length === 0 || n <= 0) return [];
  const out: T[] = [];
  const used = new Set<number>();
  let s = (seed + salt) >>> 0;
  let guard = 0;
  while (out.length < Math.min(n, arr.length) && guard < arr.length * 8) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const i = s % arr.length;
    if (!used.has(i)) {
      used.add(i);
      out.push(arr[i]!);
    }
    guard += 1;
  }
  return out;
}

export function shuffleWithSeed<T>(arr: readonly T[], seed: number): T[] {
  const out = [...arr];
  let s = seed >>> 0;
  for (let i = out.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

export function stripPunct(word: string): string {
  return word.replace(/[.,!?;:„“"«»()…]/g, "");
}


export function thisWeek(timeZone = "Europe/Tallinn"): { iso: string; label: string }[] {
  const labels = ["E", "T", "K", "N", "R", "L", "P"] as const;
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(new Date());
  const sun0: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const day = sun0[weekday] ?? 1;
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const today = todayISO(timeZone);
  const [y, m, d] = today.split("-").map(Number);
  const base = Date.UTC(y, (m ?? 1) - 1, d);
  return labels.map((label, i) => {
    const dt = new Date(base + (mondayOffset + i) * 86400000);
    return { iso: dt.toISOString().slice(0, 10), label };
  });
}
