'use client';
import { motion } from 'framer-motion';

export type OrbVariant = 'home' | 'portfolio' | 'services' | 'about' | 'contact' | 'blog';

interface OrbConfig {
  big:   { left: string; top: string; size: number; dx: number[]; dy: number[]; duration: number };
  small: { left: string; top: string; size: number; dx: number[]; dy: number[]; duration: number };
}

const BIG_MORPH = [
  '50% 50% 50% 50% / 50% 50% 50% 50%',
  '62% 38% 46% 54% / 44% 58% 42% 56%',
  '38% 62% 58% 42% / 56% 44% 60% 40%',
  '54% 46% 40% 60% / 48% 52% 44% 56%',
  '44% 56% 62% 38% / 58% 42% 54% 46%',
  '50% 50% 50% 50% / 50% 50% 50% 50%',
];

const SMALL_MORPH = [
  '50% 50% 50% 50% / 50% 50% 50% 50%',
  '40% 60% 54% 46% / 60% 40% 56% 44%',
  '58% 42% 44% 56% / 42% 58% 48% 52%',
  '46% 54% 62% 38% / 52% 48% 40% 60%',
  '60% 40% 46% 54% / 44% 56% 62% 38%',
  '50% 50% 50% 50% / 50% 50% 50% 50%',
];

const CONFIGS: Record<OrbVariant, OrbConfig> = {
  home: {
    big:   { left: '72%', top: '18%', size: 520, dx: [0, 50, -30, 40, 0],  dy: [0, -40, 30, -50, 0],  duration: 20 },
    small: { left: '12%', top: '65%', size: 260, dx: [0, -40, 30, -20, 0], dy: [0, 30, -40, 25, 0],   duration: 15 },
  },
  portfolio: {
    big:   { left: '80%', top: '8%',  size: 460, dx: [0, -40, 25, -35, 0], dy: [0, 35, -25, 40, 0],   duration: 22 },
    small: { left: '5%',  top: '48%', size: 220, dx: [0, 35, -25, 20, 0],  dy: [0, -30, 35, -20, 0],  duration: 16 },
  },
  services: {
    big:   { left: '8%',  top: '14%', size: 480, dx: [0, 45, -35, 30, 0],  dy: [0, 35, -45, 25, 0],   duration: 19 },
    small: { left: '84%', top: '58%', size: 210, dx: [0, -30, 20, -40, 0], dy: [0, -25, 35, -20, 0],  duration: 14 },
  },
  about: {
    big:   { left: '70%', top: '30%', size: 500, dx: [0, -45, 30, -35, 0], dy: [0, 40, -30, 45, 0],   duration: 21 },
    small: { left: '18%', top: '70%', size: 230, dx: [0, 30, -40, 20, 0],  dy: [0, -35, 25, -30, 0],  duration: 17 },
  },
  contact: {
    big:   { left: '60%', top: '5%',  size: 440, dx: [0, 35, -45, 25, 0],  dy: [0, 50, -35, 40, 0],   duration: 18 },
    small: { left: '8%',  top: '78%', size: 200, dx: [0, -25, 40, -30, 0], dy: [0, -40, 20, -35, 0],  duration: 13 },
  },
  blog: {
    big:   { left: '82%', top: '22%', size: 470, dx: [0, -50, 35, -40, 0], dy: [0, -35, 45, -30, 0],  duration: 23 },
    small: { left: '6%',  top: '52%', size: 215, dx: [0, 40, -20, 35, 0],  dy: [0, 25, -40, 30, 0],   duration: 16 },
  },
};

export function AmbientOrbs({ variant }: { variant: OrbVariant }) {
  const { big, small } = CONFIGS[variant];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          x: big.dx,
          y: big.dy,
          borderRadius: BIG_MORPH,
        }}
        transition={{
          duration: big.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: big.left,
          top: big.top,
          width: big.size,
          height: big.size,
          background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(249,115,22,0.07) 45%, transparent 72%)',
          filter: 'blur(72px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        animate={{
          x: small.dx,
          y: small.dy,
          borderRadius: SMALL_MORPH,
        }}
        transition={{
          duration: small.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
        style={{
          position: 'absolute',
          left: small.left,
          top: small.top,
          width: small.size,
          height: small.size,
          background: 'radial-gradient(circle, rgba(251,146,60,0.13) 0%, rgba(249,115,22,0.05) 50%, transparent 72%)',
          filter: 'blur(56px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
