'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [variant, setVariant] = useState<'default' | 'pointer' | 'text' | 'disabled'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // We only need the precise mouse position for the single minimal dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }
    setIsMobile(false);
    // Keep native cursor visible, dot acts as an underlay highlight
    // document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY, target;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        target = document.elementFromPoint(clientX, clientY) as HTMLElement;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
        target = e.target as HTMLElement;
      }
      
      // Update motion values directly without causing React re-renders!
      mouseX.set(clientX);
      mouseY.set(clientY);

      if (!isVisible) setIsVisible(true);

      if (target) {
        const isDisabled = target.hasAttribute('disabled') || target.closest('[disabled]');
        const isPointer = target.closest('a') || target.closest('button') || target.closest('[role="button"]');
        const isText = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'li', 'td', 'th', 'blockquote', 'code'].includes(target.tagName.toLowerCase()) || target.closest('p') || target.closest('h1') || target.closest('h2') || target.closest('h3');
        
        if (isDisabled) setVariant('disabled');
        else if (isPointer) setVariant('pointer');
        else if (isText) setVariant('text');
        else setVariant('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('touchmove', updateMousePosition, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      // document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateMousePosition);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  const dotVariants = {
    default: { 
      opacity: isVisible ? 1 : 0, 
      scale: 1,
      backgroundColor: "var(--color-primary)", 
      x: "-50%", 
      y: "-50%",
      width: 8,
      height: 8,
      borderRadius: "50%"
    },
    pointer: { 
      opacity: isVisible ? 0.7 : 0, 
      scale: 2.5,
      backgroundColor: "var(--color-primary)", 
      x: "-50%", 
      y: "-50%",
      width: 8,
      height: 8,
      borderRadius: "50%"
    },
    text: { 
      opacity: isVisible ? 0.8 : 0, 
      scale: 1,
      backgroundColor: "var(--color-primary)", 
      x: "-50%", 
      y: "-50%",
      width: 4,
      height: 24,
      borderRadius: "2px"
    },
    disabled: { 
      opacity: isVisible ? 1 : 0, 
      scale: 1,
      backgroundColor: "var(--color-destructive)", 
      x: "-50%", 
      y: "-50%",
      width: 8,
      height: 8,
      borderRadius: "50%"
    }
  };

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ left: mouseX, top: mouseY }}
      variants={dotVariants}
      animate={variant}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 28,
        mass: 0.1
      }}
    />
  );
}
