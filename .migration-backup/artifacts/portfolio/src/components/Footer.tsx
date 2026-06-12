import { Link } from "wouter";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-sm font-semibold tracking-widest">
              KIQA<span className="text-primary">.</span>DEV
            </span>
            <p className="text-xs text-muted-foreground max-w-xs">{t.footer.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {[
              { href: "/portfolio", label: t.nav.portfolio },
              { href: "/about", label: t.nav.about },
              { href: "/blog", label: t.nav.blog },
              { href: "/contact", label: t.nav.contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`footer-link-${link.href.replace("/", "")}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rashica07"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-link-github"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub size={16} />
            </a>
            <span className="text-muted-foreground/30 text-xs">|</span>
            <a
              href="mailto:contact@kiqa-dev.it"
              data-testid="footer-link-email"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              contact@kiqa-dev.it
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/60 font-mono">{t.footer.legal}</p>
          <p className="text-xs text-muted-foreground/40 font-mono">Lecco, Italy · Kosovo</p>
        </div>
      </div>
    </footer>
  );
}
