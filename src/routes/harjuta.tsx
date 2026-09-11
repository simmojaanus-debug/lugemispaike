import { createFileRoute } from "@tanstack/react-router";
import { SessionPlayer } from "@/components/session-player";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/harjuta")({
  component: HarjutaPage,
});

function HarjutaPage() {
  return (
    <Shell hideNav>
      <SessionPlayer />
    </Shell>
  );
}
