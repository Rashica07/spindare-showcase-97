"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({ actionsRef }: { actionsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="hero">
      <motion.p
        className="hero-tag"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        Available for work
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        Kristian<br />
        <em>Gjergji.</em>
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        14-year-old developer from Kosovo, living in Italy.
        I&apos;ve spent the last year building <strong>Spindare</strong> — a social app with 150,000+ lines of code — with my uncle and a friend. It ships to the App Store in September.
        That&apos;s basically my CV.
      </motion.p>

      <motion.div
        ref={actionsRef}
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32, ease }}
      >
        <a href="#projects" className="btn-primary">See My Work</a>
        <Link href="/dev-hub" className="btn-ghost">Dev Hub</Link>
      </motion.div>

      <motion.span
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Scroll
      </motion.span>
    </section>
  );
}
