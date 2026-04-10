"use client";
import Link from "next/link";
import { ArrowRight, Check, Smartphone, Globe, Palette, Server, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FadeUp } from "@/components/FadeUp";

const serviceIcons = [Smartphone, Globe, Palette, Server, MessageSquare];

export default function ServicesClient() {
  const { t } = useLanguage();
  return (
    <>
      <section className="page-hero" data-label="SERVICES">
        <div className="section-inner">
          <p className="section-label">{t.services.hero.label}</p>
          <h1 className="page-hero-title">{t.services.hero.title}</h1>
          <p className="page-hero-sub">{t.services.hero.sub}</p>
        </div>
      </section>
      <section className="section-padded">
        <div className="section-inner">
          <div className="services-list">
            {t.services.items.map((svc, i) => {
              const Icon = serviceIcons[i];
              return (
                <FadeUp key={svc.name} delay={i * 0.07}>
                  <div className="service-card">
                    <div className="service-card-header">
                      <div className="service-card-icon-wrap"><Icon size={22} /></div>
                      <div>
                        <h2 className="service-card-name">{svc.name}</h2>
                        <p className="service-card-desc">{svc.desc}</p>
                      </div>
                    </div>
                    <ul className="service-features">
                      {svc.features.map((f) => (
                        <li key={f} className="service-feature-item"><Check size={13} className="feature-check" />{f}</li>
                      ))}
                    </ul>
                    <Link href="/contact" className="service-card-cta">{t.common.getQuote} <ArrowRight size={13} /></Link>
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
          <FadeUp><h2 className="section-title">{t.services.process.title}</h2></FadeUp>
          <div className="process-grid">
            {t.services.process.steps.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.08}>
                <div className="process-step">
                  <span className="process-step-n">{step.n}</span>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.desc}</p>
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
            <h2 className="cta-title">{t.services.cta.title}</h2>
            <p className="cta-sub">{t.services.cta.sub}</p>
            <Link href="/contact" className="btn-primary btn-large">{t.services.cta.button} <ArrowRight size={16} /></Link>
          </div>
        </section>
      </FadeUp>
    </>
  );
}
