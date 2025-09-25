import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 py-16 md:py-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Outsourcing, Software, Consulting, Websites</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">We make you money and/or DIE TRYING!</h1>
            <p className="mt-5 text-zinc-600 dark:text-zinc-300">MattyJacks delivers custom AI solutions, elite freelancers, and idea-to-income execution with agility and heart.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-500">Share Your Vision</Link>
              <a href="tel:+16039999420" className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900">Call Us</a>
            </div>
          </div>
          <div className="aspect-square rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-200 to-emerald-400/70 dark:from-emerald-900 dark:to-emerald-700/40" />
        </div>
      </section>

      {/* About: Led by Matt */}
      <section id="about" className="px-4 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Led by Matt</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">We Create Unique Campaigns That Help Your Business Grow</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">Matt is a strategist and builder known for forming strong partnerships with talented freelancers worldwide—delivering premium results at affordable rates.</p>
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
              {t:"Custom AI Solutions",d:"AI-powered software and web apps tailored to your goals."},
              {t:"Elite Freelancers",d:"Top global talent, coordinated for speed and quality."},
              {t:"Idea-to-Income",d:"From napkin sketch to MVP and revenue."},
              {t:"Web Design",d:"Beautiful, conversion-focused websites."},
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

      {/* Process */}
      <section id="process" className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {t:"Share Your Vision",d:"We start with your goals."},
              {t:"Strategic Assessment",d:"We align on direction and roadmap."},
              {t:"Build and Execute",d:"We build quickly with elite talent."},
              {t:"Deliver Results",d:"Launch, iterate, and impact revenue."},
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

      {/* Final CTA */}
      <section className="px-4 py-16 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto md:flex md:items-center md:justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Make Money?</h2>
          <p className="mt-2 md:mt-0 opacity-90">Share your vision with us, and let’s turn it into reality.</p>
          <Link href="/contact" className="mt-4 md:mt-0 inline-flex items-center rounded-md bg-white text-emerald-700 px-5 py-3 font-semibold hover:bg-zinc-100">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
