"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type HeroCubeProps = {
  textureSrc?: string;
  className?: string;
  idleSpeedDegPerSec?: number;
  maxTiltDeg?: number;
};

export default function HeroCube({
  textureSrc = "/images/bg-100-dollar-ai-bills-1.png",
  className,
  idleSpeedDegPerSec = 16,
  maxTiltDeg = 22,
}: HeroCubeProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<number>(300);

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
        setSize(Math.min(width, height, 400));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mouse interaction
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetRef.current.x = -y * maxTiltDeg;
      targetRef.current.y = x * maxTiltDeg;
    };

    const onMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxTiltDeg]);

  // Animation loop
  useEffect(() => {
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
        const rx = -8 + hoverRef.current.x;
        const ry = angleRef.current + hoverRef.current.y;
        cubeRef.current.style.transform = 
          `translate3d(-50%, -50%, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [idleSpeedDegPerSec]);

  const half = size / 2;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative aspect-square w-full overflow-visible",
        "bg-gradient-to-br from-emerald-200/50 to-emerald-400/30 dark:from-emerald-900/40 dark:to-emerald-700/30",
        "rounded-2xl",
        className,
      )}
      style={{
        perspective: "1000px",
        minHeight: "200px",
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={{
          background: "radial-gradient(circle at center, rgba(16,185,129,0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* 3D Cube */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={cubeRef}
          className="absolute"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transformStyle: "preserve-3d",
            transform: "translate3d(-50%, -50%, 0) rotateX(-8deg) rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 border border-black/10 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${textureSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#10b981",
              transform: `translateZ(${half}px)`,
            }}
          />
          
          {/* Back */}
          <div
            className="absolute inset-0 border border-black/10 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${textureSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#059669",
              transform: `rotateY(180deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Right */}
          <div
            className="absolute inset-0 border border-black/10 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${textureSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#047857",
              transform: `rotateY(90deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Left */}
          <div
            className="absolute inset-0 border border-black/10 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${textureSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#065f46",
              transform: `rotateY(-90deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Top */}
          <div
            className="absolute inset-0 border border-black/10 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${textureSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#34d399",
              transform: `rotateX(90deg) translateZ(${half}px)`,
            }}
          />
          
          {/* Bottom */}
          <div
            className="absolute inset-0 border border-black/10 rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${textureSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#064e3b",
              transform: `rotateX(-90deg) translateZ(${half}px)`,
            }}
          />
        </div>
      </div>

      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.2), inset 0 20px 40px rgba(255,255,255,0.05)",
        }}
      />
    </div>
  );
}

