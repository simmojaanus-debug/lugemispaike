import { Link, createFileRoute } from "@tanstack/react-router";
import { Ear, Equal, Type, WholeWord } from "lucide-react";
import { BackLink } from "@/components/back-link";
import { Shell } from "@/components/shell";
import { GAME_META, type GameKind } from "@/lib/today";

export const Route = createFileRoute("/mangud")({
  component: MangudPage,
});

const ICONS: Record<GameKind, typeof Type> = {
  choice: WholeWord,
  missing: Type,
  same: Equal,
  listen: Ear,
};

const KINDS: GameKind[] = ["choice", "missing", "same", "listen"];

function MangudPage() {
  return (
    <Shell>
      <BackLink to="/harjutused" />
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Mängud</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Lühikesed voorud. Õige ja vale on rahulik — alati saab uuesti proovida.
      </p>
      <ul className="mt-6 grid gap-3">
        {KINDS.map((kind) => {
          const meta = GAME_META[kind];
          const Icon = ICONS[kind];
          return (
            <li key={kind}>
              <Link
                to="/mang/$kind"
                params={{ kind }}
                className="flex items-start gap-4 rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-clay">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-xl font-semibold">{meta.title}</span>
                  <span className="mt-1 block text-base text-ink-soft">{meta.blurb}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
