"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

// ─── Shared animation state ──────────────────────────────────────────────────
let sharedAngle = 0;
let rafId: number | null = null;
const listeners = new Set<(angle: number, wX: number, wZ: number, morph: number) => void>();

// Wobble physics
const SPRING = 0.015;
const DAMPING = 0.90;
let wobbleX = (Math.random() - 0.5) * 3.5;  // BIG initial wobble on page load
let wobbleZ = (Math.random() - 0.5) * 3.5;
let wobbleVX = (Math.random() - 0.5) * 0.8;
let wobbleVZ = (Math.random() - 0.5) * 0.8;

// Morph progress: 0 = torus, 1 = rectangle
let morphTarget = 0;
let morphCurrent = 0;
const MORPH_SPEED = 0.025;

function stepWobble() {
  wobbleVX += -wobbleX * SPRING;
  wobbleVZ += -wobbleZ * SPRING;
  wobbleVX *= DAMPING;
  wobbleVZ *= DAMPING;
  wobbleX += wobbleVX;
  wobbleZ += wobbleVZ;
}

/** Trigger a burst of wobble */
export function triggerWobble() {
  wobbleVX += (Math.random() - 0.5) * 2.0;
  wobbleVZ += (Math.random() - 0.5) * 2.0;
}

/** Set morph target: 1 = expand to rectangle, 0 = collapse to torus */
export function setMorphTarget(target: number) {
  morphTarget = target;
  // Also trigger wobble on state change
  triggerWobble();
}

/** Get current morph progress (0-1) for external components */
export function getMorphProgress(): number {
  return morphCurrent;
}

function startLoop() {
  if (rafId !== null) return;
  const tick = () => {
    sharedAngle += 0.016;
    stepWobble();
    // Smoothly lerp morph
    morphCurrent += (morphTarget - morphCurrent) * MORPH_SPEED;
    if (Math.abs(morphCurrent - morphTarget) < 0.001) morphCurrent = morphTarget;
    listeners.forEach((fn) => fn(sharedAngle, wobbleX, wobbleZ, morphCurrent));
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopLoop() {
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
}

// ─── Compute rectangle target positions for each torus vertex ────────────────
function computeRectTargets(torusGeo: THREE.TorusGeometry, rectW: number, rectH: number): Float32Array {
  const posAttr = torusGeo.attributes.position;
  const count = posAttr.count;
  const targets = new Float32Array(count * 3);
  
  // Map each vertex by its angle around the torus to a point on a rectangle perimeter
  const torusRadius = 1.65;
  
  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    
    // Get the angle of this vertex around the torus center (in the XZ plane)
    let angle = Math.atan2(z, x);
    if (angle < 0) angle += Math.PI * 2;
    
    // Map angle to rectangle perimeter
    const perimeter = 2 * (rectW + rectH);
    const dist = (angle / (Math.PI * 2)) * perimeter;
    
    let rx: number, ry: number;
    
    if (dist < rectW) {
      // Top edge: left to right
      rx = -rectW / 2 + dist;
      ry = rectH / 2;
    } else if (dist < rectW + rectH) {
      // Right edge: top to bottom
      rx = rectW / 2;
      ry = rectH / 2 - (dist - rectW);
    } else if (dist < 2 * rectW + rectH) {
      // Bottom edge: right to left
      rx = rectW / 2 - (dist - rectW - rectH);
      ry = -rectH / 2;
    } else {
      // Left edge: bottom to top
      rx = -rectW / 2;
      ry = -rectH / 2 + (dist - 2 * rectW - rectH);
    }
    
    // Add slight tube thickness variation from the minor radius
    const origY = posAttr.getY(i);
    const tubeOffset = origY * 0.15; // Keep a tiny bit of depth
    
    targets[i * 3] = rx;
    targets[i * 3 + 1] = ry + tubeOffset;
    targets[i * 3 + 2] = tubeOffset * 0.5;
  }
  
  return targets;
}

// ─── Renderer factory ────────────────────────────────────────────────────────
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
  torus.rotation.x = Math.PI * 0.18;
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

  // Compute rectangle targets (aspect ratio ~3:4 of chat window)
  const rectTargets = computeRectTargets(geo, 3.0, 4.0);
  
  // Store original torus positions
  const origPositions = new Float32Array(geo.attributes.position.array);

  return { scene, camera, renderer, torus, geo, mat, rectTargets, origPositions };
}

// ─── Layer component ─────────────────────────────────────────────────────────
interface LayerProps { size?: number; layer: "back" | "front"; }

function ThreeBorderLayer({ size = 160, layer }: LayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    while (mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);

    const { scene, camera, renderer, torus, geo, mat, rectTargets, origPositions } = buildScene(size);
    mountRef.current.appendChild(renderer.domElement);

    const posAttr = geo.attributes.position;
    const vertCount = posAttr.count;

    const onTick = (angle: number, wX: number, wZ: number, morph: number) => {
      // Morph vertices between torus and rectangle
      for (let i = 0; i < vertCount; i++) {
        const i3 = i * 3;
        const ox = origPositions[i3];
        const oy = origPositions[i3 + 1];
        const oz = origPositions[i3 + 2];
        const tx = rectTargets[i3];
        const ty = rectTargets[i3 + 1];
        const tz = rectTargets[i3 + 2];
        
        posAttr.setXYZ(
          i,
          ox + (tx - ox) * morph,
          oy + (ty - oy) * morph,
          oz + (tz - oz) * morph
        );
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();

      // Rotation diminishes as morph progresses (rectangle shouldn't spin wildly)
      const rotScale = 1 - morph * 0.85;
      torus.rotation.y = angle * rotScale;
      torus.rotation.x = Math.PI * 0.18 * (1 - morph) + wX * rotScale;
      torus.rotation.z = wZ * rotScale;
      
      // Scale up slightly during morph for dramatic effect
      const scaleBoost = 1 + morph * 0.3;
      torus.scale.set(scaleBoost, scaleBoost, scaleBoost);

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
