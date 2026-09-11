import { useEffect, type ReactNode } from "react";
import { askToKeepStorage } from "@/lib/durable-storage";
import { useAppStore, useStoreHydrated } from "@/lib/store";
import { SunMark } from "./sun-mark";

export function PersistGate({ children }: { children: ReactNode }) {
  const hydrated = useStoreHydrated();

  useEffect(() => {
    void useAppStore.persist.rehydrate();
    askToKeepStorage();
    const flush = () => {
      const snap = useAppStore.getState();
      useAppStore.setState({ lastPracticeDate: snap.lastPracticeDate });
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh justify-center bg-paper text-ink">
        <div className="flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-5">
          <SunMark className="size-16" />
          <p className="text-2xl font-semibold">Lugemispäike</p>
        </div>
      </div>
    );
  }

  return children;
}
