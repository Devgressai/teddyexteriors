import type { ReactNode, ElementType } from "react";

type Surface = "warm" | "stone" | "paper" | "mist" | "inverse";
type Pad = "sm" | "md" | "lg" | "xl" | "none";

const surfaceClass: Record<Surface, string> = {
  warm: "bg-[color:var(--surface-warm)]",
  stone: "bg-[color:var(--surface-stone)]",
  paper: "bg-[color:var(--surface-paper)]",
  mist: "bg-[color:var(--surface-mist)]",
  inverse: "bg-[color:var(--surface-inverse)] text-[color:var(--ink-inverse)]",
};

const padClass: Record<Pad, string> = {
  none: "",
  sm: "py-[var(--section-pad-sm)]",
  md: "py-[var(--section-pad-md)]",
  lg: "py-[var(--section-pad-lg)]",
  xl: "py-[var(--section-pad-xl)]",
};

export function Section({
  children,
  surface = "warm",
  pad = "lg",
  as: Tag = "section",
  className = "",
  id,
  ariaLabel,
}: {
  children: ReactNode;
  surface?: Surface;
  pad?: Pad;
  as?: ElementType;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <Tag id={id} aria-label={ariaLabel} className={`${surfaceClass[surface]} ${padClass[pad]} ${className}`}>
      {children}
    </Tag>
  );
}
