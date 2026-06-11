'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const COLS = 14;
const ROWS = 9;
const FILL_MS = 400;

export function LoadingScreen() {
  const [progress, setProgress]   = useState(0);
  const [exiting, setExiting]     = useState(false);
  const [gone, setGone]           = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('kd_loaded')) {
      setGone(true);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / FILL_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          sessionStorage.setItem('kd_loaded', '1');
          setTimeout(() => setGone(true), 280);
        }, 80);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (gone) return null;

  const total  = COLS * ROWS;
  const cx     = (COLS - 1) / 2;
  const cy     = (ROWS - 1) / 2;
  const maxD   = Math.sqrt(cx * cx + cy * cy);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none" style={{ background: '#080503' }}>
      {/* Square grid */}
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
          const delay = exiting ? (dist / maxD) * 0.42 : 0;
          return (
            <motion.div
              key={idx}
              style={{ background: '#0a0603' }}
              animate={exiting ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, delay, ease: [0.4, 0, 0.2, 1] }}
            />
          );
        })}
      </div>

      {/* Centre panel */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 pointer-events-none">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outermost dashed ring — slow CW */}
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
            {/* Second ring — static */}
            <circle cx="46" cy="46" r="35" stroke="rgba(249,115,22,0.14)" strokeWidth="1" />
            {/* Spinning arc — CCW */}
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
            {/* Inner ring */}
            <circle cx="46" cy="46" r="18" stroke="rgba(249,115,22,0.28)" strokeWidth="1" />
            {/* Soft glow disc */}
            <circle cx="46" cy="46" r="10" fill="rgba(249,115,22,0.12)" />
            {/* Centre dot */}
            <circle cx="46" cy="46" r="5" fill="rgb(249,115,22)" />
            <circle cx="46" cy="46" r="5" fill="rgba(255,255,255,0.25)" />
          </svg>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="relative rounded-full overflow-hidden"
            style={{ width: '260px', height: '2px', background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(32 95% 38%), hsl(32 98% 58%))' }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ ease: 'easeOut', duration: 0.04 }}
            />
            {/* Shimmer head */}
            <motion.div
              className="absolute inset-y-0 rounded-full"
              style={{
                width: '48px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                left: `${Math.max(0, progress * 100 - 14)}%`,
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
