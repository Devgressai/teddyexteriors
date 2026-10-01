import Image from "next/image";
import type { ImageAsset } from "@/content-model/types";

export type StoryBreakProps = {
  image: ImageAsset;
  eyebrow: string;
  headline: string;
  meta?: string;
  locality?: string;
};

/**
 * Mid-page visual reset per the mandate's "visual story break" directive.
 * Full-bleed authentic exterior photograph with minimal typographic overlay.
 * Creates emotional breathing room between information-dense sections.
 */
export function StoryBreak({ image, eyebrow, headline, meta, locality }: StoryBreakProps) {
  return (
    <section
      aria-label={`${eyebrow} — ${headline}`}
      className="relative isolate overflow-hidden bg-black"
      style={{ ["--editorial-color" as string]: "#ffffff" }}
    >
      <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(18,61,42,0.72) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-[1360px] w-full px-6 lg:px-8 pb-10 lg:pb-14">
            <p className="text-[0.7rem] font-semibold tracking-[0.24em] uppercase text-white/85">
              {eyebrow}
            </p>
            <h2 className="mt-4 editorial-display text-white max-w-[22ch] leading-[1.02]">
              {headline}
            </h2>
            {(meta || locality) && (
              <p className="mt-5 text-[0.85rem] text-white/75">
                {meta}
                {meta && locality && <span className="mx-3 opacity-50">·</span>}
                {locality}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
