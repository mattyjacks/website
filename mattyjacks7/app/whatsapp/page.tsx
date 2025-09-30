"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/animations/scroll-animations";

const GROUP_URL =
  "https://chat.whatsapp.com/LRuPD1Pywtm6KnjqqJ6Bfd";
const DIRECT_WA_URL =
  "https://api.whatsapp.com/send?phone=15106005735&text=Hi%20Matt%20%F0%9F%91%8B%20I%E2%80%99m%20%3CYour%20Name%3E.%20Here%20are%20my%20skills%20and%20what%20I%20want%20to%20do%3A%20";

export default function WhatsAppPage() {
  const headerRef = useScrollAnimation(fadeInUp);
  const groupRef = useScrollAnimation(fadeInUp);
  const rulesRef = useScrollAnimation(fadeInUp);
  const connectRef = useScrollAnimation(fadeInUp);
  const footerRef = useScrollAnimation(fadeInUp);

  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div ref={headerRef}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Welcome to the hidden page!
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
                className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2.5 text-white font-semibold hover:bg-emerald-500"
              >
                Join WhatsApp Group
              </a>
              <a
                href={DIRECT_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Message Matt Directly
              </a>
              <a
                href="tel:+15106005735"
                className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Call +1 (510) 600-5735
              </a>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div ref={rulesRef} className="mt-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <h2 className="text-xl font-bold">Read the Rules</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>No calling without permission.</li>
            <li>No spamming. Keep it professional.</li>
            <li>Only promote with permission.</li>
            <li>No scamming.</li>
            <li>Mute yourself on calls.</li>
            <li>No buying or selling any kind of account, especially Upwork.</li>
          </ul>
        </div>

        {/* More places to connect */}
        <div ref={connectRef} className="mt-10 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold">Discord</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              The correct invite link will always be available on the contact page.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center rounded-md bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Go to Contact
            </Link>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold">Follow Matt on X</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Matt is very available in public replies.
            </p>
            <a
              href="https://x.com/MattyJacksX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm text-white font-medium hover:bg-emerald-500"
            >
              Follow @MattyJacksX
            </a>
          </div>
        </div>

        {/* How to reach out */}
        <div ref={footerRef} className="mt-10 text-sm text-zinc-700 dark:text-zinc-300">
          Prefer email? {" "}
          <a
            href="mailto:Matt@MattyJacks.com?subject=I%20want%20to%20work%20with%20MattyJacks"
            className="underline decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Email Matt@MattyJacks.com
          </a>
          . When you message Matt on WhatsApp, please include your name, skills, and what you want to do in life in your first message.
        </div>
      </div>
    </main>
  );
}


