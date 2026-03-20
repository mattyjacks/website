"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Shared animation state ──────────────────────────────────────────────────
let sharedAngle = 0;
let rafId: number | null = null;
const listeners = new Set<(angle: number, wX: number, wZ: number) => void>();

// Wobble physics — damped spring centered at 0
const SPRING = 0.018;
const DAMPING = 0.88;
let wobbleX = (Math.random() - 0.5) * 2.8;  // start with BIG random jolt
let wobbleZ = (Math.random() - 0.5) * 2.8;
let wobbleVX = (Math.random() - 0.5) * 0.6;
let wobbleVZ = (Math.random() - 0.5) * 0.6;

function stepWobble() {
  wobbleVX += -wobbleX * SPRING;
  wobbleVZ += -wobbleZ * SPRING;
  wobbleVX *= DAMPING;
  wobbleVZ *= DAMPING;
  wobbleX += wobbleVX;
  wobbleZ += wobbleVZ;
}

/** Trigger a random burst of wobble — call when chat opens/closes */
export function triggerWobble() {
  wobbleVX += (Math.random() - 0.5) * 1.6;
  wobbleVZ += (Math.random() - 0.5) * 1.6;
}

function startLoop() {
  if (rafId !== null) return;
  const tick = () => {
    sharedAngle += 0.014;
    stepWobble();
    listeners.forEach((fn) => fn(sharedAngle, wobbleX, wobbleZ));
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopLoop() {
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
}

// ─── Renderer + scene factory ────────────────────────────────────────────────
function buildScene(size: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(size, size);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const geo = new THREE.TorusGeometry(1.65, 0.22, 48, 128);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.35,
    metalness: 1.0,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  });
  const torus = new THREE.Mesh(geo, mat);
  torus.rotation.x = Math.PI * 0.18; // initial tilt
  scene.add(torus);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 3.0);
  key.position.set(3, 5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x10b981, 5);
  fill.position.set(-5, -3, -3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x00ffcc, 2);
  rim.position.set(0, 4, -5);
  scene.add(rim);

  return { scene, camera, renderer, torus, geo, mat };
}

// ─── Layer component ─────────────────────────────────────────────────────────
interface LayerProps { size?: number; layer: "back" | "front"; }

function ThreeBorderLayer({ size = 160, layer }: LayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    while (mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);

    const { scene, camera, renderer, torus, geo, mat } = buildScene(size);
    mountRef.current.appendChild(renderer.domElement);

    const onTick = (angle: number, wX: number, wZ: number) => {
      torus.rotation.y = angle;
      torus.rotation.x = Math.PI * 0.18 + wX;
      torus.rotation.z = wZ;
      renderer.render(scene, camera);
    };

    listeners.add(onTick);
    startLoop();

    return () => {
      listeners.delete(onTick);
      if (listeners.size === 0) stopLoop();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const clipPath = layer === "front" ? "inset(55% 0 0 0)" : undefined;

  return (
    <div
      ref={mountRef}
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: layer === "back" ? 0 : 20,
        clipPath,
        filter: "drop-shadow(0 0 12px rgba(16,185,129,0.8))",
      }}
    />
  );
}

export function ThreeBorderBack({ size }: { size?: number }) {
  return <ThreeBorderLayer size={size} layer="back" />;
}

export function ThreeBorderFront({ size }: { size?: number }) {
  return <ThreeBorderLayer size={size} layer="front" />;
}
