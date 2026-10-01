# Master Checklist

Every requirement, status, evidence, remaining dependency. Keep current. See master brief §02.

Legend: ☐ pending · ◐ in-progress · ☑ done · ✖ blocked

## Phase 0 — Governance (started 2026-09-30)

- ☑ Repo scaffolded (`~/teddyexteriors`, Next 16.3.8 + Tailwind 4 + MDX, SSG)
- ☑ Memory updated: PNW scope, dual credentials, no-fabrication rules
- ☑ `docs/BUSINESS_FACTS.md` created — all fields `pending-owner`
- ☑ `docs/ARCHITECTURE.md` created — route families defined
- ☑ `docs/DECISIONS.md` created — initial decisions logged
- ☑ `docs/LAUNCH_REPORT.md` created
- ☑ `docs/GROWTH_PLAN.md` created
- ☑ `data/page-manifest.json` schema + initial routes
- ☑ `data/source-register.json` schema
- ☑ `data/coverage-matrix.json` schema
- ◐ Business config + production validation gate
- ☐ Consolidated owner question batch sent

## Phase 1 — Business intake (blocked on owner)

- ☐ Identity: legal entity, final domain, logo
- ☐ Credentials: WA L&I + OR CCB numbers, classifications, status check
- ☐ Operating base + phone/email/hours
- ☐ Service list confirmation (candidate 1–14, §06)
- ☐ Material list confirmation
- ☐ Warranty terms
- ☐ Estimate process
- ☐ Named leadership + bios + reviewer
- ☐ Project assets + rights
- ☐ Review URLs
- ☐ CRM/analytics/hosting

## Phase 2 — Territory (blocked on owner)

- ☐ Origin point(s) for 100-mi
- ☐ 100-mi definition (radius / drive-time / enumerated)
- ☐ Approved WA cities
- ☐ Approved OR cities
- ☐ Approved outer cities
- ☐ Explicit exclusions

## Phase 3 — Content system (parallel-safe where reversible)

- ☑ Content model types (`src/content-model/types.ts`)
- ☑ Content registry (`src/content-model/registry.ts`) — empty, populated as content authored
- ☐ Project MDX template + frontmatter validator
- ☐ Resource/guide MDX template
- ☐ Service pillar template
- ☐ City hub template
- ☐ City/service template
- ☐ Material detail template
- ☐ Cost guide template
- ☐ Project detail template
- ☑ Internal-link audit skeleton (`scripts/link-audit.ts`)

## Phase 4 — Trust / policy pages

- ☐ /about (named leadership — pending Phase 1)
- ☐ /team
- ☐ /credentials (verification links)
- ☐ /process
- ☐ /warranty
- ☐ /reviews
- ☐ /privacy
- ☐ /terms
- ☐ /accessibility
- ☐ /contact
- ☐ /request-estimate

## Phase 5 — Design system (brief §14, §14A–§14E)

- ☑ Palette provenance: `docs/BRAND_REFERENCE.md` (JDI PDF extraction, 2026-09-30)
- ☑ Semantic tokens in `src/app/globals.css`
- ☑ `docs/ART_DIRECTION.md` initial
- ☑ `docs/DESIGN_QA.md` skeleton
- ☐ Type pair finalized (default Inter; owner may supply licensed display)
- ☐ Logo + lockup
- ☐ Bespoke SVG icon direction decided (no stock icon pack)
- ☑ Custom components (§14B): `ExteriorHeader`, `ExteriorHero`, `CredentialRail`, `ServiceExplorer`, `ProjectFeature`, `BeforeAfter`, `EnvelopeDetail`, `MaterialCompare`, `RegionalCoverage`, `ProcessStory`, `TeamProof`, `ResourceFeature`, `EstimateSection`, `ExteriorFooter`
- ☑ `/_showcase/` route (noindexed) exercising states
- ☑ Homepage composition in `src/app/page.tsx` (fact-dependent sections gated)
- ☑ Representative sample pages for design gate (service, material, city, city/service, project, resource guide, cost guide, comparison) — flagged `isSample`, noindexed, excluded from sitemap, visible banner
- ☑ MDX soft-load with "pending" fallback (`src/content-model/load-mdx.tsx`)
- ☐ Design acceptance gate (§14E) — screenshots at 390 + 1440 for full scroll
- ☐ Accessibility pass (WCAG 2.2 AA)

## Phase 6 — Forms + lead ops

- ☑ Server-side lead handler with validation + per-IP rate limit (`src/app/actions/submit-lead.ts`)
- ☑ Honeypot + input validation + no-PII logging
- ☑ Sandbox destination via `LEAD_SANDBOX_EMAIL` env (console-only in dev)
- ☐ CRM/email destination wired (pending Phase 1 — owner choice)
- ☐ Failure/retry durable storage (upgrade bucket from in-memory → Upstash/Redis at deploy)
- ☐ Attribution capture (source/medium/campaign + referring route) — fields present, read from UTM query
- ☐ Analytics event contract (phone-click, form-start, lead-accepted — separated)

## Phase 7 — Technical / SEO infra

- ☑ robots.ts (AI crawlers allowed explicitly — revisit after owner input)
- ☑ sitemap.ts (manifest-driven)
- ☑ llms.txt skeleton
- ☑ 404 route (`src/app/not-found.tsx`)
- ☑ Security headers (`next.config.ts`)
- ☐ Open Graph image generation
- ☐ Canonical/host policy enforced site-wide
- ☐ Redirects registry
- ☑ Link audit skeleton (`scripts/link-audit.ts` — becomes authoritative once routes populate)
- ☐ Build-time similarity/intent diagnostic

## Phase 8 — Verification gates (§18)

- ☐ Build + typecheck pass
- ☐ Manifest route resolution test
- ☐ Business config validator passes
- ☐ JSON-LD visible-content agreement
- ☐ No AboutPage schema on location pages
- ☐ One business @id across city pages
- ☐ Image rights log complete for every published image
- ☐ Form E2E (success + failure + spam) in sandbox
- ☐ Analytics event test (no PII in payload)
- ☐ Visual QA at 360/390/768/1280/1440
- ☐ Keyboard pass
- ☐ Lab Lighthouse recorded
- ☐ Field-data absence disclosed

## Phase 9 — Launch

- ☐ Launch report completed
- ☐ Owner approval on preview
- ☐ DNS cutover (user's decision — Vercel is user's, I never deploy)

## Restart notes

If context compacts: resume by reading `docs/MASTER_CHECKLIST.md`, `docs/BUSINESS_FACTS.md` (all `pending-owner` fields are gating), then look at open TaskList items. Last meaningful work: setting up governance artifacts; next unblocked work is Phase 3 content model types.
