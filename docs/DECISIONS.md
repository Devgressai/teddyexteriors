# Decisions

Material technical and editorial decisions with reasons. Append-only; supersede entries, do not delete.

---

## D-001 — Stack: Next 16 + Tailwind 4 + MDX, pure SSG (2026-09-30)

**Decision:** Next 16.3.8 App Router, React 19, TypeScript, Tailwind v4, `@next/mdx`. `cacheComponents: false` → pure static generation for all public pages.

**Reason:** Marketing/SEO site has no per-request dynamic state. Static pages beat PPR on TTFB (no origin round-trip) and are the gold standard for indexing. Next 16 removed `experimental.ppr` in favor of `cacheComponents`, which requires `use cache` discipline and Node runtime — overkill when all content is static. Reversible: flip `cacheComponents: true` when a real dynamic block is justified.

**Alternatives considered:** Astro (fractionally less JS, but off user's stack and loses reuse from sibling sites); Next 15 (no PPR removal, but we'd be adopting old defaults in a greenfield project).

---

## D-002 — Dual credentials ≠ two offices (2026-09-30)

**Decision:** Represent WA L&I and OR CCB as credentials of a single business entity unless the owner confirms two distinct legal entities.

**Reason:** Master brief §01 and §12. Common mistake is to mint a per-state LocalBusiness in schema — this creates fictional offices and triggers Google LocalBusiness policy issues. One `@id` across the site.

---

## D-003 — SAB disclosure (2026-09-30)

**Decision:** If no publishable office address exists, present as service-area business. Document the LocalBusiness rich-result limitation in `LAUNCH_REPORT.md`. Do not fabricate an address to make a validator pass.

**Reason:** §09 — never invent an office. §12 — some rich results require a public address; truthful absence > fake green.

---

## D-004 — AI crawler access = allowlist, not blanket (2026-09-30)

**Decision:** `robots.ts` explicitly allows known AI search bots (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, DuckAssistBot, Amazonbot). CCBot and Bytespider included by default but will be revisited after owner input on training-data policy.

**Reason:** §13 — distinguish search retrieval from training agents. Owner may want to allow search bots while opting out of training. **This decision will be revisited** when the owner answers the training-data question.

---

## D-005 — No fabricated content gate (2026-09-30)

**Decision:** `src/lib/business.config.ts` is a typed config with required/optional fields. `scripts/validate-business-config.ts` runs in `prebuild` and throws if any required field is unresolved. Production build cannot ship with placeholder values.

**Reason:** §03 — "unknown facts must not leak into production." Prevents a deployment accident where a `pending-owner` string ends up in an OG tag or JSON-LD.

---

## D-006 — Build locally for validation only, not for deployment (2026-09-30)

**Decision:** Follow user convention `feedback_never_build_locally.md`: push, CI verifies, I check CI. Local `pnpm build` only to catch obvious regressions during this discovery phase before any remote is wired.

**Reason:** User's standing instruction.

---

## D-007 — Vercel deployment is the user's job (2026-09-30)

**Decision:** I will not link, configure, or deploy to Vercel. I will not create a GitHub remote without authorization. All work stays local until owner approves.

**Reason:** `feedback_vercel_manual_deploy.md`.

---

## D-008 — JDI palette supersedes evergreen/ivory suggestion (2026-09-30)

**Decision:** Teddy Exteriors inherits the JDI Construction color family (brand green `#50A747`, deep green `#1E3D2A`, warm off-white `#FCFAF8`, charcoal `#232323`, etc.) extracted from the owner-supplied PDF. The earlier evergreen/ivory suggestion is replaced. Palette provenance + contrast calculations + semantic tokens live in `docs/BRAND_REFERENCE.md` and `src/app/globals.css`.

**Reason:** Master brief §14 (resend 2026-09-30) — the owner's original JDI site is the required brand-color reference. Preserves recognizable brand continuity since JDI and Teddy Exteriors share an owner. Scope of inheritance = colors only; do not inherit JDI review totals, company history, interior-project evidence, or license claims.

**Caveats:**
- Colors are PDF RGB values, not live CSS inspection. Treat as starting baseline; re-verify in situ.
- `#50A747` fails WCAG AA with white small text (~3.02:1). Derived `#347A2E` (~5.29:1) is used for buttons with small white labels. Document any further derivations in `BRAND_REFERENCE.md`.
- Do not force additional green into the palette "to communicate the Northwest."

---

## D-009 — Custom design system is a release gate (2026-09-30)

**Decision:** Build the 14 named bespoke components (`ExteriorHeader`, `ExteriorHero`, `CredentialRail`, `ServiceExplorer`, `ProjectFeature`, `BeforeAfter`, `EnvelopeDetail`, `MaterialCompare`, `RegionalCoverage`, `ProcessStory`, `TeamProof`, `ResourceFeature`, `EstimateSection`, `ExteriorFooter`) in `src/components/exterior/` with typed variants and documented content rules. Build one resolved homepage + representative service / city-service / project / resource pages, run the Design QA pass (`docs/DESIGN_QA.md`), then propagate templates. A noindexed `/_showcase/` route exercises states.

**Reason:** Master brief §14A–§14E. Visual authorship is a release requirement; a stock landing kit recolored green does not satisfy the brief.
