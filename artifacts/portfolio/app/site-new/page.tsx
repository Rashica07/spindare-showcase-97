'use client';

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const TRUST_ROW = [
  "Fixed price, before you pay",
  "One person, one point of contact",
  "Delivery date in writing",
];

export default function SiteNewPage() {
  const { t } = useLanguage();
  const projects = t.work.projects.slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Minimal nav — this variant doesn't use the site's default Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-tight text-lg">
            KIQA<span className="text-primary">.</span>DEV
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors">Work</a>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors">
            Start a project
          </Link>
        </div>
      </header>

      {/* HERO — centered, oversized headline, trust row, no fabricated stats */}
      <section className="relative pt-24 pb-20 px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,hsl(var(--primary)/0.14),transparent)]" />
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground border border-border/60 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available from August 2026
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="mt-8 text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Your app, from brief to <span className="text-primary">live in weeks.</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I'm Kristian — a freelance developer who scopes, prices, and delivers your
            mobile app, landing page, or web platform end to end, with nothing left
            to chase after the kickoff call.
          </p>
        </FadeUp>
        <FadeUp delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST_ROW.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={15} className="text-primary shrink-0" /> {item}
              </span>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.32}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-lg px-6 py-3.5 text-sm hover:bg-primary/90 transition-colors">
              Tell me about your project <ArrowRight size={16} />
            </Link>
            <a href="#work" className="inline-flex items-center gap-2 border border-border/60 rounded-lg px-6 py-3.5 text-sm font-semibold hover:border-border hover:bg-card/60 transition-colors">
              See the work
            </a>
          </div>
        </FadeUp>
      </section>

      {/* BEFORE / AFTER — the comparison card, in KIQA's own terms */}
      <section className="px-6 pb-24">
        <FadeUp>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border/60 bg-card/40 p-7">
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">Before</span>
              <h3 className="mt-3 text-lg font-semibold text-muted-foreground">Chasing three freelancers, one Slack channel each</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>— "It'll be a couple more days" for the third week running</li>
                <li>— No one owns the whole picture</li>
                <li>— The price moves once the scope does</li>
              </ul>
            </div>
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/60 via-primary/20 to-transparent">
              <div className="absolute -inset-6 -z-10 bg-primary/10 blur-2xl rounded-full" />
              <div className="rounded-2xl bg-card h-full p-7">
                <span className="font-mono text-xs tracking-widest uppercase text-primary">After</span>
                <h3 className="mt-3 text-lg font-semibold">One proposal, one price, one delivery date</h3>
                <ul className="mt-5 space-y-3 text-sm text-foreground/90">
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary mt-0.5 shrink-0" /> Written scope and price before you commit</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary mt-0.5 shrink-0" /> Direct contact with the person building it</li>
                  <li className="flex items-start gap-2"><Check size={15} className="text-primary mt-0.5 shrink-0" /> 30 days of support built into every project</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* WORK — real projects, tighter rhythm than the main portfolio grid */}
      <section id="work" className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Selected work</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">A few things I've shipped</h2>
          </FadeUp>
          <div className="divide-y divide-border/40 border-y border-border/40">
            {projects.map((project, i) => (
              <FadeUp key={project.name} delay={i * 0.06}>
                <Link href="/portfolio" className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-6 hover:bg-card/30 transition-colors -mx-4 px-4 rounded-lg">
                  <span className="font-mono text-xs text-muted-foreground w-12 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold text-lg group-hover:text-primary transition-colors flex-1">{project.name}</span>
                  <span className="text-sm text-muted-foreground max-w-md line-clamp-1">{project.desc}</span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2} className="mt-8 text-center">
            <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              View the full portfolio <ExternalLink size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-border/40 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>&copy; 2026 KIQA DEV. A design preview at new.kiqa-dev.it — <Link href="/" className="text-primary hover:underline">the live site is here</Link>.</span>
          <Link href="/contact" className="hover:text-foreground transition-colors">contact@kiqa-dev.it</Link>
        </div>
      </footer>
    </div>
  );
}
