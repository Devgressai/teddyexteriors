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

## Batch 02 — Design tokens + global primitives

| ID | Task | Status | Affected |
|---|---|---|---|
| 02.01 | Expand `globals.css` with full semantic token layer (primary evergreen, secondary evergreen, deep ink, warm bone, soft stone, pure white, cedar/brass, mist) | READY | `src/app/globals.css` |
| 02.02 | Fluid responsive type scale via `clamp()`; 12 roles (display → navigation) | READY | `src/app/globals.css` |
| 02.03 | Container + Section + SectionHeader primitives | READY | `src/components/primitives/*` |
| 02.04 | Eyebrow + EditorialHeading + Caption primitives | READY | `src/components/primitives/*` |
| 02.05 | PrimaryCTA + SecondaryCTA + GhostCTA primitives, three sizes | READY | `src/components/primitives/*` |
| 02.06 | Redesign `ExteriorHeader` with mega-menu Services dropdown + utility bar | READY | `src/components/exterior/ExteriorHeader.tsx` |
| 02.07 | Add bottom mobile call/estimate bar component | READY | `src/components/exterior/MobileActionBar.tsx` |

## Batch 03 — Hero + immediate proof band

| ID | Task | Status |
|---|---|---|
| 03.01 | Editorial asymmetric hero — large architectural image + supporting detail inset + headline + CTAs + micro-proof | READY |
| 03.02 | Replace centered-overlay pattern (banned by mandate) | READY |
| 03.03 | Compact high-density CredentialRail v2 — typographic, not stat cards | READY |
| 03.04 | Multi-platform review band using real JDI profiles | READY |
| 03.05 | Mobile hero composed independently (not stacked columns) | READY |

## Batch 04 — Services + projects + envelope section

| ID | Task | Status |
|---|---|---|
| 04.01 | Editorial service index — large lead service + supporting rail (not icon cards) | READY |
| 04.02 | Material-detail imagery integrated with service presentation | READY |
| 04.03 | Editorial project showcase — large imagery, intentional crops, minimal chrome | READY |
| 04.04 | Elevate envelope-detail section with original SVG diagram | READY |
| 04.05 | Replace generic icon-row inside EnvelopeDetail with annotated section drawing | READY |

## Batch 05 — Why Teddy + regional authority + process

| ID | Task | Status |
|---|---|---|
| 05.01 | Why-Teddy as proof narrative (not six cards) — pair paragraphs with real project detail imagery | READY |
| 05.02 | Distinct PNW climate-authority section (new) | READY |
| 05.03 | Horizontal editorial process timeline with annotated project journey | READY |

## Batch 06 — Testimonials + education + service area

| ID | Task | Status |
|---|---|---|
| 06.01 | Featured homeowner story (one substantial) + 2–3 supporting excerpts | READY (BLOCKED on real approved testimonials) |
| 06.02 | Editorial education module — publication layout, not blog grid | READY |
| 06.03 | Polished service-area section with regional composition | READY |

## Batch 07 — Final conversion + footer

| ID | Task | Status |
|---|---|---|
| 07.01 | High-conviction consultation experience (not "Ready to get started?") | READY |
| 07.02 | Service selector + ZIP + expectation setting in form | READY |
| 07.03 | Authoritative regional contractor footer | READY |

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
