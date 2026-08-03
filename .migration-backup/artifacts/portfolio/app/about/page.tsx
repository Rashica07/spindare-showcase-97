'use client';

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiReact, SiTypescript, SiSupabase, SiNextdotjs, SiNodedotjs, SiPostgresql, SiExpo, SiGithub } from "react-icons/si";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const SKILL_ICONS: Record<string, React.ElementType> = {
  "React Native": SiReact, "TypeScript": SiTypescript, "Supabase": SiSupabase, "Next.js": SiNextdotjs, "Node.js": SiNodedotjs, "PostgreSQL": SiPostgresql, "Expo": SiExpo,
};

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.about.label}</span>
            <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight">{t.about.title}</h1>
            <p className="mt-3 text-muted-foreground text-lg">{t.about.sub}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-b border-border/40" data-testid="about-bio">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeUp>
            <div className="flex flex-col gap-5">
              {t.about.bio.map((para, i) => (<p key={i} className="text-muted-foreground leading-relaxed">{para}</p>))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Location", value: "Lecco, Italy · Kosovo" },
                { label: "Focus", value: "Mobile-first development" },
                { label: "Available", value: "June 2026" },
                { label: "Response time", value: "Within 24h" },
              ].map(({ label, value }, i) => (
                <motion.div key={i} whileHover={{ y: -3, borderColor: "hsl(var(--primary) / 0.3)" }} transition={{ duration: 0.2 }} className="glass-card rounded-lg p-4" data-testid={`about-meta-${i}`}>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{label}</p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{value}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 border-b border-border/40 bg-card/20" data-testid="about-skills">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Stack</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Tech Stack</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.skills.map((cat, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.4)" }} transition={{ duration: 0.2 }} className="border border-card-border bg-card/60 backdrop-blur-sm rounded-xl p-6 transition-colors shadow-sm" data-testid={`skill-category-${i}`}>
                  <h3 className="font-mono text-xs text-primary tracking-widest uppercase mb-4">{cat.name}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {cat.items.map((item, j) => {
                      const Icon = SKILL_ICONS[item];
                      return (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          {Icon ? <Icon size={12} className="text-muted-foreground/60 shrink-0" /> : <span className="w-3 h-px bg-border/60 shrink-0" />}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-border/40" data-testid="about-experience">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Experience</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Timeline</h2>
          </FadeUp>
          <div className="mt-12 relative">
            <div className="absolute left-0 md:left-32 top-0 bottom-0 w-px bg-border/40" />
            <div className="flex flex-col gap-8">
              {t.about.experience.map((exp, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="flex gap-8 md:gap-0 relative" data-testid={`exp-item-${i}`}>
                    <div className="hidden md:block w-32 pt-1 shrink-0"><span className="font-mono text-xs text-muted-foreground">{exp.year}</span></div>
                    <div className="relative">
                      <div className="absolute -left-1 md:-left-[41px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/25 animate-pulse" />
                      <div className="pl-6 md:pl-8">
                        <h3 className="font-semibold text-foreground text-sm">{exp.role}</h3>
                        <p className="md:hidden font-mono text-xs text-muted-foreground mt-0.5">{exp.year}</p>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-border/40 bg-card/20" data-testid="about-values">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Approach</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">How I work</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.about.values.map((v, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }} transition={{ duration: 0.2 }} className="glass-card rounded-xl p-6" data-testid={`value-item-${i}`}>
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="about-cta">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeUp>
            <h2 className="text-3xl font-bold text-foreground">Want to work together?</h2>
            <p className="mt-2 text-muted-foreground">Open to select freelance projects starting June 2026.</p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex gap-4 shrink-0">
            <Link href="/contact" data-testid="about-cta-contact">
              <motion.span whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors cursor-pointer">
                Get in touch <ArrowRight size={14} />
              </motion.span>
            </Link>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" data-testid="about-cta-github" className="inline-flex items-center gap-2 px-5 py-3.5 border border-border/60 text-muted-foreground hover:text-foreground rounded-lg text-sm transition-colors">
              <SiGithub size={16} /> GitHub
            </a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
