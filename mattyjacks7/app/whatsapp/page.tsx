import Link from "next/link";

export const metadata = {
  title: "WhatsApp – MattyJacks",
  description: "Message MattyJacks on WhatsApp to get started fast.",
};

const WHATSAPP_URL =
  "https://wa.me/16039999420?text=Hi%20Matt%2C%20I%27d%20like%20to%20work%20with%20MattyJacks.";

export default function WhatsAppPage() {
  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">WhatsApp</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          Fastest way to reach Matt. Send a message and we’ll reply as soon as possible during
          business hours.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                Chat via WhatsApp
              </div>
              <div className="mt-2 text-2xl font-bold">+1 (603) 999-9420</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Mon–Fri 9:00AM – 5:00PM EST
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open WhatsApp
              </a>
              <a
                href="tel:+16039999420"
                className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
          Prefer email? {" "}
          <a
            href="mailto:Matt@MattyJacks.com?subject=WhatsApp%20Follow-up"
            className="underline decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Email Matt@MattyJacks.com
          </a>
          .
        </div>

        <div className="mt-12 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <h2 className="text-xl font-bold">Looking to join the team?</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            We regularly collaborate with talented freelancers around the world. Send us a WhatsApp
            with a short intro and links to your best work.
          </p>
          <div className="mt-3">
            <Link href="/contact" className="inline-flex text-sm underline decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300">
              Or head to the contact page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
