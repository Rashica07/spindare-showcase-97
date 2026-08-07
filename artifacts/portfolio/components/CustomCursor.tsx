'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<'default' | 'pointer' | 'text' | 'disabled'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }
    setIsMobile(false);
    
    document.body.style.cursor = 'none';

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
      setMousePosition({ x: clientX, y: clientY });
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
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateMousePosition);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [isVisible]);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      borderRadius: "50%",
      borderColor: "var(--color-primary)",
      backgroundColor: "transparent",
      opacity: isVisible ? 1 : 0,
      scale: 1,
    },
    pointer: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      borderRadius: "50%",
      borderColor: "var(--color-primary)",
      backgroundColor: "transparent",
      opacity: isVisible ? 1 : 0,
      scale: 2.5,
    },
    text: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 12,
      height: 24,
      width: 4,
      borderRadius: "2px",
      borderColor: "transparent",
      backgroundColor: "var(--color-primary)",
      opacity: isVisible ? 1 : 0,
      scale: 1,
    },
    disabled: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      borderRadius: "50%",
      borderColor: "var(--color-destructive)",
      backgroundColor: "transparent",
      opacity: isVisible ? 1 : 0,
      scale: 1.5,
    }
  };

  const dotVariants = {
    default: { opacity: isVisible ? 1 : 0, backgroundColor: "var(--color-primary)" },
    pointer: { opacity: 0 },
    text: { opacity: 0 },
    disabled: { opacity: isVisible ? 1 : 0, backgroundColor: "var(--color-destructive)" }
  };

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-[9999] mix-blend-difference"
        animate={variants[variant]}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 28,
          mass: 0.1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          ...dotVariants[variant]
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
