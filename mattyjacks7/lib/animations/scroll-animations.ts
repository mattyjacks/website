import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Fade in from bottom with stagger effect
 * Elements slide up with fade, 0.15s delay between each
 */
export function fadeInUp(element: HTMLElement) {
  const children = element.children;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
    }
  );
}

/**
 * Fade in from left with stagger effect
 * Elements slide from left with fade, 0.15s delay between each
 */
export function fadeInLeft(element: HTMLElement) {
  const children = element.children;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      x: -60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
    }
  );
}

/**
 * Fade in from right with stagger effect
 * Elements slide from right with fade, 0.15s delay between each
 */
export function fadeInRight(element: HTMLElement) {
  const children = element.children;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      x: 60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
    }
  );
}

/**
 * Scale in with bounce effect
 * Elements scale from 80% with fade, 0.15s delay between each
 */
export function scaleIn(element: HTMLElement) {
  const children = element.children;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
    }
  );
}

/**
 * Grid slide-in effect for grid layouts
 * Items animate in sequence from left, 0.15s delay between each
 */
export function slideInGrid(element: HTMLElement) {
  const children = element.children;

  gsap.fromTo(
    children,
    {
      opacity: 0,
      x: -40,
      scale: 0.95,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
    }
  );
}