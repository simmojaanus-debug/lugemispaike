/**
 * Estonian TTS for Lugemispäike.
 * Primary: EKI Lee child voice via same-origin /api/tts proxy (VITS 478).
 * Fallback: browser speechSynthesis (often robotic for Estonian).
 */

const audioCache = new Map<string, string>(); // text -> object URL
const CACHE_MAX = 80;
let currentAudio: HTMLAudioElement | null = null;
let ekiUnavailable = false;

export function canSpeak(): boolean {
  return typeof window !== "undefined" && ("speechSynthesis" in window || typeof Audio !== "undefined");
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith("et")) ??
    voices.find((v) => v.lang.toLowerCase().includes("et")) ??
    null
  );
}

export function warmVoices() {
  if (typeof window === "undefined") return;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      window.speechSynthesis.getVoices();
    });
  }
  // Prefetch one short sample into HTTP cache (do not mark EKI dead on warm miss)
  void fetch("/api/tts?t=tere", { method: "GET" }).catch(() => {});
}

export function stopSpeak() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.removeAttribute("src");
      currentAudio.load();
    } catch {
      /* ignore */
    }
    currentAudio = null;
  }
}

function cachePut(key: string, objectUrl: string) {
  if (audioCache.has(key)) {
    URL.revokeObjectURL(audioCache.get(key)!);
  }
  audioCache.set(key, objectUrl);
  while (audioCache.size > CACHE_MAX) {
    const oldest = audioCache.keys().next().value;
    if (oldest === undefined) break;
    const url = audioCache.get(oldest);
    audioCache.delete(oldest);
    if (url) URL.revokeObjectURL(url);
  }
}

async function speakEki(text: string, rate: number): Promise<boolean> {
  if (ekiUnavailable || typeof Audio === "undefined") return false;
  const key = text.trim().toLowerCase();
  let objectUrl = audioCache.get(key);

  if (!objectUrl) {
    const res = await fetch(`/api/tts?t=${encodeURIComponent(text)}`, {
      headers: { Accept: "audio/mpeg, audio/wav" },
    });
    if (!res.ok) {
      if (res.status >= 500) ekiUnavailable = true;
      return false;
    }
    const blob = await res.blob();
    if (blob.size < 64) return false;
    objectUrl = URL.createObjectURL(blob);
    cachePut(key, objectUrl);
  }

  stopSpeak();
  const audio = new Audio(objectUrl);
  currentAudio = audio;
  // Map app rate (≈0.6–1.15) onto HTMLAudioElement.playbackRate
  audio.playbackRate = Math.min(1.25, Math.max(0.6, rate));
  audio.preservesPitch = true;

  await new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.onended = finish;
    audio.onerror = finish;
    const ms = Math.min(12_000, 800 + text.length * 180);
    window.setTimeout(finish, ms);
    void audio.play().catch(finish);
  });
  return true;
}

function speakBrowser(text: string, rate: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "et-EE";
    utter.rate = Math.min(1.15, Math.max(0.6, rate));
    utter.pitch = 1.05; // slightly softer child-like tilt when falling back
    const voice = pickVoice();
    if (voice) utter.voice = voice;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    utter.onend = finish;
    utter.onerror = finish;
    const ms = Math.min(8000, 450 + text.length * 140);
    window.setTimeout(finish, ms);
    window.speechSynthesis.speak(utter);
  });
}

export async function speak(text: string, rate = 0.85): Promise<void> {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return;

  try {
    const ok = await speakEki(clean, rate);
    if (ok) return;
  } catch {
    /* fall through */
  }
  await speakBrowser(clean, rate);
}
