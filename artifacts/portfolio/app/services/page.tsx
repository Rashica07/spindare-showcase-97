'use client';

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { usePageOverride, pick, type BlockOverrides } from "@/components/PulseSyncProvider";
import { FadeUp } from "@/components/FadeUp";

const SERVICES_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a mobile app cost, and how long does it take?",
      acceptedAnswer: { "@type": "Answer", text: "A mobile app with KIQA DEV starts from €799, delivered in 6 weeks. It includes design, build, and store submission handled end to end, with one fixed price and one point of contact for the whole six weeks." },
    },
    {
      "@type": "Question",
      name: "How much does a landing page cost, and how long does it take?",
      acceptedAnswer: { "@type": "Answer", text: "A landing page starts from €299, delivered in 7 days. It's a fast single page with your copy, your brand, and a working contact form, on your own domain." },
    },
    {
      "@type": "Question",
      name: "How much does a web platform cost, and how long does it take?",
      acceptedAnswer: { "@type": "Answer", text: "A web platform starts from €1,299, delivered in 3 weeks. It includes user accounts, billing, an admin dashboard, and a database built to hold up under real traffic." },
    },
    {
      "@type": "Question",
      name: "How much does a custom backend cost, and how long does it take?",
      acceptedAnswer: { "@type": "Answer", text: "A custom backend starts from €499, delivered in 2 weeks. It includes a documented API, a Postgres database, and authentication, ready for your existing frontend to plug into." },
    },
    {
      "@type": "Question",
      name: "Does KIQA DEV offer fixed-price quotes?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Every project is quoted upfront with a fixed price and a delivery date in writing, before any work begins. If scope changes mid-build, the cost is communicated before the work is done, not after." },
    },
  ],
};


export default function ServicesPage() {
  const { t } = useLanguage();
  const overrides = usePageOverride('services') as BlockOverrides;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_FAQ_JSON_LD) }}
      />
      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="services-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{pick(overrides, 'title', t.services.title)}</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">{pick(overrides, 'sub', t.services.sub)}</p>
          </div>
        </div>
      </section>
      <section className="py-20" data-testid="services-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.services.items.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.1} className="h-full">
                <div className="h-full border border-card-border bg-card rounded-xl p-8 flex flex-col gap-6" data-testid={`service-detail-${i}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{svc.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{svc.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-semibold tabular-nums text-foreground">{svc.price}</div>
                      <div className="font-mono text-xs text-muted-foreground mt-0.5">{svc.timeline}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {svc.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check size={12} className="text-muted-foreground shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-14 text-center">
            <h2 className="text-2xl font-bold text-foreground">{t.services.ctaTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.services.ctaSub}</p>
            <div className="mt-6 flex justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors" data-testid="services-cta-link">
                {pick(overrides, 'getProposal', t.services.getProposal)} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
      <section className="py-20 border-t border-border/40 bg-card/20" data-testid="services-process">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight">{t.process.title}</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-xl border border-card-border bg-card/60 p-6 flex flex-col gap-3" data-testid={`process-step-${i}`}>
                  <span className="text-sm font-semibold tabular-nums text-primary">{step.n}</span>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
