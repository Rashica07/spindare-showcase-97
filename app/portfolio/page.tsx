"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const statusClass: Record<string, string> = {
  live: "status-live",
  dev: "status-dev",
  soon: "status-soon",
};

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);

  const filters = t.portfolio.filters;
  const projects = t.portfolio.projects.filter((p) => {
    if (filter === 0) return true;
    return p.type === (filter === 1 ? "Mobile" : "Web");
  });

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.portfolio.hero.label}</p>
          <h1 className="page-hero-title">{t.portfolio.hero.title}</h1>
          <p className="page-hero-sub">{t.portfolio.hero.sub}</p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="section-padded">
        <div className="section-inner">
          <div className="filter-tabs">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`filter-tab${filter === i ? " filter-tab--active" : ""}`}
                onClick={() => setFilter(i)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {projects.map((proj) => (
              <article className="portfolio-card" key={proj.name}>
                <div className="portfolio-card-top">
                  <div className="portfolio-card-header">
                    <span className="portfolio-card-type">{proj.type}</span>
                    <span className={`project-status ${statusClass[proj.status]}`}>
                      {t.portfolio.status[proj.status as keyof typeof t.portfolio.status]}
                    </span>
                  </div>
                  <h2 className="portfolio-card-name">{proj.name}</h2>
                  <p className="portfolio-card-year">{proj.year}</p>
                  <p className="portfolio-card-desc">{proj.desc}</p>
                  <p className="portfolio-card-detail">{proj.detail}</p>
                </div>

                <div className="portfolio-card-stack">
                  {proj.stack.map((s) => (
                    <span className="stack-tag" key={s}>{s}</span>
                  ))}
                </div>

                <div className="portfolio-card-links">
                  {proj.link && proj.link !== "/" && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-link"
                    >
                      <Github size={14} /> {t.portfolio.viewCode}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded cta-section">
        <div className="section-inner cta-inner">
          <h2 className="cta-title">Have a project in mind?</h2>
          <p className="cta-sub">Let&apos;s talk about what you&apos;re building.</p>
          <Link href="/contact" className="btn-primary btn-large">
            {t.common.getQuote} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
