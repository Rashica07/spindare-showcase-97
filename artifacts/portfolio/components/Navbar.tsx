'use client';

import { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  // The design-preview subdomains (new.*, test.*) route to their own
  // internal tree and ship their own nav — the default chrome would give
  // away the trick and, for test.kiqa-dev.it, actively clash with a
  // deliberately different visual language.
  const isPreviewVariant = location?.startsWith('/site-new') || location?.startsWith('/site-test');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
    setOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const activeHref = navLinks.find((link) => isActive(link.href))?.href;

  const measureIndicator = () => {
    const activeEl = activeHref ? linkRefs.current[activeHref] : null;
    if (!activeEl || !navRef.current) {
      setIndicator(null);
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();
    setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
  };

  useLayoutEffect(() => {
    measureIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref, lang]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref]);

  if (isPreviewVariant) return null;

  return (
    <header
      className={`nav-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" data-testid="nav-logo" className="py-2">
          <span className="font-mono text-sm font-semibold tracking-widest text-foreground hover:text-primary transition-colors">
            KIQA<span className="text-primary">.</span>DEV
          </span>
        </Link>

        <nav ref={navRef} className="hidden md:flex items-center gap-5 lg:gap-8 relative" data-testid="nav-links" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => { linkRefs.current[link.href] = el; }}
              aria-current={isActive(link.href) ? "page" : undefined}
              data-testid={`nav-link-${link.href.replace("/", "") || "home"}`}
              className={`py-2 text-xs font-medium tracking-wider lg:tracking-widest uppercase whitespace-nowrap transition-colors ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {indicator && (
            <motion.div
              className="absolute bottom-0.5 h-px bg-primary"
              initial={false}
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Language switching is client-side, so it only exists with JS. */}
          <div className="relative js-only" data-testid="lang-switcher">
            <button
              onClick={() => setLangOpen((v) => !v)}
              data-testid="button-lang-toggle"
              aria-label="Change language"
              aria-expanded={langOpen}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest flex items-center gap-1.5 border border-border/60 rounded-lg px-3 py-2"
            >
              {lang.toUpperCase()}
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true" className={`transition-transform ${langOpen ? "rotate-180" : ""}`}>
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
                      aria-label={`Select language ${label}`}
                      className={`w-full text-left px-3 py-2.5 text-xs font-mono tracking-widest transition-colors ${
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
            className="text-xs font-semibold tracking-wider lg:tracking-widest uppercase whitespace-nowrap px-3 lg:px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t.nav.quote}
          </Link>
        </div>

        {/* Native <details>: opens and closes without any JavaScript. */}
        <details
          ref={menuRef}
          className="disclosure group md:hidden"
          onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
        >
          <summary
            className="-mr-2 p-2.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-mobile-menu"
            aria-label="Menu"
          >
            <Menu size={22} className="group-open:hidden" aria-hidden="true" />
            <X size={22} className="hidden group-open:block" aria-hidden="true" />
          </summary>
          <div
            className="menu-panel fixed inset-x-0 top-16 z-40 bg-background border-b border-border/60 shadow-lg"
            data-testid="mobile-menu"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col" aria-label="Main">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  data-testid={`mobile-link-${link.href.replace("/", "") || "home"}`}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors py-3 ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="js-only flex items-center gap-2 pt-4 mt-2 border-t border-border/40">
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    data-testid={`mobile-lang-${code}`}
                    aria-label={`Select language ${label}`}
                    className={`font-mono text-xs tracking-widest border border-border/60 rounded-lg px-3 py-2.5 transition-colors ${
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
                className="mt-4 text-xs font-semibold tracking-widest uppercase px-4 py-3.5 rounded-lg bg-primary text-primary-foreground text-center"
              >
                {t.nav.quote}
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
