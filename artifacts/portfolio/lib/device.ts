'use client';

import { useEffect, useState } from 'react';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Best-effort "this device will struggle with decorative work" check.
 * Deliberately conservative on the cheap side: when a hint is missing we
 * assume the device is fine, so we never degrade a capable machine.
 */
export function detectLowEnd(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = navigator as NavigatorWithHints;

  // Explicit user/network signals win outright.
  if (nav.connection?.saveData) return true;
  const effective = nav.connection?.effectiveType;
  if (effective === 'slow-2g' || effective === '2g' || effective === '3g') return true;

  const memory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : undefined;
  const cores = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : undefined;

  if (memory !== undefined && memory <= 4) return true;

  if (cores !== undefined && cores <= 4) {
    // Some browsers clamp hardwareConcurrency for fingerprinting resistance, so a
    // low core count alongside plenty of RAM is weak evidence. Only trust it when
    // the count is very low, or when there is no memory hint to contradict it.
    return memory !== undefined && memory > 4 ? cores <= 2 : true;
  }

  return false;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * True when decorative animation should be skipped entirely, either because
 * the user asked for reduced motion or the device looks too weak to spare it.
 * Starts `true` so the first paint is always the cheap path and we only opt
 * into animation after mount.
 */
export function useSkipDecorativeMotion(): boolean {
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lowEnd = detectLowEnd();
    const apply = () => {
      const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      setSkip(media.matches || lowEnd || isMobile);
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return skip;
}

/**
 * Tracks whether `ref` is on screen AND the tab is visible, so callers can
 * stop animation loops that would otherwise burn CPU off-screen forever.
 */
export function useIsActive(ref: React.RefObject<Element | null>): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = false;
    const sync = () => setActive(onScreen && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; sync(); },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    document.addEventListener('visibilitychange', sync);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [ref]);

  return active;
}
