/**
 * Estonian TTS for Lugemispäike.
 * 1) EKI Lee via same-origin /api/tts (server proxy; preferred when reachable)
 * 2) Direct browser fetch to EKI synthub (if CORS allows from the user's network)
 * 3) Browser speechSynthesis fallback
 *
 * Lee voices: 478 VITS (best), 458 Merlin. Docs: arhiiv.eki.ee/heli/index.php/veebiapi
 */

const EKI_VOICES = [478, 458] as const;
const SYNTHUB = "https://teenus.eki.ee/synthub/";

const audioCache = new Map<string, string>(); // text -> object URL
const CACHE_MAX = 80;
let currentAudio: HTMLAudioElement | null = null;
let proxyUnavailable = false;
let directUnavailable = false;

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
  // Prefetch one short sample into HTTP/CDN cache
  void fetch("/api/tts?t=tere").catch(() => {});
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

async function playObjectUrl(objectUrl: string, text: string, rate: number): Promise<void> {
  stopSpeak();
  const audio = new Audio(objectUrl);
  currentAudio = audio;
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
}

async function blobFromResponse(res: Response): Promise<string | null> {
  if (!res.ok) return null;
  const blob = await res.blob();
  if (blob.size < 64) return null;
  return URL.createObjectURL(blob);
}

async function speakViaProxy(text: string, rate: number): Promise<boolean> {
  if (proxyUnavailable || typeof Audio === "undefined") return false;
  const key = `p:${text.trim().toLowerCase()}`;
  let objectUrl = audioCache.get(key);
  if (!objectUrl) {
    const res = await fetch(`/api/tts?t=${encodeURIComponent(text)}`, {
      headers: { Accept: "audio/mpeg, audio/wav" },
    });
    if (!res.ok) {
      if (res.status >= 500) proxyUnavailable = true;
      return false;
    }
    objectUrl = await blobFromResponse(res);
    if (!objectUrl) return false;
    cachePut(key, objectUrl);
  }
  await playObjectUrl(objectUrl, text, rate);
  return true;
}

async function speakViaDirectEki(text: string, rate: number): Promise<boolean> {
  if (directUnavailable || typeof Audio === "undefined") return false;
  const key = `d:${text.trim().toLowerCase()}`;
  let objectUrl = audioCache.get(key);
  if (!objectUrl) {
    let lastErr: unknown;
    for (const voice of EKI_VOICES) {
      try {
        const metaRes = await fetch(
          `${SYNTHUB}?v=${voice}&t=${encodeURIComponent(text)}`,
          { headers: { Accept: "application/json" } },
        );
        if (!metaRes.ok) continue;
        const meta = (await metaRes.json()) as { mp3?: string; wav?: string };
        const audioUrl = meta.mp3 || meta.wav;
        if (!audioUrl) continue;
        const audioRes = await fetch(audioUrl);
        objectUrl = await blobFromResponse(audioRes);
        if (objectUrl) {
          cachePut(key, objectUrl);
          break;
        }
      } catch (err) {
        lastErr = err;
      }
    }
    if (!objectUrl) {
      if (lastErr) directUnavailable = true;
      return false;
    }
  }
  await playObjectUrl(objectUrl, text, rate);
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
    utter.pitch = 1.05;
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
    if (await speakViaProxy(clean, rate)) return;
  } catch {
    /* try next */
  }
  try {
    if (await speakViaDirectEki(clean, rate)) return;
  } catch {
    /* try next */
  }
  await speakBrowser(clean, rate);
}
