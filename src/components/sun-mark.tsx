import { cn } from "@/lib/utils";

export function SunMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("text-clay", className)}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="14" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
        <path d="M32 6v8" />
        <path d="M32 50v8" />
        <path d="M6 32h8" />
        <path d="M50 32h8" />
        <path d="M13 13l5.6 5.6" />
        <path d="M45.4 45.4L51 51" />
        <path d="M13 51l5.6-5.6" />
        <path d="M45.4 18.6L51 13" />
      </g>
    </svg>
  );
}
