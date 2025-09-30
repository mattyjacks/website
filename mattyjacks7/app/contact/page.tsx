"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, slideInGrid } from "@/lib/animations/scroll-animations";

export default function ContactPage() {
  const headerRef = useScrollAnimation(fadeInUp);
  const cardsRef = useScrollAnimation(slideInGrid);
  const teamRef = useScrollAnimation(fadeInUp);
  const sidebarRef = useScrollAnimation(fadeInUp);

  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div ref={headerRef}>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact</h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-prose">
              Share your vision and we'll propose a fast, practical path to results. Whether you need a
              custom AI tool, a high-converting website, or elite freelancers, we'll help you move quickly.
            </p>
          </div>

          <div ref={cardsRef} className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
              <h2 className="font-semibold">Email</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Matt@MattyJacks.com</p>
              <a
                href="mailto:Matt@MattyJacks.com?subject=I%20want%20to%20work%20with%20MattyJacks"
                className="mt-4 inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-500"
              >
                Send Email
              </a>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
              <h2 className="font-semibold">Phone</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">603 999 9420</p>
              <a
                href="tel:+16039999420"
                className="mt-4 inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Call Now
              </a>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
              <h2 className="font-semibold">WhatsApp</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Fastest way to reach Matt</p>
              <a
                href="/whatsapp"
                className="mt-4 inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-500"
              >
                Open WhatsApp Page
              </a>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
              <h2 className="font-semibold">Resume Sites</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Get your own high-converting resume site.</p>
              <Link
                href="/resumes"
                className="mt-4 inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                View Examples
              </Link>
            </div>
          </div>

          <div ref={teamRef} className="mt-12 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h2 className="text-xl font-bold">Join the Team</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              We regularly collaborate with talented freelancers around the world.
              If you’re elite, fair, and chill, we’d love to meet you.
            </p>
            <p className="mt-3 text-sm">
              Apply via
              {" "}
              <Link href="/whatsapp" className="underline decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300">
                WhatsApp
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
            <h3 className="font-semibold">Why work with us?</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc pl-5">
              <li>Idea-to-income execution</li>
              <li>Elite, global freelancers</li>
              <li>Fast shipping, clear communication</li>
              <li>Websites and AI that convert</li>
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold">Prefer email?</h3>
            <a
              href="mailto:Matt@MattyJacks.com?subject=I%20want%20to%20work%20with%20MattyJacks"
              className="mt-3 inline-flex items-center rounded-md bg-zinc-900 text-white px-4 py-2 font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Email Matt
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
