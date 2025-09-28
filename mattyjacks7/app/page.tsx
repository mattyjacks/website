import Link from "next/link";
import MoneyCube from "../components/money-cube";
import AnimatedClouds from "../components/animated-clouds";
import { ClientThemeProvider } from "../components/client-theme-mount";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <ClientThemeProvider>
          <AnimatedClouds
            imageSrc="/images/cloud-image_upscayl_2x_upscayl-standard-4x.jpg"
            darkImageSrc="/images/seamless-space-jpg-_upscayl_3x_upscayl-standard-4x.jpg"
            opacity={0.15}
            verticalSpeedSec={18}
            horizontalRangePx={3000}
            // Slower, exploratory horizontal drift
            horizontalPixelsPerSecond={8}
            // Keep from zooming out too much
            minScale={0.6}
            maxScale={1}
            verticalMultiplier={2.5}
          />
        </ClientThemeProvider>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center pt-20 pb-16 px-6 sm:px-6">
          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            {/* Enhanced contrast helper with better readability */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/20 via-white/10 to-transparent dark:from-zinc-800/30 dark:via-zinc-900/20 dark:to-transparent"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
              }}
            />
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">Outsourcing, Software, Consulting, Websites</p>
              <div className="h-px w-8 bg-gradient-to-r from-emerald-400 to-transparent"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight text-center lg:text-left">
              <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">We make you</span>
              <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-black">money</span>
              <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">and/or</span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent font-black">DIE TRYING!</span>
            </h1>
            <div className="mt-8 space-y-6 px-2 lg:px-0 text-center lg:text-left">
              <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">MattyJacks delivers custom AI solutions, elite freelancers, and idea-to-income execution with unusual speed and care. We operate like a special forces unit for growth: small, senior, and ruthless about outcomes.</p>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg mx-auto lg:mx-0">You bring the goal. We assemble the right talent, spin up the plan, and ship. No bloated teams. No endless decks. Just results.</p>
            </div>
            <div className="relative z-20 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
              >
                <span className="relative z-10">Share Your Vision</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+16039999420"
                className="group inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-zinc-900 dark:text-white bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                <svg className="mr-2 w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
                <span className="ml-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors hidden xs:inline">(603) 999-9420</span>
              </a>
            </div>
          </div>
          <ClientThemeProvider>
            <MoneyCube className="rounded-2xl" />
          </ClientThemeProvider>
        </div>
      </section>

      {/* About: Led by Matt */}
      <section id="about" className="px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Led by Matt</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">We create unique campaigns that grow your revenue</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">Matt is a strategist and builder known for forming strong partnerships with talented freelancers worldwide&mdash;delivering premium results at practical rates. We design for conversions first, then add beauty.</p>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">Our network includes engineers, designers, analysts, and operators who have shipped products used by millions. You get senior execution without the agency tax.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Learn more</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-16 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Our Services</p>
              <h2 className="text-3xl font-bold">What can we do for you?</h2>
            </div>
            <Link href="/contact" className="hidden sm:inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-500">More Services</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {t:"Custom AI Solutions",d:"AI copilots, internal tools, and automations mapped to your workflows to reduce cost and increase throughput."},
              {t:"Elite Freelancers",d:"Handpicked engineers, designers, writers, and operators. Senior talent only. Coordinated for speed and quality."},
              {t:"Idea-to-Income",d:"From napkin sketch to MVP to first dollars. We prototype fast, test in the wild, and iterate with real feedback."},
              {t:"Web Design",d:"Beautiful, disciplined, conversion-focused sites. Clear offers, crisp copy, and performance that ranks."},
            ].map((s,i)=> (
              <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
                <h3 className="font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{s.d}</p>
                <Link href="/contact" className="mt-4 inline-flex text-sm text-emerald-700 dark:text-emerald-300 hover:underline">Learn More</Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-zinc-600 dark:text-zinc-300 max-w-prose">
            We keep scopes small and cycles short. Most engagements start with a punchy, low-risk sprint to ship something valuable within days, not months.
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {t:"Share Your Vision",d:"A short call to unpack goals, constraints, and what success looks like for you."},
              {t:"Strategic Assessment",d:"We propose a focused plan with scope, timeline, and expected outcomes&mdash;in plain English."},
              {t:"Build and Execute",d:"We assemble the senior talent, ship fast, and communicate clearly. No babysitting required."},
              {t:"Deliver Results",d:"Launch, instrument, iterate. We are allergic to vanity metrics&mdash;we track what moves revenue."},
            ].map((s,i)=> (
              <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
                <h3 className="font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{s.d}</p>
                <Link href="/contact" className="mt-4 inline-flex text-sm text-emerald-700 dark:text-emerald-300 hover:underline">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-4 py-16 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">Who we help</h2>
          <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
            <li>Software &amp; SaaS</li>
            <li>E-commerce &amp; DTC</li>
            <li>Agencies &amp; Studios</li>
            <li>Local Services</li>
            <li>Professional Services</li>
            <li>Education &amp; Info Products</li>
            <li>Marketplaces</li>
            <li>Media &amp; Community</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto md:flex md:items-center md:justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Make Money?</h2>
          <p className="mt-2 md:mt-0 opacity-90">Share your vision with us, and let&apos;s turn it into reality.</p>
          <Link href="/contact" className="mt-4 md:mt-0 inline-flex items-center rounded-md bg-white text-emerald-700 px-5 py-3 font-semibold hover:bg-zinc-100">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}

