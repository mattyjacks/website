"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCloudsProps = {
  imageSrc: string;
  opacity?: number; // 0..1
  verticalSpeedSec?: number; // time to scroll background vertically once
  horizontalRangePx?: number; // max left/right drift from center
  minDriftSec?: number;
  maxDriftSec?: number;
  minScale?: number; // min zoom scale
  maxScale?: number; // max zoom scale
  tileSizePx?: number; // base tile width in px for perfect tiling
  horizontalPixelsPerSecond?: number; // controls horizontal drift speed
  showBeams?: boolean; // overlay animated sunbeams
  beamsOpacity?: number; // 0..1 opacity of beams
  beamsSpeedSec?: number; // seconds per beam pan loop
  horizontalSmoothingMs?: number; // low-pass time constant for bgX smoothing
  verticalMultiplier?: number; // multiply vertical speed for stronger drop
};

export default function AnimatedClouds({
  imageSrc,
  opacity = 0.25,
  verticalSpeedSec = 60,
  horizontalRangePx = 240,
  minDriftSec = 3,
  maxDriftSec = 10,
  minScale = 0.9,
  maxScale = 1.1,
  tileSizePx = 1024,
  horizontalPixelsPerSecond = 30,
  showBeams = false,
  beamsOpacity = 0.15,
  beamsSpeedSec = 20,
  horizontalSmoothingMs = 120,
  verticalMultiplier = 1,
}: AnimatedCloudsProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  // Deterministic initial values to prevent hydration mismatch
  const [bgX, setBgX] = useState(0);
  const bgXRef = useRef(0);
  // Smoothed X used for rendering to avoid stutter
  const [bgXSmooth, setBgXSmooth] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleTargetRef = useRef(1);
  const [mounted, setMounted] = useState(false);
  // Effective tile size; half-pixel rounding to reduce visible stepping during zoom
  const effectiveSize = Math.max(16, Math.round((tileSizePx * scale) * 2) / 2);
  const effectiveBgX = Math.round(bgXSmooth * 2) / 2; // half-pixel rounding reduces jitter
  const [y, setY] = useState(0); // vertical offset in px, negative scroll
  const vMultRef = useRef(1); // current vertical speed multiplier
  const vTargetRef = useRef(1); // target multiplier we ease toward
  const vxRef = useRef(0); // current horizontal px/sec
  const vxTargetRef = useRef(0); // target horizontal px/sec

  // Keep ref in sync with state
  useEffect(() => {
    bgXRef.current = bgX;
  }, [bgX]);

  // Start motion after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth, continuous vertical scroll with wrapping (no resets)
  useEffect(() => {
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
      let pxPerSec = (effectiveSize / Math.max(1, verticalSpeedSec)) * Math.max(0.1, verticalMultiplier);
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
      // accumulate and wrap to [-effectiveSize, 0)
      setY((prev) => {
        let next = prev - pxPerSec * vMultRef.current * dt;
        // robust wrapping to keep in [-effectiveSize, 0)
        while (next <= -effectiveSize) next += effectiveSize;
        while (next > 0) next -= effectiveSize;
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (changeTimer) window.clearTimeout(changeTimer);
    };
  }, [effectiveSize, verticalSpeedSec, horizontalPixelsPerSecond, horizontalRangePx, minScale, maxScale, horizontalSmoothingMs, verticalMultiplier]);

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
          backgroundImage: `url(${imageSrc})`,
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

      {showBeams && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ opacity: beamsOpacity, mixBlendMode: "screen" as any }}
        >
          <div className="absolute inset-0 beams-layer beams-1" />
          <div className="absolute inset-0 beams-layer beams-2" />
          <div className="absolute inset-0 beams-layer beams-3" />
          {/* Directional sun vignette (warm) from top-left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1200px 600px at 5% 0%, rgba(255, 245, 170, 0.25), rgba(255, 245, 170, 0.0) 60%)",
              mixBlendMode: "screen" as any,
            }}
          />
          {/* Soft edge vignette to subtly frame and aid contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.12) 100%)",
              mixBlendMode: "multiply" as any,
            }}
          />
          <style jsx>{`
            .beams-layer { will-change: transform, background-position; }
            .beams-1 {
              background: repeating-linear-gradient(
                75deg,
                rgba(255, 245, 170, 0.45) 0%,
                rgba(255, 245, 170, 0.0) 12%,
                rgba(255, 245, 170, 0.45) 24%
              );
              animation: beams-pan-1 ${beamsSpeedSec}s linear infinite, beams-rot-1 ${beamsSpeedSec * 4}s ease-in-out infinite alternate;
            }
            .beams-2 {
              background: repeating-linear-gradient(
                62deg,
                rgba(255, 235, 140, 0.35) 0%,
                rgba(255, 235, 140, 0.0) 14%,
                rgba(255, 235, 140, 0.35) 28%
              );
              animation: beams-pan-2 ${beamsSpeedSec * 1.3}s linear infinite, beams-rot-2 ${beamsSpeedSec * 5}s ease-in-out infinite alternate;
            }
            .beams-3 {
              background: repeating-linear-gradient(
                88deg,
                rgba(255, 225, 120, 0.28) 0%,
                rgba(255, 225, 120, 0.0) 18%,
                rgba(255, 225, 120, 0.28) 36%
              );
              animation: beams-pan-3 ${beamsSpeedSec * 1.8}s linear infinite, beams-rot-3 ${beamsSpeedSec * 6}s ease-in-out infinite alternate;
            }
            @keyframes beams-pan-1 {
              from { background-position: 0 0; }
              to { background-position: 700px -900px; }
            }
            @keyframes beams-rot-1 {
              from { transform: rotate(0deg) scale(1.15); }
              to { transform: rotate(8deg) scale(1.25); }
            }
            @keyframes beams-pan-2 {
              from { background-position: -200px 0; }
              to { background-position: 600px -700px; }
            }
            @keyframes beams-rot-2 {
              from { transform: rotate(-2deg) scale(1.2); }
              to { transform: rotate(6deg) scale(1.27); }
            }
            @keyframes beams-pan-3 {
              from { background-position: 200px 0; }
              to { background-position: -600px -800px; }
            }
            @keyframes beams-rot-3 {
              from { transform: rotate(3deg) scale(1.22); }
              to { transform: rotate(-5deg) scale(1.28); }
            }
          `}</style>
        </div>
      )}

      {/* Vertical motion is driven by rAF updating backgroundPositionY for seamless looping. */}
    </div>
  );
}
