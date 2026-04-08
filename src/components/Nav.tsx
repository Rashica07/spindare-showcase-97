"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage, Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
  { code: "sq", label: "SQ" },
];

export default function Nav() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const alwaysScrolled = pathname === "/cv";

  useEffect(() => {
    if (alwaysScrolled) { setScrolled(true); return; }
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [alwaysScrolled]);

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
            <button
              className={`nav-hamburger${open ? " nav-hamburger--open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="hamburger-icon hamburger-icon--menu"><Menu size={20} /></span>
              <span className="hamburger-icon hamburger-icon--close"><X size={20} /></span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-drawer" role="dialog" aria-label="Mobile navigation">
          <nav className="mobile-drawer-links">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`mobile-drawer-link${isActive(l.href) ? " mobile-drawer-link--active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="mobile-drawer-cta">
            {t.nav.quote}
          </Link>
          <div className="mobile-drawer-langs">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={`lang-btn${lang === l.code ? " lang-btn--active" : ""}`}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
