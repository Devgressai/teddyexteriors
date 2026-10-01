import type { ReactNode } from "react";

type Width = "tight" | "std" | "wide" | "full";

const widthClass: Record<Width, string> = {
  tight: "max-w-[960px]",
  std: "max-w-[1200px]",
  wide: "max-w-[1360px]",
  full: "max-w-none",
};

export function Container({
  children,
  width = "std",
  className = "",
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  return <div className={`mx-auto px-6 lg:px-8 ${widthClass[width]} ${className}`}>{children}</div>;
}
