import type { ReactNode, ElementType, CSSProperties } from "react";

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
  /* Inverse sections flip the .editorial-* heading color to white via the
     --editorial-color custom property. The global .editorial-* rules read
     this with fallback to --text-heading, so light-section headings stay
     evergreen untouched. */
  const inlineStyle: CSSProperties | undefined =
    surface === "inverse"
      ? ({ ["--editorial-color" as string]: "var(--text-inverse)" } as CSSProperties)
      : undefined;

  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      style={inlineStyle}
      className={`${surfaceClass[surface]} ${padClass[pad]} ${className}`}
    >
      {children}
    </Tag>
  );
}
