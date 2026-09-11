import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpenText, Puzzle, Type } from "lucide-react";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/harjutused")({
  component: HarjutusedPage,
});

function HarjutusedPage() {
  return (
    <Shell>
      <h1 className="text-3xl font-semibold tracking-tight">Harjutused</h1>
      <p className="mt-2 text-lg text-ink-soft">
        Vali, mida täna veel proovida. Kõik on lühikesed.
      </p>
      <div className="mt-6 grid gap-3">
        <Card
          to="/silbid"
          icon={Type}
          title="Silbid"
          blurb="Loe sõna tükkideks. Puuduta silpi, et kuulata."
        />
        <Card
          to="/lood"
          icon={BookOpenText}
          title="Lühilood"
          blurb="Jälgi sõna. Kuula või loe ise."
        />
        <Card
          to="/mangud"
          icon={Puzzle}
          title="Mängud"
          blurb="Õige sõna, puuduv täht, sama või erinev."
        />
      </div>
    </Shell>
  );
}

function Card({
  to,
  icon: Icon,
  title,
  blurb,
}: {
  to: "/silbid" | "/lood" | "/mangud";
  icon: typeof Type;
  title: string;
  blurb: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-xl bg-sheet p-5 shadow-[var(--shadow-border)]"
    >
      <span className="flex size-11 items-center justify-center rounded-lg bg-paper-2 text-clay">
        <Icon className="size-5" />
      </span>
      <span className="mt-4 block text-xl font-semibold">{title}</span>
      <span className="mt-1 block text-base text-ink-soft">{blurb}</span>
    </Link>
  );
}
