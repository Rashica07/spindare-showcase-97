"use client";
import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Layout, Database, Wrench } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const skillIcons = [Smartphone, Code2, Database, Wrench];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.about.hero.label}</p>
          <h1 className="page-hero-title">{t.about.hero.title}</h1>
          <p className="page-hero-sub">{t.about.hero.sub}</p>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="section-padded">
        <div className="section-inner about-layout">
          <div className="about-avatar-col">
            <div className="about-avatar" aria-label="Kristian Gjergji">
              <span className="about-avatar-initials">KG</span>
            </div>
            <div className="about-quick-links">
              <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="about-quick-link">
                GitHub ↗
              </a>
              <a href="https://twitter.com/kristiangjergj4" target="_blank" rel="noopener noreferrer" className="about-quick-link">
                Twitter ↗
              </a>
              <a href="mailto:newkiqaa@gmail.com" className="about-quick-link">
                Email ↗
              </a>
            </div>
          </div>

          <div className="about-bio-col">
            <h2 className="about-bio-title">{t.about.bio.title}</h2>
            <p className="about-bio-p">{t.about.bio.p1}</p>
            <p className="about-bio-p">{t.about.bio.p2}</p>
            <p className="about-bio-p">{t.about.bio.p3}</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Skills ── */}
      <section className="section-padded">
        <div className="section-inner">
          <h2 className="section-title">{t.about.skills.title}</h2>
          <div className="skills-grid">
            {t.about.skills.categories.map((cat, i) => {
              const Icon = skillIcons[i] || Code2;
              return (
                <div className="skill-category" key={cat.name}>
                  <div className="skill-category-header">
                    <Icon size={16} />
                    <h3 className="skill-category-name">{cat.name}</h3>
                  </div>
                  <ul className="skill-items">
                    {cat.items.map((item) => (
                      <li key={item} className="skill-item">
                        <span className="skill-dot" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Experience ── */}
      <section className="section-padded">
        <div className="section-inner">
          <h2 className="section-title">{t.about.experience.title}</h2>
          <div className="timeline">
            {t.about.experience.items.map((exp) => (
              <div className="timeline-item" key={exp.role}>
                <div className="timeline-year">{exp.year}</div>
                <div className="timeline-content">
                  <h3 className="timeline-role">{exp.role}</h3>
                  <p className="timeline-desc">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Values ── */}
      <section className="section-padded">
        <div className="section-inner">
          <h2 className="section-title">{t.about.values.title}</h2>
          <div className="values-grid">
            {t.about.values.items.map((v) => (
              <div className="value-card" key={v.title}>
                <h3 className="value-card-title">{v.title}</h3>
                <p className="value-card-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded cta-section">
        <div className="section-inner cta-inner">
          <h2 className="cta-title">Work with me</h2>
          <p className="cta-sub">Available for freelance projects and consulting.</p>
          <Link href="/contact" className="btn-primary btn-large">
            {t.common.getQuote} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
