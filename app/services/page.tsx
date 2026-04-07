"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Smartphone, Globe, Palette, Server, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const serviceIcons = [Smartphone, Globe, Palette, Server, MessageSquare];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="section-inner">
          <p className="section-label">{t.services.hero.label}</p>
          <h1 className="page-hero-title">{t.services.hero.title}</h1>
          <p className="page-hero-sub">{t.services.hero.sub}</p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section-padded">
        <div className="section-inner">
          <div className="services-list">
            {t.services.items.map((svc, i) => {
              const Icon = serviceIcons[i];
              return (
                <div className="service-card" key={svc.name}>
                  <div className="service-card-header">
                    <div className="service-card-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h2 className="service-card-name">{svc.name}</h2>
                      <p className="service-card-desc">{svc.desc}</p>
                    </div>
                  </div>
                  <ul className="service-features">
                    {svc.features.map((f) => (
                      <li key={f} className="service-feature-item">
                        <Check size={13} className="feature-check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="service-card-cta">
                    {t.common.getQuote} <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Process ── */}
      <section className="section-padded">
        <div className="section-inner">
          <h2 className="section-title">{t.services.process.title}</h2>
          <div className="process-grid">
            {t.services.process.steps.map((step) => (
              <div className="process-step" key={step.n}>
                <span className="process-step-n">{step.n}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ── */}
      <section className="section-padded cta-section">
        <div className="section-inner cta-inner">
          <h2 className="cta-title">{t.services.cta.title}</h2>
          <p className="cta-sub">{t.services.cta.sub}</p>
          <Link href="/contact" className="btn-primary btn-large">
            {t.services.cta.button} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
