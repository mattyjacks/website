"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Module-level shared time so both layers rotate in perfect sync
let sharedTime = 0;
let subscriberCount = 0;
let sharedRafId: number | null = null;
const subscribers = new Set<() => void>();

function startSharedLoop() {
  if (sharedRafId !== null) return;
  const loop = () => {
    sharedTime += 0.008;
    subscribers.forEach((fn) => fn());
    sharedRafId = requestAnimationFrame(loop);
  };
  sharedRafId = requestAnimationFrame(loop);
}

function stopSharedLoop() {
  if (sharedRafId !== null) {
    cancelAnimationFrame(sharedRafId);
    sharedRafId = null;
  }
}

function makeScene(size: number) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5.5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(size, size);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const geometry = new THREE.TorusGeometry(1.75, 0.2, 48, 120);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x064e3b,
    emissiveIntensity: 0.5,
    metalness: 0.95,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
  });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(4, 6, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x10b981, 4);
  fill.position.set(-4, -4, -4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x00ffaa, 1.5);
  rim.position.set(0, 5, -6);
  scene.add(rim);

  return { scene, camera, renderer, torus };
}

interface ThreeBorderLayerProps {
  size?: number;
  /** "back" renders behind the image; "front" renders in front (clipped to front arc) */
  layer: "back" | "front";
}

function ThreeBorderLayer({ size = 160, layer }: ThreeBorderLayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const { scene, camera, renderer, torus } = makeScene(size);
    mountRef.current.appendChild(renderer.domElement);

    const tick = () => {
      torus.rotation.x = Math.sin(sharedTime * 0.6) * 0.35;
      torus.rotation.y = sharedTime * 1.2;
      torus.rotation.z = Math.cos(sharedTime * 0.4) * 0.2;
      renderer.render(scene, camera);
    };

    subscribers.add(tick);
    subscriberCount++;
    startSharedLoop();

    return () => {
      subscribers.delete(tick);
      subscriberCount--;
      if (subscriberCount <= 0) {
        stopSharedLoop();
        subscriberCount = 0;
      }
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size, layer]);

  // Front layer: clip to an ellipse at the bottom of the canvas
  // showing only the arc that passes in front of the image center
  const clipPath =
    layer === "front"
      ? "ellipse(48% 40% at 50% 82%)"
      : undefined;

  return (
    <div
      ref={mountRef}
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: layer === "back" ? 0 : 20,
        clipPath,
        filter:
          "drop-shadow(0 0 14px rgba(16,185,129,0.75))",
      }}
    />
  );
}

/** Back ring — renders behind the photo */
export function ThreeBorderBack({ size }: { size?: number }) {
  return <ThreeBorderLayer size={size} layer="back" />;
}

/** Front ring — renders in front of the photo, clipped to the near arc */
export function ThreeBorderFront({ size }: { size?: number }) {
  return <ThreeBorderLayer size={size} layer="front" />;
}
