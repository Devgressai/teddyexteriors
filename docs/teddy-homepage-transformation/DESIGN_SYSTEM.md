# Design System — Teddy Exteriors

Formal semantic token system, fluid typographic scale, spacing, and motion contract.

## 1. Color — semantic tokens

The existing JDI palette provides the raw hues. This document assigns them to **semantic roles**. Components must use the semantic alias, never the raw hex.

### 1.1 Raw brand hues (from `BRAND_REFERENCE.md`)

| Hex | Source | Role in this system |
|---|---|---|
| `#50A747` | JDI accent | Secondary brand green |
| `#1E3D2A` | JDI deep | Primary brand evergreen |
| `#2D3D2F` | JDI text | Deep ink |
| `#485550` | JDI muted | Secondary ink |
| `#232323` | JDI dark neutral | Rich charcoal (fallback) |
| `#FCFAF8` | JDI warm | Warm bone (primary surface) |
| `#F8F9FA` | JDI cool | Soft stone (secondary surface) |
| `#FFFFFF` | White | Pure white (card / form surface) |
| `#D4D4D4` | JDI border | Border subtle |
| `#347A2E` | Derived | CTA fill (passes AA on white) |

### 1.2 New semantic tokens (to add in Batch 02)

```
--brand-primary       → #1E3D2A    (hero inverse band, final CTA band, strong emphasis)
--brand-primary-ink   → #FCFAF8    (text on brand-primary)
--brand-secondary     → #50A747    (accents, graphic marks, large-text headings on bone)
--brand-cta           → #347A2E    (filled button, hover state)
--brand-cta-ink       → #FFFFFF    (text on cta)
--brand-cta-hover     → #2A6324    (darkened on hover, AA preserved)

--accent-cedar        → #B5793B    (cedar/brass — restrained warm accent, used for eyebrow caps and section numbering)
--accent-cedar-soft   → #D1A777    (hover / inline underline for cedar accents)

--surface-bone        → #FCFAF8    (default page surface — warm bone)
--surface-stone       → #F8F9FA    (secondary surface — soft stone)
--surface-paper       → #FFFFFF    (card / form surface — pure white)
--surface-mist        → #EBEEEA    (subtle cool neutral — PNW environmental separator)
--surface-inverse     → #1E3D2A    (brand-primary band)

--ink-primary         → #2D3D2F    (body text on bone)
--ink-secondary       → #485550    (secondary / muted)
--ink-tertiary        → #7A857F    (metadata, captions)
--ink-inverse         → #FCFAF8    (on inverse)
--ink-emphasis        → #1E3D2A    (headings on bone)

--border-subtle       → #D4D4D4
--border-medium       → #A8ADA6
--border-strong       → #485550

--focus-ring          → #347A2E
```

Approximate distribution target (mandate §Color System):
- 60–70% warm neutral (`--surface-bone` + `--surface-paper`)
- 15–20% brand green family (`--brand-primary` + `--brand-secondary`)
- 10–15% photography
- <5% warm accent (`--accent-cedar`)

### 1.3 Contrast verification

| Pair | Ratio | AA |
|---|---|---|
| `--ink-primary` on `--surface-bone` | ~12.6:1 | ✓ |
| `--ink-secondary` on `--surface-bone` | ~7.1:1 | ✓ |
| `--ink-tertiary` on `--surface-bone` | ~4.6:1 | ✓ (normal text) |
| `--ink-inverse` on `--surface-inverse` | ~11.96:1 | ✓ |
| `--brand-cta-ink` on `--brand-cta` | ~5.29:1 | ✓ |
| `--brand-cta-ink` on `--brand-primary` | ~11.96:1 | ✓ |
| `--brand-primary-ink` on `--brand-secondary` | ~3.02:1 | **fails for small text** — use for graphic marks and large bold only |
| `--accent-cedar` on `--surface-bone` | ~5.4:1 | ✓ (verify in situ per weight / size) |

Any new pair must be rechecked in context.

## 2. Typography — fluid editorial scale

Working family: **Inter** for sans (already imported). Add **Fraunces** (variable serif) for display and section eyebrow emphasis — adds editorial character without being decorative.

### 2.1 Role scale (12 roles, fluid clamp)

```
--font-display        clamp(2.75rem, 1.5rem + 4vw, 4.75rem)   /* hero + section openers; Fraunces */
--font-h1             clamp(2.25rem, 1.5rem + 2.5vw, 3.25rem) /* page H1; Fraunces */
--font-h2             clamp(1.75rem, 1.25rem + 1.75vw, 2.5rem) /* section headlines; Fraunces 500 */
--font-h3             clamp(1.25rem, 1rem + 0.75vw, 1.5rem)   /* block headings; Inter 600 */
--font-eyebrow        0.75rem                                   /* uppercase 11px; Inter 600 tracking .14em */
--font-body-lg        clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem) /* lead/supporting */
--font-body           1rem                                      /* 16px base */
--font-caption        0.8125rem                                 /* image + metadata */
--font-metadata       0.75rem                                   /* fine print */
--font-button         0.9375rem                                 /* 15px / 1 line-height / 600 */
--font-nav            0.9375rem
--font-technical      0.8125rem                                 /* diagram annotations */
--font-stat           clamp(1.75rem, 1.25rem + 1.75vw, 2.25rem) /* credential rail numbers */
```

Line-heights:
- Display / H1: 1.05
- H2: 1.15
- H3 / lead: 1.3
- Body: 1.6
- Caption / metadata: 1.4

### 2.2 Weight pairings

| Role | Family | Weight |
|---|---|---|
| Display | Fraunces | 400 (regular — editorial, not shouty) |
| H1 | Fraunces | 500 |
| H2 | Fraunces | 500 |
| H3 | Inter | 600 |
| Eyebrow | Inter | 600, uppercase, letter-spacing .14em |
| Body / caption | Inter | 400 |
| Button / nav | Inter | 600 |
| Stat | Inter | 600, tabular-nums |

The Fraunces/Inter pairing gives us architectural confidence (Fraunces display) + residential warmth + editorial character, without going fully serif-everywhere (which reads cold / law-firm).

### 2.3 Line length

Body prose: `max-w: 65ch`. Lead prose: `max-w: 45ch`. Captions: `max-w: 40ch`.

Headlines never exceed 20 words on display / 15 on H1 / 12 on H2.

### 2.4 Fluid breakpoint anchor

The clamp() ranges target: 390px mobile anchor at the low end, 1440px desktop anchor at the high end. Values compute linearly between.

## 3. Spacing + grid

### 3.1 Spacing scale (8-based, matches Tailwind)

```
0  → 0
1  → 0.25rem
2  → 0.5
3  → 0.75
4  → 1rem      (base)
5  → 1.25
6  → 1.5
8  → 2rem
10 → 2.5
12 → 3rem
16 → 4rem
20 → 5rem
24 → 6rem
32 → 8rem
40 → 10rem
48 → 12rem
```

### 3.2 Section vertical padding

```
--section-pad-sm   : clamp(3rem,   2rem + 2.5vw, 4rem)   /* 48–64 */
--section-pad-md   : clamp(4rem,   3rem + 3vw,   5.5rem) /* 64–88 */
--section-pad-lg   : clamp(5rem,   4rem + 3vw,   7rem)   /* 80–112 */
--section-pad-xl   : clamp(6rem,   5rem + 3vw,   9rem)   /* 96–144 */
```

### 3.3 Container widths

```
--container-prose   : 65ch (narrative pages)
--container-tight   : 960px
--container-std     : 1200px
--container-wide    : 1360px
--container-full    : 100% (edge-to-edge bands)
```

### 3.4 Grid

12-column at ≥1024, 8-column at tablet (768–1023), 4-column at mobile (<768). Gutters: 16/24/32 at mobile/tablet/desktop.

## 4. Rhythm

- Alternate section backgrounds: `--surface-bone` (default) → `--surface-paper` (featured content) → `--surface-inverse` (brand peak moments) → `--surface-stone` (editorial authority) → `--surface-mist` (regional / environmental).
- Reserve `--surface-inverse` for exactly 2 peak moments: envelope detail + final CTA.
- Vary section density: dense editorial hero / compact proof / open service / immersive project / technical envelope / human trust / regional / process / social / education / conversion.
- No two consecutive sections should share both background and image-scale pattern.

## 5. Elevation / shadows

Shadows are **rare and purposeful**. The default surface has no shadow. Only two shadow tokens:

```
--shadow-lift   : 0 2px 8px rgba(29, 61, 42, 0.06)       /* subtle; cards that need separation */
--shadow-float  : 0 12px 32px rgba(29, 61, 42, 0.12)     /* elevated moments; use sparingly */
```

No neumorphic / glowy / drop-shadow-on-everything patterns.

## 6. Radius

```
--radius-sharp  : 0           (editorial image frames, section bands)
--radius-sm     : 4px         (buttons, pills)
--radius-md     : 6px         (default — cards, inputs)
--radius-lg     : 10px        (large tiles)
```

No pill-rounded buttons. No fully rounded images unless editorially intentional (team portraits).

## 7. Motion

```
--motion-fast   : 150ms        (micro — hover color, focus ring)
--motion-mid    : 220ms        (small reveals, link underline)
--motion-slow   : 320ms        (section transitions, image hover crop)
--easing        : cubic-bezier(0.4, 0, 0.2, 1)
```

Allowed:
- Hover color + underline
- Image hover crop (`scale 1.02–1.04`)
- Focus ring appearance
- Accordion expand
- Button press (translate 1px)
- Section fade-in on view (opacity + 8px translate, respects reduced-motion)

Banned:
- Continuous animation
- Parallax dependent on scroll handlers
- Cursor-following effects
- Autoplay carousels
- Text reveal animations beyond section entry
- Any animation that delays access to form or CTA

Reduced-motion users get instant transitions — already wired in `globals.css`.

## 8. Iconography

**Minimal.** No stock icon pack. Where icons appear:

- Chevrons / arrows: inline SVG, 1.25em, `currentColor`
- Social: inline brand SVG, monochrome
- Rating star (where real): inline SVG, `--accent-cedar`

No fir-tree icons. No mountain silhouettes. No decorative outline icons grouped in service cards (banned by mandate).

## 9. Image treatment

- **Default framing:** sharp corners on editorial / project imagery; `--radius-md` on inset cards.
- **Aspect ratios:** 16:11 (hero primary), 3:4 (detail inset), 1:1 (team / step avatars), 4:3 (project thumbs), 16:9 (full-width project showcase).
- **Overlay:** avoid full black gradient overlays. If text sits on an image, use a corner safe-area with no overlay, or a controlled `--surface-inverse` plate inside the image frame.
- **Alt text:** description + locality where applicable.
- **next/image:** always with explicit `sizes` + `priority` only on above-fold LCP image.

## 10. Fonts loading

- **Inter** — already imported via `next/font/google`. Keep `display: swap`, Latin subset.
- **Fraunces** — to be added via `next/font/google`. Latin subset. `display: swap`. Variable font (axis: `opsz`, `wght`, `SOFT`). Preload the display range on home only.
- Font payload budget: ≤ 50 KB total compressed for both families.
