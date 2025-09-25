"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useClientTheme } from "./client-theme-mount";
import { cn } from "../lib/utils";

// MoneyCube: Three.js rewrite of the previous CSS 3D cube with
// lighting, soft shadows, and mobile-friendly performance.
// It preserves a lightweight emoji-particle interaction for parity
// with the original component (no functionality removed).

type MoneyCubeProps = {
  textureSrc?: string;
  className?: string;
  idleSpeedDegPerSec?: number;
  maxTiltDeg?: number;
};

export default function MoneyCube({
  textureSrc = "/images/bg-100-dollar-ai-bills-1.png",
  className,
  idleSpeedDegPerSec = 16,
  maxTiltDeg = 22,
}: MoneyCubeProps) {
  const { theme: resolvedTheme } = useClientTheme();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  // Removed floor; no shadow plane
  const floorRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const edgeMeshRef = useRef<THREE.InstancedMesh | null>(null);

  const pressingRef = useRef(false);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(true);

  // Hover target state (deg), smoothed each frame
  const hoverRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0); // idle rotation accumulator (deg)

  // Drag/spin inertia state
  const dragStateRef = useRef({ dragging: false, lastX: 0, lastY: 0, lastT: 0 });
  const spinAngleRef = useRef({ x: 0, y: 0 }); // radians accumulators
  const spinVelRef = useRef({ x: 0, y: 0 });   // radians/sec
  const transPosRef = useRef({ x: 0, y: 0 });  // world units
  const transVelRef = useRef({ x: 0, y: 0 });  // world units/sec

  // Create or reuse a global particles root attached to <body>
  useEffect(() => {
    if (typeof window === "undefined") return;
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
        zIndex: "2147483647", // ensure emojis render above everything
        overflow: "hidden",
      } as CSSStyleDeclaration);
      document.body.appendChild(root);
    }
  }, []);

  // Setup / teardown Three.js scene
  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    // Clear any old renderer if hot-swapping
    if (rendererRef.current) {
      const old = rendererRef.current.domElement;
      if (old && old.parentElement === host) host.removeChild(old);
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(2.6, 1.7, 3.0);
    camera.lookAt(0, 0, 0); // center the cube in view
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    // Color management (compat across three versions)
    try {
      (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
    } catch {
      (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
    }
    // Disable shadows (no floor shadow desired, and saves perf)
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // transparent background
    // Slight exposure bump to brighten overall
    try { (renderer as any).toneMappingExposure = 1.1; } catch {}

    // Pixel ratio capping for mobile perf
    const desiredPR = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(desiredPR);

    host.appendChild(renderer.domElement);
    // Ensure canvas sits above surrounding layers; we will oversize the canvas and center it
    try {
      const canvas = renderer.domElement as HTMLCanvasElement;
      canvas.style.position = "absolute";
      canvas.style.left = "50%";
      canvas.style.top = "50%";
      canvas.style.transform = "translate(-50%, -50%)";
      // Keep cube below the money emojis and menu, but above background
      canvas.style.zIndex = "1000";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "auto";
    } catch {}
    rendererRef.current = renderer;

    // Resize handling
    const setSize = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      // Oversize the render area to prevent clipping when dragging outside bounds
      const overscan = 2.0; // 200% of container for generous headroom
      const rw = Math.floor(w * overscan);
      const rh = Math.floor(h * overscan);
      renderer.setSize(rw, rh, false);
      // Also set CSS size to match the render buffer so overflow is visible
      try {
        const canvas = renderer.domElement as HTMLCanvasElement;
        canvas.style.width = `${rw}px`;
        canvas.style.height = `${rh}px`;
      } catch {}
      camera.aspect = rw / rh;
      camera.updateProjectionMatrix();
    };
    setSize();
    const ro = new ResizeObserver(() => setSize());
    ro.observe(host);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.85); // brighter
    scene.add(ambient);

    // Soft sky/ground light for lift
    const hemi = new THREE.HemisphereLight(0xffffff, 0x888888, 0.6);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.2); // brighter key
    key.position.set(-3.0, 4.0, 2.5);
    key.castShadow = false;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 12;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 0.75); // brighter rim
    rim.position.set(3.0, 2.0, -2.5);
    scene.add(rim);

    // No floor (remove shadow under cube)
    floorRef.current = null;

    // Cube
    const cubeSize = 1.2; // smaller cube
    const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    const texLoader = new THREE.TextureLoader();
    const tex = texLoader.load(
      textureSrc,
      () => {
        // Color space (compat)
        try {
          (tex as any).colorSpace = (THREE as any).SRGBColorSpace;
        } catch {
          (tex as any).encoding = (THREE as any).sRGBEncoding;
        }
        tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
      }
    );

    const faceMat = new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.05,
      roughness: 0.45,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.16, // brighter lift
    });

    // One material for all faces (cheap). If you want per-face variety, duplicate faceMat.
    const cube = new THREE.Mesh(geo, faceMat);
    cube.castShadow = false;
    cubeRef.current = cube;

    // Group to allow subtle translation separate from rotation
    const group = new THREE.Group();
    group.add(cube);
    scene.add(group);
    groupRef.current = group;

    // CHUNKY 3D EDGES: Instanced cylinders along the 12 edges of the cube
    const isDark = resolvedTheme === "dark";
    const edgeRadius = 0.02; // much thinner edge bars
    const edgeLength = cubeSize * 1.02; // slightly longer than the cube to ensure coverage
    const radialSegments = 12; // low for performance, still roundish
    const edgeGeo = new THREE.CylinderGeometry(edgeRadius, edgeRadius, edgeLength, radialSegments, 1, false);
    // Cylinder axis is Y; we'll rotate per edge
    const edgeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isDark ? 0xffffff : 0x000000),
      metalness: 0.05,
      roughness: 0.35,
      emissive: isDark ? new THREE.Color(0xffffff) : new THREE.Color(0x000000),
      emissiveIntensity: isDark ? 0.2 : 0.05,
    });
    const edges = new THREE.InstancedMesh(edgeGeo, edgeMat, 12);
    edgeMeshRef.current = edges;
    const s = cubeSize / 2;
    const tmpMat = new THREE.Matrix4();
    const tmpQuat = new THREE.Quaternion();
    const tmpPos = new THREE.Vector3();
    let i = 0;
    // X-directed edges (rotate cylinder from Y to X via Z-rotation)
    for (const y of [-s, s]) {
      for (const z of [-s, s]) {
        tmpPos.set(0, y, z);
        tmpQuat.setFromEuler(new THREE.Euler(0, 0, Math.PI / 2));
        tmpMat.compose(tmpPos, tmpQuat, new THREE.Vector3(1, 1, 1));
        edges.setMatrixAt(i++, tmpMat);
      }
    }
    // Y-directed edges (default orientation)
    for (const x of [-s, s]) {
      for (const z of [-s, s]) {
        tmpPos.set(x, 0, z);
        tmpQuat.set(0, 0, 0, 1);
        tmpMat.compose(tmpPos, tmpQuat, new THREE.Vector3(1, 1, 1));
        edges.setMatrixAt(i++, tmpMat);
      }
    }
    // Z-directed edges (rotate cylinder from Y to Z via X-rotation)
    for (const x of [-s, s]) {
      for (const y of [-s, s]) {
        tmpPos.set(x, y, 0);
        tmpQuat.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
        tmpMat.compose(tmpPos, tmpQuat, new THREE.Vector3(1, 1, 1));
        edges.setMatrixAt(i++, tmpMat);
      }
    }
    edges.instanceMatrix.needsUpdate = true;
    // Attach edges to the cube so they share rotation; position remains at origin
    cube.add(edges);

    // Base orientation and hover smoothing
    const baseRX = THREE.MathUtils.degToRad(-22);
    const baseRY = THREE.MathUtils.degToRad(32);

    // Drag sensitivity and translation scale
    const spinFactor = 0.0065; // radians per pixel
    const transFactor = 0.0025; // world units per pixel

    // Interaction: pointer hover tilt
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetRef.current.x = -ny * maxTiltDeg;
      targetRef.current.y = nx * maxTiltDeg;
      pointerPosRef.current = { x: e.clientX, y: e.clientY };

      // Drag to spin + translate with inertia
      const ds = dragStateRef.current;
      if (ds.dragging) {
        const nowT = performance.now();
        const dt = Math.max(0.001, (nowT - ds.lastT) / 1000);
        const dx = e.clientX - ds.lastX;
        const dy = e.clientY - ds.lastY;

        // Update instantaneous angles and velocities
        spinAngleRef.current.x += dy * spinFactor;
        spinAngleRef.current.y += dx * spinFactor;
        spinVelRef.current.x = (dy * spinFactor) / dt;
        spinVelRef.current.y = (dx * spinFactor) / dt;

        // Slight translation for fun
        transPosRef.current.x = THREE.MathUtils.clamp(
          transPosRef.current.x + dx * transFactor,
          -0.6,
          0.6
        );
        transPosRef.current.y = THREE.MathUtils.clamp(
          transPosRef.current.y - dy * transFactor,
          -0.6,
          0.6
        );
        transVelRef.current.x = (dx * transFactor) / dt;
        transVelRef.current.y = (-dy * transFactor) / dt;

        ds.lastX = e.clientX;
        ds.lastY = e.clientY;
        ds.lastT = nowT;
      }
    };
    const onPointerLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      pointerPosRef.current = null;
    };
    // UX: better dragging feel
    try { (host.style as any).cursor = "grab"; } catch {}
    try { (host.style as any).touchAction = "none"; } catch {}

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    // Emoji particle emitter (lightweight)
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

    const spawn = () => {
      const root = document.getElementById("money-particles-root") as HTMLDivElement | null;
      if (!root) return;
      const rect = host.getBoundingClientRect();
      const fallbackX = rect.left + rect.width / 2;
      const fallbackY = rect.top + rect.height / 2;
      const baseX = pointerPosRef.current?.x ?? fallbackX;
      const baseY = pointerPosRef.current?.y ?? fallbackY;
      const cx = baseX + (Math.random() * 2 - 1) * 10;
      const cy = baseY + (Math.random() * 2 - 1) * 10;
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

    let emitterId: number | null = null;
    const schedule = () => {
      if (!pressingRef.current) return;
      const perSec = 2 + Math.random() * 3; // 2–5/sec (lighter than before)
      const delay = 1000 / perSec;
      emitterId = window.setTimeout(() => {
        spawn();
        schedule();
      }, delay);
    };
    const stopSchedule = () => {
      if (emitterId) {
        window.clearTimeout(emitterId);
        emitterId = null;
      }
    };

    const onDown = (e: PointerEvent) => {
      pressingRef.current = true;
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
      const ds = dragStateRef.current;
      ds.dragging = true;
      ds.lastX = e.clientX;
      ds.lastY = e.clientY;
      ds.lastT = performance.now();
      try { (host as any).setPointerCapture?.(e.pointerId); } catch {}
      try { (host.style as any).cursor = "grabbing"; } catch {}
      schedule();
    };
    const onUpOrCancel = (e: PointerEvent) => {
      pressingRef.current = false;
      dragStateRef.current.dragging = false;
      try { (host as any).releasePointerCapture?.(e.pointerId); } catch {}
      stopSchedule();
      try { (host.style as any).cursor = "grab"; } catch {}
    };
    const onEnter = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
      pressingRef.current = true; // match previous behavior while hovering on desktop
      schedule();
    };
    const onLeaveAll = () => {
      pressingRef.current = false;
      pointerPosRef.current = null;
      dragStateRef.current.dragging = false;
      stopSchedule();
      try { (host.style as any).cursor = "grab"; } catch {}
    };

    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerup", onUpOrCancel);
    host.addEventListener("pointercancel", onUpOrCancel);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeaveAll);

    // Intersection/visibility control to pause rendering when offscreen
    let offTimer: number | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (offTimer) { window.clearTimeout(offTimer); offTimer = null; }
        setActive(true);
      } else {
        if (offTimer) window.clearTimeout(offTimer);
        offTimer = window.setTimeout(() => setActive(false), 8000);
      }
    }, { threshold: 0 });
    io.observe(host);
    const onVis = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    // Animation loop
    let raf = 0;
    let last = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;

      // Smooth hover towards target
      const ease = 1 - Math.exp(-dt * 6);
      hoverRef.current.x += (targetRef.current.x - hoverRef.current.x) * ease;
      hoverRef.current.y += (targetRef.current.y - hoverRef.current.y) * ease;

      // Idle rotation (reduced while spinning/dragging)
      const spinSpeedMag = Math.hypot(spinVelRef.current.x, spinVelRef.current.y);
      const idleScale = (dragStateRef.current.dragging || spinSpeedMag > 0.3) ? 0.2 : 1.0;
      angleRef.current += idleSpeedDegPerSec * idleScale * dt;

      // Integrate spin inertia
      const spinDamp = 2.2;
      spinAngleRef.current.x += spinVelRef.current.x * dt;
      spinAngleRef.current.y += spinVelRef.current.y * dt;
      spinVelRef.current.x *= Math.exp(-spinDamp * dt);
      spinVelRef.current.y *= Math.exp(-spinDamp * dt);

      // Translate group slightly with inertia and gentle return
      const transDamp = 4.0;
      const returnDamp = 1.2;
      transPosRef.current.x += transVelRef.current.x * dt;
      transPosRef.current.y += transVelRef.current.y * dt;
      transVelRef.current.x *= Math.exp(-transDamp * dt);
      transVelRef.current.y *= Math.exp(-transDamp * dt);
      if (!dragStateRef.current.dragging) {
        transPosRef.current.x *= Math.exp(-returnDamp * dt);
        transPosRef.current.y *= Math.exp(-returnDamp * dt);
      }
      transPosRef.current.x = THREE.MathUtils.clamp(transPosRef.current.x, -0.6, 0.6);
      transPosRef.current.y = THREE.MathUtils.clamp(transPosRef.current.y, -0.6, 0.6);
      if (groupRef.current) {
        groupRef.current.position.set(transPosRef.current.x, transPosRef.current.y, 0);
      }

      // Apply to cube
      if (cubeRef.current) {
        const rx = baseRX + THREE.MathUtils.degToRad(hoverRef.current.x) + spinAngleRef.current.x;
        const ry = baseRY + THREE.MathUtils.degToRad(angleRef.current + hoverRef.current.y) + spinAngleRef.current.y;
        cubeRef.current.rotation.x = rx;
        cubeRef.current.rotation.y = ry;
      }

      // Update particles (DOM)
      const H = window.innerHeight;
      const nowMs = performance.now();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dts = dt;
        p.vy += p.g * dts;
        p.x += p.vx * dts;
        p.y += p.vy * dts;
        p.r += p.vr * dts;
        p.el.style.transform = `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0) rotate(${p.r}deg)`;
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

      if (active) renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      stopSchedule();

      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUpOrCancel);
      host.removeEventListener("pointercancel", onUpOrCancel);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeaveAll);

      // Remove any remaining particle elements
      particles.forEach((p) => p.el.remove());

      // Dispose Three.js resources
      try {
        cubeRef.current?.geometry.dispose();
        if (Array.isArray((cubeRef.current as any)?.material)) {
          (cubeRef.current as any).material.forEach((m: THREE.Material) => m.dispose());
        } else {
          (cubeRef.current as any)?.material?.dispose?.();
        }
        (cubeRef.current as any) = null;
      } catch {}
      try {
        if (edgeMeshRef.current) {
          edgeMeshRef.current.geometry.dispose();
          (edgeMeshRef.current.material as any)?.dispose?.();
          edgeMeshRef.current = null;
        }
      } catch {}
      try {
        floorRef.current?.geometry.dispose();
        (floorRef.current as any)?.material?.dispose?.();
        (floorRef.current as any) = null;
      } catch {}
      try {
        if (groupRef.current) {
          scene.remove(groupRef.current);
          groupRef.current.clear();
          (groupRef.current as any) = null;
        }
      } catch {}
      try {
        renderer.dispose();
      } catch {}
      try {
        const el = renderer.domElement;
        if (el && el.parentElement === host) host.removeChild(el);
      } catch {}

      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [textureSrc, idleSpeedDegPerSec, maxTiltDeg, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square w-full overflow-visible mx-auto rounded-2xl",
        className,
      )}
      style={{ zIndex: 2147483647 }}
      aria-label="Interactive money cube with soft shadows"
    />
  );
}
