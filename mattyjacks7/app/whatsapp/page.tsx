"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/animations/scroll-animations";

const GROUP_URL =
  "https://chat.whatsapp.com/LRuPD1Pywtm6KnjqqJ6Bfd";
const DIRECT_WA_URL =
  "https://api.whatsapp.com/send?phone=15106005735&text=Hi%20Matt%20%F0%9F%91%8B%20I%E2%80%99m%20%3CYour%20Name%3E.%20Here%20are%20my%20skills%20and%20what%20I%20want%20to%20do%3A%20";

export default function WhatsAppPage() {
  const headerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const groupRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const rulesRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const connectRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const footerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div ref={headerRef}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Welcome to the <span className="font-bold text-red-600 dark:text-red-500">hidden page!</span>
        </h1>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          This should only be shared with <span className="font-semibold">COOL PEOPLE</span>, not just anyone.
          If someone shared this with you, you&apos;re <span className="font-semibold">special</span> to that someone.
          Live your precious life as long as you can - you&apos;re dear to those around you.
        </p>
        </div>

        {/* Group CTA */}
        <div ref={groupRef} className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <div className="flex flex-col gap-3">
            <div className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              MattyJacks.com Public Work - Chat
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This group chat is where Matt personally drops some of the latest work coming down the
              pipeline in his outsourcing world, like dropping delicious chum for hungry sharks. You&apos;re the sharks. 🦈
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-white font-semibold shadow-lg hover:shadow-red-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <span className="relative z-10">Join WhatsApp Group</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href={DIRECT_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-semibold bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                Message Matt Directly
              </a>
              <a
                href="tel:+15106005735"
                className="group inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-semibold bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                Call +1 (510) 600-5735
              </a>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div ref={rulesRef} className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <h2 className="text-xl font-bold">Read the Rules</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>No calling without permission.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>No spamming. Keep it professional.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>Only promote with permission.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>No scamming.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>Mute yourself on calls.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>No buying or selling any kind of account, especially Upwork.</span>
            </li>
          </ul>
        </div>

        {/* More places to connect */}
        <div ref={connectRef} className="mt-10 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 flex flex-col">
            <h3 className="font-semibold">Discord</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              The correct invite link will always be available on the contact page.
            </p>
            <div className="mt-auto pt-4 flex justify-end">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-red-500/25 hover:shadow-xl dark:from-zinc-100 dark:to-white dark:text-zinc-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <span className="relative z-10">Go to Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 flex flex-col">
            <h3 className="font-semibold">Follow Matt on X</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Matt is very available in public replies.
            </p>
            <div className="mt-auto pt-4 flex justify-end">
              <a
                href="https://x.com/MattyJacksX"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-sm text-white font-semibold shadow-lg hover:shadow-red-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <FaXTwitter className="relative z-10 w-4 h-4" />
                <span className="relative z-10">@MattyJacksX</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* How to reach out */}
        <div ref={footerRef} className="mt-10 text-sm text-zinc-700 dark:text-zinc-300">
          Prefer email? {" "}
          <a
            href="mailto:Matt@MattyJacks.com?subject=I%20want%20to%20work%20with%20MattyJacks"
            className="underline decoration-emerald-500 hover:decoration-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
          >
            Email Matt@MattyJacks.com
          </a>
          . When you message Matt on WhatsApp, please include your name, skills, and what you want to do in life in your first message.
        </div>
      </div>
    </main>
  );
}


