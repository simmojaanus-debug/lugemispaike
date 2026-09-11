import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { Shell } from "@/components/shell";
import { STORIES } from "@/lib/content";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/lood")({
  component: LoodPage,
});

function LoodPage() {
  const storyDone = useAppStore((s) => s.storyDone);
  return (
    <Shell>
      <BackLink to="/harjutused" />
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Lühilood</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Üks lühike lugu. Sõna saab puudutada ja kuulata.
      </p>
      <ul className="mt-6 grid gap-3">
        {STORIES.map((story) => (
          <li key={story.id}>
            <Link
              to="/lugu/$id"
              params={{ id: story.id }}
              className="block rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]"
            >
              <span className="block text-xl font-semibold">{story.title}</span>
              <span className="mt-1 block text-base text-ink-soft">
                {story.kicker}
                {storyDone.includes(story.id) ? " · loetud" : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
