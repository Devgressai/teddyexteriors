# Art Direction

Required gate per master brief §14A. Must be substantially complete **before** scaling page production. Build one resolved homepage + representative service / city-service / project / resource pages, inspect them in `DESIGN_QA.md`, then propagate.

## Design thesis

**Grounded, specific, confidently built.** The visual language should feel like a crew that actually works on PNW houses — not a SaaS landing page tinted green. Credibility comes from showing exterior details, materials at close range, and jobsite reality. Trust comes from legible credentials and real people.

The site is **evidence-forward**:
- Real houses carry the hero scale.
- Material close-ups and installation details carry the technical sections.
- Named team and city hubs carry the local relevance.

Avoid: generic mountain silhouettes, fir-tree icons, rain animations, log-cabin typography, lifestyle stock, animated hero loops, "customer avatars."

## Palette

See `BRAND_REFERENCE.md`. Core moves:

- **Warm off-white** (`#FCFAF8`) is the default page surface — not stark white.
- **Deep brand green** (`#1E3D2A`) is reserved for a few deliberate inverse moments: brand opener, CTA band, credential section, footer. Overuse flattens its effect.
- **Primary accent** (`#50A747`) appears in small graphic marks, keylines, and large-type treatments where contrast permits. Not a button fill for small text.
- **CTA fill** (`#347A2E`) is the accessible-contrast variant for buttons / small links.

## Typography

Working stack: **Inter** (default from Next scaffolding) as a safe starting pair. Owner may supply a licensed display pair after review.

Scale (16px base):

| Role | Size | Line-height | Weight |
|---|---|---|---|
| Display (hero) | 48–72px | 1.05 | 600 |
| H1 (page) | 36–44px | 1.15 | 600 |
| H2 (section) | 28–32px | 1.2 | 600 |
| H3 (block) | 20–22px | 1.3 | 600 |
| Body | 17px | 1.6 | 400 |
| Small / meta | 14px | 1.5 | 500 |
| Button | 16px | 1 | 600 |

Rules:
- Body line length 60–72 characters.
- Avoid all-caps outside small-meta labels and credential badges.
- Headlines carry type weight, not drop shadows or glow.

## Image treatment

- **Hero:** one exterior image at full-bleed or dominant-column scale. Composed, not centered-and-vignetted.
- **Project features:** large lead image + facts; the work dominates the composition.
- **Material details:** close-crop photography (lap profiles, flashing, trim seams, drainage) or precise original SVG. Never generic icon tiles.
- Images are warm-toned, naturally lit, and horizontally composed where possible.
- **No AI-generated worksite / customer imagery** anywhere on the site (brief §14).

## Layout grid

- 12-column base at ≥1024px; 8-column at tablet; 4-column at mobile.
- Max content width: 1200px. Narrative text constrained to ~640px within.
- Section gutter: 24–32px at mobile, 48–64px at desktop.
- Vertical rhythm: multiples of 8px.

## Spacing rhythm

- Section vertical padding: 64px mobile / 96–128px desktop (varies by density).
- Component internal padding scales: xs 8, sm 12, md 16, lg 24, xl 32, 2xl 48.
- Never equal padding above/below in a section if the content weight differs — compose asymmetrically.

## Section transitions

- Alternate `--surface-warm` and `--surface-paper` for calmer transitions.
- Reserve `--surface-inverse` for peak-emphasis moments (opener, credentials, CTA band).
- Avoid the "white → three cards → tinted → three cards" pattern (brief §14C). Vary image scale, grid proportion, and content density between sections.

## Interaction principles

- **Motion is feedback.** Hover, focus, and reveal are allowed; scroll-triggered animation is not.
- Transition timing: 150ms (micro), 220ms (small reveal), 320ms (section). Easing: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Reduced-motion users get instant transitions (handled in `globals.css`).
- Content and primary CTA are usable without JavaScript.
- Focus-visible rings are `--cta-fill` 2px with 2px offset — never removed.

## Custom component inventory (brief §14B)

Build in `src/components/exterior/` with semantic names, typed variants, documented content rules, and responsive behavior. **Each must be designed, not stock.**

1. `ExteriorHeader` — logo scale, contact/credential bar, nav, restrained sticky
2. `ExteriorHero` — composed exterior image + headline + CTA + geographic context + proof
3. `CredentialRail` — typographic WA L&I + OR CCB presentation
4. `ServiceExplorer` — image-led service nav with purposeful emphasis variation
5. `ProjectFeature` — large lead image + facts + scope + case-study link
6. `BeforeAfter` — accessible comparison w/ keyboard controls + static fallback
7. `EnvelopeDetail` — SVG or annotated detail photography (siding/flashing/WRB/drainage)
8. `MaterialCompare` — legible comparison surface + real material textures
9. `RegionalCoverage` — Vancouver/Portland composition + validated map + text alternative
10. `ProcessStory` — sequential explanation with imagery and typographic ordering
11. `TeamProof` — real people + roles + accountable process
12. `ResourceFeature` — editorial nav with one guide prominent
13. `EstimateSection` — form + concise expectations + contact alternatives + states
14. `ExteriorFooter` — credentials + navigation + contact + restrained coverage

Showcase route: `/_showcase/` (noindexed, not in sitemap, not linked in production nav). Realistic long/short copy, missing-image states, validation states, focus states, mobile examples.

## Composition sketches (iterate in Figma or in-code)

- **Hero:** 60/40 split — image left, headline/CTA right. On mobile: image fullwidth with 1.33:1 ratio, headline below.
- **Service explorer:** 1 lead service + 4 supporting. Lead gets a project photo at 16:9, supporting are 4:3.
- **Credential rail:** inline, typographic, under the hero. No icons.
- **Project feature band:** full-bleed `--surface-paper`; image at 16:9; facts in a 3-column list below with `--text-secondary` labels.
- **Envelope detail:** `--surface-inverse` band; SVG at 480px wide; annotation callouts in `--text-inverse`.
- **Coverage:** map on left (validated static image), city/county list on right.
- **CTA band:** `--surface-inverse` short section before footer; one line of copy + one button.

## Breakpoints

- `360`, `390`, `768`, `1024`, `1280`, `1440`.
- Mobile is composed independently (brief §14D), not stacked columns.

## Open design decisions

Logged here, resolved in `DECISIONS.md` when settled:

- Display typeface (Inter default or owner-licensed pair)
- Logo final form + lockup
- Secondary accent (none unless owner supplies)
- Icon system (bespoke SVG vs licensed icon pack — leaning bespoke / minimal)
