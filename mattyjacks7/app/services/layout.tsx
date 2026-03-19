import type { Metadata } from "next";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MattyJacks Services",
  description: "Full-service agency offering website development, cold calling, copywriting, and graphic design.",
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Website Development",
        description: "Modern, mobile-first, SEO-optimized websites designed to convert visitors into customers. Our most popular service.",
        provider: { "@type": "Organization", name: "MattyJacks" },
        areaServed: "Worldwide",
        url: "https://mattyjacks.com/services",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Cold Calling Operations",
        description: "Managed cold calling teams for B2B lead generation. We research your market, build lead lists, craft scripts, deploy callers, and optimize results.",
        provider: { "@type": "Organization", name: "MattyJacks" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Copywriting & Marketing",
        description: "High-converting copy for websites, emails, ads, and brand storytelling.",
        provider: { "@type": "Organization", name: "MattyJacks" },
        areaServed: "Worldwide",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Graphic Design",
        description: "Logos, brand identity, social media graphics, and marketing materials.",
        provider: { "@type": "Organization", name: "MattyJacks" },
        areaServed: "Worldwide",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Services - Website Development, Cold Calling, Copywriting & Design",
  description:
    "MattyJacks offers website development, cold calling operations, copywriting and marketing, and graphic design services. Proven results for Lime Painting, Beskar Property Management, TristateHoney, and more. Get a free quote today.",
  keywords: [
    "website development services", "cold calling services", "B2B lead generation",
    "copywriting agency", "graphic design services", "outsourcing agency",
    "web design", "landing page design", "email marketing", "brand design",
    "conversion optimization", "SEO services", "MattyJacks services",
  ],
  alternates: { canonical: "https://mattyjacks.com/services" },
  openGraph: {
    title: "MattyJacks Services - Websites, Cold Calling, Copy & Design",
    description: "From websites that convert to cold calling teams that close. Website development, cold calling operations, copywriting, and graphic design.",
    url: "https://mattyjacks.com/services",
    type: "website",
    images: [{ url: "/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png", width: 1200, height: 630, alt: "MattyJacks Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MattyJacks Services - Websites, Cold Calling & More",
    description: "Website development, cold calling, copywriting, and graphic design. Proven results.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
