'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor on body
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleInteractableOver = (e: MouseEvent | TouchEvent) => {
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

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', updateMousePosition);
    window.addEventListener('mouseover', handleInteractableOver);
    window.addEventListener('touchstart', handleInteractableOver);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateMousePosition);
      window.removeEventListener('mouseover', handleInteractableOver);
      window.removeEventListener('touchstart', handleInteractableOver);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 rounded-full border border-primary/50 pointer-events-none z-[9999] mix-blend-difference"
        style={{ left: 0, top: 0 }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 28,
          mass: 0.1
        }}
      />
      <motion.div
        className="fixed w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference"
        style={{ left: 0, top: 0 }}
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: isHovering ? 0 : (isVisible ? 1 : 0)
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 28,
          mass: 0.1
        }}
      />
    </>
  );
}
