"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Fixed right-side vertical "Get an Estimate" tab. Visible on lg+ only (mobile already has
 * the sticky MobileActionBar at the bottom). Hidden when the EstimateSection enters view
 * to avoid double-stacking CTAs.
 *
 * Visual: deep-green vertical panel with the pointer-right tag clip-path, white rotated
 * text, cedar-brass arrow glyph. Subtle slide-in from the right on load.
 */
export function SideQuoteTab() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Reveal after a short delay so it doesn't fight hero animations
    const timer = window.setTimeout(() => setHidden(false), 650);

    if (typeof IntersectionObserver !== "undefined") {
      const target =
        document.querySelector("[data-estimate-section]") ??
        document.querySelector('[aria-label="Request an evaluation"]');
      if (target) {
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) setHidden(entry.isIntersecting);
          },
          { threshold: 0.08 },
        );
        observer.observe(target);
        return () => {
          observer.disconnect();
          window.clearTimeout(timer);
        };
      }
    }
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Link
      href="/request-estimate"
      aria-label="Request a free exterior estimate"
      className={`hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 bg-[color:var(--brand-primary)] text-white pl-5 pr-4 py-6 clip-tag-right shadow-[0_8px_24px_rgba(29,61,42,0.25)] transition-transform duration-500 ease-out hover:bg-[color:var(--brand-cta)] group ${hidden ? "translate-x-full" : "translate-x-0"}`}
      style={{ writingMode: "vertical-rl" }}
    >
      <span className="text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[color:var(--brand-secondary)]">
        Free &middot; Fast
      </span>
      <span className="text-[0.95rem] font-extrabold tracking-wide uppercase">
        Request an Estimate
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 rotate-180 transition-transform duration-200 group-hover:translate-y-0.5"
        style={{ writingMode: "horizontal-tb" }}
      >
        <path d="M12 4v14M6 12l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </Link>
  );
}
