'use client';

import { motion, useScroll } from 'framer-motion';
import { useSkipDecorativeMotion } from '@/lib/device';

export function ScrollProgress() {
  const skipDecorative = useSkipDecorativeMotion();
  const { scrollYProgress } = useScroll();

  if (skipDecorative) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[9999]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
