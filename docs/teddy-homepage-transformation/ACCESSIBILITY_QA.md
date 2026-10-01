# Accessibility QA

Target: WCAG 2.2 AA. Populate during Batch 09.

## Protocol

1. Axe DevTools or equivalent automated sweep.
2. Keyboard walk-through — Tab through every interactive element from top to bottom. Note any trap or skip.
3. Screen-reader walkthrough on home + estimate form (VoiceOver on macOS or NVDA on Windows).
4. 200% zoom test.
5. Reduced-motion preference verified.
6. Color-contrast spot checks on every component with text-on-color.

## Automated issues

| Rule | Impact | Element | Status | Fix |
|---|---|---|---|---|

## Keyboard walkthrough

Checklist per section:

- [ ] Nav items reachable via Tab
- [ ] Dropdown opens via Enter / Space
- [ ] Dropdown closes via Escape
- [ ] Skip-to-content link visible on first Tab
- [ ] Logo returns to home
- [ ] Hero CTAs reachable
- [ ] Service cards reachable
- [ ] Project link reachable
- [ ] Envelope detail links reachable
- [ ] Review platform links reachable (open in new tab + visually indicate)
- [ ] FAQ list reachable (no accordion traps if accordions are used)
- [ ] Form fields reachable in logical order
- [ ] Form errors announced
- [ ] Form submit button reachable
- [ ] Footer links reachable
- [ ] Mobile menu reachable + closeable

## Semantic landmarks

- [ ] `<main>` present and exclusive
- [ ] `<nav>` present with aria-label where multiple nav regions exist
- [ ] `<header>` + `<footer>` as site-level, not nested
- [ ] `<article>` on project / resource detail pages
- [ ] Heading hierarchy valid (one `<h1>` per page, no skipped levels)

## Contrast spot checks

Each new color pair verified in Batch 02 should re-verify at homepage render time with real content and image overlays.

## Reduced-motion

- [ ] All motion-driven reveals disabled under `prefers-reduced-motion: reduce`
- [ ] Essential animation (focus ring appearance, hover color) remains

## Touch targets

- [ ] Nav links ≥ 44px tap height
- [ ] CTA buttons ≥ 44px
- [ ] Form fields ≥ 44px
- [ ] Mobile action bar buttons ≥ 44px
- [ ] Footer links ≥ 44px vertical spacing between

## Images / alt text

- [ ] Every image has alt text (empty alt only when strictly decorative)
- [ ] Project photos include city/state in alt
- [ ] Material close-ups describe material and treatment
- [ ] SVG diagram has `<title>` + `<desc>` + role=img
