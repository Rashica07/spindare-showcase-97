'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);
    
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseLeave);
      window.addEventListener('mouseover', handleMouseEnter);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference"
      style={{ left: 0, top: 0 }}
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8),
        y: mousePosition.y - (isHovering ? 24 : 8),
        scale: isHovering ? 3 : 1,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.5
      }}
    />
  );
}
