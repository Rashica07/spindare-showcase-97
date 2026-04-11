"use client";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Palette, Server, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";
import { Ticker } from "@/components/Ticker";

const serviceIcons = [Smartphone, Globe, Palette, Server];
const statusColors: Record<string, string> = { live: "status-live", dev: "status-dev", soon: "status-soon" };

export default function HomeClient() {
  const { t } = useLanguage();
  const featuredProjects = t.portfolio.projects.slice(0, 2);

  return (
    <>
      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="section-inner hero-inner">

          <p className="hero-greeting">{t.home.hero.badge}</p>

          <h1 className="hero-headline">
            <span className="hero-h1">{t.home.hero.h1}</span>
            <span className="hero-h2 accent-text">{t.home.hero.h2}</span>
          </h1>

          <p className="hero-sub">{t.home.hero.sub}</p>

          <div className="hero-spindare-pill">
            <span className="hero-spindare-dot" aria-hidden="true" />
            <span className="hero-spindare-label">{t.home.hero.spindare}:</span>
            <span className="hero-spindare-name">Spindare</span>
            <span className="hero-spindare-meta">React Native · iOS · Sep 2026</span>
          </div>

          <div className="hero-actions">
            <Link href="/portfolio" className="btn-primary">{t.home.hero.cta1} <ArrowRight size={15} /></Link>
            <Link href="/contact" className="btn-secondary">{t.home.hero.cta2}</Link>
            <span className="hero-avail">{t.home.hero.avail}</span>
          </div>

          <div className="hero-stats-row">
            {t.home.stats.items.map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Ticker />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">{t.home.services.label}</p>
            <h2 className="section-title">{t.home.services.title}</h2>
            <p className="section-sub">{t.home.services.sub}</p>
          </FadeUp>
          <div className="services-overview-grid">
            {t.home.services.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <FadeUp key={item.name} delay={i * 0.08}>
                  <div className="service-overview-card">
                    <div className="service-overview-icon"><Icon size={20} /></div>
                    <h3 className="service-overview-name">{item.name}</h3>
                    <p className="service-overview-desc">{item.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
          <FadeUp delay={0.2}>
            <div className="section-link-row">
              <Link href="/services" className="section-link">{t.common.viewAll} <ChevronRight size={14} /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">{t.home.featured.label}</p>
            <h2 className="section-title">{t.home.featured.title}</h2>
          </FadeUp>
          <div className="featured-projects">
            {featuredProjects.map((proj, i) => (
              <FadeUp key={proj.name} delay={i * 0.1}>
                <div className="featured-card">
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
                    {proj.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
                  </div>
                  {proj.link && proj.link !== "/" && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="featured-card-link">
                      GitHub <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.15}>
            <div className="section-link-row">
              <Link href="/portfolio" className="section-link">{t.common.viewAll} <ChevronRight size={14} /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Spindare Team</p>
            <h2 className="section-title">Who I build with</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="dh-collab-card">
              <div className="dh-collab-name-row">
                <a href="https://danielfrrokaj.com" target="_blank" rel="noopener noreferrer" className="dh-collab-name dh-collab-link">Daniel F. ↗</a>
                <span className="dh-collab-role">Lead Developer · Spindare</span>
              </div>
              <p className="dh-collab-note">
                Working with Daniel on Spindare has been invaluable. As the technical lead, he&apos;s helped me level up my architecture skills and navigate complex backend challenges.
              </p>
              <span className="dh-collab-context">Co-founder &amp; uncle</span>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <FadeUp>
        <section className="section-padded cta-section">
          <div className="section-inner cta-inner">
            <h2 className="cta-title">{t.home.cta.title}</h2>
            <p className="cta-sub">{t.home.cta.sub}</p>
            <Link href="/contact" className="btn-primary btn-large">{t.home.cta.button} <ArrowRight size={16} /></Link>
          </div>
        </section>
      </FadeUp>
    </>
  );
}
