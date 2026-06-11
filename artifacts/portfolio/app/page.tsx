'use client';

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SiReact, SiTypescript, SiSupabase, SiNextdotjs, SiNodedotjs, SiPostgresql, SiExpo } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";
import dynamic from "next/dynamic";
const HeroCanvas = dynamic(
  () => import("@/components/HeroCanvas").then(m => ({ default: m.HeroCanvas })),
  { ssr: false, loading: () => null }
);
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { PageWatermark } from "@/components/PageWatermark";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const STACK_ICONS = [
  { Icon: SiReact, label: "React Native", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { Icon: SiSupabase, label: "Supabase", color: "#3ECF8E" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#68A063" },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "#336791" },
  { Icon: SiExpo, label: "Expo", color: "#ffffff" },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [blogIndex, setBlogIndex] = useState(0);
  const blogPosts = t.blog.posts;
  const nextBlog = () => setBlogIndex((prev) => (prev + 1) % blogPosts.length);
  const prevBlog = () => setBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);

  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;
      const scrolled = -rect.top;
      if (scrolled < 0) { setActiveStep(0); setStepProgress(0); return; }
      if (scrolled > totalScrollable) { setActiveStep(3); setStepProgress(1); return; }
      const pct = scrolled / totalScrollable;
      const step = Math.min(Math.floor(pct * 4), 3);
      setActiveStep(step);
      const stepStart = step * 0.25;
      const progressInStep = (pct - stepStart) / 0.25;
      setStepProgress(Math.max(0, Math.min(1, progressInStep)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientOrbs variant="home" />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="section-hero">
        <PageWatermark text="KIQA" />
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground tracking-widest uppercase border border-border/60 rounded px-4 py-1.5 mb-10" data-testid="hero-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t.hero.badge}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight max-w-5xl" data-testid="hero-headline">
            <span className="text-foreground">{t.hero.h1Line1} </span>
            <span className="text-gradient">{t.hero.h1Line2}</span>
            <br />
            <span className="text-foreground">{t.hero.h1Line3} </span>
            <span className="text-foreground">{t.hero.h1Line4}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed" data-testid="hero-sub">
            {t.hero.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" data-testid="hero-cta-primary">
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded glow-orange-sm hover:bg-primary/90 transition-all cursor-pointer">
                {t.hero.cta1} <ArrowRight size={16} />
              </motion.span>
            </Link>
            <Link href="/portfolio" data-testid="hero-cta-secondary">
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 px-6 py-3.5 border border-border/60 text-foreground text-sm font-medium rounded-lg hover:bg-card transition-all cursor-pointer">
                {t.hero.cta2} <ChevronRight size={16} className="text-muted-foreground" />
              </motion.span>
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="mt-6 font-mono text-xs text-muted-foreground/60 tracking-widest" data-testid="hero-available">
            {t.hero.available}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-border/30 bg-background/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }} className="flex flex-col" data-testid={`stat-${i}`}>
                <span className="font-mono text-2xl font-bold text-foreground tracking-tight">{s.value}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 border-t border-border/40" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.services.label}</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t.services.title}</h2>
            </div>
            <Link href="/services" className="hidden md:block">
              <motion.span whileHover={{ x: 4 }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                All services &amp; pricing <ArrowRight size={13} />
              </motion.span>
            </Link>
          </FadeUp>
          <div className="divide-y divide-border/40">
            {t.services.items.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Link href="/services">
                  <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.18 }} className="group flex items-center justify-between gap-6 py-6 cursor-pointer" data-testid={`service-row-${i}`}>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-xs text-muted-foreground/30 w-6 shrink-0 select-none">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{svc.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{svc.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      <span className="font-mono text-xs text-muted-foreground/60 hidden sm:block">{svc.timeline}</span>
                      <ChevronRight size={15} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="py-28 border-t border-border/40" data-testid="section-work">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.work.label}</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t.work.title}</h2>
          </FadeUp>
          <div className="mt-16 flex flex-col gap-4">
            {t.work.projects.map((project, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }} className="group border border-card-border bg-card rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all duration-300 cursor-pointer" data-testid={`project-card-${i}`}>
                  <div className="flex items-start gap-6">
                    <div className="font-mono text-4xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors leading-none select-none w-16">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${project.status === "Live" ? "border-primary/30 text-primary bg-primary/10" : project.status.includes("Development") ? "border-accent/30 text-accent bg-accent/10" : "border-muted-foreground/30 text-muted-foreground"}`}>{project.status}</span>
                        <span className="font-mono text-xs text-muted-foreground/60">{project.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{project.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((s, j) => (
                          <span key={j} className="font-mono text-xs text-muted-foreground border border-border/50 rounded px-2 py-0.5">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 hidden md:block" />
                </motion.div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-8 text-center">
            <Link href="/portfolio" data-testid="work-view-all">
              <motion.span whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/60 rounded-lg px-5 py-3">
                View all projects <ArrowRight size={14} />
              </motion.span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={timelineRef} className="timeline-sticky-section relative border-t border-border/40 bg-card/10 md:h-[300vh]" data-testid="section-process">
        <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center py-16 md:py-0 md:overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div>
              <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.process.label}</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t.process.title}</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.process.steps.map((step, i) => {
                const isActive = activeStep === i;
                const isCompleted = activeStep > i;
                const progress = isActive ? stepProgress : isCompleted ? 1 : 0;
                const stepState = isActive ? "timeline-step--active" : isCompleted ? "timeline-step--completed" : "timeline-step--pending";
                return (
                  <div key={i} className={`timeline-step glass-card rounded-xl p-6 flex flex-col gap-4 relative ${stepState}`} data-testid={`process-step-${i}`}>
                    <span className={`timeline-step-number font-mono text-3xl font-black transition-colors duration-300 ${isActive ? "" : "text-muted-foreground/30"}`}>{step.n}</span>
                    <h3 className={`timeline-step-title font-semibold transition-colors duration-300 ${isActive ? "" : "text-muted-foreground"}`}>{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{step.desc}</p>
                    <div className="timeline-progress"><div className="timeline-progress__fill" style={{ width: `${progress * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK TICKER */}
      <section className="py-16 border-t border-border/40 overflow-hidden" data-testid="section-stack">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-10 w-max">
            {[...STACK_ICONS, ...STACK_ICONS].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 opacity-40 hover:opacity-80 transition-opacity">
                <item.Icon size={20} style={{ color: item.color }} />
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LATEST WRITING */}
      <section className="py-28 border-t border-border/40 bg-background/5" data-testid="section-blog-carousel">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-primary tracking-widest uppercase">Writing</span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">Latest Notes.</h2>
            </div>
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
                View all writing <ArrowRight size={13} />
              </span>
            </Link>
          </div>
          <div className="relative glass-card rounded-xl p-8 md:p-10 min-h-[300px] overflow-hidden flex flex-col justify-center">
            <div className="absolute right-6 top-6 flex gap-2 z-20">
              <button onClick={prevBlog} className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer bg-card/60 backdrop-blur-sm" aria-label="Previous Post"><ChevronLeft size={18} /></button>
              <button onClick={nextBlog} className="w-10 h-10 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer bg-card/60 backdrop-blur-sm" aria-label="Next Post"><ChevronRight size={18} /></button>
            </div>
            <AnimatePresence mode="wait">
              {blogPosts && blogPosts.length > 0 && (
                <motion.div key={blogIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="w-full pr-16">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-primary/10">{blogPosts[blogIndex].category}</span>
                    <span className="font-mono text-xs text-muted-foreground/60">{blogPosts[blogIndex].date}</span>
                    <span className="font-mono text-xs text-muted-foreground/60">· {blogPosts[blogIndex].read} min read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">{blogPosts[blogIndex].title}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{blogPosts[blogIndex].excerpt}</p>
                  <div className="mt-8">
                    <Link href={`/blog/${blogPosts[blogIndex].slug}`}>
                      <motion.span whileHover={{ x: 4 }} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary cursor-pointer">
                        Read article <ArrowRight size={12} />
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-border/40 bg-card/20" data-testid="section-funnel">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="glass-card rounded-2xl p-12 md:p-16 border-glow">
              <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.funnel.label}</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t.funnel.title}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-xl mx-auto">{t.funnel.sub}</p>
              <div className="mt-10 flex justify-center">
                <Link href="/contact" data-testid="hero-cta-funnel-btn">
                  <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg text-sm tracking-wide hover:bg-primary/90 transition-all glow-orange-sm cursor-pointer shadow-lg">
                    {t.hero.cta1} <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
