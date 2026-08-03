'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const FILL_MS    = 500;   // time to reach HOLD_PCT
const HOLD_PCT   = 0.85;  // where the fill pauses waiting for nav
const MIN_SHOW   = 480;   // minimum ms the bar stays visible
const FADE_MS    = 260;   // fade-out duration after completion

export function PageTransitionLoader() {
  const pathname              = usePathname();
  const [active, setActive]   = useState(false);
  const [pct, setPct]         = useState(0);
  const rafRef                = useRef<number>(0);
  const t1Ref                 = useRef<ReturnType<typeof setTimeout>>();
  const t2Ref                 = useRef<ReturnType<typeof setTimeout>>();
  const clickedAtRef          = useRef<number>(0);
  const navDoneRef            = useRef(false);
  const activeRef             = useRef(false);  // shadow of active state for closure access

  /* ── Start on link click ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        /^https?:\/\//.test(href) ||
        anchor.target === '_blank'
      ) return;

      /* reset any in-flight animation */
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t1Ref.current);
      clearTimeout(t2Ref.current);

      clickedAtRef.current = performance.now();
      navDoneRef.current   = false;
      activeRef.current    = true;
      setActive(true);
      setPct(0);

      /* animate fill → HOLD_PCT */
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / FILL_MS, HOLD_PCT);
        setPct(p);
        if (p < HOLD_PCT) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  /* ── Complete when pathname changes ── */
  useEffect(() => {
    if (!activeRef.current) return;

    navDoneRef.current = true;
    const elapsed   = performance.now() - clickedAtRef.current;
    const remaining = Math.max(0, MIN_SHOW - elapsed);

    clearTimeout(t1Ref.current);
    clearTimeout(t2Ref.current);

    t1Ref.current = setTimeout(() => {
      cancelAnimationFrame(rafRef.current);
      setPct(1);
      t2Ref.current = setTimeout(() => {
        activeRef.current = false;
        setActive(false);
        setPct(0);
      }, FADE_MS + 60);
    }, remaining);

    return () => {
      clearTimeout(t1Ref.current);
      clearTimeout(t2Ref.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="ptl"
          className="fixed top-0 left-0 right-0 z-[9998] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000 }}
        >
          {/* Track */}
          <div
            className="relative"
            style={{ height: '3px', background: 'rgba(255,255,255,0.04)' }}
          >
            {/* Orange fill */}
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{
                background: 'linear-gradient(90deg, hsl(32 95% 36%), hsl(32 98% 60%))',
                boxShadow: '0 0 10px 0 hsl(32 98% 54% / 0.5)',
              }}
              animate={{ width: `${pct * 100}%` }}
              transition={{ ease: [0.25, 1, 0.35, 1], duration: 0.15 }}
            />

            {/* Spinning circle head */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              animate={{ left: `${pct * 100}%` }}
              transition={{ ease: [0.25, 1, 0.35, 1], duration: 0.15 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {/* Outer dashed ring */}
                <motion.circle
                  cx="7" cy="7" r="5"
                  stroke="hsl(32 98% 58% / 0.5)"
                  strokeWidth="0.8"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '7px 7px' }}
                />
                {/* Inner arc */}
                <motion.circle
                  cx="7" cy="7" r="3"
                  stroke="hsl(32 98% 62%)"
                  strokeWidth="1.2"
                  strokeDasharray="9 5"
                  strokeLinecap="round"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '7px 7px' }}
                />
                {/* Centre dot */}
                <circle cx="7" cy="7" r="1.2" fill="hsl(32 98% 68%)" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
