import { Container } from "@/components/primitives";

/**
 * Compact RELEVANCE micro-band between hero and trust band. One Pacific Northwest
 * climate stat that immediately establishes "yes, this is for homeowners in MY region
 * and MY climate." Typographic only — no card, no icon grid.
 *
 * Surface: pale sage transition band (v5 rhythm — sits between the evergreen hero
 * column and the ivory TrustBand below). Dark text on sage reads as a quiet break,
 * not a shout.
 */
export function ClimateMicrobar() {
  return (
    <aside
      aria-label="Pacific Northwest climate context"
      className="bg-[color:var(--surface-soft)] border-y border-[color:var(--border-subtle)]"
    >
      <Container width="wide">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-4 text-[color:var(--text-body)]">
          <p className="text-[0.75rem] uppercase tracking-[0.2em] font-semibold text-[color:var(--color-evergreen)]">
            Vancouver &amp; Portland, year-round
          </p>
          <p className="text-[0.9rem] max-w-[52ch]">
            <span className="font-semibold text-[color:var(--color-evergreen)]">
              Forty inches
            </span>{" "}
            of annual rain in Clark County &mdash; mostly a slow, sideways drizzle that
            finds every unsealed seam.
          </p>
          <p className="text-[0.75rem] text-[color:var(--text-muted)] tracking-wide">
            Why the envelope matters more than the finish.
          </p>
        </div>
      </Container>
    </aside>
  );
}
