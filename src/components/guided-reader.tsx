import { useMemo, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import type { Story, StoryWord } from "@/lib/content";
import { speak, stopSpeak } from "@/lib/speech";
import { useAppStore } from "@/lib/store";
import { stripPunct } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ReadingSurface } from "./reading-surface";

function flatten(story: Story): StoryWord[] {
  return story.sentences.flat();
}

export function GuidedReader({
  story,
  onDone,
}: {
  story: Story;
  onDone?: () => void;
}) {
  const words = useMemo(() => flatten(story), [story]);
  const showSyllables = useAppStore((s) => s.showSyllables);
  const ttsRate = useAppStore((s) => s.ttsRate);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  async function playFrom(start: number) {
    setPlaying(true);
    for (let i = start; i < words.length; i++) {
      setActive(i);
      const token = stripPunct(words[i]!.display);
      await speak(token, ttsRate);
    }
    setPlaying(false);
    onDone?.();
  }

  function togglePlay() {
    if (playing) {
      stopSpeak();
      setPlaying(false);
      return;
    }
    void playFrom(active);
  }

  return (
    <div className="flex flex-col gap-5">
      <ReadingSurface>
        <p className="flex flex-wrap">
          {words.map((w, i) => (
            <button
              key={`${w.display}-${i}`}
              type="button"
              onClick={() => {
                setActive(i);
                void speak(stripPunct(w.display), ttsRate);
              }}
              className={cn(
                "mr-[0.35em] rounded-sm px-0.5 text-left",
                i === active && "bg-clay/15 text-clay",
              )}
            >
              {showSyllables ? (
                <span>
                  {w.syllables.map((part, si) => (
                    <span
                      key={si}
                      className={si % 2 === 0 ? "text-clay" : "text-sage"}
                    >
                      {part}
                    </span>
                  ))}
                  {w.display.slice(stripPunct(w.display).length)}
                </span>
              ) : (
                w.display
              )}
            </button>
          ))}
        </p>
      </ReadingSurface>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={togglePlay}>
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
          {playing ? "Peata" : "Loe ette"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => void speak(stripPunct(words[active]?.display ?? ""), ttsRate)}
        >
          <Volume2 className="size-5" />
          See sõna
        </Button>
      </div>
    </div>
  );
}
