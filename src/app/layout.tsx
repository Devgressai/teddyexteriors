import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { ExteriorHeader, ExteriorFooter, MobileActionBar } from "@/components/exterior";
import { localBusiness, website } from "@/lib/schema";
import { display, get, hasUnresolvedRequirements } from "@/lib/business";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
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

const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/projects" },
  { label: "Materials", href: "/materials" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[color:var(--surface-warm)] text-[color:var(--text-primary)]">
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
