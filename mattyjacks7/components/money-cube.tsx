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
  disableParticles?: boolean;
};

export default function MoneyCube({
  textureSrc = "/images/bg-100-dollar-ai-bills-1.png",
  className,
  idleSpeedDegPerSec = 16,
  maxTiltDeg = 22,
  disableParticles = false,
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
  // Drag helpers for accurate follow
  const dragPlaneRef = useRef<THREE.Plane | null>(null);
  const dragOffsetRef = useRef<THREE.Vector3 | null>(null);

  const pressingRef = useRef(false);
  const hoveringRef = useRef(false);
  const emitterRunningRef = useRef(false);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(true);
  // Read 'active' safely inside rAF without forcing effect dependencies
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  // Hover target state (deg), smoothed each frame
  const hoverRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const angleRef = useRef(0); // idle rotation accumulator (deg)

  // Multi-cube state
  const selectedIndexRef = useRef(0);

  // Drag/spin inertia state
  const dragStateRef = useRef({ dragging: false, lastX: 0, lastY: 0, lastT: 0 });

  // Create or reuse a global particles root attached to <body>
  useEffect(() => {
    if (typeof window === "undefined" || disableParticles) return;
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
        zIndex: "50", // ensure emojis render above content but below system overlays
        overflow: "hidden",
      } as CSSStyleDeclaration);
      document.body.appendChild(root);
    }
  }, [disableParticles]);

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
    // Color management (compat across three versions) without using 'any'
    type RendererCompat = {
      outputColorSpace?: THREE.ColorSpace;
      outputEncoding?: number;
      toneMappingExposure?: number;
    };
    type ThreeCompat = {
      SRGBColorSpace?: THREE.ColorSpace;
      sRGBEncoding?: number;
    };
    const rCompat = renderer as unknown as RendererCompat;
    const threeCompat = THREE as unknown as ThreeCompat;
    if (typeof rCompat.outputColorSpace !== "undefined" && typeof threeCompat.SRGBColorSpace !== "undefined") {
      rCompat.outputColorSpace = threeCompat.SRGBColorSpace;
    } else if (typeof rCompat.outputEncoding !== "undefined" && typeof threeCompat.sRGBEncoding !== "undefined") {
      rCompat.outputEncoding = threeCompat.sRGBEncoding;
    }
    // Disable shadows (no floor shadow desired, and saves perf)
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // transparent background
    // Slight exposure bump to brighten overall (if supported)
    if (typeof (rCompat.toneMappingExposure) !== "undefined") {
      rCompat.toneMappingExposure = 1.1;
    }

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
      // Keep cube below action buttons and menu, but above background
      canvas.style.zIndex = "10";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "auto";
      canvas.style.touchAction = "pan-y pinch-zoom";
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
    // Lower ambient to deepen dark regions
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    // Soft sky/ground light for lift
    const hemi = new THREE.HemisphereLight(0xffffff, 0x666666, 0.35);
    scene.add(hemi);

    // Stronger key to increase contrast while ambient is lower
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
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

    // Modest rim to keep silhouettes without lifting dark faces too much
    const rim = new THREE.DirectionalLight(0xffffff, 0.45);
    rim.position.set(3.0, 2.0, -2.5);
    scene.add(rim);

    // No floor (remove shadow under cube)
    floorRef.current = null;

    // Cube
    const cubeSize = 0.6; // way smaller
    const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    const texLoader = new THREE.TextureLoader();
    const tex = texLoader.load(
      textureSrc,
      () => {
        // Color space (compat) without using 'any'
        type TextureCompat = { colorSpace?: THREE.ColorSpace; encoding?: number };
        type ThreeCompatTex = { SRGBColorSpace?: THREE.ColorSpace; sRGBEncoding?: number };
        const tCompat = tex as unknown as TextureCompat;
        const threeTex = THREE as unknown as ThreeCompatTex;
        if (typeof tCompat.colorSpace !== "undefined" && typeof threeTex.SRGBColorSpace !== "undefined") {
          tCompat.colorSpace = threeTex.SRGBColorSpace;
        } else if (typeof tCompat.encoding !== "undefined" && typeof threeTex.sRGBEncoding !== "undefined") {
          tCompat.encoding = threeTex.sRGBEncoding;
        }
        tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
      }
    );

    const faceMat = new THREE.MeshStandardMaterial({
      map: tex,
      color: new THREE.Color(0xf3ffee), // a bit lighter with soft green tint
      metalness: 0.02,
      roughness: 0.66, // slightly smoother for brightness
      emissive: new THREE.Color(0x136d13), // dark green emissive for a subtle lift
      emissiveIntensity: 0.08,
    });

    // One material for all faces (cheap). If you want per-face variety, duplicate faceMat.
    const cube = new THREE.Mesh(geo, faceMat);
    cube.castShadow = false;
    cubeRef.current = cube;

    // Theme-aware edge material (defined BEFORE makeCube to avoid TDZ issues)
    const baseEdgeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(resolvedTheme === "dark" ? 0xffffff : 0x000000),
      metalness: 0.05,
      roughness: 0.35,
      emissive: resolvedTheme === "dark" ? new THREE.Color(0xffffff) : new THREE.Color(0x000000),
      emissiveIntensity: resolvedTheme === "dark" ? 0.2 : 0.05,
    });

    // Helper to make a cube group with edges at given size
    const makeCube = (size: number) => {
      const g = new THREE.Group();
      const geoLocal = new THREE.BoxGeometry(size, size, size);
      const cubeLocal = new THREE.Mesh(geoLocal, faceMat.clone());
      cubeLocal.castShadow = false;
      g.add(cubeLocal);
      // Additive 'screen' tint overlay for greener, lighter look
      const tintMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x5cff9d),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.22,
        depthWrite: false,
      });
      const tintMesh = new THREE.Mesh(geoLocal.clone(), tintMat);
      cubeLocal.add(tintMesh);
      // edges instanced for this cube
      const edgeThickness = 0.008;
      const edgeLength = size * 1.02;
      const edgeGeo = new THREE.BoxGeometry(1, 1, 1);
      const edgeMatLocal = baseEdgeMat.clone();
      const edgesLocal = new THREE.InstancedMesh(edgeGeo, edgeMatLocal, 12);
      const sLocal = size / 2;
      const tmpMatL = new THREE.Matrix4();
      const tmpQuatL = new THREE.Quaternion();
      const tmpPosL = new THREE.Vector3();
      let ii = 0;
      for (const y of [-sLocal, sLocal]) {
        for (const z of [-sLocal, sLocal]) {
          tmpPosL.set(0, y, z);
          tmpQuatL.set(0, 0, 0, 1);
          tmpMatL.compose(tmpPosL, tmpQuatL, new THREE.Vector3(edgeLength, edgeThickness, edgeThickness));
          edgesLocal.setMatrixAt(ii++, tmpMatL);
        }
      }
      for (const x of [-sLocal, sLocal]) {
        for (const z of [-sLocal, sLocal]) {
          tmpPosL.set(x, 0, z);
          tmpQuatL.set(0, 0, 0, 1);
          tmpMatL.compose(tmpPosL, tmpQuatL, new THREE.Vector3(edgeThickness, edgeLength, edgeThickness));
          edgesLocal.setMatrixAt(ii++, tmpMatL);
        }
      }
      for (const x of [-sLocal, sLocal]) {
        for (const y of [-sLocal, sLocal]) {
          tmpPosL.set(x, y, 0);
          tmpQuatL.set(0, 0, 0, 1);
          tmpMatL.compose(tmpPosL, tmpQuatL, new THREE.Vector3(edgeThickness, edgeThickness, edgeLength));
          edgesLocal.setMatrixAt(ii++, tmpMatL);
        }
      }
      edgesLocal.instanceMatrix.needsUpdate = true;
      // Parent edges to cube so they inherit exact rotation
      cubeLocal.add(edgesLocal);
      return { group: g, mesh: cubeLocal };
    };

    // Create three cubes with different sizes
    const sizes = [0.5, 0.65, 0.75]; // make the biggest cube smaller
    const cubes: { group: THREE.Group; mesh: THREE.Mesh }[] = sizes.map((s) => makeCube(s));
    cubes.forEach((c) => scene.add(c.group));
    // Raycasting support
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // Small three-body-like system near the origin
    const masses = [1.0, 1.2, 0.8];
    const pos = [
      new THREE.Vector3(0.20, 0.05, 0.02),
      new THREE.Vector3(-0.18, 0.07, 0.10),
      new THREE.Vector3(0.02, -0.15, -0.12),
    ];
    const vel = [
      new THREE.Vector3(0.0, 0.14, 0.12),
      new THREE.Vector3(-0.12, 0.0, -0.10),
      new THREE.Vector3(0.11, -0.09, 0.0),
    ];
    const G = 0.4;          // gravitation-like strength
    const eps2 = 0.02 * 0.02; // softening to avoid singularities
    const kCenter = 1.2;    // strong but slightly relaxed to allow wider spacing
    const damp = 0.55;      // damping

    // Per-cube spin/translation inertia
    const spinAngles = sizes.map(() => ({ x: 0, y: 0 }));
    const spinVels = sizes.map(() => ({ x: 0, y: 0 }));
    const transPos = sizes.map(() => ({ x: 0, y: 0 }));
    const transVel = sizes.map(() => ({ x: 0, y: 0 }));

    // (Single-cube edges below were replaced by per-cube edges inside makeCube.)

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

        // Update instantaneous angles and velocities for selected cube
        const idx = selectedIndexRef.current;
        spinAngles[idx].x += dy * spinFactor;
        spinAngles[idx].y += dx * spinFactor;
        spinVels[idx].x = (dy * spinFactor) / dt;
        spinVels[idx].y = (dx * spinFactor) / dt;

        if (!dragPlaneRef.current) {
          // Slight translation for fun when not plane-dragging
          transPos[idx].x = THREE.MathUtils.clamp(
            transPos[idx].x + dx * transFactor,
            -0.6,
            0.6
          );
          transPos[idx].y = THREE.MathUtils.clamp(
            transPos[idx].y - dy * transFactor,
            -0.6,
            0.6
          );
          transVel[idx].x = (dx * transFactor) / dt;
          transVel[idx].y = (-dy * transFactor) / dt;
        }

        // Nudge orbital velocity of the selected cube in camera-right/up directions
        const cam = cameraRef.current;
        if (cam) {
          const dir = new THREE.Vector3();
          cam.getWorldDirection(dir); // camera forward
          const right = new THREE.Vector3();
          right.crossVectors(dir, cam.up).normalize();
          const upWorld = cam.up.clone().normalize();
          const velFactor = 0.0035; // tune impulse strength from drag
          vel[idx].add(right.multiplyScalar(dx * velFactor));
          vel[idx].add(upWorld.multiplyScalar(-dy * velFactor));
        }

        // Drag-plane follow: project pointer to plane and move cube center to follow
        const plane = dragPlaneRef.current;
        const offset = dragOffsetRef.current;
        if (plane && offset) {
          const canvas = renderer.domElement as HTMLCanvasElement;
          const rectC = canvas.getBoundingClientRect();
          pointer.x = ((e.clientX - rectC.left) / rectC.width) * 2 - 1;
          pointer.y = -((e.clientY - rectC.top) / rectC.height) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          const hitP = new THREE.Vector3();
          if (raycaster.ray.intersectPlane(plane, hitP)) {
            const target = hitP.add(offset.clone());
            pos[idx].copy(target);
            // zero out transient translation while dragging for precision
            transPos[idx].x = 0; transPos[idx].y = 0;
            transVel[idx].x = 0; transVel[idx].y = 0;
          }
        }

        ds.lastX = e.clientX;
        ds.lastY = e.clientY;
        ds.lastT = nowT;
      }
    };
    const onPointerLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      pointerPosRef.current = null;
      hoveringRef.current = false;
    };
    // Allow page scroll by default; block only if touch starts on a cube
    const onTouchStart = (e: TouchEvent) => {
      if (!camera) return;
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      try {
        const canvas = renderer.domElement as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(cubes.map(c => c.mesh));
        if (intersects.length > 0) {
          e.preventDefault(); // touching a cube: prevent scroll
        }
      } catch {}
    };
    // UX: better dragging feel
    try { host.style.cursor = "grab"; } catch {}
    try { (host.style as CSSStyleDeclaration).touchAction = "auto"; } catch {}

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("touchstart", onTouchStart, { passive: false });

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
    const startEmitter = () => {
      if (disableParticles) return; // particles disabled
      if (emitterRunningRef.current) return; // already running
      if (!(pressingRef.current || hoveringRef.current)) return;
      emitterRunningRef.current = true;
      const loop = () => {
        if (!emitterRunningRef.current) return;
        spawn();
        const perSec = 2 + Math.random() * 3; // 2–5/sec
        const delay = 1000 / perSec;
        emitterId = window.setTimeout(loop, delay);
      };
      loop();
    };
    const stopEmitter = () => {
      emitterRunningRef.current = false;
      if (emitterId) {
        window.clearTimeout(emitterId);
        emitterId = null;
      }
    };

    const onDown = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
      // Raycast using canvas rect for accuracy
      const canvas = renderer.domElement as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(cubes.map(c => c.mesh));

      const ds = dragStateRef.current;
      if (intersects.length > 0) {
        const first = intersects[0];
        const hitMesh = first.object as THREE.Mesh;
        const idx = cubes.findIndex(c => c.mesh === hitMesh);
        if (idx >= 0) selectedIndexRef.current = idx;

        ds.dragging = true;
        pressingRef.current = true;
        ds.lastX = e.clientX;
        ds.lastY = e.clientY;
        ds.lastT = performance.now();
        try { host.setPointerCapture?.(e.pointerId); } catch {}
        try { host.style.cursor = "grabbing"; } catch {}

        // Setup a drag plane perpendicular to camera through the hit point
        const camForward = new THREE.Vector3();
        camera.getWorldDirection(camForward);
        dragPlaneRef.current = new THREE.Plane().setFromNormalAndCoplanarPoint(camForward, first.point.clone());
        // Keep the same relative offset from pointer hit to the group center
        const groupWorld = new THREE.Vector3();
        cubes[selectedIndexRef.current].group.getWorldPosition(groupWorld);
        dragOffsetRef.current = groupWorld.sub(first.point.clone());

        // While dragging, disable scroll on the canvas
        try { canvas.style.touchAction = "none"; } catch {}

        startEmitter();
      } else {
        // Not clicking on a cube – do not start dragging
        pressingRef.current = false;
      }
    };
    const onUpOrCancel = (e: PointerEvent) => {
      pressingRef.current = false;
      dragStateRef.current.dragging = false;
      try { host.releasePointerCapture?.(e.pointerId); } catch {}
      dragPlaneRef.current = null;
      dragOffsetRef.current = null;
      try {
        const canvas = renderer.domElement as HTMLCanvasElement;
        canvas.style.touchAction = "pan-y pinch-zoom";
      } catch {}
      // If still hovering, continue spawning
      if (!hoveringRef.current) stopEmitter();
      try { host.style.cursor = "grab"; } catch {}
    };
    const onEnter = (e: PointerEvent) => {
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
      hoveringRef.current = true;
      startEmitter();
    };
    const onLeaveAll = () => {
      pressingRef.current = false;
      pointerPosRef.current = null;
      dragStateRef.current.dragging = false;
      hoveringRef.current = false;
      stopEmitter();
      try { host.style.cursor = "grab"; } catch {}
    };

    // Touch handlers for mobile emoji particles
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      pointerPosRef.current = { x: t.clientX, y: t.clientY };
      // Trigger emitter on touch move
      if (!emitterRunningRef.current) {
        hoveringRef.current = true;
        startEmitter();
      }
    };

    const onTouchEnd = () => {
      hoveringRef.current = false;
      if (!pressingRef.current) {
        stopEmitter();
      }
    };

    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerup", onUpOrCancel);
    host.addEventListener("pointercancel", onUpOrCancel);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeaveAll);
    host.addEventListener("touchmove", onTouchMove, { passive: true });
    host.addEventListener("touchend", onTouchEnd, { passive: true });

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
    let randAccum = 0; // timer for periodic random variations

    const animate = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      randAccum += dt;

      // Smooth hover towards target (unused for multi-cube rotation now, but kept for possible tilt)
      const ease = 1 - Math.exp(-dt * 6);
      hoverRef.current.x += (targetRef.current.x - hoverRef.current.x) * ease;
      hoverRef.current.y += (targetRef.current.y - hoverRef.current.y) * ease;

      // Idle rotation (reduced while spinning/dragging)
      const idxSel = selectedIndexRef.current;
      const spinSpeedMag = Math.hypot(spinVels[idxSel].x, spinVels[idxSel].y);
      const idleScale = (dragStateRef.current.dragging || spinSpeedMag > 0.3) ? 0.2 : 1.0;
      angleRef.current += idleSpeedDegPerSec * idleScale * dt;

      // Integrate spin inertia for all cubes
      const spinDamp = 2.2;
      for (let i = 0; i < sizes.length; i++) {
        spinAngles[i].x += spinVels[i].x * dt;
        spinAngles[i].y += spinVels[i].y * dt;
        spinVels[i].x *= Math.exp(-spinDamp * dt);
        spinVels[i].y *= Math.exp(-spinDamp * dt);
      }

      // Translate groups slightly with inertia and gentle return per cube
      const transDamp = 4.0;
      const returnDamp = 1.2;
      for (let i = 0; i < sizes.length; i++) {
        transPos[i].x += transVel[i].x * dt;
        transPos[i].y += transVel[i].y * dt;
        transVel[i].x *= Math.exp(-transDamp * dt);
        transVel[i].y *= Math.exp(-transDamp * dt);
        if (!(dragStateRef.current.dragging && selectedIndexRef.current === i)) {
          transPos[i].x *= Math.exp(-returnDamp * dt);
          transPos[i].y *= Math.exp(-returnDamp * dt);
        }
        transPos[i].x = THREE.MathUtils.clamp(transPos[i].x, -0.6, 0.6);
        transPos[i].y = THREE.MathUtils.clamp(transPos[i].y, -0.6, 0.6);
      }

      // N-body like update for tight three-body motion
      const acc = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
      for (let i = 0; i < 3; i++) acc[i].set(0, 0, 0);
      for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 3; j++) {
          const r = new THREE.Vector3().subVectors(pos[j], pos[i]);
          const r2 = Math.max(eps2, r.lengthSq());
          const invR3 = 1 / Math.pow(r2, 1.5);
          const f = r.clone().multiplyScalar(G * invR3);
          acc[i].add(f.clone().multiplyScalar(masses[j]));
          acc[j].add(f.clone().multiplyScalar(-masses[i]));
        }
      }
      // Add tiny global precession to promote x/y/z coupling
      const wx = 0.35, wy = 0.27, wz = 0.19; // rad/s (small)
      const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), wx * dt);
      const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), wy * dt);
      const qz = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), wz * dt);
      const q = new THREE.Quaternion();
      q.multiply(qx).multiply(qy).multiply(qz);
      for (let i = 0; i < 3; i++) {
        // Centering spring and damping
        acc[i].add(pos[i].clone().multiplyScalar(-kCenter));
        acc[i].add(vel[i].clone().multiplyScalar(-damp));
        if (!(dragStateRef.current.dragging && selectedIndexRef.current === i)) {
          vel[i].add(acc[i].multiplyScalar(dt));
          vel[i].applyQuaternion(q); // gentle precession
          pos[i].add(vel[i].clone().multiplyScalar(dt));
        }
        // Clamp radius to keep tight cluster
        const maxR = 0.35;
        const L = pos[i].length();
        if (L > maxR) pos[i].multiplyScalar(maxR / L);
      }

      // Periodic random speed variations for each cube
      if (randAccum > 0.65) {
        randAccum = 0;
        for (let i = 0; i < 3; i++) {
          if (dragStateRef.current.dragging && selectedIndexRef.current === i) continue;
          const jitter = new THREE.Vector3(
            (Math.random() - 0.5) * 0.08,
            (Math.random() - 0.5) * 0.08,
            (Math.random() - 0.5) * 0.08
          );
          vel[i].add(jitter);
          // slight spin variance
          spinVels[i].x += (Math.random() - 0.5) * 0.12;
          spinVels[i].y += (Math.random() - 0.5) * 0.12;
        }
      }

      // Soft minimum-distance repulsion to prevent sticking/vibration
      for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 3; j++) {
          const p1 = pos[i];
          const p2 = pos[j];
          const delta = new THREE.Vector3().subVectors(p2, p1);
          const dist = Math.max(1e-6, delta.length());
          const r1 = sizes[i] * 0.5;
          const r2 = sizes[j] * 0.5;
          const sepScale = 1.6; // enlarge minimum separation
          const minDist = (r1 + r2) * sepScale;
          if (dist < minDist) {
            const n = delta.clone().multiplyScalar(1 / dist);
            const overlap = minDist - dist;
            // split positional correction
            p1.add(n.clone().multiplyScalar(-overlap * 0.5));
            p2.add(n.clone().multiplyScalar(overlap * 0.5));

            const mi = masses[i], mj = masses[j];
            // Non-linear proximity factor (0..1) => cubic to ramp up hard when very close
            const pf = Math.min(1, Math.max(0, overlap / minDist));
            const baseK = 22.0; // base repulsion strength
            const jRepel = baseK * (pf * pf * pf) * dt;
            vel[i].add(n.clone().multiplyScalar(-jRepel / mi));
            vel[j].add(n.clone().multiplyScalar(jRepel / mj));

            // Burst when extremely close
            if (pf > 0.6) {
              const burstK = 35.0;
              const jBurst = burstK * (pf - 0.6) * (pf - 0.6) * dt;
              // add small randomization to direction for variation
              const randDir = n.clone().add(new THREE.Vector3(
                (Math.random() - 0.5) * 0.25,
                (Math.random() - 0.5) * 0.25,
                (Math.random() - 0.5) * 0.25
              )).normalize();
              vel[i].add(randDir.clone().multiplyScalar(-jBurst / mi));
              vel[j].add(randDir.clone().multiplyScalar(jBurst / mj));
            }

            // damp relative normal velocity to kill vibration
            const rv = vel[i].clone().sub(vel[j]);
            const vn = rv.dot(n);
            const dampN = 0.7 * vn; // stronger damping on the normal
            vel[i].add(n.clone().multiplyScalar(-dampN / mi));
            vel[j].add(n.clone().multiplyScalar(dampN / mj));

            // spin kick (stronger on burst)
            let torque = 0.25;
            if (pf > 0.6) torque = 0.75;
            spinVels[i].x += (Math.random() - 0.5) * torque;
            spinVels[i].y += (Math.random() - 0.5) * torque;
            spinVels[j].x += (Math.random() - 0.5) * torque;
            spinVels[j].y += (Math.random() - 0.5) * torque;
          }
        }
      }

      // Apply transforms
      for (let i = 0; i < cubes.length; i++) {
        cubes[i].group.position.set(pos[i].x + transPos[i].x, transPos[i].y + pos[i].y, pos[i].z);
        const rx = baseRX + THREE.MathUtils.degToRad(hoverRef.current.x) + spinAngles[i].x;
        const ry = baseRY + THREE.MathUtils.degToRad(angleRef.current + hoverRef.current.y) + spinAngles[i].y;
        cubes[i].mesh.rotation.x = rx;
        cubes[i].mesh.rotation.y = ry;
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

      if (activeRef.current) renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      stopEmitter();

      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUpOrCancel);
      host.removeEventListener("pointercancel", onUpOrCancel);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeaveAll);
      host.removeEventListener("touchstart", onTouchStart);
      host.removeEventListener("touchmove", onTouchMove);
      host.removeEventListener("touchend", onTouchEnd);
      // Remove any remaining particle elements
      particles.forEach((p) => p.el.remove());

      // Helpers
      const disposeMaterial = (mat: THREE.Material | THREE.Material[] | undefined) => {
        if (!mat) return;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      };
      // Dispose Three.js resources
      try {
        if (cubeRef.current) {
          (cubeRef.current.geometry as THREE.BufferGeometry).dispose();
          disposeMaterial(cubeRef.current.material as THREE.Material | THREE.Material[]);
          cubeRef.current = null;
        }
      } catch {}
      try {
        if (edgeMeshRef.current) {
          edgeMeshRef.current.geometry.dispose();
          (edgeMeshRef.current.material as THREE.Material).dispose();
          edgeMeshRef.current = null;
        }
      } catch {}
      try {
        if (floorRef.current) {
          floorRef.current.geometry.dispose();
          (floorRef.current.material as THREE.Material).dispose();
          floorRef.current = null;
        }
      } catch {}
      try {
        if (groupRef.current) {
          scene.remove(groupRef.current);
          groupRef.current.clear();
          groupRef.current = null;
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
  }, [textureSrc, idleSpeedDegPerSec, maxTiltDeg, resolvedTheme, disableParticles]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-square w-full overflow-visible mx-auto rounded-2xl",
        className,
      )}
      style={{ zIndex: 1 }}
      aria-label="Interactive money cube with soft shadows"
    />
  );
}
