import Link from "next/link";

export function MobileActionBar({ phone }: { phone?: string }) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-[color:var(--border-subtle)] bg-[color:var(--surface-paper)]/95 backdrop-blur-sm"
      role="contentinfo"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 divide-x divide-[color:var(--border-subtle)]">
        {phone ? (
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center justify-center gap-2 py-3 text-[0.9rem] font-semibold text-[color:var(--ink-emphasis)]"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
              <path
                d="M4 5a2 2 0 0 1 2-2h2.5a1 1 0 0 1 .97.76l1 4a1 1 0 0 1-.29.98L8.6 10.33a12 12 0 0 0 5.08 5.08l1.59-1.59a1 1 0 0 1 .98-.29l4 1a1 1 0 0 1 .75.97V18a2 2 0 0 1-2 2A16 16 0 0 1 4 5z"
                fill="currentColor"
              />
            </svg>
            Call
          </a>
        ) : (
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 py-3 text-[0.9rem] font-semibold text-[color:var(--ink-emphasis)]"
          >
            Contact
          </Link>
        )}
        <Link
          href="/request-estimate"
          className="flex items-center justify-center gap-2 py-3 text-[0.9rem] font-semibold text-[color:var(--brand-cta-ink)] bg-[color:var(--brand-cta)]"
        >
          Request Estimate
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </Link>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
    </div>
  );
}
