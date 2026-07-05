'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const NODE_COUNT    = 26;
const CONNECT_DIST  = 4.6;
const MAX_LINKS     = 4;
const MOUSE_EASE    = 0.032;
const HUB_SET       = new Set([0, 4, 9, 14, 19, 23]);

const CONTENT: Array<{ title: string; body: string } | null> = [
  { title: 'Spindare',            body: 'Social rewards app — shipping to iOS in September 2026.' },
  { title: 'Kosovo + Italy',      body: 'Based between Lecco (IT) and Pristina (KS). Fully remote.' },
  { title: 'TravelMe',            body: 'AI trip planner. One message, full itinerary. Coming 2026.' },
  { title: 'Started at 13',       body: 'First real project at thirteen. Still building, still shipping.' },
  { title: 'KIQA DEV',            body: 'This site — four languages, 3D canvas, no third-party templates.' },
  { title: '4 Languages',         body: 'Albanian, Italian, English, German. No translator needed.' },
  null,
  { title: '100% Remote',         body: 'Available across every time zone. No office, no overhead.' },
  { title: 'Fixed Price',         body: 'Every project quoted upfront. No surprises on the invoice.' },
  { title: '24h Response',        body: 'Replies to every message within 24 hours, every time.' },
  null,
  { title: 'TypeScript Only',     body: 'Typed end to end. No runtime surprises in production.' },
  null,
  { title: 'App Store Ready',     body: 'Design, develop, submit, launch — solo, end to end.' },
  { title: '30-Day Support',      body: '30 days of included support after every project launches.' },
  null,
  { title: 'Full-Stack',          body: 'React, Node.js, Supabase, Postgres — front to back.' },
  null,
  null,
  { title: 'September 2026',      body: 'Spindare iOS launch. Co-leading product development since day one.' },
  null,
  null,
  { title: 'contact@kiqa-dev.it', body: 'Reach out directly — no gatekeepers, no sales calls.' },
  { title: 'Open to Work',        body: "Taking on new projects from June 2026. Let's talk." },
  null,
  null,
];

function makeNodes() {
  const pos   = new Float32Array(NODE_COUNT * 3);
  const phase = new Float32Array(NODE_COUNT);
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = HUB_SET.has(i) ? 3.5 + Math.random() * 2 : 5 + Math.random() * 6;
    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
    pos[i*3+2] = r * Math.cos(phi);
    phase[i]   = Math.random() * Math.PI * 2;
  }
  return { pos, phase };
}

function buildEdges(pos: Float32Array): [number, number][] {
  const edges: [number, number][] = [];
  const deg = new Int32Array(NODE_COUNT);
  for (let i = 0; i < NODE_COUNT; i++) {
    const cands: { j: number; d2: number }[] = [];
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (deg[j] >= MAX_LINKS) continue;
      const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
      const d2 = dx*dx+dy*dy+dz*dz;
      if (d2 < CONNECT_DIST*CONNECT_DIST) cands.push({ j, d2 });
    }
    cands.sort((a,b) => a.d2 - b.d2);
    const take = Math.min(MAX_LINKS - deg[i], cands.length);
    for (let k = 0; k < take; k++) {
      edges.push([i, cands[k].j]);
      deg[i]++;
      deg[cands[k].j]++;
    }
  }
  return edges;
}

interface SceneProps {
  mouse: React.MutableRefObject<[number, number]>;
  scrollImpulse: React.MutableRefObject<number>;
  onDismiss: () => void;
}

function NetworkScene({ mouse, scrollImpulse, onDismiss }: SceneProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const [hovered, setHovered]  = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const { pos, phase }  = useMemo(makeNodes, []);
  const edges           = useMemo(() => buildEdges(pos), [pos]);
  const cur             = useMemo(() => new Float32Array(pos), [pos]);
  const vel             = useRef(new Float32Array(NODE_COUNT * 3));
  const nodeRefs        = useRef<(THREE.Mesh | null)[]>(Array(NODE_COUNT).fill(null));

  const lineGeo = useMemo(() => {
    const buf = new THREE.BufferAttribute(new Float32Array(edges.length * 6), 3);
    buf.usage = THREE.DynamicDrawUsage;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', buf);
    return g;
  }, [edges]);

  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#f97316', transparent: true, opacity: 0.1 }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x += (mouse.current[1] * 0.22 - groupRef.current.rotation.x) * MOUSE_EASE;
      groupRef.current.rotation.y += (mouse.current[0] * 0.30 - groupRef.current.rotation.y) * MOUSE_EASE;
      groupRef.current.rotation.y += 0.0005;
    }
    const imp = scrollImpulse.current;
    if (imp > 0.005) {
      for (let i = 0; i < NODE_COUNT; i++) {
        vel.current[i*3]   += (Math.random() - 0.5) * imp * 0.13;
        vel.current[i*3+1] += (Math.random() - 0.5) * imp * 0.13;
        vel.current[i*3+2] += (Math.random() - 0.5) * imp * 0.06;
      }
      scrollImpulse.current *= 0.85;
    }
    for (let i = 0; i < NODE_COUNT; i++) {
      vel.current[i*3]   *= 0.94;
      vel.current[i*3+1] *= 0.94;
      vel.current[i*3+2] *= 0.94;
      const ph = phase[i];
      cur[i*3]   = pos[i*3]   + Math.sin(t * 0.045 + ph)        * 2.8 + vel.current[i*3];
      cur[i*3+1] = pos[i*3+1] + Math.cos(t * 0.035 + ph * 1.4)  * 2.2 + vel.current[i*3+1];
      cur[i*3+2] = pos[i*3+2] + Math.sin(t * 0.03  + ph * 0.75) * 2.8 + vel.current[i*3+2];
      const mesh = nodeRefs.current[i];
      if (!mesh) continue;
      mesh.position.set(cur[i*3], cur[i*3+1], cur[i*3+2]);
      const isHub = HUB_SET.has(i);
      const isHov = hovered === i;
      const isSel = selected === i;
      const baseScale = isHub ? 1.0 + Math.sin(t * 1.1 + ph) * 0.14 : 0.85 + Math.sin(t * 1.4 + ph) * 0.15;
      const target    = isSel ? 2.4 : isHov ? 2.0 : baseScale;
      mesh.scale.setScalar(mesh.scale.x + (target - mesh.scale.x) * 0.18);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const tgt = isSel ? '#fbbf24' : isHov ? '#fde68a' : isHub ? '#fb923c' : '#f97316';
      mat.color.lerp(new THREE.Color(tgt), 0.14);
      const tgtOp = isSel ? 1.0 : isHov ? 0.95 : isHub ? 0.82 : 0.58;
      mat.opacity += (tgtOp - mat.opacity) * 0.12;
    }
    const lineBuf = lineGeo.attributes.position as THREE.BufferAttribute;
    const arr = lineBuf.array as Float32Array;
    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      arr[e*6+0]=cur[a*3];   arr[e*6+1]=cur[a*3+1]; arr[e*6+2]=cur[a*3+2];
      arr[e*6+3]=cur[b*3];   arr[e*6+4]=cur[b*3+1]; arr[e*6+5]=cur[b*3+2];
    }
    lineBuf.needsUpdate = true;
    lineGeo.computeBoundingSphere();
  });

  const dismiss = useCallback(() => {
    setSelected(null);
    onDismiss();
  }, [onDismiss]);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeo} material={lineMat} frustumCulled={false} />
      {Array.from({ length: NODE_COUNT }, (_, i) => {
        const isHub   = HUB_SET.has(i);
        const content = CONTENT[i];
        const isSel   = selected === i;
        const r       = isHub ? 0.14 : 0.072;
        return (
          <mesh
            key={i}
            ref={el => { nodeRefs.current[i] = el; }}
            onPointerOver={e => { e.stopPropagation(); setHovered(i); document.body.style.cursor = content ? 'pointer' : 'default'; }}
            onPointerOut={e => { e.stopPropagation(); setHovered(null); document.body.style.cursor = 'default'; }}
            onPointerDown={e => { e.stopPropagation(); if (content) setSelected(isSel ? null : i); }}
          >
            <sphereGeometry args={[r, 10, 10]} />
            <meshBasicMaterial color={isHub ? '#fb923c' : '#f97316'} transparent opacity={0.65} />
            {isSel && content && (
              <Html center distanceFactor={12} zIndexRange={[50, 0]} style={{ pointerEvents: 'auto', userSelect: 'none' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", background: 'hsl(20 8% 7% / 0.97)', border: '1px solid hsl(32 98% 54% / 0.45)', borderRadius: '3px', padding: '14px 18px', minWidth: '190px', maxWidth: '230px', boxShadow: '0 0 28px hsl(32 98% 54% / 0.18)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <p style={{ color: '#fb923c', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{content.title}</p>
                    <button onClick={e => { e.stopPropagation(); dismiss(); }} style={{ background: 'none', border: 'none', color: 'hsl(0 0% 45%)', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: 0, marginTop: '-3px', flexShrink: 0 }} aria-label="Close">×</button>
                  </div>
                  <p style={{ color: 'hsl(0 0% 68%)', fontSize: '12px', lineHeight: 1.6, margin: '7px 0 0' }}>{content.body}</p>
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
      <pointLight position={[0, 0, 0]} intensity={0.35} color="#f97316" distance={18} decay={2} />
    </group>
  );
}

export function HeroCanvas() {
  const [hasWebGL, setHasWebGL] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const mouse          = useRef<[number, number]>([0, 0]);
  const scrollImpulse  = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = [
      (e.clientX / window.innerWidth)  *  2 - 1,
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

  const onScroll = useCallback(() => {
    scrollImpulse.current = Math.min(scrollImpulse.current + 0.06, 0.18);
  }, []);

  useEffect(() => {
    try {
      const c  = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) { setHasWebGL(false); return; }
      setHasWebGL(true);
    } catch {
      setHasWebGL(false);
      return;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation as EventListener, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setMounted(true), 80);
    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation as EventListener);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onMouseMove, onDeviceOrientation, onScroll]);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,hsl(32_98%_54%_/_0.07)_0%,transparent_70%)]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 19], fov: 52, near: 0.5, far: 55 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false, depth: false }}
        style={{ background: 'transparent' }}
        frameloop="always"
        onPointerMissed={() => { document.body.style.cursor = 'default'; }}
      >
        <fog attach="fog" args={['#0b0804', 14, 38]} />
        <NetworkScene mouse={mouse} scrollImpulse={scrollImpulse} onDismiss={() => {}} />
      </Canvas>
    </motion.div>
  );
}
