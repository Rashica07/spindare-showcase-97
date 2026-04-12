"use client";
import { useEffect, useRef } from "react";

export function useParallax(factor = 0.25) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;

    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translateY(${window.scrollY * factor}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor]);

  return ref;
}
