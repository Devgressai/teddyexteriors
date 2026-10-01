# Visual Asset Plan

Per the 2026-10-01 image-generation mandate. **Real Teddy / JDI project photography has priority over anything generated.** Generated imagery is only authored where it serves education / technical visualization / brand atmosphere — never as fabricated proof.

## Hierarchy

1. Real Teddy / JDI exterior project photography
2. Real jobsite / crew / installation documentary photography
3. Real manufacturer product assets (where rights permit)
4. Custom technical visualization (SVG — already built: `WallSectionDiagram`)
5. Generated editorial / brand imagery

## Current asset inventory (as of 2026-10-01)

### Real JDI exterior photography (via jdiconstruction.co CDN)

| ID | Path | Current use |
|---|---|---|
| `jdi-exterior-front-after-1600` | `/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp` | Hero, siding service card, material close-ups (placeholder) |
| `jdi-exterior-front-1920` | `/ctf/2867howEJWyt6wVMWkIkN4/02-exterior-front-1920.webp` | Windows service card |
| `jdi-vancouver-whole-home-01` | `/ctf/6kM5u8g5lU78Y1vIebWMEz/01-exterior-front-750.webp` | Envelope detail inset, Why-Teddy block 1, Project detail |
| `jdi-vancouver-modern-remodel` | `/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp` | Why-Teddy block 3, Gutters service card |
| `jdi-mid-century-ranch` | `/ctf/33C8Uu510N5y2u5WoFGyj9/01-exterior-front-750.webp` | Why-Teddy block 2, Soffit & Fascia service card |

### Reality check — what we lack

- Separate close-up shots of fiber-cement / cedar / engineered-wood / vinyl textures (currently all reusing the hero shot in MaterialCompare)
- Jobsite-moment photography for Why-Teddy (currently reusing finished-project shots)
- Window close-up details for the Windows service card
- A real crew / people photograph for TeamProof
- Regional atmosphere (overcast light, cedar detail, PNW street) for ClimateAuthority
- Multiple hero candidates for A/B rhythm

## Prioritized asset generation / sourcing list

### Priority A (homepage-critical)

| ID | Role | Source strategy | Composition / aspect | Conversion function |
|---|---|---|---|---|
| `teddy-hero-northwest-exterior` | Hero bg | **Generated** (editorial, non-documentary) | 16:11 desktop / 4:5 mobile — subject right 55–65%, left negative space for text | Aspiration |
| `teddy-material-fiber-cement-detail` | Material card | Generated close-up / sourced from manufacturer | 4:3 | Education |
| `teddy-material-cedar-detail` | Material card | Generated close-up | 4:3 | Education |
| `teddy-material-lp-smartside-detail` | Material card | Generated close-up | 4:3 | Education |
| `teddy-material-vinyl-detail` | Material card | Generated close-up | 4:3 | Education |
| `teddy-pnw-atmosphere-01` | Climate authority support | Generated regional atmosphere | 3:2 | Regional relevance |
| `teddy-crew-moment-01` | TeamProof portrait | **Real photography required** — do not generate | 1:1 | Trust |
| `teddy-process-walkthrough-01` | Process timeline step 01 | Real jobsite photography preferred | 1:1 | Process certainty |

### Priority B (improves section quality)

| ID | Role |
|---|---|
| `teddy-pnw-atmosphere-02–04` | Regional environmental set (overcast, post-rain) |
| `teddy-service-painting-detail` | Dedicated painting service photography |
| `teddy-envelope-detail-photo` | Documentary install detail (flashing, pan, WRB taping) |
| `teddy-project-before-after-set-01` | Before/after pair for one real project |

### Priority C (post-launch)

Service-page hero imagery per each `/services/{slug}`; city-page atmospheric cover imagery per priority city; resource guide header imagery per guide.

## Per-asset composition brief template

Every asset must have its brief completed before generation. See `scripts/visual-generation/prompts/*.ts` for live briefs.

```
ID
ROLE               (hero / service / material / project / people / envelope / regional / technical)
AUTHENTIC OR GEN   (authentic preferred; gen only when authentic unavailable + role permits gen)
ASPECT             (desktop)
MOBILE ASPECT      (where art-direction swap required)
FOCAL POINT        (x,y as fraction)
SAFE AREA          (where text may land)
LIGHTING           (overcast / soft morning / blue hour / etc.)
MATERIAL PALETTE   (specific material names + grading)
CONVERSION FN      (aspiration / proof / education / trust / regional)
NEGATIVE           (what to exclude)
```

## Consistency tests

Every rendered homepage must pass the "same photographer" and "same market" tests per the mandate. Visual review after each batch records failures in `VISUAL_QA.md`.
