# Performance QA

Populate during Batch 09. All measurements use representative mobile throttling (Lighthouse Fast 3G + Moto G4 CPU) unless otherwise noted.

## Targets (lab, 75th percentile)

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- TBT ≤ 300ms

Field-data (CrUX) will not be available on a new domain; disclose that in the final report rather than fabricating field numbers.

## Budget

| Resource | Budget | Why |
|---|---|---|
| Total JS payload (initial) | ≤ 180 KB gzipped | Marketing site; no reason for more |
| LCP image | ≤ 180 KB (served AVIF/WebP) | Hero only above fold |
| Fonts total (compressed) | ≤ 50 KB | Inter + Fraunces variable |
| CSS (initial) | ≤ 25 KB gzipped | Tailwind + globals |
| Third-party scripts | 0 at launch | Analytics + Vercel Insights added at launch |

## LCP

The LCP is almost certainly the hero image. To protect it:

- `next/image` with `priority` set
- Correct `sizes` attribute reflecting viewport
- `fetchPriority="high"` (next/image handles this for priority images)
- Avoid above-fold font swaps that reflow the headline
- Avoid above-fold client components that defer paint

## CLS

- Explicit `width` + `height` on every `<Image>` or aspect-ratio wrapper
- Reserve space for the review-platform logos (if added) with `aspect-ratio` or fixed dimensions
- Font swap: use `font-display: swap` with font-size-adjust pairing to minimize layout shift
- No late-injected banner or cookie dialog that pushes content

## INP

- Server-first — no client components on content-only sections
- Form interactions use `useActionState` (already in place)
- BeforeAfter slider uses `requestAnimationFrame`-friendly transforms

## Image optimization

- All imagery served via `next/image` AVIF → WebP → JPEG fallback (already configured in `next.config.ts`)
- Hero: 1600 width, 16:11 aspect
- Service imagery: varied aspect, max 1200
- Thumbnails: 400–600 max

## Lighthouse record

Fill after Batch 09:

| Template | Lighthouse ID | LCP | INP | CLS | JS kB | Img kB | Fonts kB |
|---|---|---|---|---|---|---|---|
| Home (390) | — | — | — | — | — | — | — |
| Home (1440) | — | — | — | — | — | — | — |
| Service page (390) | — | — | — | — | — | — | — |
| City/service (390) | — | — | — | — | — | — | — |
| Project detail (390) | — | — | — | — | — | — | — |
| Resource guide (390) | — | — | — | — | — | — | — |
