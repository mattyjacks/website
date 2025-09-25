import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MattyJacks – We'll make you money and/or DIE TRYING!!!",
  description:
    "Outsourcing, Software, Consulting, Websites. Custom AI, elite freelancers, idea-to-income execution, and web design that converts.",
  openGraph: {
    images: [
      {
        url: "/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png",
        width: 1200,
        height: 630,
        alt: "MattyJacks",
      },
    ],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <div className="w-full bg-zinc-900 text-zinc-100 text-xs sm:text-sm">
              <div className="max-w-6xl mx-auto px-4 py-2 text-center">
                <a href="tel:+16039999420" className="hover:text-emerald-400">
                  603 999 9420
                </a>
              </div>
            </div>

            {/* Header / Navigation */}
            <header className="w-full sticky top-0 z-30 border-b border-zinc-200/70 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/60 backdrop-blur">
              <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" aria-label="MattyJacks Home">
                  <Image
                    src="/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png"
                    alt="MattyJacks logo"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
                <nav className="flex items-center gap-6 text-sm">
                  <Link href="/resumes" className="hidden sm:inline-block hover:text-emerald-600 dark:hover:text-emerald-400">
                    Resume Sites
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-emerald-500"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </header>

            {children}

            <footer className="mt-auto w-full border-t border-zinc-200/70 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">
              <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Contact</div>
                  <a href="tel:+16039999420" className="mt-2 block font-semibold hover:text-emerald-700 dark:hover:text-emerald-300">603 999 9420</a>
                  <div className="text-zinc-600 dark:text-zinc-400">Mon–Fri 9:00AM – 5:00PM EST</div>
                  <a href="mailto:Matt@MattyJacks.com" className="mt-2 block underline decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300">Matt@MattyJacks.com</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Quick Links</div>
                  <ul className="mt-2 space-y-2">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/resumes" className="hover:underline">Resume Sites</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link href="/whatsapp" className="hover:underline">WhatsApp</Link></li>
                  </ul>
                </div>
                <div className="md:text-right">
                  <div className="text-zinc-600 dark:text-zinc-400"> 2025 MattyJacks. All rights reserved.</div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
