import type { ReactNode } from "react";

type Level = "display" | "h1" | "h2" | "h3";
type Tone = "default" | "inverse";

const toneClass: Record<Tone, string> = {
  default: "text-[color:var(--ink-emphasis)]",
  inverse: "text-[color:var(--ink-inverse)]",
};

export function EditorialHeading({
  children,
  level = "h2",
  as,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  level?: Level;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  tone?: Tone;
  className?: string;
}) {
  const classByLevel: Record<Level, string> = {
    display: "editorial-display",
    h1: "editorial-h1",
    h2: "editorial-h2",
    h3: "editorial-h3",
  };
  const Tag = (as ?? (level === "display" || level === "h1" ? "h1" : level === "h2" ? "h2" : "h3")) as React.ElementType;
  return <Tag className={`${classByLevel[level]} ${toneClass[tone]} ${className}`}>{children}</Tag>;
}
