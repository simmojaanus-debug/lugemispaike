import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { OverlaySync } from "./reading-surface";
import { ReminderWatcher } from "./reminder-watcher";

const NAV = [
  { to: "/", label: "Täna", icon: Home },
  { to: "/harjutused", label: "Harjutused", icon: BookOpen },
  { to: "/mina", label: "Mina", icon: User },
] as const;

function navActive(to: string, pathname: string) {
  if (to === "/") return pathname === "/";
  if (to === "/harjutused") {
    return (
      pathname === "/harjutused" ||
      pathname.startsWith("/silbid") ||
      pathname.startsWith("/lood") ||
      pathname.startsWith("/lugu") ||
      pathname.startsWith("/mang") ||
      pathname.startsWith("/harjuta")
    );
  }
  return pathname === to || pathname.startsWith(`${to}/`) || (to === "/mina" && pathname.startsWith("/vanematele"));
}

export function Shell({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh justify-center bg-paper text-ink">
      <div className="flex min-h-dvh w-full max-w-md flex-col">
      <OverlaySync />
      <ReminderWatcher />
      <main
        className={cn(
          "flex flex-1 flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))]",
          hideNav ? "pb-8" : "pb-28",
        )}
      >
        {children}
      </main>
      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-sheet/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm">
          <ul className="mx-auto grid max-w-md grid-cols-3 gap-1">
            {NAV.map((item) => {
              const active = navActive(item.to, pathname);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium",
                      active ? "text-clay" : "text-ink-soft",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      </div>
    </div>
  );
}
