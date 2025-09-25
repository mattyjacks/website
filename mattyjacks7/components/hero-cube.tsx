"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { cn } from "../lib/utils";

// Face brightness baseline used for dynamic lighting; module-level constant for stable identity
const BASE_BRIGHTNESS = {
  front: 1.0,
  back: 0.85,
  right: 0.95,
  left: 1.04,
  top: 1.06,
  bottom: 0.9,
} as const;

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
  const { resolvedTheme } = useTheme();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const particlesRootRef = useRef<HTMLDivElement | null>(null);
  const pressingRef = useRef(false);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<number>(300);
  const [active, setActive] = useState(true);

  // Theme-aware edge/glow colors (avoid flash on first paint)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const edgeBorder = isDark ? "4px solid rgba(255,255,255,0.95)" : "4px solid rgba(0,0,0,0.95)";
  // Layered, tighter halos: small blur with small spread; avoids long-distance glow
  const edgeShadow = isDark
    ? [
        "0 0 3px 0 rgba(255,255,255,0.88)",
        "0 0 6px 1px rgba(255,255,255,0.5)",
        "0 0 10px 2px rgba(255,255,255,0.22)",
        "0 0 0 1px rgba(255,255,255,0.95)"
      ].join(", ")
    : [
        "0 0 3px 0 rgba(0,0,0,0.88)",
        "0 0 6px 1px rgba(0,0,0,0.5)",
        "0 0 10px 2px rgba(0,0,0,0.22)",
        "0 0 0 1px rgba(0,0,0,0.95)"
      ].join(", ");

  const cornerColor = isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
  const dotSize = 16; // px diameter of corner spheres
  const dotOffset = Math.round(dotSize * 0.55); // how much to pull outside the corner
  const dotEdge = isDark ? "rgba(230,230,230,0.95)" : "rgba(0,0,0,0.95)";
  const dotShadowOuter = isDark ? "0 1px 2px rgba(255,255,255,0.35), 0 0 4px rgba(255,255,255,0.25)" : "0 1px 2px rgba(0,0,0,0.35), 0 0 4px rgba(0,0,0,0.25)";
  const dotShadowInner = isDark ? "inset 0 2px 4px rgba(0,0,0,0.25)" : "inset 0 2px 4px rgba(255,255,255,0.15)";
  const dotHighlight = isDark ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)";
  const dotShade = isDark ? "rgba(190,190,190,1)" : "rgba(0,0,0,1)";
  const cornerDotStyle: React.CSSProperties = {
    position: "absolute",
    width: dotSize,
    height: dotSize,
    borderRadius: "50%",
    background: `radial-gradient(circle at 28% 28%, ${dotHighlight} 0%, ${cornerColor} 40%, ${dotShade} 100%)`,
    border: `1px solid ${dotEdge}`,
    boxShadow: `${dotShadowOuter}, ${dotShadowInner}`,
  };

  // Animation state
  const angleRef = useRef(0);
  const hoverRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  // Face refs for dynamic lighting
  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Apply per-face brightness given current rx, ry
  const applyLighting = useCallback((rxDeg: number, ryDeg: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const rx = toRad(rxDeg);
    const ry = toRad(ryDeg);
    // Rotate a vector by Rx then Ry
    const rot = (v: [number, number, number]) => {
      const [x, y, z] = v;
      // Rx
      const y1 = y * Math.cos(rx) - z * Math.sin(rx);
      const z1 = y * Math.sin(rx) + z * Math.cos(rx);
      const x1 = x;
      // Ry
      const x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      const z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      return [x2, y1, z2] as [number, number, number];
    };
    // Light direction from top-left-front
    const L = normalize([-0.6, 0.8, 0.45]);
    function normalize(v: [number, number, number]) {
      const m = Math.hypot(v[0], v[1], v[2]) || 1;
      return [v[0] / m, v[1] / m, v[2] / m] as [number, number, number];
    }
    const dot = (a: [number, number, number], b: [number, number, number]) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
    const clamp = (n: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, n));

    // Local face normals
    const normals: Record<string, [number, number, number]> = {
      front: [0, 0, 1],
      back: [0, 0, -1],
      right: [1, 0, 0],
      left: [-1, 0, 0],
      top: [0, 1, 0],
      bottom: [0, -1, 0],
    };
    // Compute brightness factor from 0.7..1.25 based on orientation
    const factorFromNormal = (n: [number, number, number]) => {
      const N = rot(n);
      const d = dot(normalize(N), L);
      const t = (d + 1) / 2; // 0..1
      return 0.75 + 0.55 * t; // 0.75..1.3
    };
    const setFace = (el: HTMLDivElement | null, base: number, n: [number, number, number]) => {
      if (!el) return;
      const f = factorFromNormal(n);
      const brightness = clamp(base * f, 0.6, 1.35);
      el.style.filter = `brightness(${brightness}) contrast(1.05)`;
    };
    setFace(frontRef.current, BASE_BRIGHTNESS.front, normals.front);
    setFace(backRef.current, BASE_BRIGHTNESS.back, normals.back);
    setFace(rightRef.current, BASE_BRIGHTNESS.right, normals.right);
    setFace(leftRef.current, BASE_BRIGHTNESS.left, normals.left);
    setFace(topRef.current, BASE_BRIGHTNESS.top, normals.top);
    setFace(bottomRef.current, BASE_BRIGHTNESS.bottom, normals.bottom);
  }, []);

  // Track container size
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Base sizing as before
        let next = Math.min(width, height, 400) * 0.8;
        // Cap to 80% of viewport width for mobile/small screens
        const vwCap = typeof window !== 'undefined' ? window.innerWidth * 0.8 : Infinity;
        next = Math.min(next, vwCap);
        setSize(next);
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
      // Track absolute pointer position (viewport coords) for particle spawns
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      pointerPosRef.current = null;
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
      // Use last known pointer position or fallback to cube center
      const fallbackX = rect.left + rect.width / 2;
      const fallbackY = rect.top + rect.height / 2;
      const baseX = pointerPosRef.current?.x ?? fallbackX;
      const baseY = pointerPosRef.current?.y ?? fallbackY;
      // Small jitter for visual variety (within ~12px)
      const cx = baseX + (Math.random() * 2 - 1) * 12;
      const cy = baseY + (Math.random() * 2 - 1) * 12;
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

    const onDown: (e: PointerEvent) => void = (e) => { lastTypeRef.current = e.pointerType; pointerPosRef.current = { x: e.clientX, y: e.clientY }; start(); };
    const onUp: (e: PointerEvent) => void = (e) => {
      // Only stop for non-mouse pointers on pointerup; mouse should continue while hovering
      const t = e.pointerType || lastTypeRef.current;
      if (t && t !== 'mouse') stop();
    };
    const onEnter: (e: PointerEvent) => void = (e) => { pointerPosRef.current = { x: e.clientX, y: e.clientY }; start(); };
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
        // Update per-face lighting using final rotation angles
        applyLighting(rx, ry);
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active, idleSpeedDegPerSec, applyLighting]);

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
            ref={frontRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(0,0,0,0.18) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: edgeBorder,
              boxShadow: edgeShadow,
              filter: "brightness(1.0) contrast(1.02)",
              transition: "filter 120ms linear",
              backfaceVisibility: "hidden",
              transform: `translateZ(${half}px)`,
            }}
          >
            {/* Corner dots (spherical nodes) */}
            <span style={{ ...cornerDotStyle, top: -dotOffset, left: -dotOffset }} />
            <span style={{ ...cornerDotStyle, top: -dotOffset, right: -dotOffset }} />
            <span style={{ ...cornerDotStyle, bottom: -dotOffset, left: -dotOffset }} />
            <span style={{ ...cornerDotStyle, bottom: -dotOffset, right: -dotOffset }} />
          </div>
          
          {/* Back */}
          <div
            ref={backRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.25) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: edgeBorder,
              boxShadow: edgeShadow,
              filter: "brightness(0.8)",
              transition: "filter 120ms linear",
              backfaceVisibility: "hidden",
              transform: `rotateY(180deg) translateZ(${half}px)`,
            }}
          >
            <span style={{ position: "absolute", top: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", top: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
          </div>
          
          {/* Right */}
          <div
            ref={rightRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.22) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: edgeBorder,
              boxShadow: edgeShadow,
              filter: "brightness(0.92)",
              transition: "filter 120ms linear",
              backfaceVisibility: "hidden",
              transform: `rotateY(90deg) translateZ(${half}px)`,
            }}
          >
            <span style={{ position: "absolute", top: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", top: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
          </div>
          
          {/* Left */}
          <div
            ref={leftRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.32) 0%, rgba(0,0,0,0.16) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: edgeBorder,
              boxShadow: edgeShadow,
              filter: "brightness(1.06)",
              transition: "filter 120ms linear",
              backfaceVisibility: "hidden",
              transform: `rotateY(-90deg) translateZ(${half}px)`,
            }}
          >
            <span style={{ position: "absolute", top: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", top: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
          </div>
          
          {/* Top */}
          <div
            ref={topRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(0,0,0,0.12) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: edgeBorder,
              boxShadow: edgeShadow,
              filter: "brightness(1.1) contrast(1.05)",
              transition: "filter 120ms linear",
              backfaceVisibility: "hidden",
              transform: `rotateX(90deg) translateZ(${half}px)`,
            }}
          >
            <span style={{ position: "absolute", top: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", top: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
          </div>
          
          {/* Bottom */}
          <div
            ref={bottomRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.28) 80%), url(${textureSrc})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: edgeBorder,
              boxShadow: edgeShadow,
              filter: "brightness(0.88)",
              transition: "filter 120ms linear",
              backfaceVisibility: "hidden",
              transform: `rotateX(-90deg) translateZ(${half}px)`,
            }}
          >
            <span style={{ position: "absolute", top: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", top: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, left: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
            <span style={{ position: "absolute", bottom: -dotOffset, right: -dotOffset, width: dotSize, height: dotSize, background: cornerColor, borderRadius: "50%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

