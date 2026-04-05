"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    spring.set(progress);
  }, [progress, spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-secondary"
      style={{ scaleX: spring }}
    />
  );
}
