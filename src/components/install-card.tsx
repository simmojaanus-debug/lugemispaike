import { useEffect, useState } from "react";
import { Share2, Smartphone, X } from "lucide-react";
import {
  deviceKind,
  isEphemeralPreview,
  isStandalone,
  shareApp,
  type InstallPromptEvent,
} from "@/lib/install";
import { Button } from "./ui/button";

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const ephemeral = isEphemeralPreview();

  useEffect(() => {
    setInstalled(isStandalone());
    if (ephemeral) return;
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [ephemeral]);

  async function install() {
    if (!promptEvent || ephemeral) return false;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    setPromptEvent(null);
    if (choice.outcome === "accepted") setInstalled(true);
    return choice.outcome === "accepted";
  }

  return { promptEvent, installed, install, kind: deviceKind(), ephemeral };
}

export function InstallCard({
  onDismiss,
  compact = false,
}: {
  onDismiss?: () => void;
  compact?: boolean;
}) {
  const { promptEvent, installed, install, kind, ephemeral } = useInstallPrompt();
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");

  if (installed && !ephemeral) return null;

  if (ephemeral) {
    return (
      <section className="rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg bg-paper-2 text-clay">
              <Smartphone className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Ära lisa seda avaekraanile</h2>
              <p className="text-sm text-ink-soft">See eelvaade kaob ära.</p>
            </div>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="flex size-11 items-center justify-center rounded-lg text-ink-soft"
              aria-label="Peida"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        {!compact && (
          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            Must tühi leht tuleb vanast ikoonist. Kustuta see: vajuta pikalt
            ikooni peale, siis Eemalda. Harjuta siit vestlusest. Avaekraanile
            lisa alles püsivast lingist, mitte mustast lehest.
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-paper-2 text-clay">
            <Smartphone className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Lisa telefoni</h2>
            <p className="text-sm text-ink-soft">Oma ikoon avaekraanil.</p>
          </div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="flex size-11 items-center justify-center rounded-lg text-ink-soft"
            aria-label="Peida"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {!compact && (
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          {kind === "ios"
            ? "Safari: jaga nupp, siis Lisa avaekraanile."
            : kind === "android"
              ? "Chrome: menüü, siis Lisa avaekraanile või Installi äpp."
              : "Ava see leht telefoni Chrome'is ja vali Lisa avaekraanile."}
        </p>
      )}

      <div className="mt-4 grid gap-2">
        {promptEvent && (
          <Button size="lg" className="w-full" onClick={() => void install()}>
            Lisa avaekraanile
          </Button>
        )}
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={async () => {
            const result = await shareApp();
            if (result === "copied" || result === "shared") setShareState(result);
          }}
        >
          <Share2 className="size-4" />
          {shareState === "copied"
            ? "Link on kopeeritud"
            : shareState === "shared"
              ? "Saadetud"
              : "Saada teise telefoni"}
        </Button>
      </div>
    </section>
  );
}
