"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBorder({ size = 160 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear any existing canvas from previous render
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Torus sized to just outside the circular button area
    const geometry = new THREE.TorusGeometry(1.75, 0.18, 48, 120);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x064e3b,
      emissiveIntensity: 0.4,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(4, 6, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x10b981, 4);
    fill.position.set(-4, -4, -4);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x00ffaa, 1.5);
    rim.position.set(0, 5, -6);
    scene.add(rim);

    let animId: number;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.008;
      torus.rotation.x = Math.sin(t * 0.6) * 0.35;
      torus.rotation.y += 0.012;
      torus.rotation.z = Math.cos(t * 0.4) * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        filter: "drop-shadow(0 0 16px rgba(16,185,129,0.7))",
      }}
    />
  );
}
