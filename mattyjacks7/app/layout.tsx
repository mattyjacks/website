import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Script from "next/script";
import Navigation from "../components/navigation";
import ViewTracker from "../components/view-tracker";
import CloutCalculations from "../components/clout-calculations";
import AnythingButton from "../components/anything-button";
import "./globals.css";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://mattyjacks.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MattyJacks - Outsourcing, Websites, AI, Cold Calling & Freelancers | Do and/or DIE TRYING!!!",
    template: "%s | MattyJacks",
  },
  description:
    "MattyJacks is a holding company and full-service agency that builds websites, deploys cold calling teams, ships custom AI tools, and connects you with elite freelancers worldwide. Portfolio includes GiveGigs, CryptArtist Studio, and VentureCapitalArts. Based in New Hampshire, serving clients globally.",
  keywords: [
    "MattyJacks", "outsourcing agency", "website development", "web design",
    "cold calling", "lead generation", "custom AI solutions", "freelancers",
    "holding company", "GiveGigs", "CryptArtist Studio", "VentureCapitalArts",
    "business consulting", "software development", "merchant services",
    "high-risk merchant account", "payment processing", "copywriting",
    "graphic design", "SEO", "digital marketing", "freelance marketplace",
    "AI automation", "MVP development", "startup", "New Hampshire",
    "remote workers", "global talent", "idea to income", "resume websites",
    "TikTok marketing", "social media growth", "e-commerce",
  ],
  authors: [{ name: "Matt (MattyJacks)", url: siteUrl }],
  creator: "MattyJacks",
  publisher: "MattyJacks",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MattyJacks",
    title: "MattyJacks - Outsourcing, Websites, AI & Freelancers | Do and/or DIE TRYING!!!",
    description:
      "Full-service agency and holding company. We build websites that convert, deploy cold calling teams, ship custom AI tools, and connect you with elite global freelancers. Based in New Hampshire, serving the world.",
    images: [
      {
        url: "/images/twitter profile pic mattyjacks 2026 A1.png",
        width: 1200,
        height: 630,
        alt: "MattyJacks - Outsourcing, Websites, AI & Freelancers",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MattyJacksX",
    creator: "@MattyJacksX",
    title: "MattyJacks - Outsourcing, Websites, AI & Freelancers",
    description:
      "Full-service agency and holding company. Websites, cold calling, AI tools, and elite freelancers. Do and/or DIE TRYING!!!",
    images: ["/images/twitter profile pic mattyjacks 2026 A1.png"],
  },
  category: "business",
  classification: "Business Services",
  other: {
    "msapplication-TileColor": "#10b981",
    "apple-mobile-web-app-title": "MattyJacks",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "geo.region": "US-NH",
    "geo.placename": "New Hampshire",
    "geo.position": "43.1939;-71.5724",
    "ICBM": "43.1939, -71.5724",
    "rating": "General",
    "referrer": "origin-when-cross-origin",
    "revisit-after": "3 days",
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
      <head>
        {/* Preconnect hints for faster external resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://platform.twitter.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://docs.google.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mattyjacks.com" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://mattyjacks.com/#organization",
              name: "MattyJacks",
              url: "https://mattyjacks.com",
              logo: "https://mattyjacks.com/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png",
              image: "https://mattyjacks.com/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png",
              description: "MattyJacks is a holding company and full-service agency that builds websites, deploys cold calling teams, ships custom AI tools, and connects you with elite freelancers worldwide.",
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Matt",
                alternateName: "MattyJacks",
                url: "https://mattyjacks.com",
                jobTitle: "Founder & CEO",
                sameAs: [
                  "https://x.com/MattyJacksX",
                  "https://github.com/mattyjacks",
                ],
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-603-999-9420",
                  contactType: "sales",
                  email: "Matt@MattyJacks.com",
                  areaServed: ["US", "CA", "GB", "AU"],
                  availableLanguage: ["English"],
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    opens: "00:00",
                    closes: "23:59",
                  },
                },
              ],
              sameAs: [
                "https://x.com/MattyJacksX",
                "https://github.com/mattyjacks",
                "https://givegigs.com",
                "https://venturecapitalarts.com",
              ],
              areaServed: {
                "@type": "Place",
                name: "Worldwide",
              },
              knowsAbout: [
                "Web Development", "Cold Calling", "Lead Generation",
                "Custom AI Solutions", "Outsourcing", "Freelance Marketplace",
                "Merchant Services", "Payment Processing", "Copywriting",
                "Graphic Design", "SEO", "Digital Marketing", "TikTok Marketing",
                "Software Development", "MVP Development",
              ],
              slogan: "Do and/or DIE TRYING!!!",
            }),
          }}
        />

        {/* JSON-LD: WebSite with SearchAction for sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://mattyjacks.com/#website",
              name: "MattyJacks",
              url: "https://mattyjacks.com",
              description: "Full-service agency and holding company. Websites, cold calling, AI tools, and elite freelancers.",
              publisher: { "@id": "https://mattyjacks.com/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://mattyjacks.com/posts?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: "en-US",
            }),
          }}
        />

        {/* JSON-LD: LocalBusiness for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://mattyjacks.com/#localbusiness",
              name: "MattyJacks",
              url: "https://mattyjacks.com",
              telephone: "+1-603-999-9420",
              email: "Matt@MattyJacks.com",
              image: "https://mattyjacks.com/images/mattyjacks-site-logo_upscayl_3x_digital-art-4x.png",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressRegion: "NH",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 43.1939,
                longitude: -71.5724,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "00:00",
                closes: "23:59",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "3",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  author: { "@type": "Person", name: "Justin Hughes" },
                  reviewBody: "Great experience working with MattyJacks. Professional, fast, and delivered exactly what we needed.",
                },
                {
                  "@type": "Review",
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  author: { "@type": "Person", name: "Christian A." },
                  reviewBody: "Working with Matty is motivating because he is organized and dependable. He simplifies things, communicates well, and makes the work feel effortless.",
                },
                {
                  "@type": "Review",
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  author: { "@type": "Person", name: "Kenj R." },
                  reviewBody: "Collaborating with Matty has been a great experience. He's easy to communicate with, cool, and chill to work with.",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "MattyJacks Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development", description: "Custom websites that convert visitors into customers" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cold Calling Operations", description: "Managed cold calling teams for B2B lead generation" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom AI Solutions", description: "AI copilots, internal tools, and workflow automations" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elite Freelancers", description: "Handpicked engineers, designers, writers, and operators" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Merchant Services", description: "High-risk and low-risk payment processing solutions" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Copywriting & Marketing", description: "High-converting copy for websites, emails, and ads" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design", description: "Logos, brand identity, social media graphics, and marketing materials" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation", description: "Custom lead databases and targeted prospecting" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Resume Websites", description: "Professional resume sites that convert" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "TikTok & Social Media Growth", description: "Algorithm mastery and organic growth strategies" } },
                ],
              },
            }),
          }}
        />

        {/* JSON-LD: BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mattyjacks.com" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://mattyjacks.com/services" },
                { "@type": "ListItem", position: 3, name: "Merchant Services", item: "https://mattyjacks.com/merchants" },
                { "@type": "ListItem", position: 4, name: "Resume Sites", item: "https://mattyjacks.com/resumes" },
                { "@type": "ListItem", position: 5, name: "Free Leads", item: "https://mattyjacks.com/leads" },
                { "@type": "ListItem", position: 6, name: "Blog", item: "https://mattyjacks.com/posts" },
                { "@type": "ListItem", position: 7, name: "Contact", item: "https://mattyjacks.com/contact" },
              ],
            }),
          }}
        />

        {/* JSON-LD: FAQPage for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What services does MattyJacks offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "MattyJacks offers website development, cold calling operations, custom AI solutions, elite freelancer staffing, merchant services (high-risk and low-risk payment processing), copywriting, graphic design, lead generation databases, resume websites, and TikTok/social media growth services.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can I contact MattyJacks?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can reach MattyJacks 24/7 by calling (603) 999-9420, emailing Matt@MattyJacks.com, or messaging via WhatsApp. Visit mattyjacks.com/contact for all contact options.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does MattyJacks offer high-risk merchant accounts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. MattyJacks specializes in high-risk merchant accounts with 20+ proven bank relationships. We serve industries like CBD, adult entertainment, nutraceuticals, online gaming, subscription boxes, and more. Fast approvals with competitive rates for USA and Canada businesses.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is GiveGigs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "GiveGigs (givegigs.com) is a freelance marketplace built by MattyJacks that connects clients with talented freelancers worldwide. It features AI-powered task matching, free tools for freelancers, and an AI agent ecosystem.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does MattyJacks build websites?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Website development is our most popular service. We build modern, mobile-first, SEO-optimized websites designed to convert visitors into customers. Our sites have generated leads years after launch, like TristateHoney.com which still brings in qualified inquiries.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where is MattyJacks located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "MattyJacks is based in New Hampshire, USA, but serves clients globally with a worldwide network of freelancers and remote workers.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Google Analytics 4 - loaded after page interactive for better Core Web Vitals */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LJ6LM6VMVV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LJ6LM6VMVV', {
              page_title: document.title,
              send_page_view: true
            });
          `}
        </Script>
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ViewTracker />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* Header / Navigation */}
            <Navigation />

            {children}

            <footer role="contentinfo" aria-label="Site footer" className="mt-auto w-full bg-white dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Main footer content */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Contact Section */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">Contact</h3>
                    <div className="space-y-2">
                      <a
                        href="tel:+16039999420"
                        className="block font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                        aria-label="Call MattyJacks"
                      >
                        603 999 9420
                      </a>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Call 24/7/365 Any Time
                      </div>
                      <a
                        href="mailto:Matt@MattyJacks.com"
                        className="block text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200 underline decoration-sky-500/30 hover:decoration-sky-500 underline-offset-4"
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
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to Home page"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/services"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to Services page"
                          >
                            Services
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/merchants"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to Merchant Services page"
                          >
                            Merchant Services
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/resumes"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to Resume Sites page"
                          >
                            Resume Sites
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/leads"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to Leads page"
                          >
                            Leads
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to Contact page"
                          >
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/whatsapp"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
                            aria-label="Go to WhatsApp page"
                          >
                            WhatsApp
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/privacy"
                            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200"
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
                    <div className="space-y-3">
                      <a
                        href="https://x.com/MattyJacksX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-200 font-medium"
                        aria-label="Follow MattyJacks on X"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        Follow on X
                      </a>
                      <div className="text-zinc-600 dark:text-zinc-400 text-sm">
                        &copy; 2025 MattyJacks. All rights reserved.
                      </div>
                      <div className="text-zinc-500 dark:text-zinc-500 text-sm">
                        Do and/or DIE TRYING!!!
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Clout Calculations - TEMPORARILY DISABLED FOR DEBUGGING */}
                {/* <CloutCalculations /> */}
              </div>
            </footer>          </div>
          <AnythingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
