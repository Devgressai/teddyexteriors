import Image from "next/image";
import { Container, Section } from "@/components/primitives";
import type { ImageAsset } from "@/content-model/types";

export type WhyTeddyBlock = {
  eyebrow: string;
  heading: string;
  body: string;
  image: ImageAsset;
  imagePosition?: "left" | "right";
};

export type WhyTeddyNarrativeProps = {
  sectionEyebrow: string;
  sectionHeading: string;
  blocks: WhyTeddyBlock[];
};

/**
 * Proof narrative, not six cards. Three alternating paragraph + image blocks,
 * each pairing an unambiguous craft claim with real documentary photography.
 */
export function WhyTeddyNarrative({ sectionEyebrow, sectionHeading, blocks }: WhyTeddyNarrativeProps) {
  return (
    <Section surface="warm" pad="xl" ariaLabel="Why Teddy">
      <Container width="wide">
        <header className="max-w-3xl">
          <p className="eyebrow">{sectionEyebrow}</p>
          <h2 className="mt-5 editorial-h2 max-w-[22ch]">{sectionHeading}</h2>
        </header>
        <div className="mt-16 flex flex-col gap-20">
          {blocks.map((block, i) => {
            const imageOnRight = (block.imagePosition ?? (i % 2 === 0 ? "right" : "left")) === "right";
            return (
              <article
                key={block.heading}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6 items-center`}
              >
                <div className={`lg:col-span-5 ${imageOnRight ? "lg:col-start-1" : "lg:col-start-8"}`}>
                  <p className="eyebrow">{block.eyebrow}</p>
                  <h3 className="mt-4 editorial-h2 max-w-[18ch] text-[color:var(--ink-emphasis)]">
                    {block.heading}
                  </h3>
                  <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[42ch]">
                    {block.body}
                  </p>
                </div>
                <div
                  className={`lg:col-span-7 ${imageOnRight ? "lg:col-start-6" : "lg:col-start-1 lg:row-start-1"}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={block.image.src}
                      alt={block.image.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
