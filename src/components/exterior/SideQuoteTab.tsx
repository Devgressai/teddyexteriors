"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  phone?: string;
};

/**
 * Fixed right-side conversion rail. Two stacked tabs:
 *
 *   TOP   — "Request an Estimate" primary tab, deep brand green, chevron-left arrow glyph.
 *           Expands ~44px to the left on hover so the tab reads as a drawer, not a fixed slab.
 *   LOWER — Phone-call tab (only when phone is available), lighter accent green, phone glyph.
 *
 * Panel is substantial (76px wide base, ~340px total height) so it reads as a real UI
 * element — not a tiny ribbon. Chevron clip-path on the LEFT edge points at the content.
 *
 * Visible on lg+ only (mobile has the sticky MobileActionBar). Hidden entirely when the
 * EstimateSection enters view to avoid double-stacking CTAs.
 */
export function SideQuoteTab({ phone }: Props) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reveal = window.setTimeout(() => setHidden(false), 650);

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
          window.clearTimeout(reveal);
        };
      }
    }
    return () => window.clearTimeout(reveal);
  }, []);

  return (
    <aside
      aria-label="Quick conversion"
      className={`hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 flex-col items-stretch transition-transform duration-500 ease-out ${
        hidden ? "translate-x-full" : "translate-x-0"
      }`}
      style={{ filter: "drop-shadow(-8px 10px 24px rgba(29,61,42,0.28))" }}
    >
      {/* PRIMARY TAB — Request an Estimate */}
      <Link
        href="/request-estimate"
        aria-label="Request a free exterior estimate"
        className="group relative flex items-stretch w-[76px] hover:w-[120px] transition-[width] duration-300 ease-out bg-[color:var(--brand-primary)] text-white hover:bg-[color:var(--brand-cta)] clip-side-tab-primary"
        style={{ minHeight: "260px" }}
      >
        {/* Content column — rotated writing mode */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 pl-5 pr-3 py-6">
          {/* Top accent — small cedar brass dot */}
          <span
            className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-secondary)] transition-transform duration-300 group-hover:scale-150"
            aria-hidden="true"
          />

          {/* Vertical "FREE · FAST" eyebrow */}
          <span
            className="text-[0.68rem] font-black tracking-[0.3em] text-[color:var(--brand-secondary)] uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Free &middot; Fast
          </span>

          {/* Main vertical label */}
          <span
            className="text-[1.05rem] font-black tracking-[0.14em] uppercase text-white leading-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Request an Estimate
          </span>

          {/* Chevron-left glyph pointing at the content (click here) */}
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center border border-white/40 bg-white/5 group-hover:bg-white group-hover:border-white transition-colors">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 text-white group-hover:text-[color:var(--brand-primary)] transition-colors group-hover:-translate-x-0.5 duration-200"
            >
              <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </span>
        </div>
      </Link>

      {/* SECONDARY TAB — Call (only when phone verified) */}
      {phone && (
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
          aria-label={`Call Teddy Exteriors at ${phone}`}
          className="group mt-2 relative flex items-stretch w-[76px] hover:w-[120px] transition-[width] duration-300 ease-out bg-[color:var(--brand-cta)] text-white hover:bg-[color:var(--brand-cta-hover)] clip-side-tab-secondary"
          style={{ minHeight: "76px" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center gap-1.5 pl-5 pr-3 py-3">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                d="M4 5a2 2 0 0 1 2-2h2.5a1 1 0 0 1 .97.76l1 4a1 1 0 0 1-.29.98L8.6 10.33a12 12 0 0 0 5.08 5.08l1.59-1.59a1 1 0 0 1 .98-.29l4 1a1 1 0 0 1 .75.97V18a2 2 0 0 1-2 2A16 16 0 0 1 4 5z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[0.6rem] font-black tracking-[0.24em] uppercase text-white/90">
              Call
            </span>
          </div>
        </a>
      )}
    </aside>
  );
}
