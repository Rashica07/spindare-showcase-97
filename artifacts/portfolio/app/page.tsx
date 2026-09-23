'use client';

import { useRef } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiReact, SiSwift, SiTypescript, SiSupabase, SiNextdotjs, SiNodedotjs, SiPostgresql, SiExpo } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";
import { DelayedHeroCanvas } from "@/components/DelayedHeroCanvas";
import { Footer } from "@/components/Footer";
import { useIsActive, useSkipDecorativeMotion } from "@/lib/device";
import { FadeUp } from "@/components/FadeUp";
import craftpanelIcon from "@/public/craftpanel-icon.webp";
import torreShot from "@/public/torre-group-1.webp";
import spindareShot from "@/public/spindare-feed.webp";
import luxhotelShot from "@/public/luxhotel-1.webp";


const STACK_ICONS = [
  { Icon: SiSwift, label: "Swift", color: "#F05138" },
  { Icon: SiReact, label: "React Native", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { Icon: SiSupabase, label: "Supabase", color: "#3ECF8E" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#68A063" },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "#336791" },
  { Icon: SiExpo, label: "Expo", color: "#ffffff" },
];

// Live URLs keyed by project name. A project with a URL here renders as a link;
// one without renders as a plain card with no clickable affordance.
const PROJECT_URLS: Record<string, string> = {
  "Torre Group": "https://torre-ks.com",
  "LuxHotelSystem": "https://luxhotelsystem.com",
};

// Screenshot shown on each Home project card ("icon" = small logo tile).
const PROJECT_THUMBS: Record<string, { src: StaticImageData; kind: "shot" | "phone" | "icon" }> = {
  "CraftPanel": { src: craftpanelIcon, kind: "icon" },
  "Torre Group": { src: torreShot, kind: "shot" },
  "Spindare": { src: spindareShot, kind: "phone" },
  "LuxHotelSystem": { src: luxhotelShot, kind: "shot" },
};

const primaryBtn = "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg glow-orange-sm hover:bg-primary/90 transition-colors";
const secondaryBtn = "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 border border-border/60 text-foreground text-sm font-medium rounded-lg hover:bg-card transition-colors";

export default function HomePage() {
  const { t } = useLanguage();
  const tickerRef = useRef<HTMLElement>(null);
  const tickerActive = useIsActive(tickerRef);
  const skipMotion = useSkipDecorativeMotion();
  const tickerRunning = tickerActive && !skipMotion;
  const blogPosts = t.blog.posts;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden" data-testid="section-hero">
        {!skipMotion && <DelayedHeroCanvas />}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none z-10" />
        {/* Keeps the contour field from running through the headline column. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent pointer-events-none z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-12 sm:pt-32 sm:pb-16 w-full">
          <div className="hero-in">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium text-muted-foreground tracking-wider sm:tracking-widest uppercase border border-border/60 rounded-lg px-3 sm:px-4 py-1.5 mb-5 sm:mb-10" data-testid="hero-badge">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {t.hero.badge}
            </span>
          </div>
          <h1 className="hero-in text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] sm:leading-[1.02] tracking-tight max-w-5xl" style={{ animationDelay: "50ms" }} data-testid="hero-headline">
            <span className="text-foreground">{t.hero.h1Line1} </span>
            <span className="text-gradient">{t.hero.h1Line2}</span>
            <br />
            <span className="text-foreground">{t.hero.h1Line3} </span>
            <span className="text-foreground">{t.hero.h1Line4}</span>
          </h1>
          <p className="hero-in mt-5 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed" style={{ animationDelay: "120ms" }} data-testid="hero-sub">
            {t.hero.sub}
          </p>
          <div className="hero-in mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4" style={{ animationDelay: "180ms" }}>
            <Link href="/contact" data-testid="hero-cta-primary" className={primaryBtn}>
              {t.hero.cta1} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/portfolio" data-testid="hero-cta-secondary" className={secondaryBtn}>
              {t.hero.cta2} <ChevronRight size={16} className="text-muted-foreground" aria-hidden="true" />
            </Link>
          </div>
          <p className="hero-in mt-6 font-mono text-xs text-muted-foreground tracking-widest" style={{ animationDelay: "240ms" }} data-testid="hero-available">
            {t.hero.available}
          </p>
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
              <span className="inline-flex items-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.page.allServices} <ArrowRight size={13} aria-hidden="true" />
              </span>
            </Link>
          </FadeUp>
          <div className="divide-y divide-border/40">
            {t.services.items.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Link href="/services">
                  <div className="group flex items-center justify-between gap-6 py-6 transition-transform duration-200 hover:translate-x-1.5" data-testid={`service-row-${i}`}>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-xs text-muted-foreground/70 w-6 shrink-0 select-none">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{svc.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{svc.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      <span className="font-mono text-xs text-muted-foreground hidden sm:block">{svc.timeline}</span>
                      <ChevronRight size={15} className="text-muted-foreground/60 group-hover:text-primary transition-colors" aria-hidden="true" />
                    </div>
                  </div>
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
            {t.work.projects.slice(0, 4).map((project, i) => {
              const url = PROJECT_URLS[project.name];
              const thumb = PROJECT_THUMBS[project.name];
              const body = (
                <div className={`border border-card-border bg-card rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_300px] transition-colors duration-200 ${url ? "group hover:border-primary/40" : ""}`} data-testid={`project-card-${i}`}>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                      <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                      <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${project.status === "Live" ? "border-primary/30 text-primary bg-primary/10" : project.status.includes("Development") ? "border-accent/30 text-accent bg-accent/10" : "border-muted-foreground/30 text-muted-foreground"}`}>{project.status}</span>
                      <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{project.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((s, j) => (
                        <span key={j} className="font-mono text-xs text-muted-foreground border border-border/50 rounded px-2 py-0.5">{s}</span>
                      ))}
                    </div>
                    {url && (
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {url.replace(/^https?:\/\//, "")} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  {thumb && (
                    <div className="relative order-first md:order-none h-44 md:h-auto min-h-[180px] border-b md:border-b-0 md:border-l border-card-border bg-background/60 overflow-hidden">
                      {thumb.kind === "icon" ? (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundImage: "linear-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.08) 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
                          <Image src={thumb.src} alt="" width={88} height={88} className="rounded-2xl shadow-lg" />
                        </div>
                      ) : thumb.kind === "phone" ? (
                        <div className="absolute inset-x-0 top-6 bottom-0 flex justify-center">
                          <div className="relative w-36 h-full rounded-t-2xl border border-b-0 border-border/60 overflow-hidden">
                            <Image src={thumb.src} alt={`${project.name} screenshot`} fill sizes="144px" className="object-cover object-top" />
                          </div>
                        </div>
                      ) : (
                        <Image src={thumb.src} alt={`${project.name} screenshot`} fill sizes="(max-width: 768px) 100vw, 300px" placeholder="blur" className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]" />
                      )}
                    </div>
                  )}
                </div>
              );
              return (
                <FadeUp key={i} delay={i * 0.04}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block">{body}</a>
                  ) : body}
                </FadeUp>
              );
            })}
          </div>
          <FadeUp className="mt-8 text-center">
            <Link href="/portfolio" data-testid="work-view-all">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors border border-border/60 rounded-lg px-5 py-3">
                {t.page.viewAllProjects} <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-24 border-t border-border/40 bg-card/10" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.process.label}</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t.process.title}</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <div className="glass-card rounded-xl p-6 flex flex-col gap-4 h-full" data-testid={`process-step-${i}`}>
                  <span className="font-mono text-3xl font-black text-primary/70">{step.n}</span>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* STACK TICKER */}
      <section ref={tickerRef} className="py-16 border-t border-border/40 overflow-hidden" data-testid="section-stack">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <motion.div animate={tickerRunning ? { x: ["0%", "-50%"] } : { x: "0%" }} transition={tickerRunning ? { duration: 50, repeat: Infinity, ease: "linear" } : { duration: 0 }} className="flex gap-10 w-max">
            {[...Array(4)].flatMap(() => STACK_ICONS).map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
                <item.Icon size={20} style={{ color: item.color }} aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BLOG CAROUSEL */}
      <section className="py-28 border-t border-border/40 bg-background/5" data-testid="section-blog-carousel">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.blog.label}</span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">{t.blog.latestNotes}</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t.blog.viewAllWriting} <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="divide-y divide-border/40 border-y border-border/40">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block py-7" data-testid={`home-blog-${i}`}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-primary/10 whitespace-nowrap">{post.category}</span>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{post.date}</span>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">· {post.read} {t.blog.minRead}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">{post.excerpt}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t border-border/40 bg-card/20" data-testid="section-funnel">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="glass-card rounded-2xl px-6 py-12 sm:p-12 md:p-16 border-glow">
              <span className="font-mono text-xs text-primary tracking-widest uppercase">{t.funnel.label}</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{t.funnel.title}</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-xl mx-auto">{t.funnel.sub}</p>
              <div className="mt-10 flex justify-center">
                <Link href="/contact" data-testid="hero-cta-funnel-btn" className={primaryBtn}>
                  {t.funnel.cta} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
