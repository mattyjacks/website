import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Posts - Insights, Updates & Articles from MattyJacks",
  description:
    "Read the latest articles, insights, and updates from MattyJacks. Topics include web development, outsourcing, AI, freelancing, business growth, and entrepreneurship.",
  keywords: [
    "MattyJacks blog", "business blog", "web development articles",
    "outsourcing insights", "AI articles", "freelancing tips",
    "entrepreneurship blog", "startup articles", "tech blog",
  ],
  alternates: { canonical: "https://mattyjacks.com/posts" },
  openGraph: {
    title: "Blog & Posts | MattyJacks",
    description: "Insights, updates, and articles on web development, AI, outsourcing, and business growth.",
    url: "https://mattyjacks.com/posts",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MattyJacks Blog",
    description: "Articles on web dev, AI, outsourcing, and business growth.",
  },
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
