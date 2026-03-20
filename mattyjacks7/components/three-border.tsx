"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBorder({ size = 160 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.8;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Beautiful glowing metallic Torus Geometry
    const geometry = new THREE.TorusGeometry(1.6, 0.12, 32, 100);
    const material = new THREE.MeshPhysicalMaterial({ 
      color: 0x10b981, 
      emissive: 0x064e3b,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Advanced 3D Lighting setup for deep shadow effects
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x10b981, 3);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;
      // Provide a slow, elegant 3D gyroscopic rotation
      torus.rotation.x = Math.sin(time * 0.5) * 0.3;
      torus.rotation.y += 0.01;
      torus.rotation.z = Math.cos(time * 0.3) * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] flex items-center justify-center z-[-1]" 
      style={{ width: size, height: size }} 
    />
  );
}
