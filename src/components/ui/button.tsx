import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
  {
    variants: {
      variant: {
        primary: "bg-clay text-on-accent shadow-[var(--shadow-border)] hover:bg-clay-deep",
        secondary:
          "bg-sheet text-ink shadow-[var(--shadow-border)] hover:bg-paper-2",
        ghost: "bg-transparent text-ink hover:bg-paper-2",
        sage: "bg-sage text-on-accent hover:bg-sage-deep",
        choice:
          "bg-sheet text-ink shadow-[var(--shadow-border)] text-left justify-start hover:bg-paper-2",
      },
      size: {
        md: "min-h-12 rounded-md px-4 text-base",
        lg: "min-h-14 rounded-lg px-5 text-lg",
        xl: "min-h-16 rounded-xl px-6 text-xl",
        icon: "size-12 rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
