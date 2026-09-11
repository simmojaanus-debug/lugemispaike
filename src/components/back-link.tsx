import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackLink({
  to,
  label = "Tagasi",
}: {
  to: "/harjutused" | "/" | "/lood" | "/mangud" | "/silbid";
  label?: string;
}) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-soft"
    >
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  );
}
