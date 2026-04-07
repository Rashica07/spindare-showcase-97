"use client";
import { useEffect, useRef, CSSProperties, ReactNode } from "react";

function useFadeIn(rootMargin = "-30px") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.06, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return ref;
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useFadeIn();
  const style: CSSProperties = delay ? { transitionDelay: `${delay}s` } : {};
  return (
    <div ref={ref} className={`fade-up${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useFadeIn("-10px");
  const style: CSSProperties = delay ? { transitionDelay: `${delay}s` } : {};
  return (
    <div ref={ref} className={`fade-up${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}
