'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { detectLowEnd, useIsActive } from '@/lib/device';

const SPAN_X = 34;
const SPAN_Z = 20;
const Z_NEAR = 6;
const MOUSE_EASE = 0.03;

// Decorative motion does not need 60fps; halving it roughly halves the CPU cost.
const TARGET_FPS = 30;
const FRAME_S = 1 / TARGET_FPS;

/**
 * The field animates on every device. Weak hardware gets a coarser grid and a
 * lower pixel ratio rather than no animation at all, so the look survives while
 * the per-frame cost drops by roughly two thirds.
 */
const QUALITY = {
  high: { rows: 28, cols: 56, dpr: 1.5 },
  low: { rows: 18, cols: 34, dpr: 1 },
} as const;

type Tier = keyof typeof QUALITY;

/** Layered sines standing in for noise. Cheap, and smooth enough to read as terrain. */
function height(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.30 + t * 0.20) * 0.85 +
    Math.sin(x * 0.16 - z * 0.23 + t * 0.14) * 0.70 +
    Math.sin(z * 0.27 + t * 0.10) * 0.50 +
    Math.sin((x + z) * 0.10 + t * 0.06) * 1.05
  );
}

interface FieldProps {
  mouse: React.MutableRefObject<[number, number]>;
  animate: boolean;
  rows: number;
  cols: number;
}

function ContourField({ mouse, animate, rows, cols }: FieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const segments = rows * (cols - 1);

  // Grid coordinates are fixed; only the y component is rewritten each frame.
  const { xs, zs } = useMemo(() => {
    const xs = new Float32Array(cols);
    const zs = new Float32Array(rows);
    for (let c = 0; c < cols; c++) xs[c] = -SPAN_X / 2 + (c / (cols - 1)) * SPAN_X;
    for (let r = 0; r < rows; r++) zs[r] = Z_NEAR - (r / (rows - 1)) * SPAN_Z;
    return { xs, zs };
  }, [rows, cols]);

  const geo = useMemo(() => {
    const position = new THREE.BufferAttribute(new Float32Array(segments * 6), 3);
    position.usage = THREE.DynamicDrawUsage;

    // Depth fade baked into vertex colours: far rows recede, near rows read solid.
    const color = new THREE.BufferAttribute(new Float32Array(segments * 6), 3);
    const near = new THREE.Color('#fb923c');
    const far = new THREE.Color('#7c2d12');
    const tmp = new THREE.Color();
    let s = 0;
    for (let r = 0; r < rows; r++) {
      const depth = r / (rows - 1);
      tmp.copy(near).lerp(far, depth * depth);
      for (let c = 0; c < cols - 1; c++) {
        color.setXYZ(s * 2, tmp.r, tmp.g, tmp.b);
        color.setXYZ(s * 2 + 1, tmp.r, tmp.g, tmp.b);
        s++;
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', position);
    g.setAttribute('color', color);
    return g;
  }, [segments, rows, cols]);

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5 }),
    []
  );

  useEffect(() => () => { geo.dispose(); }, [geo]);
  useEffect(() => () => { mat.dispose(); }, [mat]);

  const write = useCallback((t: number) => {
    const attr = geo.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    let o = 0;
    for (let r = 0; r < rows; r++) {
      const z = zs[r];
      let prevY = height(xs[0], z, t);
      for (let c = 0; c < cols - 1; c++) {
        const x0 = xs[c], x1 = xs[c + 1];
        const y1 = height(x1, z, t);
        arr[o++] = x0; arr[o++] = prevY; arr[o++] = z;
        arr[o++] = x1; arr[o++] = y1;    arr[o++] = z;
        prevY = y1;
      }
    }
    attr.needsUpdate = true;
  }, [geo, xs, zs, rows, cols]);

  // Static pose for reduced-motion users: draw one frame, never animate.
  useEffect(() => { if (!animate) write(0); }, [animate, write]);

  const lastFrame = useRef(0);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    if (t - lastFrame.current < FRAME_S) return;
    lastFrame.current = t;

    write(t);
    const g = groupRef.current;
    if (g) {
      g.rotation.x += (mouse.current[1] * 0.06 - g.rotation.x) * MOUSE_EASE;
      g.rotation.z += (mouse.current[0] * 0.04 - g.rotation.z) * MOUSE_EASE;
    }
  });

  return (
    <group ref={groupRef} position={[0, -4.2, 0]}>
      <lineSegments geometry={geo} material={mat} frustumCulled={false} />
    </group>
  );
}

function StaticBackdrop() {
  return <div className="w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,hsl(32_98%_54%_/_0.07)_0%,transparent_70%)]" />;
}

export function HeroCanvas() {
  const [hasWebGL, setHasWebGL] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [tier, setTier] = useState<Tier>('high');
  const mouse = useRef<[number, number]>([0, 0]);
  const hostRef = useRef<HTMLDivElement>(null);
  const onScreen = useIsActive(hostRef);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = [
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    ];
  }, []);

  const onDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma !== null && e.beta !== null) {
      mouse.current = [
        Math.max(-1, Math.min(1, (e.gamma ?? 0) / 22)),
        Math.max(-1, Math.min(1, ((e.beta ?? 45) - 45) / 22)),
      ];
    }
  }, []);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) { setHasWebGL(false); return; }
      setHasWebGL(true);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Weak hardware or a narrow screen gets the coarse grid, not a blank backdrop.
    setTier(detectLowEnd() || window.innerWidth < 768 ? 'low' : 'high');

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotion = () => setAnimate(!rm.matches);
    applyMotion();
    rm.addEventListener('change', applyMotion);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation as EventListener, { passive: true });
    const t = setTimeout(() => setMounted(true), 80);
    return () => {
      clearTimeout(t);
      rm.removeEventListener('change', applyMotion);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation as EventListener);
    };
  }, [onMouseMove, onDeviceOrientation]);

  // Animate only while the hero is on screen and the tab is focused.
  const running = animate && onScreen;
  const q = QUALITY[tier];

  // The host stays mounted in every branch so the IntersectionObserver in
  // useIsActive always has an element to attach to on first render.
  return (
    <div ref={hostRef} className="absolute inset-0 z-0" aria-hidden="true">
      {hasWebGL ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Canvas
            camera={{ position: [0, 2.2, 13], fov: 50, near: 0.5, far: 60 }}
            dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, q.dpr)]}
            gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false, depth: false }}
            style={{ background: 'transparent' }}
            frameloop={running ? 'always' : 'demand'}
          >
            <fog attach="fog" args={['#0b0804', 16, 42]} />
            <ContourField mouse={mouse} animate={running} rows={q.rows} cols={q.cols} />
          </Canvas>
        </motion.div>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
