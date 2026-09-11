import { useState } from "react";
import { useAppStore, type Level } from "@/lib/store";
import { requestNotifyPermission } from "@/lib/reminders";
import { askToKeepStorage } from "@/lib/durable-storage";
import { LEVEL_META } from "@/lib/today";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { SunMark } from "./sun-mark";
import { InstallCard } from "./install-card";

const LEVELS: Level[] = ["easy", "grade3", "stretch"];

export function Onboarding() {
  const complete = useAppStore((s) => s.completeOnboarding);
  const setSettings = useAppStore((s) => s.setSettings);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [time, setTime] = useState("16:00");
  const [remind, setRemind] = useState(true);
  const [level, setLevel] = useState<Level>("grade3");

  async function finish() {
    if (remind) {
      await requestNotifyPermission();
      setSettings({ notifyAsked: true });
    }
    complete({ name, reminderTime: time, reminderEnabled: remind, level });
    askToKeepStorage();
  }

  return (
    <div className="flex min-h-dvh justify-center bg-paper text-ink">
      <div className="flex min-h-dvh w-full max-w-md flex-col px-5 pb-10 pt-[max(2rem,env(safe-area-inset-top))]">
        {step === 0 && (
          <div className="flex flex-1 flex-col justify-center gap-6">
            <SunMark className="size-16" />
            <h1 className="text-4xl font-semibold tracking-tight">Lugemispäike</h1>
            <p className="text-lg leading-relaxed text-ink-soft">
              Lühike lugemisharjutus teie lapsele. Suur kiri, värvilised silbid,
              umbes 10 minutit päevas.
            </p>
            <Button size="xl" className="mt-4 w-full" onClick={() => setStep(1)}>
              Alustame
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="text-3xl font-semibold">Lapse nimi ja tase</h2>
            <label className="grid gap-2 text-base font-medium">
              Nimi
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-14 rounded-lg bg-sheet px-4 text-xl shadow-[var(--shadow-border)] outline-none focus:outline-2 focus:outline-offset-2 focus:outline-clay"
                autoComplete="nickname"
                autoFocus
              />
            </label>
            <div className="grid gap-2">
              <p className="text-sm font-medium text-ink-soft">Harjutuse tase</p>
              <div className="grid gap-2">
                {LEVELS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLevel(key)}
                    className={
                      level === key
                        ? "min-h-14 rounded-xl bg-clay px-4 py-3 text-left text-on-accent"
                        : "min-h-14 rounded-xl bg-sheet px-4 py-3 text-left shadow-[var(--shadow-border)]"
                    }
                  >
                    <span className="block text-lg font-semibold">
                      {LEVEL_META[key].title}
                    </span>
                    <span
                      className={
                        level === key
                          ? "block text-sm text-on-accent/80"
                          : "block text-sm text-ink-soft"
                      }
                    >
                      {LEVEL_META[key].blurb}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <Button size="xl" className="mt-auto w-full" onClick={() => setStep(2)}>
              Edasi
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="text-3xl font-semibold">Iga päev natuke</h2>
            <p className="text-lg text-ink-soft">
              Kümme minutit pärast kooli on paras. Meeldetuletus tuleb telefonis,
              kui luba on antud.
            </p>
            <label className="flex items-center justify-between gap-4 rounded-xl bg-sheet px-4 py-4 shadow-[var(--shadow-border)]">
              <span className="text-lg font-medium">Meeldetuletus</span>
              <Switch checked={remind} onCheckedChange={setRemind} />
            </label>
            {remind && (
              <label className="grid gap-2 text-base font-medium">
                Kellaaeg
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="min-h-14 rounded-lg bg-sheet px-4 text-xl shadow-[var(--shadow-border)] outline-none focus:outline-2 focus:outline-offset-2 focus:outline-clay"
                />
              </label>
            )}
            <Button size="xl" className="mt-auto w-full" onClick={() => setStep(3)}>
              Edasi
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="text-3xl font-semibold">Telefonis nagu äpp</h2>
            <p className="text-lg text-ink-soft">
              See on eelvaade. Ära lisa veel avaekraanile — see link kaob ja
              jääb must leht. Harjuta siit. Ikooni saab hiljem püsivast lingist.
            </p>
            <InstallCard />
            <Button size="xl" className="mt-auto w-full" onClick={() => void finish()}>
              Valmis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
