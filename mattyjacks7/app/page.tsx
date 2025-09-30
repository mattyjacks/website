"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import MoneyCube from "../components/money-cube";
import AnimatedClouds from "../components/animated-clouds";
import { ClientThemeProvider } from "../components/client-theme-mount";
import { Bot, Users, TrendingUp, Palette, MessageCircle, Target, Zap, Trophy, Code2, ShoppingCart, MapPin, Briefcase, GraduationCap, Store } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { fadeInUp, fadeInLeft, slideInGrid, scaleIn } from "@/lib/animations/scroll-animations";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  // Scroll animation refs
  const heroContentRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const aboutRef = useScrollAnimation<HTMLDivElement>(fadeInLeft);
  const servicesRef = useScrollAnimation<HTMLDivElement>(slideInGrid);
  const processRef = useScrollAnimation<HTMLDivElement>(fadeInUp);
  const industriesRef = useScrollAnimation<HTMLUListElement>(scaleIn);
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

    return () => {
      heroSection.removeEventListener("mousemove", handleMouseMove);
      heroSection.removeEventListener("mouseenter", handleMouseEnter);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
      stopEmitter();
      cancelAnimationFrame(animationFrame);
      particles.forEach((p) => p.el.remove());
    };
  }, []);
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-start pt-32 overflow-x-hidden">
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
            {/* Enhanced contrast helper with better readability */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl backdrop-blur-sm bg-gradient-to-br from-white/20 via-white/10 to-transparent dark:from-zinc-800/30 dark:via-zinc-900/20 dark:to-transparent"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
              }}
            />
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
              <p className="text-base font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">Outsourcing, Software, Consulting, Websites</p>
              <div className="h-px w-8 bg-gradient-to-l from-emerald-600 to-emerald-400"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight text-center">
              <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">We make you</span>
              <span className="block bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-black">MONEY</span>
              <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">and/or</span>
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent font-black">DIE TRYING!</span>
            </h1>
            <div className="mt-8 space-y-6 px-2 text-center">
              <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-xl mx-auto">MattyJacks provides cheap workers from far away lands. We deploy the latest in AI technologies to make websites and harvest leads. </p>
              <p className="text-base md:text-md text-zinc-700 dark:text-zinc-200 font-medium leading-relaxed max-w-xl mx-auto">We have sales callers, coders, and so many other talents.</p>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg mx-auto">You bring the goal, we bring the results. Simple.</p>
            </div>
            <div className="relative z-40 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl shadow-lg hover:shadow-red-500/25 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                <span className="relative z-10">Share Your Vision</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+16039999420"
                className="group inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-zinc-900 dark:text-white bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl hover:border-red-500 dark:hover:border-red-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-500/50"
              >
                <svg className="mr-2 w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Us
                <span className="ml-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors hidden xs:inline">(603) 999-9420</span>
              </a>
            </div>
          </div>
          <div className="relative w-full overflow-visible z-10 min-h-[400px] md:min-h-[500px]">
            <ClientThemeProvider>
              <MoneyCube className="rounded-2xl" disableParticles={true} />
            </ClientThemeProvider>
          </div>
        </div>
      </section>

      {/* About: Led by Matt */}
      <section id="about" className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 xl:p-10 bg-white dark:bg-zinc-950">
            <div ref={aboutRef} className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">Freelancers at the Ready<span className="font-bold text-red-600 dark:text-red-500">MATT</span></p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">This website will CHANGE YOUR LIFE!!!</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-zinc-600 dark:text-zinc-300">
                <p>Matt is a strategist and builder known for forming strong partnerships with talented freelancers worldwide-delivering premium results at practical rates. We design for conversions first, then add beauty.</p>
                <p>Our network includes engineers, designers, analysts, and operators. You get senior execution without the agency tax.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-16 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">Our <span className="font-bold text-red-600 dark:text-red-500">Services</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">What can we do for you?</h2>
          </div>
          <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                t:"Custom AI Solutions",
                d:"AI copilots, internal tools, and automations mapped to your workflows to reduce cost and increase throughput.",
                icon: Bot
              },
              {
                t:"Elite Freelancers",
                d:"Handpicked engineers, designers, writers, and operators. Senior talent only. Coordinated for speed and quality.",
                icon: Users
              },
              {
                t:"Idea-to-Income",
                d:"From napkin sketch to MVP to first dollars. We prototype fast, test in the wild, and iterate with real feedback.",
                icon: TrendingUp
              },
              {
                t:"Web Design",
                d:"Beautiful, disciplined, conversion-focused sites. Clear offers, crisp copy, and performance that ranks.",
                icon: Palette
              },
            ].map((s,i)=> {
              const IconComponent = s.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-950 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 dark:hover:border-red-500 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">{s.t}</h3>
                    </div>
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
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">Our <span className="font-bold text-red-600 dark:text-red-500">Process</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">How we work with you</h2>
          </div>

          {/* Desktop Workflow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Process Cards with Numbers */}
              <div ref={processRef} className="grid grid-cols-4 gap-8">
                {[
                  {t:"Share Your Vision",d:"A short call to unpack goals, constraints, and what success looks like for you.",icon: MessageCircle},
                  {t:"Strategic Assessment",d:"We propose a focused plan with scope, timeline, and expected outcomes-in plain English.",icon: Target},
                  {t:"Build and Execute",d:"We assemble the senior talent, ship fast, and communicate clearly. No babysitting required.",icon: Zap},
                  {t:"Deliver Results",d:"Launch, instrument, iterate. We are allergic to vanity metrics-we track what moves revenue.",icon: Trophy},
                ].map((step, index) => (
                  <div key={index} className="group text-center relative">
                    {/* Step Number Circle positioned above each card */}
                    <div className="flex justify-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white text-lg font-bold flex items-center justify-center shadow-lg relative z-20">
                        {index + 1}
                      </div>
                    </div>

                    {/* Connecting line from this number to next (except last) */}
                    {index < 3 && (
                      <div className="absolute top-6 left-1/2 w-full h-0.5 bg-emerald-500 dark:bg-emerald-400 z-10 transform translate-x-4"></div>
                    )}

                    {/* Step Content Card */}
                    <div className="group-hover:scale-105 transition-transform duration-300 h-full">
                      <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 p-6 bg-white dark:bg-zinc-950 hover:shadow-xl hover:shadow-red-500/15 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10 flex-1 flex flex-col">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 mx-auto group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-300">
                            <step.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <h3 className="font-bold text-base mb-3 text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300">{step.t}</h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed flex-1">{step.d}</p>
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
              {/* Vertical connecting line on the left */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-emerald-500 dark:bg-emerald-400 z-0"></div>

              <div className="space-y-6">
                {[
                  {t:"Share Your Vision",d:"A short call to unpack goals, constraints, and what success looks like for you.",icon: MessageCircle},
                  {t:"Strategic Assessment",d:"We propose a focused plan with scope, timeline, and expected outcomes-in plain English.",icon: Target},
                  {t:"Build and Execute",d:"We assemble the senior talent, ship fast, and communicate clearly. No babysitting required.",icon: Zap},
                  {t:"Deliver Results",d:"Launch, instrument, iterate. We are allergic to vanity metrics-we track what moves revenue.",icon: Trophy},
                ].map((step, index) => (
                  <div key={index} className="relative flex items-center gap-6">
                    {/* Step Number Circle on the left */}
                    <div className="w-12 h-12 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white text-lg font-bold flex items-center justify-center shadow-lg flex-shrink-0 z-10">
                      {index + 1}
                    </div>

                    {/* Content Card */}
                    <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 p-4 bg-white dark:bg-zinc-950 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-bold text-base text-zinc-900 dark:text-white">{step.t}</h3>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-4 py-16 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">Who We <span className="font-bold text-red-600 dark:text-red-500">Help</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Industries we serve</h2>
          </div>
          <ul ref={industriesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none">
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
                  className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-zinc-800/30 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100/60 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-red-200/80 dark:group-hover:bg-red-800/50 group-hover:scale-110 transition-all duration-200">
                    <IconComponent className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200">
                    {industry.name}
                  </span>
                </li>
              );
            })}
          </ul>
         </div>
        </section>

      {/* Video Demos */}
      <section id="video-demos" className="px-4 py-16 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/30 dark:via-zinc-900/10 dark:to-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">See Our <span className="font-bold text-red-600 dark:text-red-500">Work</span></p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Video Demos</h2>
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
                className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-black hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300"
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
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

      {/* Testimonials */}
      <section id="testimonials" className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300 mb-2">What <span className="font-bold text-red-600 dark:text-red-500">Clients</span> Say</p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">Testimonials</h2>
          </div>
          <div ref={testimonialsRef} className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-black overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-300">
              <video className="w-full aspect-[9/16] object-cover max-h-[600px]" controls playsInline preload="metadata">
                <source src="/videos/matt-testimonial-justin-1-compressed.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="text-center">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Justin Hughes</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">CEO, FirebringerAI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-4 py-16 bg-emerald-600 text-white relative"
        style={{
          backgroundImage: "url('/images/bg-100-dollar-ai-bills-1.png')",
          backgroundSize: "400px 400px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat"
        }}
      >
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-emerald-600/60"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div ref={ctaRef} className="text-center md:text-left md:flex md:items-center md:justify-center md:gap-8 lg:gap-12">
            <div className="mb-6 md:mb-0 md:flex-shrink-0">
              <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg mb-3 md:mb-2">
                <span className="text-red-700 font-black" style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.3)'
                }}>Ready</span> to Make Money?
              </h2>
              <p className="opacity-90 drop-shadow-md text-sm md:text-base md:max-w-md">Share your vision with us, and let&apos;s turn it into reality.</p>
            </div>
            <div className="flex justify-center md:justify-start md:flex-shrink-0">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-white text-red-700 px-6 py-3 font-semibold hover:bg-zinc-100 shadow-lg transition-all duration-200 hover:scale-105">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

