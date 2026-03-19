import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Websites - Professional Resume Sites That Convert",
  description:
    "Get a professional resume website that helps you stand out and land more opportunities. Built by MattyJacks with modern design, mobile-first approach, and clear calls-to-action. View real examples.",
  keywords: [
    "resume website", "professional resume site", "online resume",
    "portfolio website", "personal website", "resume builder",
    "freelancer portfolio", "job search website", "career website",
    "resume web design", "MattyJacks resume sites",
  ],
  alternates: { canonical: "https://mattyjacks.com/resumes" },
  openGraph: {
    title: "Professional Resume Websites | MattyJacks",
    description: "Resume websites that convert. Modern design, mobile-first, clear calls-to-action. View real examples built by MattyJacks.",
    url: "https://mattyjacks.com/resumes",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Resume Websites That Convert | MattyJacks",
    description: "Professional resume sites built to help you stand out and land more opportunities.",
  },
};

export default function ResumesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
