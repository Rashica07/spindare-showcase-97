"use client";
import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            KIQA<span className="accent-text">.</span>DEV
          </Link>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/services">{t.footer.nav.services}</Link>
          <Link href="/portfolio">{t.footer.nav.portfolio}</Link>
          <Link href="/blog">{t.footer.nav.blog}</Link>
          <Link href="/about">{t.footer.nav.about}</Link>
          <Link href="/contact">{t.footer.nav.contact}</Link>
          <Link href="/dev-hub">Dev Hub</Link>
        </nav>

        <div className="footer-socials">
          <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="https://twitter.com/kristiangjergj4" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter size={16} />
          </a>
          <a href="mailto:contact@kiqa-dev.it" aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-legal">{t.footer.legal}</span>
        <div className="footer-bottom-right">
          <a href="/cv" className="footer-cv-link">CV</a>
          <span className="footer-built">{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
