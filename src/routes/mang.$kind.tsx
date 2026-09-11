import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { QuizPlay } from "@/components/quiz-play";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { GAME_META, quizzesForGame, type GameKind } from "@/lib/today";
import { todayISO } from "@/lib/utils";

export const Route = createFileRoute("/mang/$kind")({
  component: MangPage,
});

function isGameKind(value: string): value is GameKind {
  return value === "choice" || value === "missing" || value === "same" || value === "listen";
}

function MangPage() {
  const { kind } = Route.useParams();
  const markPractice = useAppStore((s) => s.markPractice);
  const level = useAppStore((s) => s.level);
  const [score, setScore] = useState<number | null>(null);
  const items = useMemo(
    () => (isGameKind(kind) ? quizzesForGame(kind, todayISO(), level) : []),
    [kind, level],
  );

  if (!isGameKind(kind)) {
    return (
      <Shell>
        <BackLink to="/mangud" />
        <p className="mt-6 text-lg">Seda mängu ei ole.</p>
      </Shell>
    );
  }

  const meta = GAME_META[kind];

  return (
    <Shell>
      <BackLink to="/mangud" label="Mängud" />
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{meta.title}</h1>
      <p className="mt-1 text-base text-ink-soft">{meta.blurb}</p>
      <div className="mt-6 flex flex-1 flex-col">
        {score === null ? (
          <QuizPlay
            items={items}
            onFinish={(n) => {
              markPractice("game", kind);
              setScore(n);
            }}
          />
        ) : (
          <div className="flex flex-1 flex-col gap-4">
            <p className="text-lg text-ink-soft">
              Õigeid vastuseid {score} / {items.length}.
            </p>
            <Link to="/mangud">
              <Button className="w-full">Tagasi mängude juurde</Button>
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}
