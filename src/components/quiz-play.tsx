import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { ENCOURAGE_OK, ENCOURAGE_RETRY, type QuizItem } from "@/lib/content";
import { speak } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { cn, hashString, shuffleWithSeed } from "@/lib/utils";
import { Button } from "./ui/button";
import { ReadingSurface } from "./reading-surface";

function MissingWord({ word, blank }: { word: string; blank: number }) {
  return (
    <ReadingSurface className="flex justify-center gap-1 text-center text-4xl font-semibold">
      {word.split("").map((ch, i) =>
        i === blank ? (
          <span
            key={i}
            className="inline-block min-w-8 border-b-2 border-clay pb-1"
          >
            &nbsp;
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </ReadingSurface>
  );
}

function withShuffledOptions(item: QuizItem): QuizItem {
  if (item.kind === "same") return item;
  const options = shuffleWithSeed(item.options, hashString(item.id));
  const correct = item.options[item.answer]!;
  return { ...item, options, answer: Math.max(0, options.indexOf(correct)) };
}

export function QuizPlay({
  items,
  onFinish,
}: {
  items: QuizItem[];
  onFinish: (correct: number) => void;
}) {
  const ttsRate = useAppStore((s) => s.ttsRate);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | "same" | "diff" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const shuffled = useRef(new Map<string, QuizItem>());
  const raw = items[i];
  const item = raw
    ? (shuffled.current.get(raw.id) ??
      shuffled.current.set(raw.id, withShuffledOptions(raw)).get(raw.id)!)
    : undefined;

  useEffect(() => {
    if (item?.kind === "listen") {
      void speak(item.word, ttsRate);
    }
  }, [item?.id, item?.kind, item?.kind === "listen" ? item.word : "", ttsRate]);

  if (!item) return null;

  function next(wasCorrect: boolean) {
    const nextCount = correctCount + (wasCorrect ? 1 : 0);
    if (i + 1 >= items.length) {
      onFinish(nextCount);
      return;
    }
    setCorrectCount(nextCount);
    setI(i + 1);
    setPicked(null);
    setFeedback(null);
  }

  function chooseIndex(index: number, answer: number) {
    if (picked !== null) return;
    setPicked(index);
    const ok = index === answer;
    setFeedback(ok ? ENCOURAGE_OK[i % ENCOURAGE_OK.length]! : ENCOURAGE_RETRY[i % ENCOURAGE_RETRY.length]!);
    window.setTimeout(() => next(ok), ok ? 700 : 1100);
  }

  function chooseSame(value: boolean, answer: boolean) {
    if (picked !== null) return;
    setPicked(value ? "same" : "diff");
    const ok = value === answer;
    setFeedback(ok ? ENCOURAGE_OK[i % ENCOURAGE_OK.length]! : ENCOURAGE_RETRY[i % ENCOURAGE_RETRY.length]!);
    window.setTimeout(() => next(ok), ok ? 700 : 1100);
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <p className="text-sm font-medium tabular-nums text-ink-soft">
        {i + 1} / {items.length}
      </p>

      {item.kind === "choice" && (
        <>
          <p className="text-lg font-medium text-balance">{item.prompt}</p>
          <div className="grid gap-3">
            {item.options.map((opt, idx) => (
              <Button
                key={opt}
                variant="choice"
                size="xl"
                className={cn(
                  picked === idx && idx === item.answer && "bg-sage text-on-accent",
                  picked === idx && idx !== item.answer && "bg-clay/20",
                )}
                onClick={() => chooseIndex(idx, item.answer)}
              >
                <ReadingSurface className="text-2xl">{opt}</ReadingSurface>
              </Button>
            ))}
          </div>
        </>
      )}

      {item.kind === "missing" && (
        <>
          <p className="text-lg font-medium">Milline täht on puudu?</p>
          <MissingWord word={item.word} blank={item.blank} />
          <div className="grid grid-cols-2 gap-3">
            {item.options.map((opt, idx) => (
              <Button
                key={opt}
                variant="choice"
                size="xl"
                className={cn(
                  "justify-center",
                  picked === idx && idx === item.answer && "bg-sage text-on-accent",
                  picked === idx && idx !== item.answer && "bg-clay/20",
                )}
                onClick={() => chooseIndex(idx, item.answer)}
              >
                <span className="text-3xl font-semibold">{opt}</span>
              </Button>
            ))}
          </div>
        </>
      )}

      {item.kind === "same" && (
        <>
          <p className="text-lg font-medium">Kas need sõnad on samad?</p>
          <div className="grid gap-4 rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]">
            <ReadingSurface className="text-center text-3xl font-semibold">
              {item.a}
            </ReadingSurface>
            <ReadingSurface className="text-center text-3xl font-semibold">
              {item.b}
            </ReadingSurface>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="choice"
              size="xl"
              className={cn(
                "justify-center",
                picked === "same" && item.same && "bg-sage text-on-accent",
                picked === "same" && !item.same && "bg-clay/20",
              )}
              onClick={() => chooseSame(true, item.same)}
            >
              Sama
            </Button>
            <Button
              variant="choice"
              size="xl"
              className={cn(
                "justify-center",
                picked === "diff" && !item.same && "bg-sage text-on-accent",
                picked === "diff" && item.same && "bg-clay/20",
              )}
              onClick={() => chooseSame(false, item.same)}
            >
              Erinev
            </Button>
          </div>
        </>
      )}

      {item.kind === "listen" && (
        <>
          <p className="text-lg font-medium">Kuula sõna ja vali õige.</p>
          <Button variant="secondary" onClick={() => void speak(item.word, ttsRate)}>
            <Volume2 className="size-5" />
            Kuula veel
          </Button>
          <div className="grid gap-3">
            {item.options.map((opt, idx) => (
              <Button
                key={opt}
                variant="choice"
                size="xl"
                className={cn(
                  picked === idx && idx === item.answer && "bg-sage text-on-accent",
                  picked === idx && idx !== item.answer && "bg-clay/20",
                )}
                onClick={() => chooseIndex(idx, item.answer)}
              >
                <ReadingSurface className="text-2xl">{opt}</ReadingSurface>
              </Button>
            ))}
          </div>
        </>
      )}

      {feedback && (
        <p className="text-center text-base font-medium text-ink-soft">{feedback}</p>
      )}
    </div>
  );
}
