"use client";

import Link from "next/link";
import {
  Bot,
  Video,
  TrendingUp,
  DollarSign,
  Sparkles,
  Shield,
  Megaphone,
  MessageCircle,
  Users,
  Phone,
  ArrowRight,
  Flame,
  Send,
} from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, slideInGrid, scaleIn } from "@/lib/animations/scroll-animations";

const services = [
  {
    icon: Bot,
    title: "Telegram Subscription Bots",
    description:
      "Automated Telegram bots that manage paid subscriptions, process payments, and deliver exclusive content to your subscribers - all hands-free. Set it up once and let it run.",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Professional post-production for adult content - cuts, color grading, effects, pacing, and formatting optimized for every platform. We make your content look studio-quality.",
  },
  {
    icon: TrendingUp,
    title: "Organic Marketing",
    description:
      "Grow your audience naturally through SEO, Reddit, Twitter/X, niche forums, and community engagement. Build a loyal fanbase without spending a dime on ads.",
  },
  {
    icon: DollarSign,
    title: "Paid Marketing",
    description:
      "Strategic ad campaigns across platforms that allow adult content. We maximize your ROI with tested creatives and targeting to drive paying subscribers at scale.",
  },
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description:
      "Cutting-edge AI tools for generating custom adult imagery and content. Expand your catalog, experiment with styles, and produce more without extra shoots.",
  },
  {
    icon: Shield,
    title: "Image & Video Watermarking",
    description:
      "Protect your content with custom watermarks - visible or invisible - to prevent unauthorized redistribution and piracy. Keep your work yours.",
  },
  {
    icon: Megaphone,
    title: "Advertisements",
    description:
      "Eye-catching ad creatives and strategic placement across adult ad networks. We handle the design, copy, and media buying to drive traffic and conversions.",
  },
  {
    icon: MessageCircle,
    title: "OnlyFans Chatters",
    description:
      "Trained chatters who engage with your subscribers 24/7, build personal connections, and maximize PPV sales, tips, and renewals around the clock.",
  },
  {
    icon: Bot,
    title: "OnlyFans Helper Bot",
    description:
      "Automated tools that handle welcome messages, mass DMs, scheduled posts, and subscriber management on OnlyFans - so you can focus on creating.",
  },
  {
    icon: Users,
    title: "Models for Clients",
    description:
      "We connect you with models available for both adult content creation and mainstream influencer marketing campaigns. Whether you need talent for brand deals or adult shoots, we have you covered.",
  },
];

export default function AdultPage() {
  const heroRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const servicesRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const ctaRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 dark:from-rose-950/20 dark:via-zinc-900 dark:to-fuchsia-950/20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-6">
              <Flame className="w-4 h-4" />
              <span>Adult Industry Services</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
              Grow Your Adult Business
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
              From <span className="font-bold text-rose-600 dark:text-rose-400">OnlyFans management</span> to AI content generation, we build the tools and services that help adult creators and businesses scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://t.me/mattyjacks1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0088cc] to-[#0099dd] rounded-xl shadow-lg hover:shadow-[#0088cc]/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#0088cc]/50"
              >
                <FaTelegramPlane className="mr-2 w-5 h-5" />
                <span>Join Our Telegram Group</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://t.me/MattyJacks"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-zinc-900 dark:text-white bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl hover:border-[#0088cc] dark:hover:border-[#0099dd] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                <Send className="mr-2 w-5 h-5 text-[#0088cc]" />
                <span>Message @MattyJacks</span>
              </a>
            </div>

            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Or call us: <a href="tel:+16039999420" className="font-semibold text-rose-600 dark:text-rose-400 hover:underline">603-999-9420</a> <span className="text-zinc-400 dark:text-zinc-500">(call only - no texts)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-700 dark:text-rose-300 mb-2">
              What We <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">Build & Offer</span>
            </p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
              Services for the Adult Industry
            </h2>
          </div>

          <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-300 dark:hover:border-rose-500 hover:-translate-y-2 transition-all duration-300 ease-out"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-fuchsia-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4 group-hover:bg-rose-200 dark:group-hover:bg-rose-800/50 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid-Page Telegram CTA */}
      <section className="px-4 py-12 bg-gradient-to-r from-[#0088cc]/10 to-[#0099dd]/10 dark:from-[#0088cc]/5 dark:to-[#0099dd]/5 border-t border-[#0088cc]/20 dark:border-[#0088cc]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0088cc]/10 dark:bg-[#0088cc]/20 text-[#0088cc] text-sm font-semibold mb-4">
            <FaTelegramPlane className="w-4 h-4" />
            <span>Telegram</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Join the Community
          </h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6 max-w-2xl mx-auto">
            Our Telegram group is where we coordinate, share updates, and connect creators with opportunities. Jump in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://t.me/mattyjacks1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#0088cc] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#0088cc]/30 transition-all duration-300 hover:scale-105"
            >
              <FaTelegramPlane className="mr-2 w-5 h-5" />
              <span>t.me/mattyjacks1</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://t.me/MattyJacks"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#0088cc] bg-white dark:bg-zinc-800 border-2 border-[#0088cc]/30 dark:border-[#0088cc]/20 rounded-xl shadow-lg hover:shadow-xl hover:border-[#0088cc] dark:hover:border-[#0088cc] transition-all duration-300 hover:scale-105"
            >
              <Send className="mr-2 w-5 h-5" />
              <span>DM @MattyJacks</span>
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 py-12 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Some of these services are actively in development. We&apos;re building and expanding our offerings for the adult industry.
            <br />
            Reach out to discuss what&apos;s available today and what&apos;s coming soon.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-rose-600 via-fuchsia-500 to-rose-600 dark:from-rose-900 dark:via-fuchsia-800 dark:to-rose-900">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={ctaRef}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Scale Your Adult Business?
            </h2>
            <p className="text-xl text-rose-50 mb-8 leading-relaxed">
              Whether you&apos;re an independent creator or running an agency, we have the tools and team to help you grow. Let&apos;s talk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="https://t.me/mattyjacks1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#0088cc] rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#0088cc]/40 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <FaTelegramPlane className="mr-2 w-5 h-5" />
                <span>Join t.me/mattyjacks1</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://t.me/MattyJacks"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-rose-600 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <Send className="mr-2 w-5 h-5" />
                <span>Message @MattyJacks</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white/90 hover:text-white border-2 border-white/30 hover:border-white/60 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Contact Form
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="tel:+16039999420"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white/90 hover:text-white border-2 border-white/30 hover:border-white/60 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Phone className="mr-2 w-4 h-4" />
                603-999-9420
                <span className="ml-1 text-xs font-normal opacity-60">(no texts)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
