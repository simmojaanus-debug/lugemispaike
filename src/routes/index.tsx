import { Link, createFileRoute } from "@tanstack/react-router";
import { Bell, BookOpenText, Puzzle, Type } from "lucide-react";
import { Onboarding } from "@/components/onboarding";
import { InstallCard } from "@/components/install-card";
import { Shell } from "@/components/shell";
import { SunMark } from "@/components/sun-mark";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { sessionForDate } from "@/lib/today";
import { thisWeek, todayISO, weekdayEt, cn } from "@/lib/utils";
import { isPastReminder } from "@/lib/reminders";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const onboarded = useAppStore((s) => s.onboarded);
  const childName = useAppStore((s) => s.childName);
  const streak = useAppStore((s) => s.streak);
  const dailyDone = useAppStore((s) => s.dailyDone);
  const reminderEnabled = useAppStore((s) => s.reminderEnabled);
  const reminderTime = useAppStore((s) => s.reminderTime);
  const level = useAppStore((s) => s.level);
  const installHintDismissed = useAppStore((s) => s.installHintDismissed);
  const sessionProgress = useAppStore((s) => s.sessionProgress);
  const setSettings = useAppStore((s) => s.setSettings);
  const restartTodaySession = useAppStore((s) => s.restartTodaySession);

  if (!onboarded) return <Onboarding />;

  const today = todayISO();
  const done = dailyDone.includes(today);
  const inProgress =
    sessionProgress?.date === today &&
    sessionProgress.phase !== "intro" &&
    sessionProgress.phase !== "done";
  const story = sessionForDate(today, level).story;
  const due = reminderEnabled && isPastReminder(reminderTime) && !done;
  const hello = childName ? `Tere, ${childName}` : "Tere";
  const week = thisWeek();
  const startLabel = inProgress ? "Jätka" : done ? "Loe veel kord" : "Alusta";

  return (
    <Shell>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-soft">{weekdayEt()}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{hello}</h1>
        </div>
        <SunMark className="size-12 shrink-0" />
      </header>

      <section className="mt-5 grid grid-cols-7 gap-1">
        {week.map((day) => {
          const isToday = day.iso === today;
          const practiced = dailyDone.includes(day.iso);
          return (
            <div
              key={day.iso}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center rounded-lg text-sm font-medium",
                practiced
                  ? "bg-sage text-on-accent"
                  : isToday
                    ? "bg-clay/15 text-clay"
                    : "bg-sheet text-ink-soft",
              )}
            >
              <span>{day.label}</span>
            </div>
          );
        })}
      </section>

      <section className="mt-4 rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]">
        <p className="text-sm font-medium text-ink-soft">
          {inProgress
            ? "Pooleli — jätkame sealt, kus pooleli jäi"
            : done
              ? "Tänane harjutus on tehtud"
              : "Tänane lugemine"}
        </p>
        <h2 className="mt-1 text-2xl font-semibold">{story.title}</h2>
        <p className="mt-1 text-base text-ink-soft">{story.kicker}. Umbes 10 minutit.</p>
        {due && (
          <p className="mt-3 flex items-center gap-2 text-base font-medium text-clay">
            <Bell className="size-4" />
            Aeg on lugeda.
          </p>
        )}
        <Link
          to="/harjuta"
          className="mt-5 block"
          onClick={() => {
            if (done && !inProgress) restartTodaySession();
          }}
        >
          <Button size="xl" className="w-full">
            {startLabel}
          </Button>
        </Link>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Järjest" value={streak ? `${streak} p.` : "0 p."} />
        <Stat
          label="Meeldetuletus"
          value={reminderEnabled ? reminderTime : "väljas"}
        />
      </section>

      {!installHintDismissed && (
        <div className="mt-4">
          <InstallCard onDismiss={() => setSettings({ installHintDismissed: true })} />
        </div>
      )}

      <section className="mt-6 grid gap-3">
        <p className="text-sm font-medium text-ink-soft">Harjuta vabalt</p>
        <LinkCard to="/silbid" icon={Type} title="Silbid" blurb="Sõnad tükkideks" />
        <LinkCard to="/lood" icon={BookOpenText} title="Lühilood" blurb="Loe sõna kaupa" />
        <LinkCard to="/mangud" icon={Puzzle} title="Mängud" blurb="Tähed ja sõnad" />
      </section>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-sheet px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function LinkCard({
  to,
  icon: Icon,
  title,
  blurb,
}: {
  to: "/silbid" | "/lood" | "/mangud";
  icon: typeof Type;
  title: string;
  blurb: string;
}) {
  return (
    <Link
      to={to}
      className="flex min-h-16 items-center gap-4 rounded-xl bg-sheet px-4 py-3 shadow-[var(--shadow-border)]"
    >
      <span className="flex size-11 items-center justify-center rounded-lg bg-paper-2 text-clay">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-lg font-semibold">{title}</span>
        <span className="block text-sm text-ink-soft">{blurb}</span>
      </span>
    </Link>
  );
}
