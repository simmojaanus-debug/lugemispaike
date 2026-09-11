import { useEffect, type CSSProperties, type ReactNode } from "react";
import { useAppStore, type Tracking } from "@/lib/store";
import { cn } from "@/lib/utils";

const trackingMap: Record<Tracking, string> = {
  normal: "0.02em",
  wide: "0.08em",
  wider: "0.14em",
};

export function useReadingStyle(): CSSProperties {
  const fontScale = useAppStore((s) => s.fontScale);
  const tracking = useAppStore((s) => s.tracking);
  return {
    "--read-scale": String(fontScale),
    "--read-tracking": trackingMap[tracking],
  } as CSSProperties;
}

export function ReadingSurface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const style = useReadingStyle();
  return (
    <div className={cn("read-copy", className)} style={style}>
      {children}
    </div>
  );
}

export function OverlaySync() {
  const overlay = useAppStore((s) => s.overlay);
  useEffect(() => {
    document.documentElement.dataset.overlay = overlay;
  }, [overlay]);
  return null;
}
