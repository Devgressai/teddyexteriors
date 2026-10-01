"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal — IntersectionObserver-driven progressive enhancement.
 *
 * Children render immediately (not hidden with display:none), so content remains available
 * to crawlers and users without JS. The reveal effect is purely visual: data-reveal and
 * data-reveal-visible attributes drive CSS transitions declared in globals.css.
 *
 * `kind` controls which effect: image clip-path, line scaleX, or text translateY.
 * Respects prefers-reduced-motion automatically via CSS.
 */
export function Reveal({
  children,
  kind = "text",
  threshold = 0.15,
  as: Tag = "div",
  className = "",
  delayMs = 0,
}: {
  children?: ReactNode;
  kind?: "image" | "line" | "text";
  threshold?: number;
  as?: React.ElementType;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-reveal-visible", "true");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delayMs) {
              const timer = window.setTimeout(() => {
                el.setAttribute("data-reveal-visible", "true");
              }, delayMs);
              return () => window.clearTimeout(timer);
            }
            el.setAttribute("data-reveal-visible", "true");
            observer.unobserve(el);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delayMs]);
  return (
    <Tag ref={ref} data-reveal={kind} className={className}>
      {children}
    </Tag>
  );
}
