'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import { useSkipDecorativeMotion } from '@/lib/device';

export function ScrollProgress() {
  const skipDecorative = useSkipDecorativeMotion();
  const isUnbrandedVariant = usePathname()?.startsWith('/site-test');
  const { scrollYProgress } = useScroll();

  if (skipDecorative || isUnbrandedVariant) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[9999]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
