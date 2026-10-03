'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import {
  SiReact, SiSwift, SiApple, SiXcode, SiAppstore, SiAndroid,
  SiTypescript, SiJavascript, SiTailwindcss,
  SiSupabase, SiNextdotjs, SiNodedotjs, SiPostgresql,
  SiExpo, SiGit, SiVercel, SiCloudflare, SiFigma, SiGithub,
  SiTauri, SiElectron, SiRust, SiLua, SiCss, SiCplusplus
} from "react-icons/si";
import { Gamepad2, Settings2 } from "lucide-react";
import type { IconType } from "react-icons";
import { usePageOverride, pick, pickList, type BlockOverrides } from "@/components/PulseSyncProvider";
import { FadeUp } from "@/components/FadeUp";


const SKILL_ICONS: Record<string, IconType | any> = {
  "Swift": SiSwift, "SwiftUI": SiApple, "iOS": SiApple, "Xcode": SiXcode, "App Store Deployment": SiAppstore,
  "React Native": SiReact, "EAS Build": SiExpo, "iOS / Android": SiAndroid,
  "TypeScript": SiTypescript, "JavaScript": SiJavascript, "React": SiReact, "Tailwind CSS": SiTailwindcss,
  "Supabase": SiSupabase, "Next.js": SiNextdotjs, "Node.js": SiNodedotjs, "PostgreSQL": SiPostgresql, "Expo": SiExpo,
  "Git": SiGit, "Vercel": SiVercel, "Cloudflare": SiCloudflare, "Figma": SiFigma,
  "Tauri": SiTauri, "Electron": SiElectron, "Rust": SiRust, "Neon Database": SiPostgresql, "FiveM": Gamepad2, "Lua": SiLua, "CFG": Settings2,
  "CSS": SiCss, "C++": SiCplusplus
};

export default function AboutPage() {
  const { t } = useLanguage();
  const overrides = usePageOverride('about') as BlockOverrides;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="page-hero-glow pt-32 pb-20 border-b border-border/40" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hero-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{pick(overrides, 'title', t.about.title)}</h1>
            <p className="mt-3 text-muted-foreground text-lg">{pick(overrides, 'sub', t.about.sub)}</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-border/40" data-testid="about-bio">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeUp>
            <div className="flex flex-col gap-5">
              {pickList(overrides, 'bio', t.about.bio).map((para: any, i: number) => (<p key={i} className="text-muted-foreground leading-relaxed">{para}</p>))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: pick(overrides, 'metaLocation', t.about.metaLocation), value: pick(overrides, 'metaLocationValue', t.about.metaLocationValue) },
                { label: pick(overrides, 'metaFocus', t.about.metaFocus), value: pick(overrides, 'metaFocusValue', t.about.metaFocusValue) },
                { label: pick(overrides, 'metaAvailable', t.about.metaAvailable), value: pick(overrides, 'metaAvailableValue', t.about.metaAvailableValue) },
                { label: pick(overrides, 'metaResponse', t.about.metaResponse), value: pick(overrides, 'metaResponseValue', t.about.metaResponseValue) },
              ].map(({ label, value }, i) => (
                <div key={i} className="rounded-lg border border-card-border bg-card/60 p-4" data-testid={`about-meta-${i}`}>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">{label}</p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
      <section className="py-20 border-b border-border/40 bg-card/20" data-testid="about-skills">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight">{pick(overrides, 'stackTitle', t.about.stackTitle)}</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.skills.map((cat, i) => (
              <FadeUp key={i} delay={i * 0.08} className="h-full">
                <div className="h-full border border-card-border bg-card/60 rounded-xl p-6" data-testid={`skill-category-${i}`}>
                  <h3 className="text-sm font-semibold text-foreground mb-4">{cat.name}</h3>
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
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-border/40" data-testid="about-experience">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-bold tracking-tight">{pick(overrides, 'experienceTitle', t.about.experienceTitle)}</h2>
          </FadeUp>
          <div className="mt-12 relative">
            <div className="absolute left-0 md:left-32 top-0 bottom-0 w-px bg-border/40" />
            <div className="flex flex-col gap-8">
              {t.about.experience.map((exp, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="flex gap-8 md:gap-0 relative" data-testid={`exp-item-${i}`}>
                    <div className="hidden md:block w-32 pt-1 shrink-0"><span className="font-mono text-xs text-muted-foreground">{exp.year}</span></div>
                    <div className="relative">
                      <div className="absolute -left-1 md:-left-[41px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground/70 ring-4 ring-background" />
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
            <h2 className="text-3xl font-bold tracking-tight">{pick(overrides, 'approachTitle', t.about.approachTitle)}</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.about.values.map((v, i) => (
              <FadeUp key={i} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-xl border border-card-border bg-card/60 p-6" data-testid={`value-item-${i}`}>
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" data-testid="about-cta">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeUp>
            <h2 className="text-3xl font-bold text-foreground">{pick(overrides, 'ctaTitle', t.about.ctaTitle)}</h2>
            <p className="mt-2 text-muted-foreground">{pick(overrides, 'ctaSub', t.about.ctaSub)}</p>
          </FadeUp>
          <FadeUp delay={0.1} className="flex gap-4 shrink-0">
            <Link href="/contact" data-testid="about-cta-contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-colors">
              {pick(overrides, 'ctaButton', t.about.ctaButton)} <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" data-testid="about-cta-github" className="inline-flex items-center gap-2 px-5 py-3.5 border border-border text-foreground hover:bg-card rounded-lg text-sm transition-colors">
              <SiGithub size={16} /> GitHub
            </a>
          </FadeUp>
        </div>
      </section>
      <Footer />
    </div>
  );
}
