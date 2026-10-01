"use client";
import Image from "next/image";
import { useId, useState } from "react";
import type { BeforeAfterProps } from "./types";

/**
 * Accessible before/after comparison. Keyboard-controlled slider or static pair fallback.
 * Content remains visible/useful without JS (progressive enhancement via noscript fallback below).
 */
export function BeforeAfter({ before, after, label = "Before and after", mode = "slider" }: BeforeAfterProps) {
  const sliderId = useId();
  const [pct, setPct] = useState(50);

  if (mode === "pair") {
    return (
      <figure className="grid gap-4 sm:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image src={before.src} alt={`Before — ${before.alt}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image src={after.src} alt={`After — ${after.alt}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
        <figcaption className="sm:col-span-2 text-xs text-[color:var(--ink-secondary)]">{label}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md select-none">
        <Image src={after.src} alt={`After — ${after.alt}`} fill sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)` }}
        >
          <Image src={before.src} alt={`Before — ${before.alt}`} fill sizes="100vw" className="object-cover" />
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-px bg-white/90 shadow"
          style={{ left: `${pct}%` }}
        />
      </div>
      <label htmlFor={sliderId} className="sr-only">
        Compare before and after
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="mt-3 w-full accent-[color:var(--brand-cta)]"
      />
      <figcaption className="mt-2 text-xs text-[color:var(--ink-secondary)]">{label}</figcaption>
    </figure>
  );
}
