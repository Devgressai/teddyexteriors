# Component Inventory

Current + planned components for the homepage transformation.

## Current (keep, refactor, or retire)

| Component | File | Status | Action |
|---|---|---|---|
| `ExteriorHeader` | `exterior/ExteriorHeader.tsx` | REFACTOR | Add utility bar + Services mega-menu, higher phone contrast |
| `ExteriorHero` | `exterior/ExteriorHero.tsx` | REFACTOR | Add supporting detail image, inline micro-proof row, editorial caption |
| `CredentialRail` | `exterior/CredentialRail.tsx` | REFACTOR | Remove card chrome, tighten typography, support 4–5 items |
| `ServiceExplorer` | `exterior/ServiceExplorer.tsx` | RETIRE | Replace with ServiceComposition (varied geometry) |
| `ProjectFeature` | `exterior/ProjectFeature.tsx` | REFACTOR | Full-container image, typographic metadata (no DL) |
| `BeforeAfter` | `exterior/BeforeAfter.tsx` | KEEP | Already accessible slider; use when photos align |
| `EnvelopeDetail` | `exterior/EnvelopeDetail.tsx` | REFACTOR | Replace placeholder with real SVG wall-section diagram |
| `MaterialCompare` | `exterior/MaterialCompare.tsx` | REFACTOR | Varied aspect ratios, per-material close-up photography slot |
| `RegionalCoverage` | `exterior/RegionalCoverage.tsx` | REFACTOR | Add lightweight custom SVG regional outline |
| `ProcessStory` | `exterior/ProcessStory.tsx` | RETIRE | Replace with ProcessTimeline (horizontal editorial, not cards) |
| `TeamProof` | `exterior/TeamProof.tsx` | REFACTOR | Pivot into "Why Teddy" proof narrative |
| `ResourceFeature` | `exterior/ResourceFeature.tsx` | KEEP | Already editorial direction; refine typography + reviewer line |
| `ExteriorFaq` | `exterior/ExteriorFaq.tsx` | REFACTOR | Add numbered annotations + italic question treatment |
| `ReviewPlatforms` | `exterior/ReviewPlatforms.tsx` | KEEP | Compact typographic row works |
| `EstimateSection` | `exterior/EstimateSection.tsx` | REFACTOR | Progressive field grouping, better field styling on green |
| `ExteriorFooter` | `exterior/ExteriorFooter.tsx` | REFACTOR | State-level grouping, promote credential verification URLs |
| `PageShell` | `components/PageShell.tsx` | KEEP | Interior-page shell |
| `JsonLd` | `components/JsonLd.tsx` | KEEP | |
| `SampleBanner` | `components/SampleBanner.tsx` | KEEP | Still used by cost-guide sample |

## Planned additions (Batch 02–07)

| Component | Location | Purpose |
|---|---|---|
| `Container` | `primitives/Container.tsx` | Centered container with configurable width token |
| `Section` | `primitives/Section.tsx` | Semantic `<section>` with surface + padding tokens |
| `SectionHeader` | `primitives/SectionHeader.tsx` | Eyebrow + heading + optional intro + optional link |
| `Eyebrow` | `primitives/Eyebrow.tsx` | Cedar/brass uppercase label |
| `EditorialHeading` | `primitives/EditorialHeading.tsx` | Fluid Fraunces display / H1 / H2 |
| `PrimaryCTA` / `SecondaryCTA` / `GhostCTA` | `primitives/CTA.tsx` | Three CTA variants, three sizes |
| `TrustInline` | `primitives/TrustInline.tsx` | Inline typographic trust row (used in hero) |
| `ServiceComposition` | `exterior/ServiceComposition.tsx` | Replaces ServiceExplorer — varied geometry |
| `ProjectShowcase` | `exterior/ProjectShowcase.tsx` | Full-container editorial project module |
| `WallSectionDiagram` | `exterior/WallSectionDiagram.tsx` | **Custom SVG** — wall section with WRB, flashing, kickout, pan |
| `WhyTeddyNarrative` | `exterior/WhyTeddyNarrative.tsx` | Three alternating paragraph + image proof blocks |
| `ClimateAuthority` | `exterior/ClimateAuthority.tsx` | PNW editorial authority section (NEW) |
| `ProcessTimeline` | `exterior/ProcessTimeline.tsx` | Horizontal editorial timeline w/ ruled line |
| `FeaturedTestimonial` | `exterior/FeaturedTestimonial.tsx` | One substantial homeowner story + attribution |
| `RegionalMap` | `exterior/RegionalMap.tsx` | Custom SVG WA/OR outline with office pins |
| `MobileActionBar` | `exterior/MobileActionBar.tsx` | Bottom call/estimate bar on mobile |

## Retiring

- `ServiceExplorer` → replaced by `ServiceComposition`
- `ProcessStory` → replaced by `ProcessTimeline`

Delete these files only after all consumers are migrated to the replacements. Keep slug/route stability intact.

## Component API conventions

- Server components by default; `"use client"` only for genuine interaction (BeforeAfter slider, mobile menu toggle, lead form).
- All text content comes in via props (never hard-coded strings inside the component body) so page-level composition can override.
- Images come in as `ImageAsset` from content-model types.
- Accessibility: visible focus always, no `aria-hidden` on anything with meaning, buttons use `<button>` or `<a>` (never `<div onclick>`).
- Variants are typed unions, not boolean flags that compound.
