import { createFileRoute } from "@tanstack/react-router";
import { sanitizeTtsText, synthesizeLee } from "@/lib/eki-tts.server";

async function handleTts({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const text = sanitizeTtsText(url.searchParams.get("t") ?? url.searchParams.get("text") ?? "");
  if (!text) {
    return Response.json({ error: "missing t" }, { status: 400 });
  }
  // Word-level / short phrase only — reject very long payloads
  if (text.length > 220) {
    return Response.json({ error: "text too long" }, { status: 400 });
  }

  try {
    const { body, contentType, voice } = await synthesizeLee(text);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-EKI-Voice": String(voice),
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "tts failed";
    return Response.json({ error: message }, { status: 502 });
  }
}

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      GET: handleTts,
    },
  },
});
