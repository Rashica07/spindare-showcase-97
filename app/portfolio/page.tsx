"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

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
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.portfolio.hero.label}</p>
          <h1 className="page-hero-title">{t.portfolio.hero.title}</h1>
          <p className="page-hero-sub">{t.portfolio.hero.sub}</p>
        </div>
      </section>

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
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
          </FadeUp>

          <div className="portfolio-grid">
            {projects.map((proj, i) => (
              <FadeUp key={proj.name} delay={(i % 3) * 0.07}>
                <article className="portfolio-card">
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
                    <div className="portfolio-card-stack">
                      {proj.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
                    </div>
                  </div>
                  <div className="portfolio-card-actions">
                    {proj.link && proj.link !== "/" && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="portfolio-card-link">
                        <Github size={13} /> GitHub
                      </a>
                    )}
                    <Link href="/contact" className="portfolio-card-link">
                      {t.portfolio.hire} <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
