"use client";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Palette, Server, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";
import { Ticker } from "@/components/Ticker";
import { HeroTerminal } from "@/components/HeroTerminal";
import { Tilt3D } from "@/components/Tilt3D";
import { useParallax } from "@/hooks/useParallax";

const serviceIcons = [Smartphone, Globe, Palette, Server];
const statusColors: Record<string, string> = { live: "status-live", dev: "status-dev", soon: "status-soon" };

export default function HomeClient() {
  const { t } = useLanguage();
  const featuredProjects = t.portfolio.projects.slice(0, 2);
  const parallaxRef = useParallax(0.22);

  return (
    <>
      <section className="hero-section">
        <div className="hero-glow" aria-hidden="true" />
        <div className="section-inner hero-inner">
          <div className="hero-content-wrap" ref={parallaxRef}>
            <div className="hero-left">
              <h1 className="hero-headline">
                <span className="hero-h1">{t.home.hero.h1}</span>
                <span className="hero-h2 accent-text">{t.home.hero.h2}</span>
              </h1>
              <p className="hero-sub">{t.home.hero.sub}</p>
              <p className="hero-spindare-inline">
                {t.home.hero.spindare}: <span>Spindare</span> — React Native · iOS · Sep 2026
              </p>
              <div className="hero-actions">
                <Link href="/portfolio" className="btn-primary">{t.home.hero.cta1} <ArrowRight size={15} /></Link>
                <Link href="/contact" className="btn-secondary">{t.home.hero.cta2}</Link>
                <span className="hero-avail">{t.home.hero.avail}</span>
              </div>
            </div>
            <HeroTerminal />
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
                <Tilt3D className="featured-card">
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
                </Tilt3D>
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

      {/* Testimonials — uncomment when ready
      <div className="divider" />
      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">{t.home.testimonials.label}</p>
            <h2 className="section-title">{t.home.testimonials.title}</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="testimonials-layout">
              ...
            </div>
          </FadeUp>
        </div>
      </section>
      */}

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
