import { isSandboxPreviewGuestHost } from "./preview-embedder-origin";

export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

export function deviceKind(): "android" | "ios" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

/** Live preview host dies when the session sleeps — do not pin it. */
export function isEphemeralPreview(): boolean {
  if (typeof window === "undefined") return false;
  return isSandboxPreviewGuestHost(window.location.hostname);
}

export const SHARE_TEXT =
  "Lugemispäike — lühike lugemisharjutus. Suur kiri, silbid, umbes 10 minutit päevas.";

export function appShareUrl(): string {
  if (typeof window === "undefined") return "";
  if (isEphemeralPreview()) return "";
  return `${window.location.origin}/`;
}

export async function shareApp(): Promise<"shared" | "copied" | "failed"> {
  if (typeof window === "undefined") return "failed";
  const url = appShareUrl();
  if (!url) return "failed";
  const payload = { title: "Lugemispäike", text: SHARE_TEXT, url };
  if (typeof navigator.share === "function") {
    try {
      await navigator.share(payload);
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(`${SHARE_TEXT} ${url}`);
    return "copied";
  } catch {
    return "failed";
  }
}
