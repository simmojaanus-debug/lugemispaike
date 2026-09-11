const TIMER_KEY = "lugemispaike-reminder-timer";

export async function requestNotifyPermission(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Notification.permission;
  }
  return Notification.requestPermission();
}

export function canNotify(): boolean {
  return typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted";
}

export function showPracticeNotification(childName: string) {
  if (!canNotify()) return;
  const who = childName.trim() || "laps";
  try {
    new Notification("Lugemispäike", {
      body: `Aeg on ${who}ga umbes 10 minutit lugeda.`,
      tag: "lugemispaike-daily",
      lang: "et",
    });
  } catch {
    // Some browsers require a service worker for Notification.
  }
}

export function armDailyReminder(time: string, childName: string, practicedToday: boolean) {
  if (typeof window === "undefined") return;
  const existing = Number(window.sessionStorage.getItem(TIMER_KEY) ?? 0);
  if (existing) window.clearTimeout(existing);

  const [hh, mm] = time.split(":").map((n) => Number(n));
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return;

  const now = new Date();
  const next = new Date();
  next.setHours(hh, mm, 0, 0);
  if (next.getTime() <= now.getTime()) {
    next.setDate(next.getDate() + 1);
  }
  const wait = Math.min(next.getTime() - now.getTime(), 24 * 60 * 60 * 1000);
  const id = window.setTimeout(() => {
    if (!practicedToday) showPracticeNotification(childName);
    window.sessionStorage.removeItem(TIMER_KEY);
    armDailyReminder(time, childName, false);
  }, wait);
  window.sessionStorage.setItem(TIMER_KEY, String(id));
}

export function isPastReminder(time: string): boolean {
  const [hh, mm] = time.split(":").map((n) => Number(n));
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return false;
  const now = new Date();
  const target = new Date();
  target.setHours(hh, mm, 0, 0);
  return now.getTime() >= target.getTime();
}
