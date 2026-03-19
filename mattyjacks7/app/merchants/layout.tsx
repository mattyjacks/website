import type { Metadata } from "next";

const merchantsJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "MattyJacks Merchant Services",
  description: "High-risk and low-risk merchant account solutions for USA and Canada businesses. 20+ bank relationships, fast approvals, competitive rates.",
  provider: {
    "@type": "Organization",
    name: "MattyJacks",
    url: "https://mattyjacks.com",
    telephone: "+1-603-999-9420",
  },
  url: "https://mattyjacks.com/merchants",
  areaServed: ["US", "CA"],
  category: ["Payment Processing", "Merchant Services", "High-Risk Merchant Accounts"],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Fast approvals. No hidden fees. No long-term contracts. 24/7 support.",
  },
};

export const metadata: Metadata = {
  title: "Merchant Services - High-Risk & Low-Risk Payment Processing USA & Canada",
  description:
    "High-risk and low-risk merchant account solutions for USA and Canada businesses. 20+ bank relationships, fast approvals, competitive rates. CBD, gaming, adult, nutraceuticals, subscriptions, and more. Call (603) 999-9420.",
  keywords: [
    "high-risk merchant account", "payment processing", "merchant services",
    "CBD merchant account", "adult merchant account", "gaming payment processing",
    "high-risk payment gateway", "credit card processing", "ACH processing",
    "chargeback prevention", "e-commerce gateway", "POS systems",
    "USA merchant account", "Canada merchant account", "3D secure checkout",
    "nutraceutical merchant account", "subscription billing", "recurring payments",
  ],
  alternates: { canonical: "https://mattyjacks.com/merchants" },
  openGraph: {
    title: "High-Risk & Low-Risk Merchant Accounts - MattyJacks",
    description: "Payment processing for every business. 20+ bank relationships, fast approvals, competitive rates. USA & Canada. High-risk specialists.",
    url: "https://mattyjacks.com/merchants",
    type: "website",
    images: [{ url: "/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png", width: 1200, height: 630, alt: "MattyJacks Merchant Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchant Account Solutions - High-Risk Specialists",
    description: "20+ bank relationships. Fast approvals. USA & Canada. CBD, gaming, adult, nutraceuticals, and more.",
  },
};

export default function MerchantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(merchantsJsonLd) }}
      />
      {children}
    </>
  );
}
