# Brand Reference

Palette provenance, usage rules, and accessibility notes. Mandated by master brief §14 and clarified in the 2026-09-30 resend.

## Source

- **Reference:** JDI Construction — owner-supplied PDF `Top Home Remodeling Contractor in Portland, OR _ JDI Construction.pdf`, captured 2026-09-30.
- **Inspection scope:** First 3 pages. Vector/text colors extracted; **CSS variables on the live site were not independently inspected** in this round.
- **Owner relationship:** JDI Construction is the owner's existing company. Teddy Exteriors is a new venture by the same owner; brand-color continuity is intentional. (Confirm the exact legal/DBA relationship in `BUSINESS_FACTS.md` before publishing credential claims.)
- **Scope of inheritance:** Colors only. **Do NOT inherit** JDI review totals, company history, interior-project evidence, promotions, or license claims. Teddy Exteriors is an exterior-services brand with its own facts.

## Extracted palette (PDF RGB)

| Semantic role | Hex | Observed in PDF |
|---|---|---|
| Primary brand accent | `#50A747` | Promotion strip, buttons, accents |
| Deep brand green | `#1E3D2A` | Heading / detail green |
| Main text (green-charcoal) | `#2D3D2F` | Body text |
| Secondary text | `#485550` | Muted copy |
| Charcoal | `#232323` | Dark neutral |
| Warm off-white | `#FCFAF8` | Section surface |
| White | `#FFFFFF` | Base + inverse text |
| Cool neutral surface | `#F8F9FA` | Pale neutral |
| Subtle border | `#D4D4D4` | Dividers / neutral |

## Derived (NOT extracted — document source clearly)

| Role | Hex | Reason | Contrast |
|---|---|---|---|
| Accessible filled CTA | `#347A2E` | `#50A747` fails WCAG AA with white small text (~3.02:1). Darkened to pass. | White on `#347A2E` ≈ **5.29:1** (AA for normal text) |

## Contrast calculations (sRGB solid colors; recheck in situ)

| Pair | Ratio | Notes |
|---|---|---|
| White on `#50A747` | ~3.02:1 | **Fails AA** for body / small button labels. OK for large bold text (≥24px / 18.66pt bold) and graphics. |
| White on `#1E3D2A` | ~11.96:1 | Passes AAA. Preferred for inverse sections. |
| White on `#347A2E` | ~5.29:1 | Passes AA for normal text. Use this for small CTAs. |
| `#2D3D2F` on `#FCFAF8` | ~12.6:1 | Preferred body-on-warm pairing. |
| `#485550` on `#FCFAF8` | ~7.1:1 | Secondary copy on warm. OK. |

**Rule:** Any new pair must be rechecked in context (opacity, overlays, focus rings, backgrounds). Never bypass contrast to preserve the extracted color — derive an accessible variant and document the adjustment.

## Semantic token mapping

See `src/app/globals.css`. Components **must not** render raw brand hexes. Use semantic aliases:

```
--surface-warm       → #FCFAF8  (default page bg)
--surface-cool       → #F8F9FA  (secondary neutral section)
--surface-paper      → #FFFFFF  (cards / forms)
--surface-inverse    → #1E3D2A  (strong brand section)

--text-primary       → #2D3D2F
--text-secondary     → #485550
--text-inverse       → #FFFFFF

--accent             → #50A747  (graphics + large-only type)
--cta-fill           → #347A2E  (buttons w/ small white text)
--cta-text           → #FFFFFF

--border-subtle      → #D4D4D4
```

Add new states (hover, focus, active, disabled, error) via systematic derivations; record each in this file when added.

## Usage rules

- **Green is an accent, not a wash.** Reserve `--surface-inverse` for sections that deserve emphasis (brand opener, CTA band, credential rail). Do not green every section.
- **Review-star gold / third-party review logo colors** are incidental signals, not primary palette colors. Do not add them to tokens.
- **Do not force forest green** to signal the Northwest. The JDI palette is already green; adding more defeats the point.
- **Buttons:** `--cta-fill` with `--cta-text`. Hover darkens by ~8%. Focus ring = `--cta-fill` at 2px with 2px offset.
- **Links in body:** `--text-primary` with underline; hover `--cta-fill`.
- **Headings:** `--surface-inverse` on warm backgrounds; `--text-inverse` on inverse surface.

## Open items

- Confirm JDI logo + typography licensing with owner (type extraction from PDF is unreliable).
- Validate contrast in actual composed sections, not isolated swatches.
- Resolve whether a secondary accent is justified (none extracted; brief advises against inventing one).
