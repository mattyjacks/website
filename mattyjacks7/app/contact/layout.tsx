import type { Metadata } from "next";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact MattyJacks",
  description: "Get in touch with MattyJacks for website development, cold calling, AI solutions, freelancers, or merchant services.",
  url: "https://mattyjacks.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "MattyJacks",
    telephone: "+1-603-999-9420",
    email: "Matt@MattyJacks.com",
    url: "https://mattyjacks.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-603-999-9420",
        contactType: "customer service",
        email: "Matt@MattyJacks.com",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  title: "Contact MattyJacks - Call 24/7, Email, or WhatsApp",
  description:
    "Get in touch with MattyJacks for website development, cold calling, AI solutions, freelancers, or merchant services. Call (603) 999-9420 anytime 24/7/365. Email Matt@MattyJacks.com. WhatsApp available.",
  keywords: [
    "contact MattyJacks", "hire freelancers", "website development quote",
    "cold calling agency", "outsourcing contact", "business consulting",
    "free consultation", "MattyJacks phone number", "603-999-9420",
  ],
  alternates: { canonical: "https://mattyjacks.com/contact" },
  openGraph: {
    title: "Contact MattyJacks - Available 24/7/365",
    description: "Call (603) 999-9420, email Matt@MattyJacks.com, or message on WhatsApp. Free consultations for website development, cold calling, AI, and more.",
    url: "https://mattyjacks.com/contact",
    type: "website",
    images: [{ url: "/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png", width: 1200, height: 630, alt: "Contact MattyJacks" }],
  },
  twitter: {
    card: "summary",
    title: "Contact MattyJacks - Available 24/7",
    description: "Call (603) 999-9420, email, or WhatsApp. Free consultations.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
