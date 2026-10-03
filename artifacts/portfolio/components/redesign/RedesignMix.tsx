'use client';

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { FadeUp } from "@/components/FadeUp";
import { CraftPanelWindow } from "@/components/redesign/CraftPanelWindow";

/**
 * /redesign/mix: copper accent on the ink background, scope 2 (lean) plus a
 * little more to fill the page: a CraftPanel hero visual (tilted, sliding in
 * from the right, with its caption beside it), a three-up Work grid and a
 * compact process strip. No ticker, blog list, loader or eyebrow labels.
 */

const CRAFTPANEL_URL = "https://rashica07.github.io/craftpanel-site/";

const PROJECT_URLS: Record<string, string> = {
  "Torre Group": "https://torre-ks.com",
  "LuxHotelSystem": "https://luxhotelsystem.com",
};

// "I'm Kristian, a freelance developer working between Kosovo and Italy. I build..." -> first sentence.
function firstSentence(s: string) {
  const i = s.indexOf(". ");
  return i > 0 ? s.slice(0, i + 1) : s;
}

function statusDot(status: string) {
  if (status === "Live") return "bg-emerald-500";
  if (status.includes("Development")) return "bg-amber-400/80";
  return "bg-muted-foreground";
}

export function RedesignMix() {
  const { t } = useLanguage();
  const craftpanel = t.work.projects.find((p) => p.name === "CraftPanel");
  const others = t.work.projects.filter((p) => p.name !== "CraftPanel").slice(0, 3);

  const primaryBtn = "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors";
  const secondaryBtn = "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-card transition-colors";

  return (
    <div className="rd-root rd-mix">
      <main className="min-h-screen bg-background text-foreground">
        {/* HERO: text left, CraftPanel right */}
        <section className="relative overflow-hidden" data-testid="section-hero">
          <div
            className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.16), transparent 65%)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-28 sm:pt-32 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pb-28 lg:pt-36">
            <div>
              <p className="hero-in flex items-center gap-2.5 font-mono text-xs tracking-wider text-muted-foreground" data-testid="hero-available">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                {t.hero.available}
              </p>
              <h1 className="hero-in mt-6 max-w-2xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl" style={{ animationDelay: "60ms" }} data-testid="hero-headline">
                {t.hero.h1Line1} {t.hero.h1Line2}
              </h1>
              <p className="hero-in mt-5 text-xl text-muted-foreground sm:text-2xl" style={{ animationDelay: "120ms" }}>
                {t.hero.h1Line3} {t.hero.h1Line4}
              </p>
              <p className="hero-in mt-6 max-w-md leading-relaxed text-muted-foreground" style={{ animationDelay: "180ms" }} data-testid="hero-sub">
                {firstSentence(t.hero.sub)}
              </p>
              <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4" style={{ animationDelay: "240ms" }}>
                <Link href="/contact" data-testid="hero-cta-primary" className={primaryBtn}>
                  {t.hero.cta1} <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/portfolio" data-testid="hero-cta-secondary" className={secondaryBtn}>
                  {t.hero.cta2} <ChevronRight size={16} className="text-muted-foreground" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* The window bleeds off the right edge on wide screens. */}
            <div className="rd-slide-in lg:-mr-16 xl:-mr-28">
              <div className="rd-tilt">
                <CraftPanelWindow />
              </div>
              {craftpanel && (
                <div className="mt-10 max-w-md lg:ml-auto lg:mr-16 xl:mr-28" data-testid="craftpanel-caption">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="text-lg font-semibold">{craftpanel.name}</h2>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot(craftpanel.status)}`} />
                      {craftpanel.status}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{craftpanel.year}</span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{craftpanel.desc}</p>
                  <a
                    href={CRAFTPANEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    rashica07.github.io/craftpanel-site <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* MORE WORK */}
        <section className="border-t border-border/40 py-20" data-testid="section-work">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.work.title}</h2>
              <Link href="/portfolio" data-testid="work-view-all" className="inline-flex items-center gap-1.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t.page.viewAllProjects} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </FadeUp>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {others.map((project, i) => {
                const url = PROJECT_URLS[project.name];
                const card = (
                  <div className={`h-full rounded-xl border border-card-border bg-card p-6 transition-colors duration-200 ${url ? "hover:border-foreground/25" : ""}`} data-testid={`project-card-${i}`}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot(project.status)}`} />
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                    <p className="mt-4 font-mono text-xs text-muted-foreground">{project.stack.slice(0, 3).join(" · ")}</p>
                  </div>
                );
                return (
                  <FadeUp key={project.name} delay={i * 0.05} className="h-full">
                    {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a> : card}
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="border-t border-border/40 py-20" data-testid="section-services">
          <div className="mx-auto max-w-7xl px-6">
            <FadeUp className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.services.title}</h2>
              <Link href="/services" className="hidden py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center md:gap-1.5">
                {t.page.allServices} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </FadeUp>
            <div className="divide-y divide-border/40">
              {t.services.items.map((svc, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <Link href="/services">
                    <div className="group flex items-center justify-between gap-6 py-6 transition-transform duration-200 hover:translate-x-1.5" data-testid={`service-row-${i}`}>
                      <div>
                        <h3 className="font-semibold text-foreground">{svc.name}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">{svc.tagline}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-5">
                        <span className="hidden font-mono text-xs text-muted-foreground sm:block">{svc.timeline}</span>
                        <ChevronRight size={15} className="text-muted-foreground/60 transition-colors group-hover:text-foreground" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS: one compact strip */}
        <section className="border-t border-border/40 py-16" data-testid="section-process">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <div data-testid={`process-step-${i}`}>
                  <span className="text-sm font-semibold tabular-nums text-primary">{step.n}</span>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/40 bg-card/20 py-20" data-testid="section-funnel">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <FadeUp>
              <div className="rounded-2xl border border-border bg-card/40 px-6 py-12 sm:p-12 md:p-16">
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{t.funnel.title}</h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.funnel.sub}</p>
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

      <Link
        href="/redesign"
        className="fixed bottom-4 left-4 z-40 rounded-full border border-border bg-card/95 px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Copper &amp; Ink mix
      </Link>
    </div>
  );
}
