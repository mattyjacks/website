import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Navigation from "../components/navigation";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MattyJacks - We'll make you money and/or DIE TRYING!!!",
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
            {/* Header / Navigation */}
            <Navigation />

            {children}

            <footer className="mt-auto w-full bg-white dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Main footer content */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Contact Section */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">Contact</h3>
                    <div className="space-y-2">
                      <a
                        href="tel:+16039999420"
                        className="block font-semibold text-zinc-900 dark:text-zinc-100 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                        aria-label="Call MattyJacks"
                      >
                        603 999 9420
                      </a>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Mon-Fri 9:00AM - 5:00PM EST
                      </div>
                      <a
                        href="mailto:Matt@MattyJacks.com"
                        className="block text-zinc-900 dark:text-zinc-100 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 underline decoration-red-500/30 hover:decoration-red-500 underline-offset-4"
                        aria-label="Email MattyJacks"
                      >
                        Matt@MattyJacks.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Quick Links Section */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">Quick Links</h3>
                    <nav>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Go to Home page"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/resumes"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Go to Resume Sites page"
                          >
                            Resume Sites
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/leads"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Go to Leads page"
                          >
                            Leads
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Go to Contact page"
                          >
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/whatsapp"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Go to WhatsApp page"
                          >
                            WhatsApp
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/privacy"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                            aria-label="Go to Privacy Policy page"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  
                  {/* Company Info Section */}
                  <div className="md:text-right">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">MattyJacks</h3>
                    <div className="space-y-2">
                      <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                        © 2025 MattyJacks. All rights reserved.
                      </div>
                      <div className="text-zinc-500 dark:text-zinc-500 text-sm">
                        Building success, one project at a time.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
