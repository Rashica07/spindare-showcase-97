"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, ChevronDown } from "lucide-react";
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

      <div className="divider" />

      {/* ── Case Studies ── */}
      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Case Studies</p>
            <h2 className="section-title">Under the hood</h2>
            <p className="section-sub">Architecture decisions, technical depth, and what it actually took to build these.</p>
          </FadeUp>

          <div className="case-studies-list">

            <FadeUp delay={0.05}>
              <details className="case-study-item">
                <summary className="case-study-summary">
                  <div className="case-study-summary-left">
                    <span className="case-study-name">Spindare</span>
                    <span className="case-study-meta">React Native · Supabase · 150k+ LOC</span>
                  </div>
                  <ChevronDown size={16} className="case-study-chevron" />
                </summary>
                <div className="case-study-body">
                  <p className="case-study-desc">
                    A social gamification platform where users spin for daily challenges, complete them, and share with friends. Built for iOS and Android with React Native, TypeScript, and Supabase Realtime.
                  </p>
                  <div className="case-study-features">
                    <div className="case-study-feature">Real-time social feed with reactions</div>
                    <div className="case-study-feature">Daily challenge spin system — 200+ curated picks</div>
                    <div className="case-study-feature">Streak tracking and gamification</div>
                    <div className="case-study-feature">AI-powered challenge generation via Gemini</div>
                    <div className="case-study-feature">In-app messaging via Stream Chat</div>
                    <div className="case-study-feature">Auth via Clerk with custom Supabase ban system</div>
                  </div>
                  <div className="case-study-stats">
                    <div className="cs-stat"><span className="cs-stat-value">300+</span><span className="cs-stat-label">Components</span></div>
                    <div className="cs-stat"><span className="cs-stat-value">150k+</span><span className="cs-stat-label">Lines of code</span></div>
                    <div className="cs-stat"><span className="cs-stat-value">3</span><span className="cs-stat-label">Person team</span></div>
                    <div className="cs-stat"><span className="cs-stat-value">Sep &apos;26</span><span className="cs-stat-label">iOS launch</span></div>
                  </div>
                  <div className="case-study-decisions">
                    <p className="section-label" style={{ marginBottom: 16 }}>Architecture decisions</p>
                    <div className="cs-decision">
                      <div className="cs-decision-top">
                        <span className="cs-decision-title">Why Supabase over Firebase</span>
                      </div>
                      <div className="cs-decision-points">
                        <div className="cs-point"><span className="cs-point-label">Real-time scale</span><span className="cs-point-text">Supabase Realtime handled 10K+ concurrent reactions with lower latency than Firebase&apos;s WebSocket implementation.</span></div>
                        <div className="cs-point"><span className="cs-point-label">Data integrity</span><span className="cs-point-text">PostgreSQL RLS let me enforce privacy rules at the DB layer — no bloated middleware needed.</span></div>
                        <div className="cs-point"><span className="cs-point-label">Dev velocity</span><span className="cs-point-text">GoTrue Auth let me ship the full V2 authentication flow in under 48 hours.</span></div>
                      </div>
                    </div>
                    <div className="cs-decision">
                      <div className="cs-decision-top">
                        <span className="cs-decision-title">Why Expo over bare React Native</span>
                      </div>
                      <div className="cs-decision-points">
                        <div className="cs-point"><span className="cs-point-label">OTA updates</span><span className="cs-point-text">Ship bug fixes without waiting for App Store review cycles.</span></div>
                        <div className="cs-point"><span className="cs-point-label">Build pipeline</span><span className="cs-point-text">EAS Build replaced a complex native build setup with a single command — critical for a small team.</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </FadeUp>

            <FadeUp delay={0.1}>
              <details className="case-study-item">
                <summary className="case-study-summary">
                  <div className="case-study-summary-left">
                    <span className="case-study-name">TravelMe</span>
                    <span className="case-study-meta">React Native · OpenAI · Solo project</span>
                  </div>
                  <ChevronDown size={16} className="case-study-chevron" />
                </summary>
                <div className="case-study-body">
                  <p className="case-study-desc">
                    Describe your trip in plain language — TravelMe generates a full itinerary: flights, hotels, local experiences, day-by-day plan. No more juggling 10 apps.
                  </p>
                  <div className="case-study-features">
                    <div className="case-study-feature">Natural language trip planning via OpenAI</div>
                    <div className="case-study-feature">Full itinerary generation — flights, hotels, activities</div>
                    <div className="case-study-feature">Payments via Stripe</div>
                    <div className="case-study-feature">Offline itinerary access</div>
                  </div>
                  <div className="case-study-decisions">
                    <p className="section-label" style={{ marginBottom: 16 }}>Architecture decisions</p>
                    <div className="cs-decision">
                      <div className="cs-decision-top">
                        <span className="cs-decision-title">Why TypeScript everywhere</span>
                      </div>
                      <div className="cs-decision-points">
                        <div className="cs-point"><span className="cs-point-label">Bug prevention</span><span className="cs-point-text">TypeScript&apos;s type checker prevents entire classes of runtime errors before they reach users.</span></div>
                        <div className="cs-point"><span className="cs-point-label">Refactoring</span><span className="cs-point-text">Renaming a prop instantly surfaces every affected usage — essential when working fast and solo.</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </FadeUp>

          </div>
        </div>
      </section>
    </>
  );
}
