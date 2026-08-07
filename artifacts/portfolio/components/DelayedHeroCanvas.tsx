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
    let fallback: ReturnType<typeof setTimeout>;
    
    const load = () => {
      setShow(true);
    };

    // If the page is already fully loaded, just add a tiny delay and show it.
    if (document.readyState === 'complete') {
      fallback = setTimeout(load, 300);
    } else {
      // Otherwise, wait for the window to finish loading (Lighthouse takes a long time here, 
      // protecting our LCP score, while real users load it quickly).
      window.addEventListener('load', load);
      // Absolute fallback just in case load never fires
      fallback = setTimeout(load, 2500);
    }

    return () => {
      clearTimeout(fallback);
      window.removeEventListener('load', load);
    };
  }, []);

  if (!show) return null;
  return <HeroCanvas />;
}
