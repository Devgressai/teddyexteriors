"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type MegaMenuColumn = {
  heading?: string;
  links: { label: string; href: string }[];
};

export type MegaMenuData = {
  description: string;
  image: { src: string; alt: string };
  featureCta: { label: string; href: string };
  columns: MegaMenuColumn[];
  viewAll: { label: string; href: string };
};

export type MegaNavItem = {
  label: string;
  href: string;
  menu?: MegaMenuData;
};

type Props = {
  items: MegaNavItem[];
  isActive: (href: string) => boolean;
};

const Chevron = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-1 h-3.5 w-3.5 transition-transform group-data-[open=true]:rotate-180">
    <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

const ArrowGlyph = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

/**
 * Hover-driven primary nav + mega-menu rail. Items without a `menu` render as
 * flat links; items with a `menu` render a trigger that opens a wide panel
 * on hover (with a short close delay so moving the cursor from trigger to
 * panel doesn't dismiss it). Panel layout mirrors the Sierra Siding model:
 * left column = feature image + description + CTA; center/right columns =
 * grouped link lists; bottom row = "View all" link.
 */
export function MegaMenu({ items, isActive }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIdx(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const open = (i: number) => {
    cancelClose();
    setOpenIdx(i);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="hidden lg:flex items-center gap-7 text-[0.9375rem] font-medium relative"
      onMouseLeave={scheduleClose}
    >
      {items.map((item, i) => {
        const active = isActive(item.href);
        if (!item.menu) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setOpenIdx(null)}
              className={`relative transition-colors py-2 ${
                active
                  ? "text-[color:var(--brand-cta)] after:content-[''] after:absolute after:-bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[color:var(--brand-cta)]"
                  : "text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)]"
              }`}
            >
              {item.label}
            </Link>
          );
        }
        const isOpen = openIdx === i;
        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => open(i)}
            onFocus={() => open(i)}
          >
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              aria-expanded={isOpen}
              data-open={isOpen}
              className={`group relative inline-flex items-center transition-colors py-2 ${
                active || isOpen
                  ? "text-[color:var(--brand-cta)]"
                  : "text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)]"
              }`}
            >
              {item.label}
              <Chevron />
              {(active || isOpen) && (
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[color:var(--brand-cta)]" aria-hidden="true" />
              )}
            </Link>
          </div>
        );
      })}

      {/* The mega-panel sits as a single absolutely-positioned surface
          anchored to the nav container, not to any one trigger, so swapping
          between adjacent menus is a cross-fade rather than two panels
          colliding mid-air. */}
      {openIdx !== null && items[openIdx]?.menu && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full z-40 pt-3 w-[min(960px,calc(100vw-48px))]"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <MegaPanel data={items[openIdx]!.menu!} />
        </div>
      )}
    </nav>
  );
}

function MegaPanel({ data }: { data: MegaMenuData }) {
  return (
    <div className="rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--surface-card)] shadow-[0_18px_48px_rgba(18,61,42,0.14)] overflow-hidden">
      <div className="grid grid-cols-12 gap-0">
        {/* Feature column — image + description + featured CTA */}
        <aside className="col-span-4 bg-[color:var(--surface-soft)] p-6 flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-[color:var(--text-muted)]">
            {data.description}
          </p>
          <Link
            href={data.featureCta.href}
            className="group mt-5 inline-flex items-center text-[0.85rem] font-semibold text-[color:var(--action-primary)] hover:text-[color:var(--action-primary-hover)]"
          >
            {data.featureCta.label}
            <ArrowGlyph />
          </Link>
        </aside>

        {/* Link columns */}
        <div className="col-span-8 p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.columns.flatMap((col, ci) =>
              col.links.map((l) => (
                <Link
                  key={`${ci}-${l.href}`}
                  href={l.href}
                  className="group block text-[0.95rem] font-medium text-[color:var(--text-heading)] hover:text-[color:var(--action-primary)] py-2 border-b border-transparent hover:border-[color:var(--border-subtle)] transition-colors"
                >
                  {l.label}
                </Link>
              )),
            )}
          </div>
          <div className="mt-5 pt-4 border-t border-[color:var(--border-subtle)]">
            <Link
              href={data.viewAll.href}
              className="group inline-flex items-center text-[0.9rem] font-semibold text-[color:var(--action-primary)] hover:text-[color:var(--action-primary-hover)]"
            >
              {data.viewAll.label}
              <ArrowGlyph />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
