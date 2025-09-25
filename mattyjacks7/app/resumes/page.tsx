import Link from "next/link";

export const metadata = {
  title: "Resume Sites – MattyJacks",
  description:
    "High-converting resume sites built fast. See featured examples and get yours started.",
};

const featured = [
  {
    title: "relentlessjavian",
    url: "https://relentlessjavian.vercel.app/",
    desc: "Simple, clean, and focused on conversions.",
  },
  {
    title: "moses-resume-web",
    url: "https://moses-resume-web.vercel.app/",
    desc: "Professional presentation with clear calls-to-action.",
  },
  {
    title: "resume-julienne",
    url: "https://resume-julienne.vercel.app/",
    desc: "Elegant layout and strong portfolio highlights.",
  },
];

export default function ResumesPage() {
  return (
    <main className="min-h-[70vh] px-4 py-14">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Resume Sites</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            We build stunning, conversion-focused resume sites that help you get hired faster. Here are a few featured examples.
          </p>
        </header>

        <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div key={item.url} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
              <div className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Featured</div>
              <h2 className="mt-2 text-xl font-semibold break-words">{item.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.desc}</p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-500"
                >
                  View Site
                </a>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline decoration-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {new URL(item.url).host}
                </a>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold">Want one like these?</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">We can launch your resume site quickly, with copy, design, and deployment handled for you.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-500">Get Yours</Link>
              <a href="tel:+16039999420" className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900">Call Matt</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
