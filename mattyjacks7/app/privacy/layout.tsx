import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - How MattyJacks Handles Your Data",
  description:
    "MattyJacks privacy policy. Learn how we collect, use, store, and protect your personal information. Covers cookies, analytics, third-party services, and your data rights.",
  keywords: [
    "privacy policy", "data protection", "MattyJacks privacy",
    "cookie policy", "GDPR", "data handling",
  ],
  alternates: { canonical: "https://mattyjacks.com/privacy" },
  openGraph: {
    title: "Privacy Policy | MattyJacks",
    description: "How MattyJacks collects, uses, and protects your personal information.",
    url: "https://mattyjacks.com/privacy",
    type: "article",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
