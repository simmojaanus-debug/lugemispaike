import type { ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PARENT_TIPS } from "@/lib/content";
import { requestNotifyPermission } from "@/lib/reminders";
import {
  useAppStore,
  type FontScale,
  type Level,
  type Overlay,
  type Tracking,
} from "@/lib/store";
import { LEVEL_META } from "@/lib/today";
import { InstallCard } from "@/components/install-card";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/mina")({
  component: MinaPage,
});

function MinaPage() {
  const childName = useAppStore((s) => s.childName);
  const streak = useAppStore((s) => s.streak);
  const stars = useAppStore((s) => s.stars);
  const dailyDone = useAppStore((s) => s.dailyDone);
  const fontScale = useAppStore((s) => s.fontScale);
  const tracking = useAppStore((s) => s.tracking);
  const showSyllables = useAppStore((s) => s.showSyllables);
  const overlay = useAppStore((s) => s.overlay);
  const ttsRate = useAppStore((s) => s.ttsRate);
  const reminderEnabled = useAppStore((s) => s.reminderEnabled);
  const reminderTime = useAppStore((s) => s.reminderTime);
  const level = useAppStore((s) => s.level);
  const setSettings = useAppStore((s) => s.setSettings);

  return (
    <Shell>
      <h1 className="text-3xl font-semibold tracking-tight">
        {childName || "Mina"}
      </h1>
      <p className="mt-2 text-lg text-ink-soft">Seaded ja väike ülevaade.</p>

      <section className="mt-6 grid grid-cols-3 gap-3">
        <Mini label="Järjest" value={`${streak}`} />
        <Mini label="Tähed" value={`${stars}`} />
        <Mini label="Päevi" value={`${dailyDone.length}`} />
      </section>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Tase</h2>
        <div className="grid gap-2">
          {(["easy", "grade3", "stretch"] as Level[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSettings({ level: key })}
              className={
                level === key
                  ? "min-h-14 rounded-xl bg-clay px-4 py-3 text-left text-on-accent"
                  : "min-h-14 rounded-xl bg-sheet px-4 py-3 text-left shadow-[var(--shadow-border)]"
              }
            >
              <span className="block text-base font-semibold">{LEVEL_META[key].title}</span>
              <span className={level === key ? "block text-sm text-on-accent/80" : "block text-sm text-ink-soft"}>
                {LEVEL_META[key].blurb}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Telefonid kodus</h2>
        <InstallCard />
        <Link
          to="/vanematele"
          className="flex min-h-12 items-center justify-center rounded-xl bg-sheet px-4 text-base font-medium shadow-[var(--shadow-border)]"
        >
          Juhend vanemale
        </Link>
      </section>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Lugemise välimus</h2>
        <Field label="Kiri">
          <div className="grid grid-cols-4 gap-2">
            {([1, 1.15, 1.3, 1.5] as FontScale[]).map((n) => (
              <Chip
                key={n}
                active={fontScale === n}
                onClick={() => setSettings({ fontScale: n })}
              >
                {n === 1 ? "A" : n === 1.15 ? "A+" : n === 1.3 ? "A++" : "A+++"}
              </Chip>
            ))}
          </div>
        </Field>
        <Field label="Tähevahe">
          <div className="grid grid-cols-3 gap-2">
            {(["normal", "wide", "wider"] as Tracking[]).map((n) => (
              <Chip
                key={n}
                active={tracking === n}
                onClick={() => setSettings({ tracking: n })}
              >
                {n === "normal" ? "Tavaline" : n === "wide" ? "Lai" : "Väga lai"}
              </Chip>
            ))}
          </div>
        </Field>
        <Field label="Taust">
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                ["cream", "Kreem"],
                ["lemon", "Kollane"],
                ["sky", "Sinine"],
                ["mint", "Roheline"],
              ] as [Overlay, string][]
            ).map(([key, label]) => (
              <Chip
                key={key}
                active={overlay === key}
                onClick={() => setSettings({ overlay: key })}
              >
                {label}
              </Chip>
            ))}
          </div>
        </Field>
        <label className="flex min-h-14 items-center justify-between gap-4 rounded-xl bg-sheet px-4 shadow-[var(--shadow-border)]">
          <span className="text-base font-medium">Näita silpe värvidega</span>
          <Switch
            checked={showSyllables}
            onCheckedChange={(v) => setSettings({ showSyllables: v })}
          />
        </label>
        <Field label="Ettelugemise kiirus">
          <input
            type="range"
            min={0.65}
            max={1.05}
            step={0.05}
            value={ttsRate}
            onChange={(e) => setSettings({ ttsRate: Number(e.target.value) })}
            className="w-full accent-clay"
          />
        </Field>
      </section>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Meeldetuletus</h2>
        <label className="flex min-h-14 items-center justify-between gap-4 rounded-xl bg-sheet px-4 shadow-[var(--shadow-border)]">
          <span className="text-base font-medium">Iga päev</span>
          <Switch
            checked={reminderEnabled}
            onCheckedChange={(v) => setSettings({ reminderEnabled: v })}
          />
        </label>
        {reminderEnabled && (
          <label className="grid gap-2 text-base font-medium">
            Kellaaeg
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setSettings({ reminderTime: e.target.value })}
              className="min-h-14 rounded-lg bg-sheet px-4 text-xl shadow-[var(--shadow-border)] outline-none focus:outline-2 focus:outline-offset-2 focus:outline-clay"
            />
          </label>
        )}
        <Button
          variant="secondary"
          onClick={async () => {
            await requestNotifyPermission();
            setSettings({ notifyAsked: true });
          }}
        >
          Luba telefoni teavitused
        </Button>
      </section>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Lapse nimi</h2>
        <input
          value={childName}
          onChange={(e) => setSettings({ childName: e.target.value })}
          className="min-h-14 rounded-lg bg-sheet px-4 text-xl shadow-[var(--shadow-border)] outline-none focus:outline-2 focus:outline-offset-2 focus:outline-clay"
        />
      </section>

      <section className="mt-8 mb-4 grid gap-3">
        <h2 className="text-xl font-semibold">Vanemale</h2>
        <ul className="grid gap-3">
          {PARENT_TIPS.map((tip) => (
            <li
              key={tip}
              className="rounded-xl bg-sheet p-4 text-base leading-relaxed text-ink-soft shadow-[var(--shadow-border)]"
            >
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-sheet px-3 py-4 text-center shadow-[var(--shadow-border)]">
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{label}</p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-medium text-ink-soft">{label}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "min-h-11 rounded-md bg-clay px-2 text-sm font-medium text-on-accent"
          : "min-h-11 rounded-md bg-sheet px-2 text-sm font-medium text-ink shadow-[var(--shadow-border)]"
      }
    >
      {children}
    </button>
  );
}
