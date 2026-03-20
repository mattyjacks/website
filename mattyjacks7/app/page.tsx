"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MoneyCube from "../components/money-cube";
import AnimatedClouds from "../components/animated-clouds";
import { ClientThemeProvider } from "../components/client-theme-mount";
import { Bot, Users, TrendingUp, Palette, MessageCircle, Target, Zap, Trophy, Code2, ShoppingCart, MapPin, Briefcase, GraduationCap, Store, ExternalLink, CreditCard, Shield, DollarSign, ArrowRight, Building2, Globe, Layers, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, fadeInLeft, slideInGrid, scaleIn } from "@/lib/animations/scroll-animations";
import WorkerFeedbackCarousel from "@/components/worker-feedback";
import CookieBanner from "@/components/cookie-banner";
import ScaledIframe from "@/components/scaled-iframe";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  // Scroll animation refs
  const heroContentRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const aboutRef = useScrollAnimation<HTMLDivElement>(fadeInLeft);
  const companiesRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const servicesRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const processRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const industriesRef = useScrollAnimation<HTMLUListElement>(scaleIn);
  const merchantServicesRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const tristateRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const videoDemosRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const testimonialsRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const ctaRef = useScrollAnimation<HTMLDivElement>(fadeInUp);

  // Global emoji particle system for the hero section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroSection = heroRef.current;
    if (!heroSection) return;

    // Create or reuse global particles root
    let root = document.getElementById("money-particles-root") as HTMLDivElement | null;
    if (!root) {
      root = document.createElement("div");
      root.id = "money-particles-root";
      Object.assign(root.style, {
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        bottom: "0",
        pointerEvents: "none",
        zIndex: "50",
        overflow: "hidden",
      } as CSSStyleDeclaration);
      document.body.appendChild(root);
    }

    const particles: Array<{
      el: HTMLSpanElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      g: number;
      r: number;
      vr: number;
      bornAt: number;
      minTtlMs: number;
      kind: "bill" | "fly";
    }> = [];

    let isHovering = false;
    let emitterId: number | null = null;
    let lastMousePos = { x: 0, y: 0 };

    const spawn = () => {
      if (!root) return;
      const cx = lastMousePos.x + (Math.random() * 2 - 1) * 20;
      const cy = lastMousePos.y + (Math.random() * 2 - 1) * 20;
      const kind: "bill" | "fly" = Math.random() < 0.6 ? "bill" : "fly";
      const el = document.createElement("span");
      el.textContent = kind === "bill" ? "💵" : "💸";
      el.style.position = "fixed";
      el.style.left = "0";
      el.style.top = "0";
      el.style.fontSize = `${24 + Math.round(Math.random() * 10)}px`;
      el.style.willChange = "transform, opacity";
      el.style.pointerEvents = "none";
      el.style.zIndex = "60";
      root.appendChild(el);
      const vx = (Math.random() * 2 - 1) * 100;
      const vy = kind === "bill" ? -(100 + Math.random() * 120) : (110 + Math.random() * 120);
      const g = kind === "bill" ? (260 + Math.random() * 160) : -(280 + Math.random() * 180);
      const now = performance.now();
      const minTtlMs = 550 + Math.random() * 550;
      const p = { el, x: cx, y: cy, vx, vy, g, r: Math.random() * 360, vr: (Math.random() * 2 - 1) * 120, bornAt: now, minTtlMs, kind };
      particles.push(p);
    };

    const startEmitter = () => {
      if (emitterId) return; // already running
      const loop = () => {
        if (!isHovering) return;
        spawn();
        const perSec = 2 + Math.random() * 3; // 2–5/sec
        const delay = 1000 / perSec;
        emitterId = window.setTimeout(loop, delay);
      };
      loop();
    };

    const stopEmitter = () => {
      if (emitterId) {
        window.clearTimeout(emitterId);
        emitterId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHovering = true;
      lastMousePos = { x: e.clientX, y: e.clientY };
      startEmitter();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      stopEmitter();
    };

    // Touch handlers for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      lastMousePos = { x: touch.clientX, y: touch.clientY };
      if (!isHovering) {
        isHovering = true;
        startEmitter();
      }
    };

    const handleTouchEnd = () => {
      isHovering = false;
      stopEmitter();
    };

    // Animation loop for particles
    let animationFrame: number;
    const animateParticles = () => {
      const now = performance.now();
      const dt = 0.016; // ~60fps
      const H = window.innerHeight;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += p.g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.r += p.vr * dt;
        p.el.style.transform = `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0) rotate(${p.r}deg)`;

        if (p.kind === "bill") {
          if (p.y > H + 100 && (now - p.bornAt) >= p.minTtlMs) {
            p.el.remove();
            particles.splice(i, 1);
          }
        } else {
          if (p.y < -60 && (now - p.bornAt) >= p.minTtlMs) {
            p.el.remove();
            particles.splice(i, 1);
          }
        }
      }
      animationFrame = requestAnimationFrame(animateParticles);
    };
    animationFrame = requestAnimationFrame(animateParticles);

    heroSection.addEventListener("mousemove", handleMouseMove);
    heroSection.addEventListener("mouseenter", handleMouseEnter);
    heroSection.addEventListener("mouseleave", handleMouseLeave);
    heroSection.addEventListener("touchmove", handleTouchMove, { passive: true });
    heroSection.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      heroSection.removeEventListener("mousemove", handleMouseMove);
      heroSection.removeEventListener("mouseenter", handleMouseEnter);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
      heroSection.removeEventListener("touchmove", handleTouchMove);
      heroSection.removeEventListener("touchend", handleTouchEnd);
      stopEmitter();
      cancelAnimationFrame(animationFrame);
      particles.forEach((p) => p.el.remove());
    };
  }, []);
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-start pt-32 overflow-hidden">
        <ClientThemeProvider>
          <AnimatedClouds
            imageSrc="/images/cloud-image_upscayl_2x_upscayl-standard-4x.jpg"
            darkImageSrc="/images/seamless-space-jpg-_upscayl_3x_upscayl-standard-4x.jpg"
            opacity={0.6}
            verticalSpeedSec={18}
            horizontalRangePx={3000}
            // Slower, exploratory horizontal drift
            horizontalPixelsPerSecond={8}
            // Keep from zooming out too much
            minScale={0.6}
            maxScale={1}
            verticalMultiplier={2.5}
          />
        </ClientThemeProvider>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-8 xl:gap-12 items-center justify-center px-6 sm:px-6 w-full overflow-visible">
          <div ref={heroContentRef} className="relative z-30 flex flex-col items-center lg:items-center text-center mx-auto">
            {/* Enhanced contrast helper with frosted glass effect */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/30 via-white/15 to-white/5 dark:from-zinc-900/40 dark:via-zinc-900/25 dark:to-zinc-900/10 border border-white/20 dark:border-zinc-700/20"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.1), 0 0 80px rgba(16,185,129,0.04), inset 0 1px 0 rgba(255,255,255,0.25)"
              }}
            />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/40 px-4 py-2 rounded-full mb-4 border border-emerald-200/50 dark:border-emerald-800/30 shadow-sm">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
                Holding Company &amp; Agency
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] text-zinc-900 dark:text-white">
                We Build Companies.
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">We Deploy Talent.</span>
              </h1>
            </div>
            <div className="mt-6 space-y-3 px-2 text-center">
              <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-xl mx-auto">MattyJacks builds, acquires, and operates technology businesses - while running a full-service outsourcing agency with global talent.</p>
              <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto">You bring the vision, we bring the results. Simple.</p>
            </div>
            {/* Stats bar */}
            <div className="mt-8 flex flex-wrap justify-center gap-0 text-center">
              {[
                { value: "6+", label: "Companies" },
                { value: "20+", label: "Industries" },
                { value: "24/7", label: "Operations" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-px h-8 bg-zinc-300/60 dark:bg-zinc-600/40 mx-5 sm:mx-7 hidden sm:block"></div>}
                  <div>
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-semibold mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {["No Long-term Contracts", "All Talent Levels", "Money-back Guarantee"].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {badge}
                </span>
              ))}
            </div>
            <div className="relative z-40 mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-xl shadow-lg hover:shadow-emerald-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 overflow-hidden"
                aria-label="Share your vision - contact MattyJacks for a free consultation"
                style={{ background: "linear-gradient(135deg, #059669, #10b981, #ef4444, #059669)", backgroundSize: "300% 300%", animation: "gradient-shift 6s ease infinite" }}
              >
                <span className="relative z-10">Share Your Vision</span>
                <svg className="relative z-10 ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+16039999420"
                className="group inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-zinc-900 dark:text-white bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
                aria-label="Call MattyJacks at (603) 999-9420 - available 24/7"
              >
                <svg className="mr-2 w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
                <span className="ml-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors hidden xs:inline">(603) 999-9420</span>
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="mt-10 flex justify-center">
<button className="animate-bounce opacity-40 hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-none" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll down to learn more about MattyJacks" type="button">
<svg className="w-5 h-5 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </button>
            </div>

            {/* Internship Banner */}
            <div className="relative z-40 mt-6 w-full max-w-lg mx-auto">
              <Link href="/internship" className="block w-full group">
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-zinc-900 via-emerald-950 to-zinc-900 p-4 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-emerald-500/20 hover:border-emerald-400/50">
                  <div className="absolute inset-0 bg-[url('/images/seamless-space-jpg-_upscayl_3x_upscayl-standard-4x.jpg')] opacity-15 group-hover:opacity-25 transition-opacity bg-cover mix-blend-screen"></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-white font-bold text-base group-hover:text-emerald-300 transition-colors">Vibe Coding Internship</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Hiring</span>
                      </div>
                      <p className="text-emerald-100/60 text-sm m-0">Learn AI tools. Build a portfolio. Make $4/hr.</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </div>
              </Link>
            </div>

          </div>
          <div className="relative w-full overflow-visible z-10 min-h-[400px] md:min-h-[500px]">
            <ClientThemeProvider>
              <MoneyCube className="rounded-2xl" disableParticles={true} />
            </ClientThemeProvider>
          </div>
        </div>
      </section>

      {/* Section Divider: Hero -> About */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-300/40 dark:via-zinc-700/40 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div>
      </div>

      {/* About: Holding Company + Agency */}
      <section id="about" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Gradient border wrapper */}
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/30 via-zinc-300/20 to-sky-500/30 dark:from-emerald-500/20 dark:via-zinc-700/20 dark:to-sky-500/20 animate-border-glow">
            <div className="rounded-2xl p-8 lg:p-12 bg-white dark:bg-zinc-950">
              <div ref={aboutRef} className="space-y-8">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">Holding Company <span className="font-bold text-blue-600 dark:text-sky-500">&amp;</span> Agency</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">We build companies, deploy global talent, and ship technology that makes money.</h2>
                  <p className="mt-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg">MattyJacks operates as both a <strong className="text-zinc-900 dark:text-white">holding company</strong> for our portfolio of technology businesses and a <strong className="text-zinc-900 dark:text-white">full-service agency</strong> that deploys cost-effective global talent.</p>
                </div>

                {/* Two-pillar cards */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="group rounded-xl border border-emerald-200/60 dark:border-emerald-800/40 p-6 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 dark:from-emerald-950/30 dark:via-zinc-950 dark:to-emerald-950/10 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Holding Company</h3>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">We build, acquire, and operate technology companies. Our portfolio spans freelance marketplaces, creative software, and payment solutions.</p>
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>
                  <div className="group rounded-xl border border-sky-200/60 dark:border-blue-800/40 p-6 bg-gradient-to-br from-sky-50/80 via-white to-sky-50/40 dark:from-blue-950/30 dark:via-zinc-950 dark:to-blue-950/10 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-zinc-900 dark:text-white text-lg">Outsourcing Agency</h3>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">We deploy skilled remote workers worldwide: developers, designers, sales callers, VAs, and more. Cost-effective talent, coordinated for results.</p>
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Capabilities grid with numbered items */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: "Software Development", sub: "Web, mobile, desktop apps" },
                    { label: "Sales Outreach", sub: "Cold calling, lead gen, closers" },
                    { label: "AI Solutions", sub: "Custom tools, copilots, automation" },
                    { label: "Design & Branding", sub: "Visual identity, UI/UX, graphics" },
                    { label: "Content & Copy", sub: "Marketing, SEO, social media" },
                    { label: "Virtual Assistance", sub: "Admin, BPO, operations" },
                  ].map((cap, i) => (
                    <div key={i} className="group/cap flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-transparent hover:border-emerald-200/50 dark:hover:border-emerald-800/30 transition-all duration-300 cursor-default">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-400 group-hover/cap:bg-emerald-500 group-hover/cap:text-white group-hover/cap:shadow-md transition-all duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-zinc-900 dark:text-white group-hover/cap:text-emerald-700 dark:group-hover/cap:text-emerald-300 transition-colors duration-300">{cap.label}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">{cap.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 via-emerald-400/10 to-transparent"></div>
                  <p className="text-zinc-700 dark:text-zinc-200 font-semibold text-sm sm:text-base text-center max-w-md">We don&apos;t just outsource - we build entire ecosystems of technology and talent.</p>
                  <div className="h-px flex-1 bg-gradient-to-l from-sky-500/30 via-sky-400/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider: About -> Portfolio */}
      <div className="relative h-12 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2">
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-emerald-500/20"></div>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-500/30"></div>
            <div className="w-1 h-1 rounded-full bg-sky-500/30"></div>
            <div className="w-1 h-1 rounded-full bg-emerald-500/30"></div>
          </div>
          <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-emerald-500/20"></div>
        </div>
      </div>

      {/* Our Companies / Portfolio */}
      <section id="companies" className="px-4 py-20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400 mb-2">Our <span className="font-bold text-sky-400">Portfolio</span></p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Companies We Own &amp; Operate</h2>
            <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">Each company in the MattyJacks portfolio is built to solve real problems. Together, they form a connected ecosystem powered by shared infrastructure.</p>
            {/* Ecosystem connection line */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
              <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-zinc-700/80 bg-zinc-900/90 backdrop-blur-sm shadow-lg shadow-emerald-500/5">
                <div className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></div>
                <span className="text-xs text-zinc-300 font-semibold tracking-wide">Unified Ecosystem</span>
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-500/50"></div>
            </div>
          </div>
          <div ref={companiesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "GiveGigs",
                url: "https://givegigs.com",
                description: "Freelance marketplace connecting businesses with skilled remote workers. Features AI-powered task matching, invoicing, time tracking, and a full moderator control plane.",
                color: "from-emerald-500 to-emerald-700",
                icon: Users,
                status: "Live",
              },
              {
                name: "CryptArtist Studio",
                url: "https://github.com/mattyjacks/CryptArtistStudio",
                description: "Desktop creative suite for media production, AI-assisted design, game development, and digital art. Built with Tauri and React.",
                color: "from-purple-500 to-purple-700",
                icon: Palette,
                status: "In Development",
              },
              {
                name: "VentureCapitalArts",
                url: "https://venturecapitalarts.com",
                description: "Investment and startup advisory platform connecting founders with resources, mentorship, and funding opportunities.",
                color: "from-amber-500 to-amber-700",
                icon: TrendingUp,
                status: "Live",
              },
              {
                name: "MattyJacks Agency",
                url: "/services",
                description: "Full-service outsourcing agency deploying global talent for web development, sales, marketing, AI solutions, and virtual assistance.",
                color: "from-sky-500 to-blue-700",
                icon: Rocket,
                status: "Live",
              },
              {
                name: "Merchant Services",
                url: "/merchants",
                description: "Payment processing solutions for high-risk and low-risk businesses across the USA and Canada. Fast approvals and competitive rates.",
                color: "from-blue-500 to-blue-700",
                icon: CreditCard,
                status: "Live",
              },
              {
                name: "Ecosystem Platform",
                url: "https://givegigs.com/api/ecosystem/control-plane",
                description: "Shared authentication, database, and control plane infrastructure connecting all MattyJacks companies into one unified ecosystem.",
                color: "from-cyan-500 to-cyan-700",
                icon: Layers,
                status: "Live",
              },
            ].map((company, i) => {
              const IconComponent = company.icon;
              return (
                <a
                  key={i}
                  href={company.url}
                  target={company.url.startsWith("http") ? "_blank" : undefined}
                  rel={company.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative rounded-2xl border border-zinc-700/60 p-6 bg-zinc-900/80 backdrop-blur-sm hover:border-zinc-500/60 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/8"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`}></div>
                  {/* Top glow line */}
                  <div className={`absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${company.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${company.status === "Live" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                        {company.status === "Live" && <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>}
                        {company.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">{company.name}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">{company.description}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Divider: Portfolio -> Services */}
      <div className="relative h-12 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-zinc-700/30 to-transparent"></div>
      </div>

      {/* Services */}
      <section id="services" className="px-4 py-20 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">Our <span className="font-bold text-blue-600 dark:text-sky-500">Services</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">What can we do for you?</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">Four core pillars that drive revenue for our clients.</p>
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/40">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Currently accepting new clients</span>
              </div>
            </div>
          </div>
          <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t: "Custom AI Solutions",
                d: "AI copilots, internal tools, and automations mapped to your workflows to reduce cost and increase throughput.",
                icon: Bot,
                accent: "from-blue-500 to-cyan-500"
              },
              {
                t: "Elite Freelancers",
                d: "Handpicked engineers, designers, writers, and operators at all talent levels. Maximum cost effectiveness through strategic team composition.",
                icon: Users,
                accent: "from-emerald-500 to-green-500"
              },
              {
                t: "Idea-to-Income",
                d: "From napkin sketch to MVP to first dollars. We prototype fast, test in the wild, and iterate with real feedback.",
                icon: TrendingUp,
                accent: "from-amber-500 to-orange-500"
              },
              {
                t: "Web Design",
                d: "Beautiful, disciplined, conversion-focused sites. Clear offers, crisp copy, and performance that ranks.",
                icon: Palette,
                accent: "from-purple-500 to-pink-500"
              },
            ].map((s, i) => {
              const IconComponent = s.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-sky-500/10 hover:border-zinc-300 dark:hover:border-zinc-600 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.accent} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 dark:group-hover:text-zinc-500 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-sky-300 transition-colors duration-300 mb-2">{s.t}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Process */}
      <section id="process" className="px-4 py-20 pb-40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">Our <span className="font-bold text-blue-600 dark:text-sky-500">Process</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">How we work with you</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">From first call to measurable results in four focused steps.</p>
          </div>

          {/* Desktop Workflow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Continuous dashed connector line behind all steps */}
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] z-10" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgb(16 185 129) 0px, rgb(16 185 129) 8px, transparent 8px, transparent 16px)" }}></div>

              <div ref={processRef} className="grid grid-cols-4 gap-8">
                {[
                  { t: "Share Your Vision", d: "A short call to unpack goals, constraints, and what success looks like for you.", icon: MessageCircle, color: "from-emerald-500 to-emerald-600" },
                  { t: "Strategic Assessment", d: "We propose a focused plan with scope, timeline, and expected outcomes - in plain English.", icon: Target, color: "from-blue-500 to-blue-600" },
                  { t: "Build and Execute", d: "We assemble the senior talent, ship fast, and communicate clearly. No babysitting required.", icon: Zap, color: "from-amber-500 to-amber-600" },
                  { t: "Deliver Results", d: "Launch, instrument, iterate. We are allergic to vanity metrics - we track what moves revenue.", icon: Trophy, color: "from-sky-500 to-blue-600" },
                ].map((step, index) => (
                  <div key={index} className="group text-center relative">
                    {/* Step Number Circle */}
                    <div className="flex justify-center mb-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white text-lg font-bold flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-zinc-950 relative z-20 group-hover:scale-110 group-hover:ring-emerald-100 dark:group-hover:ring-emerald-900/30 transition-all duration-300`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Step Content Card */}
                    <div className="h-full">
                      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-500 relative overflow-hidden h-full flex flex-col group-hover:-translate-y-1">
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        <div className={`absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                        <div className="relative z-10 flex-1 flex flex-col">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mx-auto opacity-15 group-hover:opacity-25 transition-opacity duration-300`}>
                            <step.icon className="w-6 h-6 text-zinc-900 dark:text-white" style={{ opacity: 1 }} />
                          </div>
                          <h3 className="font-bold text-base mb-3 text-zinc-900 dark:text-white">{step.t}</h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed flex-1">{step.d}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Workflow */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical dashed connector */}
              <div className="absolute left-6 top-6 bottom-6 w-[2px] z-0" style={{ backgroundImage: "repeating-linear-gradient(180deg, rgb(16 185 129) 0px, rgb(16 185 129) 8px, transparent 8px, transparent 16px)" }}></div>

              <div className="space-y-6">
                {[
                  { t: "Share Your Vision", d: "A short call to unpack goals, constraints, and what success looks like for you.", icon: MessageCircle, color: "from-emerald-500 to-emerald-600" },
                  { t: "Strategic Assessment", d: "We propose a focused plan with scope, timeline, and expected outcomes - in plain English.", icon: Target, color: "from-blue-500 to-blue-600" },
                  { t: "Build and Execute", d: "We assemble the senior talent, ship fast, and communicate clearly. No babysitting required.", icon: Zap, color: "from-amber-500 to-amber-600" },
                  { t: "Deliver Results", d: "Launch, instrument, iterate. We are allergic to vanity metrics - we track what moves revenue.", icon: Trophy, color: "from-sky-500 to-blue-600" },
                ].map((step, index) => (
                  <div key={index} className="relative flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white text-lg font-bold flex items-center justify-center shadow-lg flex-shrink-0 z-10 ring-4 ring-white dark:ring-zinc-950`}>
                      {index + 1}
                    </div>
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950 flex-1 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <h3 className="font-bold text-base text-zinc-900 dark:text-white">{step.t}</h3>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-4 py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">Who We <span className="font-bold text-blue-600 dark:text-sky-500">Help</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Industries we serve</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Deep experience across verticals that need speed, quality, and results.</p>
          </div>
          <ul ref={industriesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
            {[
              { name: "Software & SaaS", icon: Code2 },
              { name: "E-commerce & DTC", icon: ShoppingCart },
              { name: "Agencies & Studios", icon: Palette },
              { name: "Local Services", icon: MapPin },
              { name: "Professional Services", icon: Briefcase },
              { name: "Education & Info Products", icon: GraduationCap },
              { name: "Marketplaces", icon: Store },
              { name: "Media & Community", icon: Users },
            ].map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <li
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100/80 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-500 group-hover:shadow-lg transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                    {industry.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">See Our <span className="font-bold text-blue-600 dark:text-sky-500">Work</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Case Studies</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Real projects. Real results. No fluff.</p>
          </div>

          <div className="space-y-20">
            {/* Case Study 1: TristateHoney */}
            <div ref={tristateRef} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">01</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">TristateHoney.com</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Lead Generation - E-commerce</p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Still generating leads
                </span>
              </div>
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-6 max-w-3xl leading-relaxed">
                TristateHoney.com is still getting real inquiries! One recent message came from a company looking to order bulk honey for a new product they&apos;re developing.
              </p>

              <div className="group relative max-w-4xl mb-6 h-[400px] md:h-[500px]">
                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 bg-white dark:bg-zinc-900 h-full">
                  <ScaledIframe src="https://tristatehoney.com/" title="TristateHoney.com live website preview - e-commerce honey site built by MattyJacks" targetWidth={1280} />
                </div>
              </div>

              <a href="https://tristatehoney.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                Visit TristateHoney.com <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>
            </div>

            {/* Case Study 2: Opority */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">02</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">Opority</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Web Design - Agency Client</p>
                </div>
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
                  Design for Designers
                </span>
              </div>
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-6 max-w-3xl leading-relaxed">
                Opority is a web design firm that hired us to design their website because they liked our work better. We created a beautiful, polished UI that matches their high standards.
              </p>

              <div className="group relative max-w-4xl mb-6 h-[400px] md:h-[500px]">
                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 bg-white dark:bg-zinc-900 h-full">
                  <ScaledIframe src="https://www.opority.com/" title="Opority.com live website preview - web design agency site built by MattyJacks" targetWidth={1280} />
                </div>
              </div>

              <a href="https://www.opority.com/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                Visit Opority.com <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>
            </div>

            {/* Case Study 3: TikTok */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">03</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">TikTok Algorithm Mastery</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Social Media - Growth Hacking</p>
                </div>
              </div>
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-6 max-w-3xl leading-relaxed">
                We helped our client Eric Escobedo go viral on TikTok on a new account. His third video got 2,300+ likes with 0 marketing. Results obtained purely through manipulating the TikTok algorithm. Grew account to 3,000+ followers in 30 days.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { value: "2,300+", label: "Likes on 3rd video" },
                  { value: "3,000+", label: "Followers in 30 days" },
                  { value: "$0", label: "Marketing spend" },
                ].map((s, i) => (
                  <div key={i} className="group/stat px-5 py-3 rounded-xl bg-sky-50 dark:bg-blue-950/20 border border-sky-200/60 dark:border-blue-800/40 hover:bg-sky-100 dark:hover:bg-blue-950/40 hover:border-sky-300 dark:hover:border-blue-700/60 transition-all duration-300 cursor-default">
                    <div className="text-lg font-black text-blue-600 dark:text-sky-400 group-hover/stat:scale-105 transition-transform duration-300 origin-left">{s.value}</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>

              <a href="https://www.tiktok.com/@eric_escobedo/video/7520191936905383169" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-sky-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Watch the viral video on TikTok <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider: Case Studies -> Merchant Services */}
      <div className="relative h-10 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-zinc-300/40 dark:to-zinc-700/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300/50 dark:bg-zinc-700/40 mx-3"></div>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-zinc-300/40 dark:to-zinc-700/30"></div>
        </div>
      </div>

      {/* Merchant Services Section - Compact */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-950 py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div ref={merchantServicesRef} className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              <span>Payment Processing</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Accept Payments. Grow Your Business.
            </h2>

            {/* Subheading */}
            <p className="text-base md:text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed">
              High-risk & low-risk merchant accounts for USA & Canada. Fast approvals, transparent pricing, expert support.
            </p>

            {/* Feature Grid - Compact */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
              {[
                { icon: Zap, title: "3 Day Approvals", desc: "Fast processing" },
                { icon: Shield, title: "High-Risk Specialists", desc: "20+ bank relationships" },
                { icon: DollarSign, title: "Competitive Rates", desc: "No hidden fees" },
              ].map((feat, i) => (
                <div key={i} className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
                    <feat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{feat.title}</h3>
                  <p className="text-emerald-100/70 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="/merchants"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-bold text-emerald-700 bg-white rounded-xl shadow-lg hover:shadow-white/30 transition-all duration-300 hover:scale-105 hover:bg-emerald-50"
              >
                <span>Explore Services</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider: Merchant Services -> Video Demos */}
      <div className="relative h-10 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-zinc-300/40 dark:to-zinc-700/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300/50 dark:bg-zinc-700/40 mx-3"></div>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-zinc-300/40 dark:to-zinc-700/30"></div>
        </div>
      </div>

      {/* Video Demos */}
      <section id="video-demos" className="px-4 py-20 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">Watch Us <span className="font-bold text-blue-600 dark:text-sky-500">Work</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Video Demos</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">See our process and results in action.</p>
          </div>
          <div ref={videoDemosRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "O2U7A3uSEVo",
              "FzEW5X8PryU",
              "jTC7vNDd61Q",
              "nbXak-BQ2SM",
              "WHWKnAtswNM",
              "ybG7L7eqc5g",
            ].map((videoId, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-black hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-zinc-300 dark:hover:border-zinc-600 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Video number badge */}
                <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white/80">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`MattyJacks demo video ${index + 1} - outsourcing, web development, and AI solutions showcase`}
                    loading="lazy"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider: Video Demos -> Testimonials */}
      <div className="relative h-10 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2">
          <div className="h-px flex-1 max-w-[160px] bg-gradient-to-r from-transparent to-zinc-300/30 dark:to-zinc-700/20"></div>
          <div className="w-1 h-1 rounded-full bg-emerald-500/30"></div>
          <div className="h-px flex-1 max-w-[160px] bg-gradient-to-l from-transparent to-zinc-300/30 dark:to-zinc-700/20"></div>
        </div>
      </div>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">What <span className="font-bold text-blue-600 dark:text-sky-500">Clients</span> Say</p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Testimonials</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Real feedback from real clients. No scripts, no edits.</p>
          </div>
          <div ref={testimonialsRef} className="max-w-md mx-auto">
            <div className="relative">
              {/* Decorative quote mark */}
              <div className="absolute -top-8 -left-4 text-8xl font-serif text-emerald-200/60 dark:text-emerald-900/30 select-none z-0 leading-none">&ldquo;</div>
              <div className="relative z-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 group">
                {/* Video label */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white/70 border border-white/10">Video Testimonial</span>
                </div>
<video className="w-full aspect-[9/16] object-cover max-h-[600px]" controls playsInline preload="metadata" aria-label="Video testimonial from Justin Hughes about working with MattyJacks">
                  <source src="/videos/matt-testimonial-justin-1-compressed.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="mt-5 relative">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/40 transition-all duration-300">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">J</div>
                  {/* Verified checkmark */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white dark:ring-zinc-950">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Justin Hughes</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">CEO, FirebringerAI</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-xs">&#9733;</span>)}
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Verified Client</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Worker Feedback Carousel */}
      <WorkerFeedbackCarousel />

      {/* Section Divider: Testimonials -> Updates */}
      <div className="relative h-10 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      </div>

      {/* Latest Updates / Social Proof */}
      <section id="updates" className="px-4 py-20 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-3">Latest <span className="font-bold text-blue-600 dark:text-sky-500">Updates</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Building in Public</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Follow along as we ship new features and improvements.</p>
          </div>
          
          {/* Tweet Embed */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <blockquote className="twitter-tweet" data-theme="dark">
                <p lang="en" dir="ltr">
                  <a href="https://t.co/tOHBDXj8ki">https://t.co/tOHBDXj8ki</a> Just launched the latest version of my website, haven&apos;t even updated the environment variables for the integration yet! They say if you&apos;re not embarrassed when you launch, you launched too late. Please visit my website and give me feedback. I love you. ❤️
                </p>
                &mdash; MattyJacks (@MattyJacksX) <a href="https://twitter.com/MattyJacksX/status/2034681421063725133?ref_src=twsrc%5Etfw">March 19, 2026</a>
              </blockquote>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider: Updates -> CTA */}
      <div className="relative h-10 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      </div>

      {/* Final CTA */}
      <section
        className="px-4 py-24 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/bg-100-dollar-ai-bills-1.png')",
          backgroundSize: "400px 400px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat"
        }}
      >
        {/* Layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/85 via-emerald-600/80 to-emerald-800/85"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]"></div>
        {/* Subtle animated shimmer */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(135deg, transparent 40%, white 50%, transparent 60%)", backgroundSize: "200% 200%", animation: "shimmer 8s ease-in-out infinite" }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div ref={ctaRef} className="text-center space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                <span className="text-emerald-200 text-xs uppercase tracking-[0.2em] font-semibold">Let&apos;s Build Something</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-lg">
                <span className="text-white">Ready to </span>
                <span className="text-sky-400" style={{
                  textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
                }}>Make Money?</span>
              </h2>
              <p className="mt-5 text-emerald-100/80 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md leading-relaxed">Whether you need a company built, talent deployed, or technology shipped - share your vision and let&apos;s make it real.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="group relative inline-flex items-center justify-center rounded-xl bg-white text-emerald-700 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="relative z-10">Share Your Vision</span>
                <ArrowRight className="relative z-10 ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <a href="tel:+16039999420" className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 text-lg font-bold hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                Call (603) 999-9420
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-emerald-200/70 text-sm pt-4">
              {["24/7 Available", "Free Consultation", "Do and/or DIE TRYING!!!"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-400/80"></span>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </main>
  );
}

