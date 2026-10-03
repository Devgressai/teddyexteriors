"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MegaNavItem } from "./MegaMenu";

type Props = {
  items: MegaNavItem[];
  brandName: string;
  phone?: string;
  waCredentialNumber?: string;
  orCredentialNumber?: string;
};

const Burger = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
    {open ? (
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
      />
    ) : (
      <path
        d="M3 7h18M3 12h18M3 17h18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
      />
    )}
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

/**
 * Slide-in nav drawer for lt-lg viewports. Burger button is anchored outside
 * the mega-nav rail so it only ever shows below `lg`. When open:
 *
 *   - a scrim covers the main surface,
 *   - the drawer slides in from the right at 92vw max 420px,
 *   - mega-menu items flatten into collapsible groups keyed by the top
 *     label; each group's "feature image" sits above its link list,
 *   - body scroll is locked.
 *
 * Closes on: scrim click, close button, Escape, or route change (via the
 * pathname effect — click a link, drawer unmounts.)
 */
export function MobileNavDrawer({
  items,
  brandName,
  phone,
  waCredentialNumber,
  orCredentialNumber,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close drawer on route change.
  useEffect(() => {
    setOpen(false);
    setExpandedIdx(null);
  }, [pathname]);

  const credentials = [
    waCredentialNumber && `WA L&I ${waCredentialNumber}`,
    orCredentialNumber && `OR CCB ${orCredentialNumber}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-[color:var(--ink-emphasis)]"
      >
        <Burger open={open} />
      </button>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Site navigation">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[color:var(--surface-inverse)]/55 backdrop-blur-sm"
          />
          <aside
            className="absolute top-0 right-0 h-full w-[92vw] max-w-[420px] bg-[color:var(--surface-card)] shadow-2xl flex flex-col overflow-hidden"
            style={{ ["--editorial-color" as string]: "var(--text-heading)" }}
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--border-subtle)]">
              <span className="text-[0.78rem] font-semibold tracking-[0.22em] uppercase text-[color:var(--text-heading)]">
                {brandName}
              </span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="h-10 w-10 inline-flex items-center justify-center text-[color:var(--ink-emphasis)]"
              >
                <Burger open />
              </button>
            </header>

            <nav aria-label="Primary mobile" className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-[color:var(--border-subtle)]">
                {items.map((item, i) => {
                  const hasMenu = Boolean(item.menu);
                  const expanded = expandedIdx === i;
                  return (
                    <li key={item.href} className="py-2">
                      <div className="flex items-stretch">
                        <Link
                          href={item.href}
                          className="flex-1 py-3 text-[1rem] font-semibold text-[color:var(--text-heading)]"
                        >
                          {item.label}
                        </Link>
                        {hasMenu && (
                          <button
                            type="button"
                            aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                            aria-expanded={expanded}
                            onClick={() => setExpandedIdx(expanded ? null : i)}
                            className="h-11 w-11 inline-flex items-center justify-center text-[color:var(--text-muted)]"
                          >
                            <Chevron open={expanded} />
                          </button>
                        )}
                      </div>
                      {hasMenu && expanded && item.menu && (
                        <div className="pb-4 pt-1">
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[color:var(--surface-soft)]">
                            <Image
                              src={item.menu.image.src}
                              alt={item.menu.image.alt}
                              fill
                              sizes="(max-width: 420px) 92vw, 420px"
                              className="object-cover"
                            />
                          </div>
                          <p className="mt-3 text-[0.85rem] leading-relaxed text-[color:var(--text-muted)]">
                            {item.menu.description}
                          </p>
                          <ul className="mt-3 grid grid-cols-1 gap-y-1">
                            {item.menu.columns.flatMap((col) =>
                              col.links.map((l) => (
                                <li key={l.href}>
                                  <Link
                                    href={l.href}
                                    className="block py-2 text-[0.95rem] text-[color:var(--text-heading)]"
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              )),
                            )}
                          </ul>
                          <Link
                            href={item.menu.viewAll.href}
                            className="mt-2 inline-flex items-center text-[0.85rem] font-semibold text-[color:var(--action-primary)]"
                          >
                            {item.menu.viewAll.label}
                            <span aria-hidden="true" className="ml-1">
                              →
                            </span>
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <footer className="border-t border-[color:var(--border-subtle)] px-5 py-4 space-y-3 bg-[color:var(--surface-page)]">
              {phone && (
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="block text-center rounded-sm bg-[color:var(--action-primary)] text-white font-semibold px-5 py-3 text-[0.95rem]"
                >
                  Call {phone}
                </a>
              )}
              <Link
                href="/request-estimate"
                className="block text-center rounded-sm border border-[color:var(--border-control)] text-[color:var(--text-heading)] font-semibold px-5 py-3 text-[0.95rem]"
              >
                Request an estimate
              </Link>
              {credentials && (
                <p className="pt-1 text-center text-[0.72rem] text-[color:var(--text-muted)]">
                  {credentials}
                </p>
              )}
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
