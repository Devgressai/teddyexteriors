import { Reveal } from "./Reveal";

/**
 * Teddy signature effect 02 — Architectural line divider.
 *
 * A thin horizontal rule that draws from left to right when it enters the viewport.
 * Reads as draftsman's / architect's rule rather than generic HR.
 *
 * `tone` matches the surrounding surface: default (border-subtle on bone/paper),
 * inverse (white/15 on evergreen), accent (cedar/60).
 */
export function ArchLineDivider({
  tone = "default",
  className = "",
}: {
  tone?: "default" | "inverse" | "accent";
  className?: string;
}) {
  const color =
    tone === "inverse"
      ? "bg-white/20"
      : tone === "accent"
        ? "bg-[color:var(--accent-cedar)]/55"
        : "bg-[color:var(--border-subtle)]";
  return (
    <Reveal kind="line" className={`block w-full h-px ${color} ${className}`} as="span" />
  );
}
