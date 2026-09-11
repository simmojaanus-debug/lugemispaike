import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { GuidedReader } from "@/components/guided-reader";
import { QuizPlay } from "@/components/quiz-play";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { STORIES } from "@/lib/content";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/lugu/$id")({
  component: LuguPage,
});

function LuguPage() {
  const { id } = Route.useParams();
  const story = STORIES.find((s) => s.id === id);
  const markPractice = useAppStore((s) => s.markPractice);
  const [phase, setPhase] = useState<"read" | "ask" | "done">("read");

  if (!story) {
    return (
      <Shell>
        <BackLink to="/lood" />
        <p className="mt-6 text-lg">Seda lugu ei ole.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <BackLink to="/lood" label="Kõik lood" />
      <p className="mt-4 text-sm font-medium text-ink-soft">{story.kicker}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{story.title}</h1>

      {phase === "read" && (
        <div className="mt-6 flex flex-1 flex-col gap-5">
          <GuidedReader story={story} />
          <Button
            className="mt-auto"
            onClick={() => {
              markPractice("story", story.id);
              setPhase("ask");
            }}
          >
            Küsimus loo kohta
          </Button>
        </div>
      )}

      {phase === "ask" && (
        <div className="mt-6">
          <QuizPlay
            items={[
              {
                id: `sq-${story.id}`,
                kind: "choice",
                prompt: story.question.prompt,
                options: story.question.options,
                answer: story.question.answer,
              },
            ]}
            onFinish={() => setPhase("done")}
          />
        </div>
      )}

      {phase === "done" && (
        <div className="mt-8 flex flex-1 flex-col gap-4">
          <p className="text-lg text-ink-soft">Lugu on loetud. Võid valida uue.</p>
          <Link to="/lood">
            <Button className="w-full">Teised lood</Button>
          </Link>
        </div>
      )}
    </Shell>
  );
}
