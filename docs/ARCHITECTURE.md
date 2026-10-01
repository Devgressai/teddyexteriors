# Architecture

Routes, page families, content entities, relationships. Mirrors master brief §05 adapted to PNW. **No route becomes public until the business facts behind its claims are confirmed in `BUSINESS_FACTS.md`.**

## Stack

- Next.js 16.3.8 App Router, React 19, TypeScript strict
- Tailwind v4 with `@plugin "@tailwindcss/typography"`
- MDX via `@next/mdx` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- `cacheComponents: false` — pure SSG. All public pages prerender at build. Flip to PPR only when a real dynamic block is justified (brief §13: no mandatory PPR for SEO).
- Node runtime for Route Handlers (lead form)
- No experimental PPR flag — Next 16 removed `experimental.ppr`; PPR now lives inside `cacheComponents`

## Route families

| Family | Pattern | Launch gate |
|---|---|---|
| Home | `/` | business facts confirmed |
| Service index | `/services/` | ≥1 confirmed service |
| Service pillar | `/services/{service}/` | per-service confirmed |
| Material hub | `/materials/` | ≥1 confirmed material |
| Material detail | `/materials/{material}/` | per-material confirmed |
| Area index | `/service-areas/` | territory confirmed |
| State hub | `/service-areas/{wa,oregon}/` | per-state cities confirmed |
| City hub | `/service-areas/{state}/{city}/` | per-city confirmed |
| City/service | `/service-areas/{state}/{city}/{service}/` | coverage-matrix cell confirmed |
| County hub (optional) | `/service-areas/{state}/counties/{county}/` | genuine regional nav need |
| Project index | `/projects/` | ≥1 real project with rights |
| Project detail | `/projects/{slug}/` | per-project rights + facts |
| Resource index | `/resources/` | ≥1 resource pillar |
| Resource pillar | `/resources/{topic}/` | pillar scoped |
| Supporting guide | `/resources/{topic}/{guide}/` | distinct question |
| Cost hub | `/costs/` | defensible cost framework |
| Service cost | `/costs/{service}/` | per-service cost framework |
| Comparison | `/compare/{comparison}/` | genuine buying decision |
| About / team / credentials | `/about/`, `/team/`, `/credentials/` | leadership + credentials confirmed |
| Process / warranty / reviews | `/process/`, `/warranty/`, `/reviews/` | per-page facts confirmed |
| Contact / estimate | `/contact/`, `/request-estimate/` | lead ops wired |
| Policy | `/privacy/`, `/terms/`, `/accessibility/` | legal review |

**Dynamic routes use `generateStaticParams` + `dynamicParams = false` + a finite allowlist in `data/page-manifest.json`.** Unknown slugs return `notFound()`.

## Content entities

Defined in `src/content-model/` (to be created in Phase 3):

- `Service` — slug, name, category, scope, exclusions, materials[], relatedGuides[]
- `Material` — slug, product, manufacturer, lines[], installationNotes
- `City` — slug, state, county[], entityType, lat/lng (verified), operatingCoverage, priority, services[], jurisdiction, buildingDeptUrl, constraints[], sources[]
- `Project` — slug, city, services[], materials[], completionDate?, scope, products, dimensions?, substrateFindings, moistureDetails, outcome, photos[] (with rights), customerPermissions
- `ResourcePillar` + `ResourceGuide` — topic, scope, decisionAreas[], sources[], reviewer
- `CostGuide` — service, unitBasis, scopeAssumptions, drivers[], ranges? (only with defensible dataset)
- `Claim` — text, scope, sourceUrl, publisher, publishedOn, accessedOn, confidence, affectedRoutes[], reviewer, refreshTrigger (sources register)

## Internal-link policy (§11)

Links derived from structured relationships (service↔material↔city↔project), not hard-coded in templates. Breadcrumbs reflect real hierarchy. Related modules have real headings. No sitewide keyword footers. Click-depth target ≤3 for priority conversion pages (usability goal, not an SEO rule).

## Structured data policy (§12)

One `@id = {site.url}#business` across all city pages (brief §12 critical invariant). City pages identify the city page, not an About template. `GeneralContractor` subtype of LocalBusiness when a public office exists; `Organization` (not LocalBusiness) when SAB without address — document the limitation.

## Rendering mode

- All content pages: SSG
- Lead form: server action or route handler with validation (no client bundle secrets)
- OG images: `app/opengraph-image.tsx` with Next's image generation (prerendered)

## Not building (yet)

- Separate state domains (brief explicitly cautions against)
- Per-city LocalBusiness entities
- Financing/commercial/multifamily/HOA pages (gate on confirmation)
- Live reviews widget (prefer static reviews with attribution + source)
- Chat / popup / countdown / cursor-effect UI (brief §14 explicit)
