"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticWrapper({ children, strength = 0.3, className = "" }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const x = useSpring(0, { stiffness: 250, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 250, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isTouch) {
    return <span className={`inline-block ${className}`}>{children}</span>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
