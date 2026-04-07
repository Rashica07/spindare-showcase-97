"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ heroActionsRef }: { heroActionsRef: React.RefObject<HTMLDivElement | null> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (!heroActionsRef.current) {
        setVisible(window.scrollY > 80);
        return;
      }
      const rect = heroActionsRef.current.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroActionsRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="nav"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            height: "56px",
            borderBottom: "1px solid var(--border)",
            background: "rgba(8,8,8,0.90)",
            backdropFilter: "blur(12px)",
          }}
        >
          <a href="/" className="nav-logo">kiq<span>.</span>dev</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#writing">Writing</a></li>
            <li><Link href="/dev-hub">Dev Hub</Link></li>
            <li><a href="#contact" className="nav-cta">Hire Me</a></li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
