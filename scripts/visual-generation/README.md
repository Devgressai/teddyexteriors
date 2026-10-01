# Visual Generation Pipeline

Server-side only. Never shipped to the client bundle.

## Overview

Teddy Exteriors uses a controlled image-generation pipeline to produce **non-documentary editorial / educational / brand imagery** when real photography is unavailable. **Generated imagery is never used as proof of completed Teddy work** — see `docs/teddy-homepage-transformation/VISUAL_ASSET_PLAN.md`.

## Pipeline

1. Author a brief in `scripts/visual-generation/briefs/*.ts` using the `GenerationBrief` type.
2. Compile the prompt with `compilePrompt(brief)` from `master-visual-dna.ts`.
3. Run `scripts/visual-generation/generate.ts` (not yet implemented) with the `GOOGLE_AI_API_KEY` env var set.
4. Review candidates in `generated/candidates/<brief-id>/`.
5. Approve the strongest candidate. Move to `public/images/teddy/` with the canonical name.
6. Register in `src/content-model/visual-assets.ts` with `isGenerated: true`.

## Rules

- Never commit the API key.
- Never generate dynamically at request time — the website must not depend on API availability.
- Approved assets are static files in `public/images/teddy/`.
- Candidates in `generated/candidates/` are gitignored.
- Every generated asset must pass the "same photographer" / "same market" / "same customer" consistency tests before use.
- Generated projects, people, reviews, before/afters, or customer imagery are banned.

## Current status

Pipeline infrastructure is in place; actual generation deferred until the Google AI Studio key is validated and brand photography priorities are confirmed. Current homepage uses real JDI exterior project photography.
