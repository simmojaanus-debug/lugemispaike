import { Volume2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/speech";
import { cn } from "@/lib/utils";
import type { SyllableWord } from "@/lib/content";
import { Button } from "./ui/button";
import { ReadingSurface } from "./reading-surface";

export function SyllableWordCard({
  item,
  onNext,
  nextLabel = "Järgmine",
}: {
  item: SyllableWord;
  onNext: () => void;
  nextLabel?: string;
}) {
  const showSyllables = useAppStore((s) => s.showSyllables);
  const ttsRate = useAppStore((s) => s.ttsRate);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <p className="text-sm font-medium text-ink-soft">
        Loe silphaaval
      </p>
      <ReadingSurface className="flex flex-wrap items-end justify-center gap-1 py-4 text-center">
        {showSyllables
          ? item.syllables.map((part, i) => (
              <button
                key={`${item.id}-${i}`}
                type="button"
                onClick={() => speak(part, ttsRate)}
                className={cn(
                  "rounded-md px-1.5 py-1 font-semibold",
                  i % 2 === 0 ? "text-clay" : "text-sage",
                )}
              >
                {part}
              </button>
            ))
          : (
              <span className="font-semibold">{item.word}</span>
            )}
      </ReadingSurface>
      <p className="text-center text-base text-ink-soft">{item.hint}</p>
      <div className="mt-auto grid gap-3">
        <Button
          variant="secondary"
          onClick={() => speak(item.word, ttsRate)}
        >
          <Volume2 className="size-5" />
          Kuula sõna
        </Button>
        <Button onClick={onNext}>{nextLabel}</Button>
      </div>
    </div>
  );
}
