import { Link, createFileRoute } from "@tanstack/react-router";
import { InstallCard } from "@/components/install-card";
import { Shell } from "@/components/shell";
import { PARENT_TIPS } from "@/lib/content";

export const Route = createFileRoute("/vanematele")({
  component: VanematelePage,
});

function VanematelePage() {
  return (
    <Shell>
      <h1 className="text-3xl font-semibold tracking-tight">Vanematele</h1>
      <p className="mt-2 text-lg leading-relaxed text-ink-soft">
        Lühike harjutus teie lapsele. Andmed jäävad selle telefoni sisse.
      </p>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Kuidas kasutada</h2>
        <p className="rounded-xl bg-sheet p-4 text-base leading-relaxed text-ink-soft shadow-[var(--shadow-border)]">
          Umbes 10 minutit iga päev. Tänane tee: silbid, üks lühike lugu, neli
          väikest mängu. Tempo on rahulik. Vale vastus ei karista.
        </p>
      </section>

      <section className="mt-8 grid gap-3">
        <h2 className="text-xl font-semibold">Naise ja lapse telefon</h2>
        <p className="rounded-xl bg-sheet p-4 text-base leading-relaxed text-ink-soft shadow-[var(--shadow-border)]">
          Saada link naisele või ava lapse telefonis ainult siis, kui leht
          avaneb kreemja Lugemispäikesena. Must tühi leht on vana eelvaade —
          kustuta see ikoon. Play poodi pole vaja.
        </p>
        <p className="rounded-xl bg-sheet p-4 text-base leading-relaxed text-ink-soft shadow-[var(--shadow-border)]">
          Koos harjutamiseks on kõige mugavam üks telefon — tavaliselt lapse
          oma. Siis jäävad tähed ja järjestikused päevad ühte kohta. Teises
          telefonis algab harjutus oma seadetega, sama lugemine.
        </p>
        <InstallCard />
      </section>

      <section className="mt-8 mb-4 grid gap-3">
        <h2 className="text-xl font-semibold">Lühikesed näpunäited</h2>
        <ul className="grid gap-3">
          {PARENT_TIPS.map((tip) => (
            <li
              key={tip}
              className="rounded-xl bg-sheet p-4 text-base leading-relaxed text-ink-soft shadow-[var(--shadow-border)]"
            >
              {tip}
            </li>
          ))}
        </ul>
        <Link
          to="/mina"
          className="text-base font-medium text-clay underline-offset-4"
        >
          Tagasi seadetesse
        </Link>
      </section>
    </Shell>
  );
}
