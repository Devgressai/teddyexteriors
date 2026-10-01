import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, videoSchema } from "@/lib/schema";
import { projects, findCity } from "@/content-model/registry";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.outcome,
    alternates: { canonical: `/projects/${p.slug}` },
    robots: p.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const city = findCity(p.city);
  const hero = p.photos[0];

  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: p.title, path: `/projects/${p.slug}` },
      ]}
      eyebrow={city ? `${city.name}, ${city.state}` : "Project"}
      heading={p.title}
      intro={p.outcome}
    >
      {p.isSample && <SampleBanner note={p.sampleNote} />}
      <JsonLd
        data={[
          articleSchema({
            headline: p.title,
            description: p.outcome,
            slug: `/projects/${p.slug}`,
            datePublished: p.completionDate ?? new Date().toISOString(),
            images: p.photos.map((ph) => ph.src),
          }),
          ...(p.video
            ? [
                videoSchema({
                  name: p.video.name,
                  description: p.video.description,
                  thumbnailUrl: p.video.thumbnail.src,
                  uploadDate: p.video.uploadDate,
                  contentUrl: p.video.contentUrl,
                  embedUrl: p.video.embedUrl,
                  durationIso: p.video.durationIso,
                }),
              ]
            : []),
        ]}
      />
      {hero && (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md">
              <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
          </div>
        </section>
      )}
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 prose max-w-none">
            <h2>What we found</h2>
            <p>{p.originalCondition}</p>
            {p.substrateFindings && (<><h3>Substrate</h3><p>{p.substrateFindings}</p></>)}
            {p.moistureDetails && (<><h3>Moisture / flashing</h3><p>{p.moistureDetails}</p></>)}
            <h2>Scope</h2>
            <ul>{p.scope.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <h2>Products installed</h2>
            <ul>{p.productsInstalled.map((item, i) => <li key={i}>{item}</li>)}</ul>
            {p.changeHandling && (<><h2>Change orders</h2><p>{p.changeHandling}</p></>)}
          </div>
          <aside>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">Project facts</h3>
            <dl className="mt-3 text-sm space-y-3">
              {city && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Location</dt>
                  <dd className="text-[color:var(--text-primary)]">{city.name}, {city.state}</dd>
                </div>
              )}
              {p.completionDate && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Completed</dt>
                  <dd className="text-[color:var(--text-primary)]">{p.completionDate.slice(0, 10)}</dd>
                </div>
              )}
              {p.dimensions && (
                <>
                  {p.dimensions.wallSquares && (
                    <div>
                      <dt className="text-[color:var(--text-secondary)]">Wall area</dt>
                      <dd className="text-[color:var(--text-primary)]">{p.dimensions.wallSquares} squares</dd>
                    </div>
                  )}
                  {p.dimensions.sheathingThicknessIn && (
                    <div>
                      <dt className="text-[color:var(--text-secondary)]">Sheathing</dt>
                      <dd className="text-[color:var(--text-primary)]">{p.dimensions.sheathingThicknessIn}&quot; CDX</dd>
                    </div>
                  )}
                  {p.dimensions.trimLinearFeet && (
                    <div>
                      <dt className="text-[color:var(--text-secondary)]">Trim</dt>
                      <dd className="text-[color:var(--text-primary)]">{p.dimensions.trimLinearFeet} LF</dd>
                    </div>
                  )}
                </>
              )}
            </dl>
          </aside>
        </div>
      </section>
      {p.customerComments && p.customerComments.length > 0 && (
        <section className="bg-[color:var(--surface-warm)]">
          <div className="mx-auto max-w-5xl px-6 py-16 space-y-6">
            {p.customerComments.map((c, i) => (
              <blockquote key={i} className="border-l-2 border-[color:var(--accent)] pl-5">
                <p className="text-base text-[color:var(--text-primary)]">&ldquo;{c.quote}&rdquo;</p>
                <cite className="mt-2 block text-xs text-[color:var(--text-secondary)] not-italic">— {c.attribution}</cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
