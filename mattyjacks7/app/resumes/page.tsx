import ResumeCard from "../../components/resume-card";
import ResumeCTAButtons from "../../components/resume-cta-buttons";

export const metadata = {
  title: "Resume Sites - MattyJacks",
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
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-red-600">Resume</span>{" "}
            <span className="text-emerald-600">Sites</span>
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            We build stunning, conversion-focused resume sites that help you get hired faster. Here are a few featured examples.
          </p>
        </header>

        <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <ResumeCard key={item.url} title={item.title} url={item.url} desc={item.desc} />
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold">Want one like these?</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">We can launch your resume site quickly, with copy, design, and deployment handled for you.</p>
            </div>
            <ResumeCTAButtons />
          </div>
        </section>
      </div>
    </main>
  );
}
