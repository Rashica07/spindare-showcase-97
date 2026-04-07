"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
  { code: "sq", label: "SQ" },
];

const drawerVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16, ease: "easeIn" } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.04 + 0.06, duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Nav() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`site-nav${scrolled ? " site-nav--scrolled" : ""}`}>
        <div className="site-nav-inner">
          <Link href="/" className="site-nav-logo">
            KIQA<span className="accent-text">.</span>DEV
          </Link>

          <nav className="site-nav-links" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`site-nav-link${isActive(l.href) ? " site-nav-link--active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="site-nav-right">
            <div className="lang-switcher" role="group" aria-label="Language selector">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  className={`lang-btn${lang === l.code ? " lang-btn--active" : ""}`}
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link href="/contact" className="nav-quote-btn">
              {t.nav.quote}
            </Link>
            <motion.button
              className="nav-hamburger"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              whileTap={{ scale: 0.88 }}
              transition={{ duration: 0.12 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "flex" }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-drawer"
            role="dialog"
            aria-label="Mobile navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="mobile-drawer-links">
              {navLinks.map((l, i) => (
                <motion.div key={l.href} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                  <Link
                    href={l.href}
                    className={`mobile-drawer-link${isActive(l.href) ? " mobile-drawer-link--active" : ""}`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div custom={navLinks.length} variants={linkVariants} initial="hidden" animate="visible">
                <Link href="/contact" className="mobile-drawer-cta">
                  {t.nav.quote}
                </Link>
              </motion.div>
            </nav>
            <motion.div
              className="mobile-drawer-langs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
            >
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  className={`lang-btn${lang === l.code ? " lang-btn--active" : ""}`}
                  onClick={() => setLang(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
