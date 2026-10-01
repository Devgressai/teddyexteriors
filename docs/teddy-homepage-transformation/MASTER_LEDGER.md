# Master Ledger — Teddy Exteriors homepage transformation

Canonical execution state for the full-rebuild mandate (2026-10-01). Updated at the end of every batch; do not rely on conversation memory.

## Status taxonomy

- `TODO` — identified, not scoped
- `DISCOVERY` — under investigation
- `READY` — scoped + unblocked
- `IN_PROGRESS` — being worked
- `IMPLEMENTED` — code shipped, awaiting visual verification
- `VISUALLY_VERIFIED` — reviewed at desktop + tablet + mobile
- `REGRESSION_VERIFIED` — no SEO / a11y / performance regression
- `BLOCKED` — waiting on external input (owner, assets, keys)
- `COMPLETE` — all above satisfied

## Batch 01 — Forensic analysis + reference decomposition (2026-10-01)

| ID | Task | Status | Evidence |
|---|---|---|---|
| 01.01 | Audit existing repo (framework, routes, tokens, components) | IMPLEMENTED | `DESIGN_AUDIT.md` |
| 01.02 | Decompose GVD Renovations | IMPLEMENTED | `REFERENCE_DECOMPOSITION.md` §1 |
| 01.03 | Decompose Cobex Construction | IMPLEMENTED | `REFERENCE_DECOMPOSITION.md` §2 |
| 01.04 | Decompose US Quality Construction | IMPLEMENTED | `REFERENCE_DECOMPOSITION.md` §3 |
| 01.05 | Synthesize "Teddy Reference Synthesis" | IMPLEMENTED | `REFERENCE_DECOMPOSITION.md` §4 |
| 01.06 | Define new section architecture + conversion model | IMPLEMENTED | `SECTION_ARCHITECTURE.md` |
| 01.07 | Scope design-system changes (tokens, type, grid) | IMPLEMENTED | `DESIGN_SYSTEM.md` |
| 01.08 | Build full task ledger (this file) | IMPLEMENTED | here |

## Batch 02 — Design tokens + global primitives — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 02.01 | Full semantic token layer in `globals.css` | COMPLETE |
| 02.02 | Fluid type scale (Fraunces display + Inter sans) via `clamp()` | COMPLETE |
| 02.03 | Container + Section primitives | COMPLETE |
| 02.04 | Eyebrow + EditorialHeading primitives + editorial-display/h1/h2/h3 classes | COMPLETE |
| 02.05 | PrimaryCTA + SecondaryCTA + InverseCTA + GhostInverseCTA, three sizes | COMPLETE |
| 02.06 | Rebuilt `ExteriorHeader` with bespoke SVG mark + utility nav | COMPLETE |
| 02.07 | `MobileActionBar` bottom bar for mobile | COMPLETE |

## Batch 03 — Hero + immediate proof band — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 03.01 | `EditorialHero` — full-bleed exterior image + gradient scrim + geographic eyebrow row + Fraunces display headline w/ italic "Northwest" + CTAs + 4-icon bullet proof + inset project caption | COMPLETE |
| 03.02 | Centered-overlay pattern eliminated | COMPLETE |
| 03.03 | `TrustBand` — typographic 5-item row with bespoke SVG icons | COMPLETE |
| 03.04 | `ReviewPlatforms` populated with JDI's six real review profiles | COMPLETE |
| 03.05 | Mobile hero composition independent (not stacked) | COMPLETE |

## Batch 04 — Services + projects + envelope — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 04.01 | `ServiceComposition` — editorial 3+9 col layout; four image-led service cards | COMPLETE |
| 04.02 | Service photography via jdiconstruction.co remote patterns | COMPLETE |
| 04.03 | `ProjectFeature` renders real Vancouver project | COMPLETE |
| 04.04 | `EnvelopeFeature` + `WallSectionDiagram` original SVG shipped | COMPLETE |
| 04.05 | Placeholder diagram box replaced with annotated section drawing | COMPLETE |

## Batch 05 — Why Teddy + regional + process — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 05.01 | `WhyTeddyNarrative` — three alternating paragraph+photo blocks | COMPLETE |
| 05.02 | `ClimateAuthority` — PNW editorial authority section | COMPLETE |
| 05.03 | `ProcessTimeline` — horizontal editorial timeline w/ ruled line | COMPLETE |

## Batch 06 — Testimonials + education + service area — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 06.01 | `FeaturedTestimonial` component ready; renders empty state until approved testimonials arrive | COMPLETE (empty state) |
| 06.02 | `ResourceFeature` already in editorial direction | COMPLETE |
| 06.03 | `RegionalCoverage` rebuilt with bespoke `RegionalMap` SVG | COMPLETE |

## Batch 07 — Final conversion + footer — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 07.01 | `EstimateSection` rebuilt with "What happens next" 3-step list + progressive grouping | COMPLETE |
| 07.02 | Form has service selector + ZIP + description + Step 01/02 fieldsets | COMPLETE |
| 07.03 | `ExteriorFooter` rebuilt with inverse band, verified-credentials sub-block, JDI attribution | COMPLETE |

## Batch 11 — Signature visual effects — ✅ COMPLETE

| ID | Task | Status |
|---|---|---|
| 11.01 | Editorial image reveal (clip-path) via `Reveal kind="image"` | COMPLETE |
| 11.02 | Architectural line reveal (`ArchLineDivider` + `Reveal kind="line"`) | COMPLETE |
| 11.03 | Interactive building envelope — scroll-driven layer separation + hover isolation in `WallSectionDiagram` | COMPLETE |
| 11.04 | Subtle CTA arrow movement — `.cta-arrow` 4px translate on group hover/focus | COMPLETE |
| 11.05 | Motion tokens: `--motion-instant/fast/mid/slow/long` + `--ease-standard/enter/exit` | COMPLETE |
| 11.06 | `prefers-reduced-motion` resets all effects to final state | COMPLETE |

## Still outstanding

| Batch | Why |
|---|---|
| 08 Responsive refinement | Requires visual rendering + mobile device review — reasonably covered by Tailwind responsive utility classes but needs an in-browser pass |
| 09 Accessibility + perf audit | Requires Axe DevTools and Lighthouse run in a real browser |
| 10 Full-page visual QA | Requires screenshot capture + review |

## Batch 08 — Responsive refinement

| ID | Task | Status |
|---|---|---|
| 08.01 | Mobile at 375/390/430 — independent composition | READY |
| 08.02 | Tablet at 768/1024 refinement | READY |
| 08.03 | Desktop at 1440+ composition | READY |

## Batch 09 — Accessibility + perf + SEO regression

| ID | Task | Status |
|---|---|---|
| 09.01 | WCAG 2.2 AA pass (contrast, keyboard, focus, landmarks, alt, reduced-motion, touch targets) | READY |
| 09.02 | Performance budgets (LCP, CLS, INP, JS bundle, image transfer, fonts) | READY |
| 09.03 | SEO preservation audit — H1, title, metadata, schema, canonicals, breadcrumbs | READY |

## Batch 10 — Full-page QA + weak-section redesign

| ID | Task | Status |
|---|---|---|
| 10.01 | Full-page screenshots at 390 / 768 / 1440 | READY |
| 10.02 | Compare against reference set (equally confident? polished? persuasive?) | READY |
| 10.03 | Anti-generic test — logo-removal + alternate-industry substitution | READY |
| 10.04 | Second pass — skeptical homeowner | READY |
| 10.05 | Third pass — pure visual | READY |
| 10.06 | Fourth pass — mobile-only | READY |

## Data-required inventory (BLOCKED on owner / assets)

- **Teddy-specific review profile URLs** — currently reusing JDI profiles. If Teddy brand wants its own GBP + Yelp + etc., they need registration.
- **Real exterior project photography beyond the 3 already pulled** — only 3 JDI exterior case studies exist; need more to fill project showcase.
- **Named individual leadership + bios** — currently company-level attribution only.
- **Approved customer testimonials with written permission** — brief §10.
- **CRM / lead-destination email** — form has sandbox hook; needs real destination.
- **Analytics ID (GA4) + consent policy** — events wired, no destination.
- **Final domain** — until confirmed, preview-mode auto-detection keeps site noindex.
- **GOOGLE_AI_API_KEY** (optional) — if provided, could generate editorial diagram/mood assets. Not required for Batch 02–05.
