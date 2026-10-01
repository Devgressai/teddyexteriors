# Design Audit — Current Teddy Homepage (2026-10-01)

Snapshot taken immediately before the transformation batches begin. The audit evaluates the implementation at commit `716c505` against the mandate's "anti-generic" and "non-AI-looking" standards.

## 1. Technical state (what to keep)

Solid:

- **Stack**: Next 16.3.8 App Router + React 19 + TypeScript strict + Tailwind v4 + MDX. Pure SSG. Production-grade foundation.
- **Business-config validation gate** with preview-mode auto-detection. Prevents fabricated facts from shipping.
- **Content model + registry** with finite-allowlist dynamic routes. Clean separation of data and templates.
- **One business `@id` across city pages** (§12 invariant). No per-city LocalBusiness fabrication.
- **MDX soft-load** fallback. Missing content doesn't crash.
- **Semantic JSON-LD builders** (LocalBusiness / Service / Article / FAQ / Video).
- **Sitemap + robots** manifest-driven; samples excluded.
- **Security headers** wired.
- **Server-side lead form** with per-IP rate limit, honeypot, server validation, no-PII logging.
- **Confirmed business facts**: WA L&I JDICOCN932KZ, OR CCB 176101, phone (360) 309-9571, Vancouver office, 5-year warranty, 11 service-area cities, 6 confirmed services, 4 materials, 3 real projects.

Keep all of the above untouched during the transformation.

## 2. Visual state — what fails the "doesn't look AI-generated" test

### 2.1 Hero (`ExteriorHero.tsx`)

The current composition is **60/40 split, image right, headline left**. It does not use the centered-overlay anti-pattern — good. But:

- **The headline is 48–72px standard sans-serif.** Confident but anonymous. Could be any home-services brand.
- **Supporting copy and CTAs sit in a vertical stack** below the headline. Predictable rhythm.
- **The hero image uses `aspect-[4/3] lg:aspect-[16/11]`** — a safe, boring ratio. Editorial sites use less common ratios (3:5 verticals paired with 5:3 horizontals, offset insets, half-bleeds).
- **No supporting detail image.** GVD, Cobex, and US Quality all pair the hero image with secondary material / detail shots. The current hero has one image, which flattens the composition.
- **The caption is good** (city · material · scope) but visually weak — small gray text under the image. It's a signature move; it needs more deliberate typography.

**Verdict:** passes the base task (what/where/why/next) but the composition is template-grade, not editorial. Must be rebuilt.

### 2.2 CredentialRail

- Four columns, each with eyebrow + value. Typographic, not stat cards — correct direction.
- But rendering is **cold and symmetric** — the four items look interchangeable.
- The mandate says proof should feel "high-density" and "elegant." Current implementation is low-density and competent.

**Verdict:** correct instinct, insufficient commitment. Needs a tighter composition and more intentional typographic hierarchy.

### 2.3 ServiceExplorer

- Lead service left (16:10 image), 4 supporting on the right with 24×24 thumbnails + short descriptions.
- Honest about variation (one lead vs supporting) — correct direction per mandate.
- But the **supporting entries are 112px square thumbnails + 3-line descriptions** — this is close to an icon-card grid, just with photos. Not editorial enough.
- **No material-detail imagery** integrated with the service presentation.

**Verdict:** structurally correct, visually generic. Needs editorial band treatment, different aspect ratios per service, deliberate image crops.

### 2.4 ProjectFeature

- 2/3 image, 1/3 facts. Correct ratio.
- Only renders when a Vancouver project exists. Three real projects registered.
- Facts shown as DL list (The challenge / The work / The finish) — good narrative structure.
- But: **project caption typography is weak**; the three dt labels compete rather than lead.
- No before/after on homepage despite the slider component existing.
- Minimal chrome — correct.

**Verdict:** respectable but underpowered. Needs more scale, better typographic rhythm, and an obvious case-study link.

### 2.5 EnvelopeDetail

- Inverse-color (deep green) section with left copy / right placeholder.
- Right side currently reads: `"Wall-section SVG / annotated installation photo"` — **a placeholder box in production code.** This is one of Teddy's strongest differentiators per the mandate; it cannot ship as a gray box.
- Five labeled points on the left — correct editorial pattern.
- Related-guide links at the bottom.

**Verdict:** the section's framing is excellent (water-is-the-enemy, five envelope points). The diagram absence is the biggest single visual gap on the current homepage.

### 2.6 MaterialCompare

- 3-column grid (sm:2, lg:3) with image + product + 3-line DL.
- Image recycled across all four materials — JDI's hero image repurposed. **This is wrong** — materials need their own close-up photography.
- Decent layout. Grid is uniform; the mandate warns against repetitive card grids.

**Verdict:** passable structure, bad imagery. Needs per-material close-up photography (fiber cement texture, cedar grain, LP SmartSide pattern, vinyl profile).

### 2.7 RegionalCoverage

- Two-column (map-less version) city list.
- City names link to city hubs. Correct.
- But: **no map imagery**, **no project pins**, **no PNW visual** at all. The section is text-only on a warm background.

**Verdict:** functional, visually inert. Needs a regional-presence visual.

### 2.8 ProcessStory

- 4-column numbered timeline. "01 → 04" with title + description.
- No images. The mandate explicitly says "avoid four generic numbered cards."
- Correct narrative content; wrong presentation.

**Verdict:** the exact pattern the mandate forbids. Must become a horizontal editorial timeline with real jobsite / installation imagery.

### 2.9 TeamProof

- Two-column layout: left (heading + intro + people list + "Meet the team" link), right (testimonials).
- Both lists are empty (no people registered, no testimonials). Section renders mostly whitespace.

**Verdict:** fine when real content exists; currently a hole. Needs either real content or clean removal from the homepage.

### 2.10 ResourceFeature

- Lead guide + 3 supporting. Correct editorial pattern.
- Lead has 16:9 image, supporting are text-only.
- Honest editorial direction. Needs stronger magazine-grade typography and a visible author/reviewer line.

**Verdict:** strongest "non-generic" section currently on the page. Keep the pattern; refine the typography.

### 2.11 ExteriorFaq

- Just added; two-column DL with accent border-left per item.
- Semantic HTML, server-rendered answers, FAQPage JSON-LD. Correct.
- Visually clean but could use more editorial character (number annotations? italic question? call-out highlights?).

**Verdict:** good start, could be stronger.

### 2.12 EstimateSection

- Inverse-color (deep green) section, right-side form.
- Form fields are white/10 opacity rounded inputs on green — contrast is marginal.
- Honeypot + rate limit + validation + sandbox destination — correct backend.
- Headline + supporting copy are generic.

**Verdict:** backend solid, visual sophistication low. Needs real urgency without aggression, better field styling, more deliberate layout.

### 2.13 ExteriorFooter

- Four columns. Brand + statement + contact on left, services + areas + trust on right.
- Policies in a thin bottom bar.
- Clean but spare.

**Verdict:** acceptable scaffold; needs typographic authority to feel like an established regional contractor.

## 3. The "logo-removal" test

Hide the "Teddy Exteriors" wordmark. Does the current homepage still read as **Pacific Northwest exterior remodeling**?

- Hero: a house photo + headline about Northwest weather — passes weakly (headline carries it).
- Credential rail: WA + OR credential labels — passes.
- Services: siding / windows / painting — any home-services brand.
- Project: Vancouver, WA label — passes.
- Envelope: "Water is the enemy" + 40-inch rain stat — **strongest passing section.**
- Materials: generic fiber-cement comparisons — fails.
- Coverage: WA + OR city lists — passes weakly.
- Process: generic 4-step — fails hard.
- FAQ: PNW-specific questions — passes.

**Score:** 4 pass, 2 pass weakly, 3 fail. The envelope section and FAQ carry the regional specificity. Everything else is replaceable by any mid-tier home-services brand.

## 4. The "alternate-industry" test

Replace "siding" with "legal services" or "dental care." Would 70% of the page still work with just copy swaps?

Hero: **yes.** Credential rail: **yes.** Services: **yes.** Project feature: **mostly yes** (change images). Envelope: **no** (unique to construction). Materials: **no.** Coverage: **yes.** Process: **yes.** Reviews: **yes.** FAQ: **yes.** Final CTA: **yes.**

**Score:** 8 of 11 sections survive a context switch. The design is **currently too generic.** The mandate's criterion fails.

## 5. Verdict

The current implementation is **structurally sound and factually honest** but **visually templated**. It passes the "not fabricated" and "accessible" bars; it fails the "distinctive PNW exterior brand" bar.

The three biggest single wins available:

1. **A real envelope-detail SVG diagram** (replaces the biggest placeholder on the page).
2. **An editorial hero** — ratio, imagery pairing, type weight, caption treatment.
3. **A redesigned process section** that is not four numbered cards.

Secondary wins:

4. Per-material close-up photography.
5. Regional map with service footprint.
6. A better case-study presentation on the project feature.
7. Service presentation with varied aspect ratios and material-detail imagery.
