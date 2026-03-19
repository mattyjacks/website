import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worker Manual - Freelancer Guide for Time Tracking, Invoicing & Communication",
  description:
    "Complete guide for MattyJacks freelancers and workers. Learn about time tracking with Toggl, invoice creation, IRS forms (W-8BEN, W-9), communication protocols, and payment processes.",
  keywords: [
    "freelancer guide", "worker manual", "time tracking guide", "Toggl tutorial",
    "freelance invoicing", "W-8BEN form", "W-9 form", "remote work guide",
    "MattyJacks worker guide", "freelancer onboarding",
  ],
  alternates: { canonical: "https://mattyjacks.com/manual" },
  openGraph: {
    title: "Worker Manual - Freelancer Guide | MattyJacks",
    description: "Complete guide for MattyJacks freelancers. Time tracking, invoicing, IRS forms, and communication protocols.",
    url: "https://mattyjacks.com/manual",
    type: "article",
  },
};

export default function ManualLayout({ children }: { children: React.ReactNode }) {
  return children;
}
