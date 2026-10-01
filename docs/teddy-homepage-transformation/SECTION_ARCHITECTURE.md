# Section Architecture — Teddy homepage, post-transformation

Each section has ONE primary psychological responsibility (mandate §Phase C). Numbered to match the ledger.

## Conversion-state model

```
ARRIVAL           →  §01 Nav / §02 Hero
RELEVANCE         →  §02 Hero
INITIAL TRUST     →  §03 Credential rail
SERVICE FIT       →  §04 Service exploration
VISUAL PROOF      →  §05 Project showcase
TECHNICAL         →  §06 Envelope detail  (differentiator)
WHY TEDDY         →  §07 Why Teddy
LOCAL AUTHORITY   →  §08 PNW climate authority
PROCESS CERTAINTY →  §09 Process timeline
SOCIAL VALIDATION →  §10 Reviews / testimonials
RISK REDUCTION    →  §11 Education / resources
DECISION          →  §12 Service area
CONVERSION        →  §13 Final CTA + form
TRUST ANCHOR      →  §14 Footer
```

## Section specs

### §01 — Navigation
**Visitor state:** arrival
**Visitor question:** "Am I in the right place?"
**Primary action:** scan available services; access phone or estimate
**Transition:** descends into hero

Composition: logo left (bespoke wordmark or SVG), horizontal nav (Services dropdown with mega-menu / Projects / Why Teddy / Service Areas / Resources / About), utility bar above primary (serving line + WA L&I + OR CCB), phone + "Get My Estimate" CTA right. Compact sticky state after 80px scroll.

**Changes from current:** add utility bar; add Services mega-menu; reduce sticky height; higher-contrast phone treatment.

### §02 — Hero
**Visitor state:** 5-second decision
**Visitor question:** "What do you do, where, and why you?"
**Primary action:** engage with CTA or scroll
**Transition:** micro-proof into credential rail

Composition: asymmetric editorial. Primary image (16:11 architectural exterior) occupies **60% left**. Supporting detail image (3:4 vertical — fiber cement texture or flashing detail) **tucked beneath or overlapping right edge**. Right column: eyebrow (small caps, cedar/brass) + display headline (fluid clamp 40–72px, two lines, deep ink) + 60–80 character supporting line + two CTAs (primary filled, secondary ghost with arrow) + inline micro-proof (★ rating / years / warranty — three items, typographic).

**No centered text over a full-bleed image.** No overlay gradient as a crutch.

**Changes from current:** add supporting detail image, add inline micro-proof row, promote headline to editorial display scale, add caption as part of composition (not a lonely figcaption below).

### §03 — Credential rail v2
**Visitor state:** initial trust
**Visitor question:** "Are you legit?"
**Primary action:** scan credentials; optionally click through to verify
**Transition:** into service fit

Composition: tight horizontal band on `--surface-paper`. 4–5 items, pure typography, no boxes. Each item: tiny eyebrow (uppercase 11px, muted) + value (18–20px, deep ink, semibold). Separators are 1px vertical rules on `--border-subtle`. Hover underlines on linkable items.

Items (confirmed data from business config):
1. WA L&I **JDICOCN932KZ** (links to credentials page)
2. OR CCB **176101** (links to credentials page)
3. **5-year workmanship warranty** (links to warranty page)
4. **18 years** building Pacific Northwest exteriors
5. **In-house crews** · Vancouver + Portland

**Changes from current:** add two more items, remove card chrome, tighten vertical rhythm, promote the specific numbers.

### §04 — Service exploration
**Visitor state:** service fit
**Visitor question:** "Do you do the thing I need?"
**Primary action:** click into the service that matches
**Transition:** proof via project showcase

Composition: editorial, **varied geometry** across six services (not a 4-up card grid):
- **Siding replacement (lead)** — large 16:9 image left, headline + body + CTA right. Full-container width.
- **Window replacement** — 50/50 split, image right, text left.
- **Exterior painting** — small detail image 3:4 at left + text wrapping right (editorial float).
- **Trim, soffits, fascia & gutters** — horizontal band, 2:1 aspect wide image + 2-line description.
- **Envelope remediation** — paired with annotated detail photo, small.
- **Whole-exterior renovation** — large, 16:10, text overlay in a corner with safe-area padding.

Each has a visible "Learn more →" link styled as prose, not a button.

**Changes from current:** full redesign; current implementation is 1 lead + 4 thumbs with uniform supporting-row chrome.

### §05 — Project showcase
**Visitor state:** visual proof
**Visitor question:** "Have you actually done this before?"
**Primary action:** click into a case study
**Transition:** technical competence

Composition: one featured project with **large 16:9 after-shot** at full-container width. Below, 3-column grid of facts (Challenge / Scope / Finish). To the right of the image, metadata: city, state, services, completion date, slug link ("See the full case study →").

If a before/after is available for the featured project, add a BeforeAfter slider as a secondary block beneath. Otherwise, link to the project page's gallery.

Below the featured project, a **small 3-up editorial grid** of other projects (title + city + 4:3 thumbnail).

**Changes from current:** current ProjectFeature is left-right split. Transformation gives the image full width (editorial scale) and makes the metadata typographic rather than DL-labeled.

### §06 — Envelope detail (differentiator)
**Visitor state:** technical competence
**Visitor question:** "Do you actually know what you're doing?"
**Primary action:** absorb; link into envelope service
**Transition:** into "why Teddy"

Composition: **`--surface-inverse` (deep brand green) band.** Left: eyebrow + large headline + intro + five annotated points with cedar/brass accent rules. Right: **original SVG wall-section drawing** showing:
- Finish layer (siding)
- Fastening + air gap (rainscreen where applicable)
- WRB (house wrap)
- Taped seams
- Pan + head flashing at an opening
- Kickout flashing at a roof-wall intersection
- Deck ledger detail

Labels on the SVG, callouts to the five written points.

**Changes from current:** replace the "Wall-section SVG / annotated installation photo" placeholder box with an actual drawing. This is the single highest-leverage visual change on the page.

### §07 — Why Teddy
**Visitor state:** differentiation
**Visitor question:** "What makes you different from the next guy's bid?"
**Primary action:** absorb; begin to picture working together
**Transition:** into local authority

Composition: proof narrative. Three paragraphs, each paired with a real jobsite photograph (installation detail, crew moment, finish close-up). Layout alternates image-left / image-right. Topics:
1. **Written scope + change orders in writing** — never a surprise invoice.
2. **In-house crews, 18 years in Pacific Northwest** — same hands, every project.
3. **Envelope-first, finish second** — the walls behind the siding get as much attention as the siding itself.

**No six cards.** No icons.

### §08 — Pacific Northwest climate authority
**Visitor state:** local relevance
**Visitor question:** "Do you understand MY climate / MY house?"
**Primary action:** absorb; link into relevant resource
**Transition:** into process

Composition: editorial two-column prose block. Left: short regional essay on moisture, overcast light, Douglas fir and cedar, 40-inch rainfall, drizzle intrusion, building code specifics. Right: small environmental imagery (overcast Vancouver street, Douglas fir detail, PNW craftsman home — no fir-tree icons or mountain silhouettes). Mid-column: a boxed sidebar with 3 "Our rules for building here" items.

**Changes from current:** this section does not exist. Must be built.

### §09 — Process timeline
**Visitor state:** process certainty
**Visitor question:** "What's actually going to happen if I hire you?"
**Primary action:** absorb; reduce anxiety
**Transition:** into social validation

Composition: **horizontal editorial timeline** (not numbered cards). A connected ruled line runs across the viewport. Four waypoints each pair a step number (eyebrow typography) + title + 1-sentence description + optional 1:1 jobsite photo. On mobile: becomes vertical with the ruled line turning 90°.

Four steps:
1. Walk the exterior with us
2. Review the written scope
3. Build with in-house crews
4. Finish walk + warranty record

**Changes from current:** replace the 4-column numbered-card grid with a timeline + rule.

### §10 — Social validation
**Visitor state:** social proof
**Visitor question:** "What do other homeowners say?"
**Primary action:** scan review quotes, click through to verify
**Transition:** into risk reduction

Composition: **one substantial featured testimonial** (quote 60–100 words + attribution + location + platform badge) on `--surface-paper`. Below: **ReviewPlatforms** component (typographic row of 6 real JDI review profiles — no fake aggregate). To the right of the featured quote: a small "see all reviews" link + the specific platform the quote came from.

**Changes from current:** TeamProof is empty on homepage; current ReviewPlatforms is populated but needs a featured quote lead.

### §11 — Education / resources
**Visitor state:** risk reduction
**Visitor question:** "Will I know enough to make a good decision?"
**Primary action:** scan guide titles; click one
**Transition:** into service area

Composition: editorial magazine spread. One featured guide (large image + eyebrow + headline + 2-line summary + "read" link). Three supporting guides below in a tight 3-up row (eyebrow + title + one-line summary, no images, just typography). Reviewer attribution on each.

**Changes from current:** current ResourceFeature already in this direction; refine typography and add reviewer attribution.

### §12 — Service area
**Visitor state:** decision confidence
**Visitor question:** "Do you actually serve my address?"
**Primary action:** verify coverage; find my city
**Transition:** into final CTA

Composition: two-column. Left: eyebrow + headline + intro + "send us your city/ZIP" nudge. Right: lightweight **custom SVG regional outline** (Clark County WA + Multnomah/Washington/Clackamas OR, with current office pins at Vancouver + Portland). Below both columns: 2-up state hub list (WA cities / OR cities), typographic.

**Changes from current:** current RegionalCoverage is text-only; add a lightweight custom SVG regional outline.

### §13 — Final CTA + form
**Visitor state:** conversion
**Visitor question:** "What happens if I fill this out?"
**Primary action:** submit the form or call
**Transition:** into footer

Composition: `--surface-inverse` band. Left: large editorial headline ("Let's walk your exterior together.") + supporting copy on actual process + inline expectation setting ("a person reads every request") + visible phone + brass accent rule. Right: form with 5 fields (name, email or phone, city or ZIP, service, project description) + progress indication + privacy note. **No fake response commitment** until owner confirms real response time.

**Changes from current:** better editorial headline; progress-friendly form grouping; more deliberate type scale on green.

### §14 — Footer
**Visitor state:** trust anchor
**Visitor question:** "Can I find more information or verify them?"
**Primary action:** scan footer links; close tab or come back later
**Transition:** end

Composition: three-column + bottom bar. Column 1: brand + statement + verified contact (phone/email/hours) + both credential numbers with verification URLs. Column 2: services + service areas (not every city — just state hubs + 5 priority cities each). Column 3: about + credentials + warranty + reviews + resources. Bottom bar: policies + © line + "Site by webvello.com" per standing rule.

**Changes from current:** add state-level grouping to service areas, promote credential URLs, verify webvello attribution requirement.
