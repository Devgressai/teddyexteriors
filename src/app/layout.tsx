import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { ExteriorHeader, ExteriorFooter, MobileActionBar, SideQuoteTab } from "@/components/exterior";
import { localBusiness, website } from "@/lib/schema";
import { display, get, hasUnresolvedRequirements } from "@/lib/business";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const brand = display<string>("identity.brandName", "Teddy Exteriors (preview)");
  const url = get<string>("identity.domain") ?? undefined;
  return {
    ...(url && { metadataBase: new URL(url) }),
    title: {
      default: `${brand} — Siding and exterior renovation, Vancouver WA and Portland OR`,
      template: `%s · ${brand}`,
    },
    description:
      "Siding, windows, trim, and exterior renovation serving Vancouver, Washington; Portland, Oregon; and the surrounding region. Documented project-by-project.",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      ...(url && { url }),
      siteName: brand,
      title: brand,
    },
    twitter: { card: "summary_large_image", title: brand },
    robots: { index: !hasUnresolvedRequirements(), follow: !hasUnresolvedRequirements() },
  };
}

import type { MegaNavItem } from "@/components/exterior/MegaMenu";

const primaryNav: MegaNavItem[] = [
  {
    label: "Services",
    href: "/services",
    menu: {
      description:
        "Siding, windows, trim, gutters, and complete exterior remodeling — installed envelope-first for Pacific Northwest weather.",
      image: {
        src: "/images/teddy/teddy-service-siding.webp",
        alt: "Warm neutral fiber cement siding on a Pacific Northwest home",
      },
      featureCta: { label: "Request an evaluation", href: "/request-estimate" },
      columns: [
        {
          links: [
            { label: "Siding replacement", href: "/services/siding-replacement" },
            { label: "Window replacement", href: "/services/window-replacement" },
            { label: "Gutters & trim", href: "/services/trim-and-gutters" },
          ],
        },
        {
          links: [
            { label: "Exterior painting", href: "/services/exterior-painting" },
            { label: "Complete exterior renovation", href: "/services/complete-exterior-renovation" },
            { label: "Dry rot repair", href: "/services/dry-rot-repair" },
          ],
        },
      ],
      viewAll: { label: "View all services", href: "/services" },
    },
  },
  { label: "Our Work", href: "/projects" },
  {
    label: "Materials",
    href: "/materials",
    menu: {
      description:
        "Four siding systems we install across Vancouver and Portland. Any of them performs — if the envelope behind it is right.",
      image: {
        src: "/images/teddy/teddy-material-fiber-cement-detail.webp",
        alt: "Close detail of installed fiber cement lap siding with trim",
      },
      featureCta: { label: "Compare systems", href: "/compare/fiber-cement-vs-lp-smartside" },
      columns: [
        {
          links: [
            { label: "Fiber cement (James Hardie)", href: "/materials/fiber-cement" },
            { label: "Engineered wood (LP SmartSide)", href: "/materials/engineered-wood" },
          ],
        },
        {
          links: [
            { label: "Cedar siding", href: "/materials/cedar" },
            { label: "Vinyl siding", href: "/materials/vinyl" },
          ],
        },
      ],
      viewAll: { label: "View all materials", href: "/materials" },
    },
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    menu: {
      description:
        "One local team covering southwest Washington and the Portland metro — not a national brand with a Vancouver phone number.",
      image: {
        src: "/images/teddy/teddy-why-written-estimate.webp",
        alt: "Pacific Northwest residential street under overcast light",
      },
      featureCta: { label: "Check your city", href: "/service-areas" },
      columns: [
        {
          heading: "Washington",
          links: [
            { label: "Vancouver", href: "/service-areas/washington/vancouver" },
            { label: "Camas", href: "/service-areas/washington/camas" },
            { label: "Battle Ground", href: "/service-areas/washington/battle-ground" },
            { label: "Ridgefield", href: "/service-areas/washington/ridgefield" },
          ],
        },
        {
          heading: "Oregon",
          links: [
            { label: "Portland", href: "/service-areas/oregon/portland" },
            { label: "Beaverton", href: "/service-areas/oregon/beaverton" },
            { label: "Hillsboro", href: "/service-areas/oregon/hillsboro" },
            { label: "Lake Oswego", href: "/service-areas/oregon/lake-oswego" },
          ],
        },
      ],
      viewAll: { label: "View all service areas", href: "/service-areas" },
    },
  },
  {
    label: "About",
    href: "/about",
    menu: {
      description:
        "Owner-run exterior contractor. Written estimates, in-house crews, envelope-first methodology — documented project by project.",
      image: {
        src: "/images/teddy/teddy-why-in-house-crews.webp",
        alt: "Mid-century ranch exterior refresh in the Pacific Northwest",
      },
      featureCta: { label: "Meet the team", href: "/team" },
      columns: [
        {
          links: [
            { label: "About us", href: "/about" },
            { label: "Credentials", href: "/credentials" },
            { label: "Team", href: "/team" },
          ],
        },
        {
          links: [
            { label: "Warranty", href: "/warranty" },
            { label: "Reviews", href: "/reviews" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
      viewAll: { label: "Everything about Teddy", href: "/about" },
    },
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [localBusiness(), website()].filter(Boolean);
  const previewMode = hasUnresolvedRequirements();
  const brandName = display<string>("identity.brandName", "Teddy Exteriors");
  const phone = get<string>("contact.phone") ?? undefined;
  const email = get<string>("contact.emailPublic") ?? undefined;
  const hours = get<string>("contact.hours") ?? undefined;
  const waLni = get<string>("credentials.waLniNumber") ?? undefined;
  const orCcb = get<string>("credentials.orCcbNumber") ?? undefined;

  return (
    <html lang="en" className={`${barlow.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[color:var(--surface-warm)] text-[color:var(--ink-primary)]">
        {jsonLd.length > 0 && <JsonLd data={jsonLd} />}
        {previewMode && (
          <div
            role="status"
            className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs text-center py-2"
          >
            Private preview — unresolved business facts; production build is blocked by the validator.
          </div>
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded focus:shadow"
        >
          Skip to content
        </a>
        <ExteriorHeader
          brandName={brandName}
          regionSummary="Serving Vancouver, WA and Portland, OR"
          waCredentialNumber={waLni}
          orCredentialNumber={orCcb}
          phone={phone}
          nav={primaryNav}
        />
        <main id="main" className="flex-1 pb-14 lg:pb-0">
          {children}
        </main>
        <SideQuoteTab phone={phone} />
        <MobileActionBar phone={phone} />
        <ExteriorFooter
          brandName={brandName}
          statement="Siding, windows, and exterior renovation serving Vancouver, Portland, and the surrounding region."
          phone={phone}
          email={email}
          hours={hours}
          waCredentialNumber={waLni}
          orCredentialNumber={orCcb}
          services={[
            { label: "Siding replacement", href: "/services/siding-replacement" },
            { label: "Window replacement", href: "/services/window-replacement" },
            { label: "Exterior painting", href: "/services/exterior-painting" },
            { label: "Gutters & trim", href: "/services/gutters-and-trim" },
            { label: "Complete renovation", href: "/services/complete-exterior-renovation" },
          ]}
          stateHubs={[
            { label: "Washington", href: "/service-areas/washington" },
            { label: "Oregon", href: "/service-areas/oregon" },
          ]}
          trust={[
            { label: "About", href: "/about" },
            { label: "Team", href: "/team" },
            { label: "Credentials", href: "/credentials" },
            { label: "Warranty", href: "/warranty" },
            { label: "Reviews", href: "/reviews" },
          ]}
          policies={[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Accessibility", href: "/accessibility" },
          ]}
        />
      </body>
    </html>
  );
}
