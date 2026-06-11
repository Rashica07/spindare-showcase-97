'use client';

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientOrbs } from "@/components/AmbientOrbs";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientOrbs variant="services" />
      <Navbar />

      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="services-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.services.label}</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{t.services.title}</h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl leading-relaxed">{t.services.sub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20" data-testid="services-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.services.items.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, borderColor: "hsl(var(--primary) / 0.35)", boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.12)" }} transition={{ duration: 0.2 }} className="border border-card-border bg-card/70 backdrop-blur-sm rounded-xl p-8 flex flex-col gap-6 transition-all" data-testid={`service-detail-${i}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{svc.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{svc.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-xl font-bold text-primary drop-shadow-[0_0_12px_rgba(249,115,22,0.25)]">{svc.price}</div>
                      <div className="font-mono text-xs text-muted-foreground mt-0.5">{svc.timeline}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {svc.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check size={12} className="text-primary shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <motion.span whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary cursor-pointer border border-primary/30 rounded-lg px-5 py-2.5 hover:bg-primary/10 transition-colors self-start" data-testid={`service-detail-cta-${i}`}>
                      Get a proposal for this service <ArrowRight size={11} />
                    </motion.span>
                  </Link>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/40 bg-card/20" data-testid="services-process">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.process.label}</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{t.process.title}</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.25)" }} transition={{ duration: 0.2 }} className="glass-card rounded-xl p-6 flex flex-col gap-3" data-testid={`process-step-${i}`}>
                  <span className="font-mono text-3xl font-black text-primary/30">{step.n}</span>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
