# Design QA

Design acceptance evidence per master brief §14E. Populated during the design gate review — not before.

## Required artifacts

Full-page screenshots at desktop (1440px) **and** mobile (390px) for:

- [ ] `/` (home)
- [ ] `/services/{sample}/` (one representative service)
- [ ] `/service-areas/{state}/{city}/{service}/` (one representative city/service)
- [ ] `/projects/{sample}/` (one representative project)
- [ ] `/resources/{topic}/{guide}/` (one representative guide)

Review the **complete scroll**, not just the hero.

## Pass criteria

- [ ] Palette provenance documented (`BRAND_REFERENCE.md`) and site recognizably follows the JDI color family
- [ ] Major sections bespoke with purposeful composition and useful content
- [ ] Consistent visual system across page families, no repetitive card-grid rhythm
- [ ] Real imagery/content gives credible Vancouver/Portland identity
- [ ] Typography, spacing, image crops, controls, alignment coherent across families
- [ ] Mobile composition deliberately designed; every main action accessible
- [ ] Content depth, source links, breadcrumbs, conversions integrated naturally
- [ ] Interaction states, keyboard access, contrast, reduced motion, performance verified
- [ ] No default library skin, SaaS dashboard styling, generic gradient hero, placeholder icon grid, fake proof, or unfinished stock section

If any page looks like a template recolored for a contractor → revise hierarchy / imagery / composition / detailing before release.

## Defects log

(Empty — add rows as reviews happen)

| Date | Route | Breakpoint | Defect | Severity | Fix | Verified |
|---|---|---|---|---|---|---|

## Accessibility sweep

- [ ] Axe or equivalent run on each template
- [ ] Keyboard walk-through on nav, forms, dialogs, modals
- [ ] Visible focus on all interactive controls
- [ ] 200% zoom test
- [ ] Reduced-motion verified
- [ ] Screen-reader walkthrough on home + estimate form

## Performance sweep (lab)

Record for each template: Lighthouse report ID, LCP, INP, CLS, JS payload, image payload, font payload. Field data (CrUX) will be unavailable at launch for a new domain — disclose, do not fabricate.

| Template | Lighthouse ID | LCP | INP | CLS | JS kB | Img kB | Fonts kB |
|---|---|---|---|---|---|---|---|
