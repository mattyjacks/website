'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationFunction = (element: HTMLElement) => void;

/**
 * Custom hook for scroll-triggered animations using GSAP
 * @param animationFn - Function that defines the GSAP animation
 * @returns Ref to attach to the element to be animated
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(animationFn: AnimationFunction) {
  const ref = useRef<T>(null);

  useEffect(() => {
    // Skip animations on server-side or if user prefers reduced motion
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      animationFn(element);
    }, element);

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, [animationFn]);

  return ref;
}