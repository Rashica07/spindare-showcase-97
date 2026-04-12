"use client";
import { useRef } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Tilt3D({ children, className, strength = 5 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(6px)`;
    el.style.transition = "transform 0.08s ease";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
