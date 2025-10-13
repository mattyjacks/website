"use client";

import Link from "next/link";
import { Phone, Code, Palette, PenTool } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, slideInGrid } from "@/lib/animations/scroll-animations";

export default function ServicesPage() {
  const heroRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const servicesRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const ctaRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-16 pt-24 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/30 dark:from-emerald-950/10 dark:via-zinc-900/10 dark:to-emerald-950/10">
        <div className="max-w-6xl mx-auto">
          <div ref={heroRef} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-4">
              What We <span className="font-bold text-red-600 dark:text-red-500">Offer</span>
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              From websites that convert to cold calling teams that close, we deliver the tools and talent you need to grow your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div ref={servicesRef} className="space-y-16">
            
            {/* Website Making - MOST IMPORTANT */}
            <div className="group relative rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 p-8 lg:p-12 bg-white dark:bg-zinc-950 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="absolute -top-4 left-8">
                <span className="inline-block px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                    Website Development
                  </h2>
                </div>
                
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  We build websites that don&apos;t just look good—they make you money. Every site is crafted with conversion in mind, combining stunning design with strategic copy and performance optimization.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">What you get:</h3>
                  <ul className="space-y-3">
                    {[
                      "Modern, mobile-first design that stands out from the competition",
                      "SEO optimization to rank on Google and drive organic traffic",
                      "Conversion-focused landing pages that turn visitors into customers",
                      "Fast loading speeds and flawless performance",
                      "Clear messaging and compelling calls-to-action",
                      "Integration with your existing tools and workflows",
                      "Ongoing support and maintenance options"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center mt-0.5">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-base text-zinc-700 dark:text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <strong className="text-emerald-700 dark:text-emerald-400">Real Results:</strong> Our websites don&apos;t just sit there—they work. We&apos;ve built sites that continue generating leads years after launch, like TristateHoney.com which still brings in qualified inquiries today.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cold Calling Operations */}
            <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-12 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-300">
                    <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                    Cold Calling Operations
                  </h2>
                </div>
                
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  We&apos;ve successfully deployed and managed cold calling teams for clients such as <strong className="text-emerald-600 dark:text-emerald-400">Lime Painting</strong> and <strong className="text-emerald-600 dark:text-emerald-400">Beskar Property Management</strong>, helping them generate qualified leads, close more sales, and expand their reach faster than ever.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Our process:</h3>
                  <ol className="space-y-3">
                    {[
                      "Research your target market",
                      "Build a qualified lead list",
                      "Craft a proven call script that converts",
                      "Deploy and manage your callers",
                      "Track performance and optimize results"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <span className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                  
                  <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <strong className="text-emerald-700 dark:text-emerald-400">Scalable Solution:</strong> Whether you need 1 caller or 20, we&apos;ll set up a system that delivers consistent, measurable growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copywriting & Marketing */}
            <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-12 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-300">
                    <PenTool className="w-8 h-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                    Copywriting & Marketing
                  </h2>
                </div>
                
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  Alongside outsourcing and cold calling, we provide copywriting services that help businesses sell more through words that work.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">We create high-converting:</h3>
                  <ul className="space-y-3">
                    {[
                      { icon: "✍️", text: "Website & landing page copy" },
                      { icon: "📧", text: "Email campaigns and sequences" },
                      { icon: "📱", text: "Ad and social media copy" },
                      { icon: "📖", text: "Brand storytelling and product launches" }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <span className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mt-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <strong className="text-red-700 dark:text-red-400">Bottom Line:</strong> With us, you don&apos;t just get words—you get copy that builds profit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Design */}
            <div className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-12 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-300">
                    <Palette className="w-8 h-8 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">
                    Graphic Design
                  </h2>
                </div>
                
                <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                  Professional design that elevates your brand and drives results. From logos to marketing materials, we create visuals that capture attention and communicate your message with clarity and impact.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Our design services include:</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {[
                      "Logo design and brand identity",
                      "Social media graphics and ad creatives",
                      "Business cards and print materials",
                      "Infographics and data visualization",
                      "Product mockups and packaging",
                      "Email templates and newsletters",
                      "Presentation decks and pitch materials",
                      "Banner ads and display advertising"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center mt-0.5">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-base text-zinc-700 dark:text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      We work with talented designers who understand both aesthetics and marketing. Every design is crafted to align with your brand and support your business goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-emerald-50/30 via-white to-red-50/30 dark:from-emerald-950/10 dark:via-zinc-900/10 dark:to-red-950/10">
        <div className="max-w-4xl mx-auto">
          <div ref={ctaRef} className="text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                Let&apos;s talk about your goals and how we can help you achieve them. No pressure, no BS—just real solutions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg hover:shadow-red-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <a
                href="tel:+16039999420"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-zinc-900 dark:text-white bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 hover:scale-105"
              >
                <Phone className="mr-2 w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                (603) 999-9420
              </a>
            </div>
            
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Available Mon-Fri 9:00AM - 5:00PM EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
