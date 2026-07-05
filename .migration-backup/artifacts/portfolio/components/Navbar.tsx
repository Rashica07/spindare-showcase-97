'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "sq", label: "SQ" },
  { code: "de", label: "DE" },
];

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const location = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="nav-logo">
            <span className="font-mono text-sm font-semibold tracking-widest text-foreground hover:text-primary transition-colors">
              KIQA<span className="text-primary">.</span>DEV
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.href.replace("/", "") || "home"}`}
                className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="h-px bg-primary mt-0.5"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative" data-testid="lang-switcher">
              <button
                onClick={() => setLangOpen((v) => !v)}
                data-testid="button-lang-toggle"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest flex items-center gap-1.5 border border-border/60 rounded px-2.5 py-1.5"
              >
                {lang.toUpperCase()}
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className={`transition-transform ${langOpen ? "rotate-180" : ""}`}>
                  <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-card border border-card-border rounded-lg overflow-hidden shadow-lg min-w-[80px]"
                  >
                    {LANGS.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => { setLang(code); setLangOpen(false); }}
                        data-testid={`button-lang-${code}`}
                        className={`w-full text-left px-3 py-2 text-xs font-mono tracking-widest transition-colors ${
                          lang === code
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/80"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              data-testid="nav-cta-quote"
              className="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t.nav.quote}
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen((v) => !v)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border/60 md:hidden"
            data-testid="mobile-menu"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`mobile-link-${link.href.replace("/", "") || "home"}`}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors py-1 ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    data-testid={`mobile-lang-${code}`}
                    className={`font-mono text-xs tracking-widest border border-border/60 rounded px-2 py-1 transition-colors ${
                      lang === code ? "text-primary border-primary/40" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Link
                href="/contact"
                data-testid="mobile-cta-quote"
                className="mt-2 text-xs font-medium tracking-widest uppercase px-4 py-3 rounded bg-primary text-primary-foreground text-center"
              >
                {t.nav.quote}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
