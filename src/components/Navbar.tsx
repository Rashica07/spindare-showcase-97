"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Code2, Zap, LayoutDashboard } from "lucide-react";
import MagneticWrapper from "@/components/MagneticWrapper";

const links = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Launch", id: "launch" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

const sectionIds = ["about", "projects", "launch", "blog", "contact"];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4"
      style={{ paddingTop: "calc(1rem + env(safe-area-inset-top))" }}
    >
      <nav
        className={`container mx-auto max-w-5xl rounded-2xl transition-all duration-300 ${
          scrolled || open ? "glass-strong shadow-2xl px-6 py-3" : "bg-transparent px-6 py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground font-mono text-sm">
              kiqa<span className="text-primary">-dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.label}
                  onClick={() => scrollToSection(l.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-muted/60"
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <MagneticWrapper strength={0.25} className="hidden md:inline-block">
              <a
                href="/dev-hub"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dev Hub
              </a>
            </MagneticWrapper>
            {mounted && (
              <button
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-foreground" />
                ) : (
                  <Moon className="w-4 h-4 text-foreground" />
                )}
              </button>
            )}
            <MagneticWrapper strength={0.25} className="hidden md:inline-block">
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity glow-primary"
              >
                <Zap className="w-3.5 h-3.5" />
                Hire Me
              </button>
            </MagneticWrapper>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-3 pb-3 border-t border-border/50 mt-3 space-y-0.5">
                {links.map((l) => {
                  const isActive = active === l.id;
                  return (
                    <button
                      key={l.label}
                      onClick={() => { setOpen(false); setTimeout(() => scrollToSection(l.id), 320); }}
                      className={`w-full text-left block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-foreground bg-muted/60"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {l.label}
                    </button>
                  );
                })}

                <div className="border-t border-border/40 my-2 pt-2 space-y-1.5">
                  <a
                    href="/dev-hub"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dev Hub
                  </a>
                  <button
                    onClick={() => { setOpen(false); setTimeout(() => scrollToSection("contact"), 320); }}
                    className="w-full flex items-center justify-center px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                  >
                    ⚡ Hire Me
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
