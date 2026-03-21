"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, slideInGrid } from "@/lib/animations/scroll-animations";

export default function ContactPage() {
  const headerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const cardsRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const teamRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const sidebarRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div ref={headerRef}>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Contact
              </span>
            </h1>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300 max-w-prose leading-relaxed">
              Share your vision and we&apos;ll propose a fast, practical path to results. Whether you need a
              custom AI tool, a high-converting website, or elite freelancers, we&apos;ll help you move quickly.
            </p>
          </div>

          <div ref={cardsRef} className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:border-sky-500/50 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-lg">Email</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Matt@MattyJacks.com</p>
              <a
                href="mailto:Matt@MattyJacks.com?subject=I%20want%20to%20work%20with%20MattyJacks"
                className="group/btn relative mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-md hover:shadow-sky-500/25 hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
              >
                <span className="relative z-10">Send Email</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>

            <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:border-sky-500/50 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-lg">Phone</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">603 999 9420</p>
              <a
                href="tel:+16039999420"
                className="group/btn mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                Call Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>

            <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:border-sky-500/50 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-lg">WhatsApp</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Fastest way to reach Matt</p>
              <a
                href="/whatsapp"
                className="group/btn relative mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-md hover:shadow-sky-500/25 hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
              >
                <span className="relative z-10">Open WhatsApp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>

            <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:border-sky-500/50 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <h2 className="font-semibold text-lg">X (Twitter)</h2>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Follow Matt on X for updates and insights.</p>
              <a
                href="https://x.com/MattyJacksX"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                Follow @MattyJacksX
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>

          <div ref={teamRef} className="group mt-12 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 bg-white dark:bg-zinc-950 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/50">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  Join the Team
                </h2>
              </div>
            </div>
            <p className="mt-3 text-sm lg:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We regularly collaborate with talented freelancers around the world.
              If you&apos;re elite, fair, and chill, we&apos;d love to meet you.
            </p>
            <p className="mt-4 text-sm lg:text-base leading-relaxed">
              Apply via
              {" "}
              <Link
                href="/whatsapp"
                className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors duration-300 underline decoration-emerald-500 hover:decoration-sky-500"
              >
                WhatsApp
                <ArrowRight className="w-4 h-4" />
              </Link>
              {" "}
              with a short intro and links to your best work.
            </p>
          </div>
        </div>

        <aside ref={sidebarRef} className="space-y-6">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 text-center">
            <div className="mx-auto h-28 w-28 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800">
              <Image
                src="/images/MattyJacks-profile-pic-2025-jpg-1.jpg"
                alt="Matt (MattyJacks) profile picture"
                width={256}
                height={256}
                className="h-28 w-28 object-cover"
                priority
              />
            </div>
            <div className="mt-3">
              <h3 className="font-semibold">Matt (MattyJacks)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Builder • Operator • Recruiter</p>
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold text-lg mb-4">Why work with us?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Idea-to-income execution</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Elite, global freelancers</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Fast shipping, clear communication</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Websites and AI that convert</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
