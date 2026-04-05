"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const AnimatedWords = ({ children, className = "", delay = 0, as: Tag = "p" }: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const words = children.split(" ");

  if (reduced) return <Tag ref={ref} className={className}>{children}</Tag>;

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: delay + i * 0.04, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

export const AnimatedLetters = ({ children, className = "", delay = 0, as: Tag = "h1" }: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const letters = children.split("");

  if (reduced) return <Tag ref={ref} className={className}>{children}</Tag>;

  return (
    <Tag ref={ref} className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Tag>
  );
};

interface PopUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const PopUp = ({ children, className = "", delay = 0 }: PopUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const BlurReveal = ({ children, className = "", delay = 0 }: PopUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
