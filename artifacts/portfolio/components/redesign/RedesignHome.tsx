'use client';

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiReact, SiSwift, SiTypescript, SiSupabase, SiNextdotjs, SiNodedotjs, SiPostgresql, SiExpo } from "react-icons/si";
import { useLanguage } from "@/lib/i18n";
import { DelayedHeroCanvas } from "@/components/DelayedHeroCanvas";
import type { HeroTint } from "@/components/HeroCanvas";
import { Footer } from "@/components/Footer";
import { useIsActive, useSkipDecorativeMotion } from "@/lib/device";
import { FadeUp } from "@/components/FadeUp";

/**
 * Preview of the design-feedback pass, rendered at /redesign/<scope>/<accent>.
 *
 * scope 1  Restraint pass: real-weight numbers, two font families, accent colour
 *          only on actions, no repeated orange labels. Every section stays.
 * scope 2  Full less-is-more: scope 1, plus Hero > Work > Services > Contact,
 *          a two-line hero, no ticker / process / blog, no loader.
 * scope 3  Bugs only: the original look; only the faux-bold numbers are fixed.
 *
 * accent 1/2/3 are palettes (see app/redesign/redesign.css). The real Home
 * page (app/page.tsx) is untouched.
 */

export type Scope = 1 | 2 | 3;
export type Accent = 1 | 2 | 3;

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

const PROJECT_URLS: Record<string, string> = {
  "Torre Group": "https://torre-ks.com",
  "LuxHotelSystem": "https://luxhotelsystem.com",
};

// Contour-field colours per palette (accent 1 = the canvas defaults).
const HERO_TINT: Record<Accent, HeroTint | undefined> = {
  1: undefined,
  2: { near: "#d9906a", far: "#5a3320", fog: "#0f0c0a" },
  3: { near: "#9bc7ae", far: "#1f3d2e", fog: "#090c0e" },
};

const ACCENT_NAME: Record<Accent, string> = { 1: "Ember", 2: "Copper", 3: "Ink & Sage" };
const SCOPE_NAME: Record<Scope, string> = { 1: "Restraint pass", 2: "Full less-is-more", 3: "Bugs only" };

function statusDot(status: string) {
  if (status === "Live") return "bg-emerald-500";
  if (status.includes("Development")) return "bg-amber-400/80";
  return "bg-muted-foreground";
}

export function RedesignHome({ scope, accent }: { scope: Scope; accent: Accent }) {
  const { t } = useLanguage();
  const tickerRef = useRef<HTMLElement>(null);
  const tickerActive = useIsActive(tickerRef);
  const skipMotion = useSkipDecorativeMotion();
  const tickerRunning = tickerActive && !skipMotion;

  const calm = scope !== 3; // scopes 1 and 2: accent colour only on actions
  const lean = scope === 2; // scope 2: fewer sections, shorter copy

  const primaryBtn = `inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors ${calm ? "" : "glow-orange-sm"}`;
  const secondaryBtn = "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-card transition-colors";

  // The orange all-caps label above headings: kept in scope 3, dropped otherwise.
  const Eyebrow = ({ children }: { children: React.ReactNode }) =>
    calm ? null : <span className="block font-mono text-xs text-primary tracking-widest uppercase mb-3">{children}</span>;

  const hoverText = calm ? "group-hover:text-foreground" : "group-hover:text-primary";
  const cardHover = calm ? "hover:border-foreground/25" : "hover:border-primary/30";
  const arrowHover = calm ? "group-hover:text-foreground" : "group-hover:text-primary";
  const sectionPad = lean ? "py-20" : "py-24";

  const hero = (
    <section className={`relative ${lean ? "min-h-[75vh]" : "min-h-[85vh] sm:min-h-screen"} flex items-center overflow-hidden`} data-testid="section-hero">
      {!lean && !skipMotion && <DelayedHeroCanvas tint={HERO_TINT[accent]} />}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent pointer-events-none z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-12 sm:pt-32 sm:pb-16 w-full">
        {!lean && (
          <div className="hero-in">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-medium text-muted-foreground tracking-wider sm:tracking-widest uppercase border border-border/60 rounded-lg px-3 sm:px-4 py-1.5 mb-5 sm:mb-10" data-testid="hero-badge">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {t.hero.badge}
            </span>
          </div>
        )}
        {lean ? (
          <>
            <h1 className="hero-in text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl" data-testid="hero-headline">
              {t.hero.h1Line1} {t.hero.h1Line2}
            </h1>
            <p className="hero-in mt-5 sm:mt-6 text-xl sm:text-2xl text-muted-foreground max-w-2xl" style={{ animationDelay: "80ms" }} data-testid="hero-sub">
              {t.hero.h1Line3} {t.hero.h1Line4}
            </p>
          </>
        ) : (
          <>
            <h1 className="hero-in text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] sm:leading-[1.02] tracking-tight max-w-5xl" style={{ animationDelay: "50ms" }} data-testid="hero-headline">
              <span className="text-foreground">{t.hero.h1Line1} </span>
              <span className={calm ? "text-foreground" : "text-gradient"}>{t.hero.h1Line2}</span>
              <br />
              <span className="text-foreground">{t.hero.h1Line3} </span>
              <span className="text-foreground">{t.hero.h1Line4}</span>
            </h1>
            <p className="hero-in mt-5 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed" style={{ animationDelay: "120ms" }} data-testid="hero-sub">
              {t.hero.sub}
            </p>
          </>
        )}
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
  );

  const services = (
    <section className={`${sectionPad} border-t border-border/40`} data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="flex items-end justify-between gap-4 mb-10">
          <div>
            <Eyebrow>{t.services.label}</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.services.title}</h2>
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
                    {!lean && <span className="text-xs tabular-nums text-muted-foreground/70 w-6 shrink-0 select-none">{String(i + 1).padStart(2, "0")}</span>}
                    <div>
                      <h3 className={`font-semibold text-foreground ${hoverText} transition-colors`}>{svc.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{svc.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 shrink-0">
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">{svc.timeline}</span>
                    <ChevronRight size={15} className={`text-muted-foreground/60 ${arrowHover} transition-colors`} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );

  const work = (
    <section className={`${lean ? "py-20" : "py-28"} border-t border-border/40`} data-testid="section-work">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <Eyebrow>{t.work.label}</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.work.title}</h2>
        </FadeUp>
        <div className={`${lean ? "mt-10" : "mt-16"} flex flex-col gap-4`}>
          {t.work.projects.slice(0, 4).map((project, i) => {
            const url = PROJECT_URLS[project.name];
            const body = (
              <div className={`border border-card-border bg-card rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200 ${url ? `group ${cardHover}` : ""}`} data-testid={`project-card-${i}`}>
                <div className="flex items-start gap-6">
                  {/* DM Sans with real weights (the original used DM Mono at 900, which doesn't exist, so it was faked). */}
                  {!lean && <div className="text-4xl font-semibold tabular-nums text-muted-foreground/25 leading-none select-none w-16">{String(i + 1).padStart(2, "0")}</div>}
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                      {calm ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(project.status)}`} />
                          {project.status}
                        </span>
                      ) : (
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-full border ${project.status === "Live" ? "border-primary/30 text-primary bg-primary/10" : project.status.includes("Development") ? "border-accent/30 text-accent bg-accent/10" : "border-muted-foreground/30 text-muted-foreground"}`}>{project.status}</span>
                      )}
                      <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <p className={`text-sm text-muted-foreground leading-relaxed max-w-xl ${lean ? "line-clamp-2" : ""}`}>{project.desc}</p>
                    {!lean && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((s, j) => (
                          <span key={j} className="font-mono text-xs text-muted-foreground border border-border/50 rounded px-2 py-0.5">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {url && <ChevronRight size={20} className={`text-muted-foreground/40 ${arrowHover} transition-colors shrink-0 hidden md:block`} />}
              </div>
            );
            return (
              <FadeUp key={i} delay={i * 0.04}>
                {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="block">{body}</a> : body}
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
  );

  const process = (
    <section className="py-24 border-t border-border/40 bg-card/10" data-testid="section-process">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <Eyebrow>{t.process.label}</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.process.title}</h2>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className={`${calm ? "rounded-xl border border-card-border bg-card/60" : "glass-card rounded-xl"} p-6 flex flex-col gap-4 h-full`} data-testid={`process-step-${i}`}>
                <span className={`text-3xl font-semibold tabular-nums ${calm ? "text-muted-foreground/60" : "text-primary/70"}`}>{step.n}</span>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );

  const ticker = (
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
  );

  const blog = (
    <section className="py-28 border-t border-border/40" data-testid="section-blog-carousel">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Eyebrow>{t.blog.label}</Eyebrow>
            <h2 className="text-4xl font-bold tracking-tight">{t.blog.latestNotes}</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
            {t.blog.viewAllWriting} <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="divide-y divide-border/40 border-y border-border/40">
          {t.blog.posts.slice(0, 3).map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block py-7" data-testid={`home-blog-${i}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                  <span className={`font-mono text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${calm ? "border-border text-muted-foreground" : "border-primary/30 text-primary bg-primary/10"}`}>{post.category}</span>
                  <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{post.date}</span>
                  <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">· {post.read} {t.blog.minRead}</span>
                </div>
                <h3 className={`text-lg md:text-xl font-semibold text-foreground leading-snug ${hoverText} transition-colors`}>{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">{post.excerpt}</p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );

  const cta = (
    <section className={`${lean ? "py-20" : "py-28"} border-t border-border/40 bg-card/20`} data-testid="section-funnel">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeUp>
          <div className={`${calm ? "rounded-2xl border border-border bg-card/40" : "glass-card rounded-2xl border-glow"} px-6 py-12 sm:p-12 md:p-16`}>
            <Eyebrow>{t.funnel.label}</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.funnel.title}</h2>
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
  );

  return (
    <div className={`rd-root rd-a${accent}`}>
      <main className="min-h-screen bg-background text-foreground">
        {hero}
        {lean ? (
          <>
            {work}
            {services}
            {cta}
          </>
        ) : (
          <>
            {services}
            {work}
            {process}
            {ticker}
            {blog}
            {cta}
          </>
        )}
        <Footer />
      </main>

      <Link
        href="/redesign"
        className="fixed bottom-4 left-4 z-40 rounded-full border border-border bg-card/95 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        ← {SCOPE_NAME[scope]} · {ACCENT_NAME[accent]}
      </Link>
    </div>
  );
}
