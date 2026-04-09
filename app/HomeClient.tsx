"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Globe, Palette, Server, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";
import { Ticker } from "@/components/Ticker";

const ease = [0.16, 1, 0.3, 1] as const;
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
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <p className="section-badge">{t.home.hero.badge}</p>
          </motion.div>
          <h1 className="hero-headline">
            <motion.span className="hero-h1" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>{t.home.hero.h1}</motion.span>
            <motion.span className="hero-h2 accent-text" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>{t.home.hero.h2}</motion.span>
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38, ease }}>{t.home.hero.sub}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.52, ease }}>
            <Link href="/services" className="btn-primary">{t.home.hero.cta1} <ArrowRight size={15} /></Link>
            <Link href="/portfolio" className="btn-secondary">{t.home.hero.cta2}</Link>
          </motion.div>
          <motion.div className="hero-stats-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7, ease }}>
            {t.home.stats.items.map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
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
            <p className="section-label">{t.home.testimonials.label}</p>
            <h2 className="section-title">{t.home.testimonials.title}</h2>
          </FadeUp>
          <div className="testimonials-grid">
            {t.home.testimonials.items.map((item, i) => (
              <FadeUp key={item.name} delay={i * 0.08}>
                <div className="testimonial-card">
                  <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                  <div className="testimonial-author">
                    <span className="testimonial-name">{item.name}</span>
                    <span className="testimonial-role">{item.role} · {item.location}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
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
