"use client";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Palette, Server, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const serviceIcons = [Smartphone, Globe, Palette, Server];

const statusColors: Record<string, string> = {
  live: "status-live",
  dev: "status-dev",
  soon: "status-soon",
};

export default function HomePage() {
  const { t } = useLanguage();

  const featuredProjects = t.portfolio.projects.slice(0, 2);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-grid-accent" aria-hidden="true" />
        <div className="section-inner hero-inner">
          <p className="section-badge">{t.home.hero.badge}</p>
          <h1 className="hero-headline">
            <span className="hero-h1">{t.home.hero.h1}</span>
            <span className="hero-h2 accent-text">{t.home.hero.h2}</span>
          </h1>
          <p className="hero-sub">{t.home.hero.sub}</p>
          <div className="hero-actions">
            <Link href="/services" className="btn-primary">
              {t.home.hero.cta1} <ArrowRight size={15} />
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              {t.home.hero.cta2}
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="section-padded">
        <div className="section-inner">
          <p className="section-label">{t.home.services.label}</p>
          <h2 className="section-title">{t.home.services.title}</h2>
          <p className="section-sub">{t.home.services.sub}</p>
          <div className="services-overview-grid">
            {t.home.services.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <div className="service-overview-card" key={item.name}>
                  <div className="service-overview-icon">
                    <Icon size={20} />
                  </div>
                  <h3 className="service-overview-name">{item.name}</h3>
                  <p className="service-overview-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="section-link-row">
            <Link href="/services" className="section-link">
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Featured Projects ── */}
      <section className="section-padded">
        <div className="section-inner">
          <p className="section-label">{t.home.featured.label}</p>
          <h2 className="section-title">{t.home.featured.title}</h2>
          <div className="featured-projects">
            {featuredProjects.map((proj) => (
              <div className="featured-card" key={proj.name}>
                <div className="featured-card-top">
                  <div className="featured-card-name-row">
                    <span className="featured-card-name">{proj.name}</span>
                    <span className={`project-status ${statusColors[proj.status]}`}>
                      {t.portfolio.status[proj.status as keyof typeof t.portfolio.status]}
                    </span>
                  </div>
                  <p className="featured-card-year">{proj.year}</p>
                  <p className="featured-card-desc">{proj.desc}</p>
                </div>
                <div className="featured-card-stack">
                  {proj.stack.map((s) => (
                    <span className="stack-tag" key={s}>{s}</span>
                  ))}
                </div>
                {proj.link && proj.link !== "/" && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-card-link"
                  >
                    GitHub <ArrowRight size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="section-link-row">
            <Link href="/portfolio" className="section-link">
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Stats ── */}
      <section className="section-padded">
        <div className="section-inner">
          <p className="section-label">{t.home.stats.label}</p>
          <div className="stats-row">
            {t.home.stats.items.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ── */}
      <section className="section-padded cta-section">
        <div className="section-inner cta-inner">
          <h2 className="cta-title">{t.home.cta.title}</h2>
          <p className="cta-sub">{t.home.cta.sub}</p>
          <Link href="/contact" className="btn-primary btn-large">
            {t.home.cta.button} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
