/**
 * Server-side EKI Estonian TTS (synthub).
 * Docs: https://arhiiv.eki.ee/heli/index.php/veebiapi
 * Lee (child): 478 = foneemDNN VITS (preferred), 458 = Merlin DNN, 56 = HTS.
 * Lee is not in the restricted commercial-voice list (Indrek/Külli/Liivika/Tambet).
 */

export const EKI_LEE_VITS = 478;
export const EKI_LEE_MERLIN = 458;

const SYNTHUB = "https://teenus.eki.ee/synthub/";
const MAX_CHARS = 220;

type SynthubResponse = { mp3?: string; wav?: string };

export function sanitizeTtsText(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);
}

async function synthub(voice: number, text: string): Promise<SynthubResponse> {
  const url = `${SYNTHUB}?v=${voice}&t=${encodeURIComponent(text)}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Lugemispaike/1.0; +https://temporary-rushing-onyx-i2srgy1.vercel.app)",
        "Accept-Language": "et-EE,et;q=0.9",
      },
      signal: AbortSignal.timeout(25_000),
      cache: "no-store",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "network error";
    throw new Error(`EKI synthub unreachable (${msg})`);
  }
  if (!res.ok) {
    throw new Error(`EKI synthub HTTP ${res.status}`);
  }
  const data = (await res.json()) as SynthubResponse;
  if (!data.mp3 && !data.wav) {
    throw new Error("EKI synthub returned no audio URL");
  }
  return data;
}

async function fetchAudioBytes(audioUrl: string): Promise<{ body: ArrayBuffer; contentType: string }> {
  const res = await fetch(audioUrl, {
    headers: {
      Accept: "audio/mpeg, audio/wav, */*",
      "User-Agent": "Lugemispaike/1.0",
      Referer: "https://teenus.eki.ee/",
    },
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) {
    throw new Error(`EKI audio HTTP ${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "audio/mpeg";
  const body = await res.arrayBuffer();
  if (body.byteLength < 64) {
    throw new Error("EKI audio too small");
  }
  return { body, contentType };
}

/** Synthesize with Lee VITS, fall back to Merlin Lee. */
export async function synthesizeLee(text: string): Promise<{ body: ArrayBuffer; contentType: string; voice: number }> {
  const clean = sanitizeTtsText(text);
  if (!clean) throw new Error("empty text");

  const voices = [EKI_LEE_VITS, EKI_LEE_MERLIN];
  let lastErr: unknown;
  for (const voice of voices) {
    try {
      const meta = await synthub(voice, clean);
      const audioUrl = meta.mp3 || meta.wav!;
      const audio = await fetchAudioBytes(audioUrl);
      // Prefer mp3 content-type when URL ends with .mp3
      const contentType = audioUrl.endsWith(".mp3")
        ? "audio/mpeg"
        : audioUrl.endsWith(".wav")
          ? "audio/wav"
          : audio.contentType;
      return { ...audio, contentType, voice };
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("EKI TTS failed");
}
