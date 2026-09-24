'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Hard ceiling: the overlay can never outlive this, however slow the page is.
const MAX_MS  = 2500;
const EXIT_MS = 300;
const COLS    = 14;
const ROWS    = 9;

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);
  const [gone, setGone]         = useState(false);

  useEffect(() => {
    // Show loading screen on every load as requested by user
    // if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('kd_loaded')) {
    //   setGone(true);
    //   return;
    // }

    let settled = false;
    let exitTimer: ReturnType<typeof setTimeout>;

    // Tied to real readiness, not a fixed timer: when there is nothing left to
    // wait for this resolves on the next frame and the overlay is gone almost
    // immediately. It only lingers when the page genuinely is not ready yet.
    const finish = () => {
      if (settled) return;
      settled = true;
      try { sessionStorage.setItem('kd_loaded', '1'); } catch {}
      setProgress(1);
      setExiting(true);
      exitTimer = setTimeout(() => setGone(true), EXIT_MS);
    };

    const painted = new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();

    Promise.all([painted, fonts]).then(finish).catch(finish);

    const cap = setTimeout(finish, MAX_MS);

    return () => {
      clearTimeout(cap);
      clearTimeout(exitTimer);
    };
  }, []);

  if (gone) return null;

  const total = COLS * ROWS;
  const cx    = (COLS - 1) / 2;
  const cy    = (ROWS - 1) / 2;
  const maxD  = Math.sqrt(cx * cx + cy * cy);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none" style={{ background: '#080503' }}>
      <div
        className="absolute inset-0"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: '1px',
          background: 'rgba(249,115,22,0.10)',
        }}
      >
        {Array.from({ length: total }, (_, idx) => {
          const col  = idx % COLS;
          const row  = Math.floor(idx / COLS);
          const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
          const delay = exiting ? (dist / maxD) * 0.38 : 0;
          return (
            <motion.div
              key={idx}
              style={{ background: '#0a0603' }}
              animate={exiting ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.24, delay, ease: [0.4, 0, 0.2, 1] }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.circle
              cx="46" cy="46" r="42"
              stroke="rgba(249,115,22,0.18)"
              strokeWidth="1"
              strokeDasharray="5 7"
              strokeLinecap="round"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '46px 46px' }}
            />
            <circle cx="46" cy="46" r="35" stroke="rgba(249,115,22,0.14)" strokeWidth="1" />
            <motion.circle
              cx="46" cy="46" r="27"
              stroke="rgba(249,115,22,0.75)"
              strokeWidth="1.5"
              strokeDasharray="48 22"
              strokeLinecap="round"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '46px 46px' }}
            />
            <circle cx="46" cy="46" r="18" stroke="rgba(249,115,22,0.28)" strokeWidth="1" />
            <circle cx="46" cy="46" r="10" fill="rgba(249,115,22,0.12)" />
            <circle cx="46" cy="46" r="5"  fill="rgb(249,115,22)" />
            <circle cx="46" cy="46" r="5"  fill="rgba(255,255,255,0.25)" />
          </svg>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            className="relative rounded-full overflow-hidden"
            style={{ width: '260px', height: '2px', background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, hsl(32 95% 38%), hsl(32 98% 58%))',
                transition: 'width 200ms ease-out',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            KIQA.DEV
          </span>
        </motion.div>
      </div>
    </div>
  );
}
