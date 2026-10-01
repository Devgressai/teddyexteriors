import type { ReactNode } from "react";

export function Eyebrow({
  children,
  inverse = false,
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  inverse?: boolean;
  as?: "p" | "span" | "div";
  className?: string;
}) {
  const Component = Tag as React.ElementType;
  return (
    <Component className={`eyebrow ${inverse ? "eyebrow-inverse" : ""} ${className}`}>{children}</Component>
  );
}
