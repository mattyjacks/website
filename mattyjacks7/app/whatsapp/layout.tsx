import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp - Message MattyJacks Directly or Join the Group",
  description:
    "Connect with MattyJacks on WhatsApp. Join the community group chat or send a direct message to Matt. Fastest way to reach us for project inquiries, freelance opportunities, or collaboration.",
  keywords: [
    "MattyJacks WhatsApp", "contact WhatsApp", "WhatsApp group",
    "freelancer WhatsApp", "business WhatsApp", "message MattyJacks",
  ],
  alternates: { canonical: "https://mattyjacks.com/whatsapp" },
  openGraph: {
    title: "WhatsApp - Connect with MattyJacks",
    description: "Join the MattyJacks WhatsApp group or message Matt directly. The fastest way to connect.",
    url: "https://mattyjacks.com/whatsapp",
    type: "website",
  },
};

export default function WhatsAppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
