import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Program - Gain Real-World Experience with MattyJacks",
  description:
    "Join the MattyJacks internship program to gain hands-on experience in technology, web development, business operations, and freelancing. Work on real projects with mentorship from an experienced team. Remote-friendly.",
  keywords: [
    "internship program", "tech internship", "remote internship",
    "web development internship", "freelance internship", "business internship",
    "MattyJacks internship", "coding internship", "startup internship",
    "work experience", "mentorship program",
  ],
  alternates: { canonical: "https://mattyjacks.com/internship" },
  openGraph: {
    title: "Internship Program | MattyJacks",
    description: "Hands-on internship in tech, web development, and business operations. Real projects, real mentorship. Apply now.",
    url: "https://mattyjacks.com/internship",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MattyJacks Internship Program",
    description: "Gain real-world experience in tech, web dev, and business. Remote-friendly.",
  },
};

export default function InternshipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
