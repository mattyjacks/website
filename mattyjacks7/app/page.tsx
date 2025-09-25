import Link from "next/link";
import AnimatedClouds from "../components/animated-clouds";
import HeroCube from "../components/hero-cube";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <AnimatedClouds
          imageSrc="/images/cloud-image_upscayl_2x_upscayl-standard-4x.jpg"
          opacity={0.35}
          verticalSpeedSec={50}
          horizontalRangePx={3000}
          // Slower, exploratory horizontal drift
          horizontalPixelsPerSecond={8}
          minDriftSec={6}
          maxDriftSec={18}
          // Keep from zooming out too much
          minScale={0.6}
          maxScale={1}
          // Sunbeams overlay
          showBeams
          beamsOpacity={0.32}
          beamsSpeedSec={28}
        />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 py-16 md:py-24">
          <div className="relative">
            {/* Contrast helper behind text for readability over beams */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
              style={{
                background:
                  "radial-gradient(140% 120% at 10% 20%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.0) 70%)",
              }}
            />
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Outsourcing, Software, Consulting, Websites</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">We make you money and/or DIE TRYING!</h1>
            <p className="mt-5 text-zinc-600 dark:text-zinc-300">MattyJacks delivers custom AI solutions, elite freelancers, and idea-to-income execution with unusual speed and care. We operate like a special forces unit for growth: small, senior, and ruthless about outcomes.</p>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">You bring the goal. We assemble the right talent, spin up the plan, and ship. No bloated teams. No endless decks. Just results.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-500">Share Your Vision</Link>
              <a href="tel:+16039999420" className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900">Call Us</a>
            </div>
          </div>
          <HeroCube className="rounded-2xl border border-zinc-200 dark:border-zinc-800" />
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

      {/* Results / Stats */}
      <section className="px-4 py-16 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">Selected Results</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-prose">Every project is different, but the pattern is the same: tight scopes, fast shipping, measurable wins.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              {k:"-47%",v:"Support costs",d:"AI + workflow fixes"},
              {k:"3.2x",v:"Lead volume",d:"Landing page + offer"},
              {k:"12 days",v:"MVP to revenue",d:"Validation-first build"},
              {k:"<1 sec",v:"TTFB",d:"Performance + caching"},
            ].map((s,i)=> (
              <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
                <div className="text-3xl font-extrabold">{s.k}</div>
                <div className="mt-1 font-semibold">{s.v}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold">What clients say</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {[ 
              {q:"They shipped an MVP in under two weeks and it actually made money.",a:"Founder, SaaS"},
              {q:"Clear plan, clean execution, no drama. We&apos;re keeping them on retainer.",a:"COO, E-commerce"},
            ].map((t,i)=> (
              <blockquote key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
                <p className="text-zinc-800 dark:text-zinc-100">“{t.q}”</p>
                <footer className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{t.a}</footer>
              </blockquote>
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

