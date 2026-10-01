import Link from "next/link";
import { Container } from "@/components/primitives";

type Props = {
  message: string;
  cta?: { label: string; href: string };
};

/**
 * Bright-emerald promo bar at the very top of the layout. Communicates the "happy, bold,
 * excited" brand feel per 2026-10-01 direction — not meant for fabricated urgency, only
 * for real seasonal offers / genuine news the owner wants to highlight.
 *
 * Render conditionally when business.config carries a real promo message. If no message
 * is passed, nothing renders.
 */
export function PromoBar({ message, cta }: Props) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-label="Current offer"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--surface-accent-bright)",
        color: "var(--surface-accent-bright-ink)",
      }}
    >
      {/* Diagonal highlight stripe for industrial / construction feel */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-48 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(10,42,20,0.55) 8px, rgba(10,42,20,0.55) 10px)",
        }}
      />
      <Container width="wide">
        <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center">
          <p className="text-[0.82rem] font-extrabold tracking-wide">
            {message}
          </p>
          {cta && (
            <Link
              href={cta.href}
              className="text-[0.78rem] font-black uppercase tracking-widest underline underline-offset-4 decoration-2 hover:opacity-80"
            >
              {cta.label} &rarr;
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}
