"use client";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Database, Wrench } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

const skillIcons = [Smartphone, Code2, Database, Wrench];

export default function AboutClient() {
  const { t } = useLanguage();
  return (
    <>
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.about.hero.label}</p>
          <h1 className="page-hero-title">{t.about.hero.title}</h1>
          <p className="page-hero-sub">{t.about.hero.sub}</p>
        </div>
      </section>
      <section className="section-padded">
        <div className="section-inner about-layout">
          <FadeUp className="about-avatar-col">
            <div className="about-avatar" aria-label="Kristian Gjergji">
              <span className="about-avatar-initials">KG</span>
            </div>
            <div className="about-quick-links">
              <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="about-quick-link">GitHub ↗</a>
              <a href="https://twitter.com/kristiangjergj4" target="_blank" rel="noopener noreferrer" className="about-quick-link">Twitter ↗</a>
              <a href="mailto:newkiqaa@gmail.com" className="about-quick-link">Email ↗</a>
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="about-bio-col">
            <h2 className="about-bio-title">{t.about.bio.title}</h2>
            <p className="about-bio-p">{t.about.bio.p1}</p>
            <p className="about-bio-p">{t.about.bio.p2}</p>
            <p className="about-bio-p">{t.about.bio.p3}</p>
          </FadeUp>
        </div>
      </section>
      <div className="divider" />
      <section className="section-padded">
        <div className="section-inner">
          <FadeUp><h2 className="section-title">{t.about.skills.title}</h2></FadeUp>
          <div className="skills-grid">
            {t.about.skills.categories.map((cat, i) => {
              const Icon = skillIcons[i] || Code2;
              return (
                <FadeUp key={cat.name} delay={i * 0.08}>
                  <div className="skill-category">
                    <div className="skill-category-header"><Icon size={16} /><h3 className="skill-category-name">{cat.name}</h3></div>
                    <ul className="skill-items">
                      {cat.items.map((item) => (
                        <li key={item} className="skill-item"><span className="skill-dot" aria-hidden="true" />{item}</li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
      <div className="divider" />
      <section className="section-padded">
        <div className="section-inner">
          <FadeUp><h2 className="section-title">{t.about.experience.title}</h2></FadeUp>
          <div className="timeline">
            {t.about.experience.items.map((item, i) => (
              <FadeUp key={item.year + i} delay={i * 0.08}>
                <div className="timeline-item">
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.role}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />
      <section className="section-padded">
        <div className="section-inner">
          <FadeUp><h2 className="section-title">{t.about.values.title}</h2></FadeUp>
          <div className="values-grid">
            {t.about.values.items.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.07}>
                <div className="value-card">
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
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
            <h2 className="cta-title">{t.about.cta.title}</h2>
            <p className="cta-sub">{t.about.cta.sub}</p>
            <Link href="/contact" className="btn-primary btn-large">{t.about.cta.button} <ArrowRight size={16} /></Link>
          </div>
        </section>
      </FadeUp>
    </>
  );
}
