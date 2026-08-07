'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false, loading: () => null }
);

export function DelayedHeroCanvas() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return <HeroCanvas />;
}
