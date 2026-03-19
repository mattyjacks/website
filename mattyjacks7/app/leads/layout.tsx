import type { Metadata } from "next";

const leadsJsonLd = {
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  name: "MattyJacks Free Lead Databases",
  description: "Free business lead databases for B2B prospecting. Over 500,000 leads available across multiple industries.",
  url: "https://mattyjacks.com/leads",
  creator: { "@type": "Organization", name: "MattyJacks", url: "https://mattyjacks.com" },
  dataset: [
    { "@type": "Dataset", name: "USA Instagram Leads", description: "11,970 USA Instagram business leads" },
    { "@type": "Dataset", name: "USA Marketing + Lawyers + Fortune 500", description: "30,811 marketing, legal, and Fortune 500 company leads" },
    { "@type": "Dataset", name: "Instagram Leads 500k Global + 12k USA", description: "511,970 Instagram leads worldwide" },
    { "@type": "Dataset", name: "HVAC Contractors Massachusetts", description: "1,757 HVAC contractor leads in Massachusetts" },
    { "@type": "Dataset", name: "Septic & Plumbers USA", description: "1,195 septic and plumber leads across the USA" },
  ],
};

export const metadata: Metadata = {
  title: "Free Lead Databases - 500,000+ Business Leads for Prospecting",
  description:
    "Browse free lead databases with over 500,000 business leads. USA Instagram leads, plumbers, HVAC contractors, lawyers, marketing contacts, Fortune 500, cannabis processors, cruise companies, and more. Download and use for B2B prospecting.",
  keywords: [
    "free business leads", "lead database", "B2B leads", "sales leads",
    "prospecting database", "USA leads", "HVAC contractor leads",
    "plumber leads", "lawyer leads", "marketing leads", "Fortune 500 leads",
    "Instagram leads", "cannabis leads", "free lead generation",
    "cold calling leads", "business prospecting", "lead lists",
  ],
  alternates: { canonical: "https://mattyjacks.com/leads" },
  openGraph: {
    title: "Free Lead Databases - 500,000+ Leads | MattyJacks",
    description: "Over 500,000 free business leads. Instagram, HVAC, lawyers, marketing, Fortune 500, and more. Browse and prospect for free.",
    url: "https://mattyjacks.com/leads",
    type: "website",
    images: [{ url: "/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png", width: 1200, height: 630, alt: "MattyJacks Free Lead Databases" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Lead Databases - 500,000+ Leads",
    description: "Free business leads for prospecting. USA Instagram, HVAC, lawyers, marketing, Fortune 500, and more.",
  },
};

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadsJsonLd) }}
      />
      {children}
    </>
  );
}
