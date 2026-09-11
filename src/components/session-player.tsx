import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { sessionForDate } from "@/lib/today";
import { todayISO } from "@/lib/utils";
import { useAppStore, type SessionPhase } from "@/lib/store";
import { Button } from "./ui/button";
import { SyllableWordCard } from "./syllable-word";
import { GuidedReader } from "./guided-reader";
import { QuizPlay } from "./quiz-play";
import { SunMark } from "./sun-mark";

const PHASE_STEP: Record<SessionPhase, number> = {
  intro: -1,
  words: 0,
  story: 1,
  question: 1,
  quiz: 2,
  done: 2,
};

function resumeFromStore(date: string): { phase: SessionPhase; wordI: number } {
  const saved = useAppStore.getState().sessionProgress;
  if (saved?.date === date) return { phase: saved.phase, wordI: saved.wordI };
  return { phase: "intro", wordI: 0 };
}

export function SessionPlayer() {
  const navigate = useNavigate();
  const date = todayISO();
  const level = useAppStore((s) => s.level);
  const session = useMemo(() => sessionForDate(date, level), [date, level]);
  const childName = useAppStore((s) => s.childName);
  const markPractice = useAppStore((s) => s.markPractice);
  const setSessionProgress = useAppStore((s) => s.setSessionProgress);
  const resumed = resumeFromStore(date);
  const [phase, setPhase] = useState<SessionPhase>(resumed.phase);
  const [wordI, setWordI] = useState(resumed.wordI);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    if (phase === "words" && !session.words[wordI]) {
      setPhase(session.words.length ? "words" : "story");
      setWordI(0);
    }
  }, [phase, wordI, session.words]);

  useEffect(() => {
    setSessionProgress({ date, phase, wordI });
  }, [date, phase, wordI, setSessionProgress]);

  const word = session.words[wordI];
  const step = PHASE_STEP[phase];

  function finish(score: number) {
    setQuizScore(score);
    markPractice("daily");
    setPhase("done");
  }

  return (
    <div className="flex min-h-full flex-col gap-6">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-soft"
        >
          <ArrowLeft className="size-4" />
          Koju
        </Link>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className={
                step >= n
                  ? "h-1.5 w-8 rounded-full bg-clay"
                  : "h-1.5 w-8 rounded-full bg-line"
              }
            />
          ))}
        </div>
      </header>

      {phase === "intro" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
          <SunMark className="size-16" />
          <h1 className="text-3xl font-semibold tracking-tight">
            {childName ? `${childName}, loeme koos.` : "Loeme koos."}
          </h1>
          <p className="max-w-sm text-lg text-ink-soft">
            Kolm lühikest osa. Umbes kümme minutit. Üks sõna korraga.
          </p>
          <Button size="xl" className="mt-2 w-full" onClick={() => setPhase("words")}>
            Alusta
          </Button>
        </div>
      )}

      {phase === "words" && word && (
        <SyllableWordCard
          item={word}
          nextLabel={wordI + 1 >= session.words.length ? "Loe lugu" : "Järgmine sõna"}
          onNext={() => {
            if (wordI + 1 >= session.words.length) setPhase("story");
            else setWordI(wordI + 1);
          }}
        />
      )}

      {phase === "story" && (
        <div className="flex flex-1 flex-col gap-5">
          <div>
            <p className="text-sm font-medium text-ink-soft">{session.story.kicker}</p>
            <h2 className="mt-1 text-2xl font-semibold">{session.story.title}</h2>
          </div>
          <GuidedReader story={session.story} />
          <Button className="mt-auto" onClick={() => setPhase("question")}>
            Küsimus loo kohta
          </Button>
        </div>
      )}

      {phase === "question" && (
        <QuizPlay
          items={[
            {
              id: `q-${session.story.id}`,
              kind: "choice",
              prompt: session.story.question.prompt,
              options: session.story.question.options,
              answer: session.story.question.answer,
            },
          ]}
          onFinish={() => setPhase("quiz")}
        />
      )}

      {phase === "quiz" && (
        <QuizPlay items={session.quizzes} onFinish={finish} />
      )}

      {phase === "done" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
          <SunMark className="size-16" />
          <h2 className="text-3xl font-semibold">Valmis tänaseks.</h2>
          <p className="max-w-sm text-lg text-ink-soft">
            Tubli töö
            {quizScore > 0 ? `. Mängudes oli ${quizScore} õiget.` : "."} Homme on
            uus lühike tee.
          </p>
          <Button size="xl" className="w-full" onClick={() => navigate({ to: "/" })}>
            Tagasi koju
          </Button>
        </div>
      )}
    </div>
  );
}
