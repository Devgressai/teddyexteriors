# Growth Plan

Post-launch measurement and expansion criteria. Master brief §17.

## Baseline (set at launch, not asserted)

- GSC property verified, sitemap submitted, index coverage captured
- Analytics live with event contract working
- CRM lead flow verified end-to-end
- Lighthouse lab recorded; field-data absence disclosed (new domain → no CrUX)
- Starting indexed canonical count by family

## Measurement cadence

| Interval | Review items |
|---|---|
| Weekly (first 60 days) | Lead delivery success, form submissions, phone-click events, obvious crawl errors |
| 30 days | GSC index coverage, query-to-page relationships, orphaned priority pages, broken-link audit |
| 60 days | Lead quality by service × location, source freshness check, performance regressions, new project backlog |
| 90 days | Expansion criteria review (below) |

## Lead-quality definitions

- **Enquiry** — form submit or phone click.
- **Qualified** — matches an offered service and a confirmed service area, with sufficient scope.
- **Appointment** — site visit scheduled.
- **Estimate** — written estimate issued.
- **Signed** — contract executed.

Reporting measures Qualified → Signed, not Enquiry → Signed, so that lead-source noise does not inflate the pipeline.

## Expansion criteria (per master brief §17)

A new city or city×service page is created only when **all** of the following:

1. Owner confirms serviceability (crew capacity, travel acceptance, state-specific qualifications).
2. User value exists — a decision support need the home / state hub / existing city hub does not already answer.
3. Supporting evidence — jurisdiction link, local constraint, nearby project, or genuinely distinct cost/climate factor.

Volume is not an input. The brief explicitly cautions against auto-generating every service in every city.

## AI-visibility sampling (brief §17)

Record manual samples quarterly: platform, prompt, date, location/context, and whether the site is cited. Treat these as diagnostic signals, not metrics. Do not publish AI-citation claims externally.

## Freshness policy

- Project pages: updated when scope, warranty, or jurisdiction info changes — never a cosmetic year flip.
- Guides: `dateModified` reflects substantive edits only.
- Jurisdiction links verified at 90-day intervals; broken links added to the audit.
