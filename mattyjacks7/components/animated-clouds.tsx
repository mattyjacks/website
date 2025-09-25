"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type AnimatedCloudsProps = {
  imageSrc: string;
  darkImageSrc?: string; // optional image for dark mode
  opacity?: number; // 0..1
  verticalSpeedSec?: number; // time to scroll background vertically once
  horizontalRangePx?: number; // max left/right drift from center
  minScale?: number; // min zoom scale
  maxScale?: number; // max zoom scale
  tileSizePx?: number; // base tile width in px for perfect tiling
  horizontalPixelsPerSecond?: number; // controls horizontal drift speed
  horizontalSmoothingMs?: number; // low-pass time constant for bgX smoothing
  verticalMultiplier?: number; // multiply vertical speed for stronger drop
};

export default function AnimatedClouds({
  imageSrc,
  darkImageSrc,
  opacity = 0.25,
  verticalSpeedSec = 60,
  horizontalRangePx = 800,
  minScale = 0.9,
  maxScale = 1.1,
  tileSizePx = 1024,
  horizontalPixelsPerSecond = 30,
  horizontalSmoothingMs = 120,
  verticalMultiplier = 1,
}: AnimatedCloudsProps) {
  const { resolvedTheme } = useTheme();
  const outerRef = useRef<HTMLDivElement | null>(null);
  // Deterministic initial values to prevent hydration mismatch
  const [bgX, setBgX] = useState(0);
  const bgXRef = useRef(0);
  // Smoothed X used for rendering to avoid stutter
  const [bgXSmooth, setBgXSmooth] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleTargetRef = useRef(1);
  // Effective tile size; half-pixel rounding to reduce visible stepping during zoom
  const effectiveSize = Math.max(16, Math.round((tileSizePx * scale) * 2) / 2);
  const effectiveBgX = Math.round(bgXSmooth * 2) / 2; // half-pixel rounding reduces jitter
  const [y, setY] = useState(0); // vertical offset in px, positive = move background downward
  const vMultRef = useRef(1); // current vertical speed multiplier
  const vTargetRef = useRef(1); // target multiplier we ease toward
  const vxRef = useRef(0); // current horizontal px/sec
  const vxTargetRef = useRef(0); // target horizontal px/sec
  const [active, setActive] = useState(true);

  // Choose image based on theme. Initialize synchronously to avoid flash on reload.
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(() => {
    if (typeof window === "undefined") return imageSrc;
    const isDark = document.documentElement.classList.contains("dark");
    return isDark && darkImageSrc ? darkImageSrc : imageSrc;
  });

  // Update on theme changes after mount
  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    setCurrentImageSrc(isDark && darkImageSrc ? darkImageSrc : imageSrc);
  }, [resolvedTheme, darkImageSrc, imageSrc]);

  // Keep ref in sync with state
  useEffect(() => {
    bgXRef.current = bgX;
  }, [bgX]);

  // (removed) start-on-mount flag; not needed

  // Visibility: pause when offscreen for 10s or tab hidden
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let offTimer: number | null = null;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (offTimer) { window.clearTimeout(offTimer); offTimer = null; }
        setActive(true);
      } else {
        if (offTimer) window.clearTimeout(offTimer);
        offTimer = window.setTimeout(() => setActive(false), 10000);
      }
    }, { threshold: 0 });
    obs.observe(el);
    const onVis = () => {
      setActive(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      obs.disconnect();
      if (offTimer) window.clearTimeout(offTimer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Smooth, continuous vertical scroll with wrapping (no resets)
  useEffect(() => {
    if (!active) return;
    let raf: number;
    let last = performance.now();
    // Randomly change vertical speed multiplier every few seconds for exploration
    let changeTimer: number | undefined;
    const scheduleChange = () => {
      const nextInSec = 2 + Math.random() * 3; // 2–5s (change direction more often)
      changeTimer = window.setTimeout(() => {
        // Pick a new multiplier in [0.9, 1.6] to vary speed but keep trending upward
        vTargetRef.current = 0.9 + Math.random() * 0.7;
        // Pick a new horizontal velocity target: bias toward flipping direction
        const currentDir = Math.sign(vxRef.current || 1);
        const flip = Math.random() < 0.65 ? -1 : 1; // 65% chance to flip
        const dir = currentDir * flip;
        const speed = horizontalPixelsPerSecond * (0.4 + Math.random() * 0.7); // 0.4x–1.1x
        vxTargetRef.current = dir * speed;
        // Pick a new scale target
        const lo = Math.min(minScale, maxScale);
        const hi = Math.max(minScale, maxScale);
        scaleTargetRef.current = lo + Math.random() * (hi - lo);
        scheduleChange();
      }, nextInSec * 1000);
    };
    scheduleChange();
    // pixels per second; tie speed to tile size so it feels consistent across zooms
    const tick = (now: number) => {
      // Clamp dt to avoid large jumps causing visible stutter
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const pxPerSec = (effectiveSize / Math.max(1, verticalSpeedSec)) * Math.max(0.1, verticalMultiplier);
      // Ease current multiplier toward target
      const ease = Math.min(1, dt * 0.8); // responsiveness of modulation
      vMultRef.current = vMultRef.current + (vTargetRef.current - vMultRef.current) * ease;
      // Ease horizontal velocity toward its target, and integrate position
      const hxEase = Math.min(1, dt * 0.6);
      vxRef.current = vxRef.current + (vxTargetRef.current - vxRef.current) * hxEase;
      setBgX((prev) => {
        let next = prev + vxRef.current * dt;
        // Wrap within [-horizontalRangePx, +horizontalRangePx] to avoid float blowup
        const limit = Math.max(1, horizontalRangePx);
        if (next > limit) next -= 2 * limit;
        if (next < -limit) next += 2 * limit;
        return next;
      });
      // Temporal smoothing filter for render X (single pole low-pass)
      setBgXSmooth((prev) => {
        const tau = Math.max(1, horizontalSmoothingMs) / 1000;
        const alpha = 1 - Math.exp(-dt / tau);
        return prev + (bgXRef.current - prev) * alpha;
      });
      // Ease scale toward its target with a per-second rate limit to avoid stutter
      const sEase = Math.min(1, dt * 0.35);
      const scaleMaxRatePerSec = 0.25; // limit how fast scale can change
      setScale((prev) => {
        const desired = prev + (scaleTargetRef.current - prev) * sEase;
        const delta = desired - prev;
        const maxChange = scaleMaxRatePerSec * dt;
        if (Math.abs(delta) > maxChange) {
          return prev + Math.sign(delta) * maxChange;
        }
        return desired;
      });
      // accumulate and wrap within [0, effectiveSize); increasing Y moves background downward
      setY((prev) => {
        let next = prev + pxPerSec * vMultRef.current * dt;
        while (next >= effectiveSize) next -= effectiveSize;
        while (next < 0) next += effectiveSize;
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (changeTimer) window.clearTimeout(changeTimer);
    };
  }, [active, effectiveSize, verticalSpeedSec, horizontalPixelsPerSecond, horizontalRangePx, minScale, maxScale, horizontalSmoothingMs, verticalMultiplier]);

  return (
    <div
      ref={outerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        // Container no longer transforms; prevents edge gaps while drifting/zooming
        transition: undefined,
        opacity,
        // Ensure we can cover the full viewport area even if the section is shorter
        minHeight: "100vh",
        willChange: "auto",
      }}
    >
      <div
        className="absolute"
        style={{
          // Expand beyond bounds to avoid any visible edge during zoom/drift
          top: "-10vh",
          bottom: "-10vh",
          left: "-10vw",
          right: "-10vw",
          backgroundImage: `url(${currentImageSrc})`,
          backgroundRepeat: "repeat",
          // Drift horizontally via backgroundPositionX
          backgroundPositionX: `${effectiveBgX}px`,
          // Continuous vertical movement via backgroundPositionY (no transforms, no split)
          backgroundPositionY: `${Math.round(y)}px`,
          // Zoom via background-size keeping perfect tiling
          backgroundSize: `${effectiveSize}px auto`,
          willChange: "background-position-x, background-position-y, background-size",
          // Ensure it spans at least the viewport
          minHeight: "calc(100vh + 20vh)",
          width: "calc(100% + 20vw)",
          // rAF drives motion; no CSS transitions needed to avoid snap
          transition: undefined,
        }}
      />

      

      {/* Vertical motion is driven by rAF updating backgroundPositionY for seamless looping. */}
    </div>
  );
}
