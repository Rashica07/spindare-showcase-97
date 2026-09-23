'use client';

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Fades its children up once they scroll into view. Server-rendered at
 * opacity 0; globals.css reveals it when JavaScript isn't running. With
 * reduced motion the markup stays identical (no hydration mismatch) and the
 * content just appears without moving.
 */
export function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reduced ? { duration: 0 } : { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
