"use client";



import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, fadeInLeft, slideInGrid, scaleIn } from "@/lib/animations/scroll-animations";
import { Rocket, Target, Briefcase, Zap, ExternalLink, MessageCircle, DollarSign, Clock, FileText } from "lucide-react";
import ScaledIframe from "@/components/scaled-iframe";

export default function InternshipPage() {
  const headerRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const overviewRef = useScrollAnimation<HTMLDivElement>(fadeInLeft);
  const programRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const compensationRef = useScrollAnimation<HTMLDivElement>(scaleIn);
  const portfolioRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const videoRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const ctaRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  return (
    <main className="min-h-screen flex flex-col pt-24 pb-20">

      {/* Hero Section */}
      <section className="px-4 py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div ref={headerRef} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-bold uppercase tracking-wider mb-6">
              <Rocket className="w-4 h-4" />
              We&apos;re Hiring
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              MattyJacks <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-400">Internship</span> Opportunity
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-10">
              Join our specialized internship program focused on the emerging field of <strong className="text-zinc-900 dark:text-white">Vibe Coding</strong>. Build your portfolio, learn AI-driven development, and start making money immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://givegigs.com/timer"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-sky-600 via-blue-500 to-emerald-500 rounded-xl shadow-lg hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <span className="mr-2">Here for the Internship?</span>
                <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href="https://chat.whatsapp.com/BtYHOmQWjLaK5vUfgdygqd?mode=hq2tcla"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#25D366] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -translate-x-full skew-x-12"></div>
                <MessageCircle className="w-6 h-6 mr-2" />
                Join the WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <div ref={overviewRef} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 bg-white dark:bg-zinc-950 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              Overview
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We are currently seeking motivated individuals to join our cohort of recruits. While our official site is undergoing global updates, we are moving forward rapidly to support our growing project list. Our goal is to bridge the gap between traditional programming and modern AI-driven development.
            </p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">The <span className="font-bold text-sky-600 dark:text-sky-400">Program</span></p>
            <h2 className="text-3xl md:text-4xl font-bold">What You Will Do</h2>
          </div>

          <div ref={programRef} className="grid md:grid-cols-3 gap-8">
            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Skill Development</h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Receive hands-on training in Vibe Coding. You&apos;ll learn how to utilize Google Antigravity and other cutting-edge AI tools to create stunning websites efficiently.
              </p>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-7 h-7 text-sky-600 dark:text-sky-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Portfolio Building</h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Rapidly expand a professional portfolio by working on high-impact speculative projects for potential clients we are actively targeting.
              </p>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-950 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Performance Incentives</h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                If your speculative work successfully lands a new client, you&apos;ll earn performance bonuses and secure potential long-term jobs on those ongoing projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation & Logistics */}
      <section className="px-4 py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/seamless-space-jpg-_upscayl_3x_upscayl-standard-4x.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div ref={compensationRef} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Compensation & Logistics</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <DollarSign className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Base Rate: $4.00 per hour</h3>
                    <p className="text-emerald-100/70">As you learn and produce value. We ultimately aim to bill basic vibe coders out to our clients at $10/hr.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <Clock className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Time Tracking</h3>
                    <p className="text-emerald-100/70">All project hours and tasks are managed and tracked securely via the <a href="https://givegigs.com" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline decoration-emerald-500 hover:text-emerald-300 transition-colors">givegigs.com</a> timer feature (There is also a link to our Discord community there).</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                    <FileText className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Paperwork Requirement</h3>
                    <p className="text-emerald-100/70">To facilitate and strictly organize international payments, all participants must complete a single IRS Form W8-BEN. No other paperwork necessary.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to start?</h3>
              <p className="text-center text-emerald-100/80 mb-8">
                We are gathering all recruits in our WhatsApp group where you can introduce yourself, learn the tools, and grab your first projects!
              </p>
              <a
                href="https://chat.whatsapp.com/BtYHOmQWjLaK5vUfgdygqd?mode=hq2tcla"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group relative inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-[#25D366] bg-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
              >
                Join WhatsApp Group
                <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="px-4 py-20 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See Vibe Coding in Action</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              Watch an example of how we use Google Antigravity to quickly build and iterate on websites. This is exactly what you&apos;ll learn during the internship.
            </p>
          </div>

          <div ref={videoRef} className="rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden bg-black shadow-2xl relative" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/7C3dWceVASQ"
              title="Antigravity UI Vibe Coding"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Portfolio Examples */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">Vibe <span className="font-bold text-sky-600 dark:text-sky-400">Coded</span> Examples</p>
            <h2 className="text-3xl md:text-4xl font-bold">What You Will Build</h2>
          </div>

          <div ref={portfolioRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-zinc-100 dark:bg-zinc-900 relative border-b border-zinc-200 dark:border-zinc-800">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <span className="text-zinc-400 font-medium text-center">Intern&apos;s 1st Hour Project</span>
                </div>
                <ScaledIframe src="https://aicelles1stproject.vercel.app/" title="Intern 1st Project" targetWidth={1280} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Aicelle&apos;s First Hour</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">This beautiful portfolio was built by one of our interns in her literally first hour of learning to vibe code.</p>
                <a href="https://aicelles1stproject.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                  View Live Site <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-zinc-100 dark:bg-zinc-900 relative border-b border-zinc-200 dark:border-zinc-800">
                <ScaledIframe src="https://itxmen-demo4.vercel.app/" title="ITXMen Demo 4" targetWidth={1280} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Quick Speculative Work</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Example of a rapidly vibe-coded website demo designed to land a prospective client immediately.</p>
                <a href="https://itxmen-demo4.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                  View Live Site <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-zinc-100 dark:bg-zinc-900 relative border-b border-zinc-200 dark:border-zinc-800">
                <ScaledIframe src="https://sitefari.com" title="Sitefari" targetWidth={1280} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Sitefari</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Playful travel recommendations site showcasing fast iteration and bold visuals built in a single vibe-coding session.</p>
                <a href="https://sitefari.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  View Live Site <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-zinc-100 dark:bg-zinc-900 relative border-b border-zinc-200 dark:border-zinc-800">
                <ScaledIframe src="https://taglish-translate.vercel.app" title="Taglish Translate" targetWidth={1280} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Taglish Translate</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">A bilingual AI translator interface demonstrating clean UI, motion, and responsive layout in minutes.</p>
                <a href="https://taglish-translate.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  View Live Site <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-zinc-100 dark:bg-zinc-900 relative border-b border-zinc-200 dark:border-zinc-800">
                <ScaledIframe src="https://zenterv1.vercel.app" title="Zenter v1" targetWidth={1280} />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Zenter v1</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Wellness-focused experience with depth, gradients, and scroll-triggered vibes done in a lightning-fast build.</p>
                <a href="https://zenterv1.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  View Live Site <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6 h-full flex flex-col justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
                <h3 className="font-bold text-lg mb-4 text-center">More Examples</h3>
                <div className="space-y-3">
                  <a href="https://itxmen-demo3.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition-colors">
                    <span className="text-sm font-medium">Demo 3</span>
                    <ExternalLink className="w-4 h-4 text-zinc-400" />
                  </a>
                  <a href="https://itxmen-demo2.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition-colors">
                    <span className="text-sm font-medium">Demo 2</span>
                    <ExternalLink className="w-4 h-4 text-zinc-400" />
                  </a>
                  <a href="https://itxmen-demo.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition-colors">
                    <span className="text-sm font-medium">Demo 1</span>
                    <ExternalLink className="w-4 h-4 text-zinc-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section ref={ctaRef} className="px-4 py-8 max-w-2xl mx-auto text-center">
        <p className="text-5xl mb-4">🍉 🥬 🍓 🍔 🍪 🍯</p>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">Come build the future of web development with us.</p>
      </section>

    </main>
  );
}
