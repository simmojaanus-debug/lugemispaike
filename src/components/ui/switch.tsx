import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "inline-flex h-8 w-14 shrink-0 items-center rounded-full bg-line p-0.5 transition-colors duration-150 data-[state=checked]:bg-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-7 translate-x-0 rounded-full bg-sheet shadow-[var(--shadow-border)] transition-transform duration-150 data-[state=checked]:translate-x-6" />
    </SwitchPrimitive.Root>
  );
}
