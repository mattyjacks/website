"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type HeroCubeProps = {
  textureSrc?: string;
  className?: string;
  idleSpeedDegPerSec?: number;
  maxTiltDeg?: number;
};

type Particle = {
  el: HTMLSpanElement;
  kind: "bill" | "fly"; // bill: 💵, fly: 💸
  x: number; // viewport px
  y: number; // viewport px
  vx: number; // px/s
  vy: number; // px/s
  g: number; // gravity px/s^2 (positive = down)
  r: number; // rotation deg
  vr: number; // rotation deg/s
  bornAt: number; // ms timestamp
  minTtlMs: number; // minimum time to live in ms before culling
};

export default function HeroCube({
  textureSrc = "/images/bg-100-dollar-ai-bills-1.png",
  className,
  idleSpeedDegPerSec = 16,
  maxTiltDeg = 22,
}: HeroCubeProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const particlesRootRef = useRef<HTMLDivElement | null>(null);
  const pressingRef = useRef(false);
  const [size, setSize] = useState<number>(300);
  const [active, setActive] = useState(true);

  // Animation state
  const angleRef = useRef(0);
  const hoverRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  // Track container size
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize(Math.min(width, height, 400) * 0.8); // 80% of previous size
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Create global particles root attached to <body>
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let root = document.getElementById('money-particles-root') as HTMLDivElement | null;
    if (!root) {
      root = document.createElement('div');
      root.id = 'money-particles-root';
      Object.assign(root.style, {
        position: 'fixed', left: '0', top: '0', right: '0', bottom: '0',
        pointerEvents: 'none', zIndex: '9999', overflow: 'hidden',
      } as CSSStyleDeclaration);
      document.body.appendChild(root);
    }
    particlesRootRef.current = root;
  }, []);

  // Visibility/Intersection: pause when offscreen for 10s or tab hidden
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let offTimer: number | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (offTimer) { window.clearTimeout(offTimer); offTimer = null; }
        setActive(true);
      } else {
        if (offTimer) window.clearTimeout(offTimer);
        offTimer = window.setTimeout(() => setActive(false), 10000);
      }
    }, { threshold: 0 });
    io.observe(el);
    const onVis = () => setActive(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      if (offTimer) window.clearTimeout(offTimer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Pointer interaction (mouse + touch)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetRef.current.x = -y * maxTiltDeg;
      targetRef.current.y = x * maxTiltDeg;
    };

    const onPointerLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [maxTiltDeg]);

  // Emoji particle emitter while pressing/touching the cube
  useEffect(() => {
    const host = wrapRef.current;
    if (!host) return;

    const particles: Particle[] = [];
    const spawn = () => {
      const cube = cubeRef.current;
      const root = particlesRootRef.current;
      if (!cube || !root) return;
      const rect = cube.getBoundingClientRect();
      // Random point across the projected cube area (approx via bounding rect)
      const cx = rect.left + Math.random() * rect.width;
      const cy = rect.top + Math.random() * rect.height;
      const kind: Particle["kind"] = Math.random() < 0.5 ? "bill" : "fly";
      const el = document.createElement("span");
      el.textContent = kind === "bill" ? "💵" : "💸";
      el.style.position = "fixed";
      el.style.left = "0";
      el.style.top = "0";
      // Triple size: 30–45px
      el.style.fontSize = `${30 + Math.round(Math.random() * 15)}px`;
      el.style.willChange = "transform, opacity";
      el.style.pointerEvents = "none";
      el.style.zIndex = "60";
      root.appendChild(el);
      // Physics
      const vx = (Math.random() * 2 - 1) * 120; // +/-120 px/s
      const vy = kind === "bill" ? -(120 + Math.random() * 120) : (120 + Math.random() * 120);
      const g = kind === "bill" ? (280 + Math.random() * 180) : -(300 + Math.random() * 220);
      const now = performance.now();
      const minTtlMs = 600 + Math.random() * 600; // minimum 0.6–1.2s visible time
      const p: Particle = { el, kind, x: cx, y: cy, vx, vy, g, r: Math.random() * 360, vr: (Math.random() * 2 - 1) * 140, bornAt: now, minTtlMs };
      particles.push(p);
    };

    let timeoutId: number | null = null;
    const schedule = () => {
      if (!pressingRef.current) return;
      const perSec = 2 + Math.random() * 4; // 2–6 / sec
      const delay = 1000 / perSec;
      timeoutId = window.setTimeout(() => {
        spawn();
        schedule();
      }, delay);
    };
    const lastTypeRef = { current: "" as PointerEvent["pointerType"] };
    const start = () => {
      if (pressingRef.current) return;
      if (!active) return;
      pressingRef.current = true;
      schedule();
    };
    const stop = () => {
      pressingRef.current = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const onDown: (e: PointerEvent) => void = (e) => { lastTypeRef.current = e.pointerType; start(); };
    const onUp: (e: PointerEvent) => void = (e) => {
      // Only stop for non-mouse pointers on pointerup; mouse should continue while hovering
      const t = e.pointerType || lastTypeRef.current;
      if (t && t !== 'mouse') stop();
    };
    const onEnter: (e: PointerEvent) => void = () => start();
    const onLeave: (e: PointerEvent) => void = () => stop();

    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", onUp);

    // Integrate with main rAF loop by local updater
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const H = window.innerHeight;
      const nowMs = performance.now();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += p.g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.r += p.vr * dt;
        p.el.style.transform = `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0) rotate(${p.r}deg)`;
        // Cull
        if (p.kind === "bill") {
          if (p.y > H + 100 && (nowMs - p.bornAt) >= p.minTtlMs) {
            p.el.remove();
            particles.splice(i, 1);
          }
        } else {
          if (p.y < -60 && (nowMs - p.bornAt) >= p.minTtlMs) {
            p.el.remove();
            particles.splice(i, 1);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onUp);
      if (raf) cancelAnimationFrame(raf);
      stop();
      // Cleanup remaining particles
      particles.forEach(p => p.el.remove());
    };
  }, [active]);

  // Animation loop
  useEffect(() => {
    if (!active) return;
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      // Idle rotation
      angleRef.current += idleSpeedDegPerSec * dt;

      // Smooth hover
      const ease = 1 - Math.exp(-dt * 6);
      hoverRef.current.x += (targetRef.current.x - hoverRef.current.x) * ease;
      hoverRef.current.y += (targetRef.current.y - hoverRef.current.y) * ease;

      // Apply transform
      if (cubeRef.current) {
        const baseRX = -22; // toned down tilt for natural view
        const baseRY = 32;  // less yaw for subtler perspective
        const rx = baseRX + hoverRef.current.x;
        const ry = baseRY + angleRef.current + hoverRef.current.y;
        cubeRef.current.style.transform = 
          `translate3d(-50%, -50%, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active, idleSpeedDegPerSec]);

  const half = size / 2;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-square w-full overflow-visible mx-auto",
        "rounded-2xl",
        className,
      )}
      style={{
        perspective: "1100px",
        minHeight: "200px",
      }}
    >
      {/* 3D Cube */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1100px", transformStyle: ("preserve-3d" as React.CSSProperties['transformStyle']) }}>
        <div
          ref={cubeRef}
          className="absolute left-1/2 top-1/2"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transformStyle: "preserve-3d",
            transform: "translate3d(-50%, -50%, 0) rotateX(-22deg) rotateY(32deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(0,0,0,0.18) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 0 18px 6px rgba(255,255,255,0.85), 0 0 40px 14px rgba(255,255,255,0.35)",
              filter: "brightness(1.0) contrast(1.02)",
              backfaceVisibility: "hidden",
              transform: `translateZ(${half}px)`,
            }}
          />
          
          {/* Back */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.25) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 0 18px 6px rgba(255,255,255,0.85), 0 0 40px 14px rgba(255,255,255,0.35)",
              filter: "brightness(0.8)",
              backfaceVisibility: "hidden",
              transform: `rotateY(180deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Right */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.22) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 0 18px 6px rgba(255,255,255,0.85), 0 0 40px 14px rgba(255,255,255,0.35)",
              filter: "brightness(0.92)",
              backfaceVisibility: "hidden",
              transform: `rotateY(90deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Left */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.32) 0%, rgba(0,0,0,0.16) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 0 18px 6px rgba(255,255,255,0.85), 0 0 40px 14px rgba(255,255,255,0.35)",
              filter: "brightness(1.06)",
              backfaceVisibility: "hidden",
              transform: `rotateY(-90deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Top */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(0,0,0,0.12) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 0 18px 6px rgba(255,255,255,0.85), 0 0 40px 14px rgba(255,255,255,0.35)",
              filter: "brightness(1.1) contrast(1.05)",
              backfaceVisibility: "hidden",
              transform: `rotateX(90deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Bottom */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.28) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "4px solid rgba(255,255,255,0.95)",
              boxShadow: "0 0 18px 6px rgba(255,255,255,0.85), 0 0 40px 14px rgba(255,255,255,0.35)",
              filter: "brightness(0.88)",
              backfaceVisibility: "hidden",
              transform: `rotateX(-90deg) translateZ(${half}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

