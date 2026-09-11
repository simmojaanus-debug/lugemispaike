import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { Shell } from "@/components/shell";
import { SyllableWordCard } from "@/components/syllable-word";
import { useAppStore } from "@/lib/store";
import { syllableWordsForDate } from "@/lib/today";
import { todayISO } from "@/lib/utils";

export const Route = createFileRoute("/silbid")({
  component: SilbidPage,
});

function SilbidPage() {
  const markPractice = useAppStore((s) => s.markPractice);
  const level = useAppStore((s) => s.level);
  const words = useMemo(() => syllableWordsForDate(todayISO(), level), [level]);
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const word = words[i];

  return (
    <Shell>
      <BackLink to="/harjutused" />
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Silbid</h1>
      {done || !word ? (
        <div className="mt-8 flex flex-1 flex-col gap-4">
          <p className="text-lg text-ink-soft">{words.length} sõna loetud. Tubli.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-1 flex-col">
          <p className="mb-4 text-sm tabular-nums text-ink-soft">
            {i + 1} / {words.length}
          </p>
          <SyllableWordCard
            item={word}
            nextLabel={i + 1 >= words.length ? "Valmis" : "Järgmine"}
            onNext={() => {
              if (i + 1 >= words.length) {
                markPractice("game", "silbid");
                setDone(true);
              } else {
                setI(i + 1);
              }
            }}
          />
        </div>
      )}
    </Shell>
  );
}
