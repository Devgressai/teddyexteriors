# Responsive QA

Test matrix for the four main viewport anchors. Populate during Batch 08.

## Target viewports

| Width | Device class | Rationale |
|---|---|---|
| 375px | iPhone SE / older iPhone | Minimum-viable mobile |
| 390px | iPhone 14 / 15 standard | Most common iPhone width |
| 430px | iPhone Pro Max | Larger mobile |
| 768px | iPad portrait | Tablet |
| 1024px | iPad landscape / small laptop | Narrow desktop |
| 1440px | 15" MacBook standard | Common desktop |
| 1920px+ | Large monitors | Wide desktop (container cap) |

## Mobile-specific checks (not just stacked columns)

For every section, verify at 390px:

- Image focal point is correct (not centered when subject is off-center)
- Headlines break on intended lines (no awkward orphans)
- Hierarchy is preserved (biggest text ≠ decorative text)
- Primary CTA visible without scroll if above fold on desktop
- No horizontal overflow
- No microscopic metadata
- No giant headings occupying first viewport without context
- Touch targets ≥ 44px (links, buttons, form fields)
- Sticky elements don't obscure content, forms, or consent

## Section-by-section mobile composition rules

| Section | Mobile rule |
|---|---|
| Nav | Hamburger menu, prominent phone + estimate CTA bar at bottom |
| Hero | Image stacks above (full-width 4:5), text below. Supporting detail image reflows below primary. CTAs stack. Micro-proof row horizontal scroll if needed |
| Credential rail | Horizontal scroll row OR 2x2 grid — not stacked single-column (too tall) |
| Service composition | Each service becomes a full-width band (image on top, text below). Vary band height per service to retain rhythm |
| Project showcase | Image 16:9 full-width, metadata underneath, facts become 2-column grid |
| Envelope detail | Diagram stacks above copy. Reduce diagram complexity if needed |
| Why Teddy | Image + paragraph stack per block, generous spacing between blocks |
| PNW climate | Prose first, imagery second |
| Process timeline | Vertical with ruled line turning 90° — connected dots on the left, content on the right |
| Testimonials | Featured quote first (full-width), review-platform row scrolls horizontally |
| Resources | Featured stacks above supporting; supporting becomes 3-row list |
| Service area | SVG map stacks above city list; city list becomes 2-column grid |
| Final CTA | Form fields stack full-width; phone CTA sticky at bottom (part of MobileActionBar) |
| Footer | Columns collapse; policies in a 2-row list |

## Results table

| Viewport | Pass/Fail | Notes |
|---|---|---|
| 375 | — | — |
| 390 | — | — |
| 430 | — | — |
| 768 | — | — |
| 1024 | — | — |
| 1440 | — | — |
| 1920 | — | — |
