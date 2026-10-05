/**
 * Server-side EKI Estonian TTS (synthub).
 * Docs: https://arhiiv.eki.ee/heli/index.php/veebiapi
 *
 * Lee (child voice):
 * - 458 = foneemDNN Merlin (koneveeb.ee wave URLs — reliable)
 * - 56  = foneemHMM HTS (koneveeb.ee)
 * - 478 = foneemDNN VITS (teenus.eki.ee/spool — often returns tiny stub MP3s)
 *
 * Lee is NOT in the restricted commercial-voice list (Indrek/Külli/Liivika/Tambet).
 */

export const EKI_LEE_MERLIN = 458;
export const EKI_LEE_HTS = 56;
export const EKI_LEE_VITS = 478;

const SYNTHUB = "https://teenus.eki.ee/synthub/";
const MAX_CHARS = 220;
/** VITS spool stubs are ~1.2KB / 50ms; real word audio is typically >> this */
const MIN_AUDIO_BYTES = 2500;

type SynthubResponse = { mp3?: string; wav?: string; inf?: string };

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
        "User-Agent":
          "Mozilla/5.0 (compatible; Lugemispaike/1.0; +https://temporary-rushing-onyx-i2srgy1.vercel.app)",
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

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function fetchAudioBytes(
  audioUrl: string,
): Promise<{ body: ArrayBuffer; contentType: string }> {
  let lastErr: unknown;
  // Spool/wave files can appear before bytes are fully written — retry briefly
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await sleep(400 * attempt);
    try {
      const res = await fetch(audioUrl, {
        headers: {
          Accept: "audio/mpeg, audio/wav, */*",
          "User-Agent":
            "Mozilla/5.0 (compatible; Lugemispaike/1.0; +https://temporary-rushing-onyx-i2srgy1.vercel.app)",
          Referer: "https://teenus.eki.ee/",
        },
        signal: AbortSignal.timeout(30_000),
        cache: "no-store",
      });
      if (!res.ok) {
        lastErr = new Error(`EKI audio HTTP ${res.status}`);
        continue;
      }
      const contentType = res.headers.get("content-type") || "audio/mpeg";
      const body = await res.arrayBuffer();
      if (body.byteLength < MIN_AUDIO_BYTES) {
        lastErr = new Error(`EKI audio stub (${body.byteLength} bytes)`);
        continue;
      }
      return { body, contentType };
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("EKI audio download failed");
}

function pickAudioUrl(meta: SynthubResponse): string | null {
  // Prefer mp3, then wav. Prefer koneveeb hosts over teenus spool when both exist.
  const urls = [meta.mp3, meta.wav].filter(Boolean) as string[];
  const kone = urls.find((u) => u.includes("koneveeb.ee"));
  return kone || urls[0] || null;
}

/** Synthesize Lee: Merlin → HTS → VITS, rejecting stub audio. */
export async function synthesizeLee(
  text: string,
): Promise<{ body: ArrayBuffer; contentType: string; voice: number; source: string }> {
  const clean = sanitizeTtsText(text);
  if (!clean) throw new Error("empty text");

  const voices = [EKI_LEE_MERLIN, EKI_LEE_HTS, EKI_LEE_VITS];
  let lastErr: unknown;
  for (const voice of voices) {
    try {
      const meta = await synthub(voice, clean);
      const audioUrl = pickAudioUrl(meta);
      if (!audioUrl) throw new Error("no audio URL");
      const audio = await fetchAudioBytes(audioUrl);
      const contentType = audioUrl.endsWith(".mp3")
        ? "audio/mpeg"
        : audioUrl.endsWith(".wav")
          ? "audio/wav"
          : audio.contentType;
      return { ...audio, contentType, voice, source: audioUrl };
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("EKI TTS failed");
}
