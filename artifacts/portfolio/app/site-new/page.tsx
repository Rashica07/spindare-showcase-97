'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import spindareFeedImg from "@/public/spindare-feed.webp";
import torreGroup1Img from "@/public/torre-group-1.webp";
import luxhotel1Img from "@/public/luxhotel-1.webp";
import craftpanelIconImg from "@/public/craftpanel-icon.webp";

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

const FACT_STRIP = [
  "4 languages spoken",
  "Fixed price, every project",
  "Reply within 24 hours",
  "Kosovo / Italy",
];

const CASE_STUDIES = [
  { key: "CraftPanel", img: craftpanelIconImg, imgFit: "contain" as const, imgBg: "bg-[#0a0908]", headline: "A desktop app that turns a terminal chore into one click" },
  { key: "Spindare", img: spindareFeedImg, imgFit: "cover" as const, imgBg: "bg-card", headline: "Co-building a social app's feed, auth, and rewards system from zero" },
  { key: "Torre Group", img: torreGroup1Img, imgFit: "cover" as const, imgBg: "bg-white", headline: "One redesign, four companies, a single unified presence" },
  { key: "LuxHotelSystem", img: luxhotel1Img, imgFit: "cover" as const, imgBg: "bg-[#0f172a]", headline: "A hotel platform interface built for a real external API" },
];

const FAQ = [
  { q: "How much does a mobile app cost, and how long does it take?", a: "From €799, delivered in 6 weeks. Design, build, and store submission handled end to end, with one fixed price and one point of contact for the whole six weeks." },
  { q: "How much does a landing page cost, and how long does it take?", a: "From €299, delivered in 7 days. A fast single page with your copy, your brand, and a working contact form, on your own domain." },
  { q: "How much does a web platform cost, and how long does it take?", a: "From €1,299, delivered in 3 weeks. User accounts, billing, an admin dashboard, and a database built to hold up under real traffic." },
  { q: "Does KIQA DEV offer fixed-price quotes?", a: "Yes. Every project is quoted upfront with a fixed price and a delivery date in writing, before any work begins. If scope changes mid-build, the cost is communicated before the work is done, not after." },
];

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 py-5">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-left gap-4">
        <span className="font-medium">{q}</span>
        <ChevronDown size={18} className={`text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SiteNewPage() {
  const { t } = useLanguage();
  const projects = t.work.projects;
  const services = t.services.items;
  const values = t.about.values;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Minimal nav — this variant doesn't use the site's default Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-tight text-lg">
            KIQA<span className="text-primary">.</span>DEV
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#work" className="hover:text-foreground transition-colors">Work</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors">
            Start a project
          </Link>
        </div>
      </header>

      {/* HERO — centered, oversized headline, trust row, no fabricated stats */}
      <section className="relative pt-24 pb-16 px-6 text-center">
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

      {/* FACT STRIP — real facts in place of a fabricated logo bar */}
      <FadeUp>
        <div className="border-y border-border/40 py-5 px-6">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs tracking-widest uppercase text-muted-foreground">
            {FACT_STRIP.map((f, i) => (
              <span key={f} className="inline-flex items-center gap-8">
                {f}
                {i < FACT_STRIP.length - 1 && <span className="text-border hidden sm:inline">/</span>}
              </span>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* BEFORE / AFTER */}
      <section className="px-6 py-24">
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

      {/* SERVICES — real pricing/timeline data */}
      <section id="services" className="px-6 pb-24 border-t border-border/40 pt-20">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10 text-center">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Services</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{t.services.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t.services.sub}</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border/60 bg-card/30 p-6 hover:border-primary/40 hover:bg-card/50 transition-colors">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <span className="font-mono text-xs text-primary shrink-0">{s.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.features.slice(0, 4).map((f) => (
                      <span key={f} className="font-mono text-[11px] text-muted-foreground border border-border/50 rounded px-2 py-0.5">{f}</span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* WORK — alternating big case-study rows, real screenshots */}
      <section id="work" className="px-6 pb-24 border-t border-border/40 pt-20">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-14">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Selected work</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">A few things I've shipped</h2>
          </FadeUp>
          <div className="space-y-16">
            {CASE_STUDIES.map((cs, i) => {
              const project = projects.find((p) => p.name === cs.key);
              if (!project) return null;
              return (
                <FadeUp key={cs.key} delay={i * 0.05}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${cs.imgBg} ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <Image src={cs.img} alt={project.name} className={`w-full h-full object-${cs.imgFit} ${cs.imgFit === "contain" ? "p-16" : ""}`} />
                    </div>
                    <div>
                      <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{project.type} &middot; {project.year}</span>
                      <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight leading-tight">{cs.headline}</h3>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                      <Link href="/portfolio" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                        Read case study <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
          <FadeUp delay={0.2} className="mt-14 text-center">
            <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              View the full portfolio <ExternalLink size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PROCESS — real values, numbered */}
      <section className="px-6 pb-24 border-t border-border/40 pt-20">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="mb-10 text-center">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">How I work</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Four things I don't compromise on</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.06} className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-primary/30 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 pb-24 border-t border-border/40 pt-20">
        <div className="max-w-2xl mx-auto">
          <FadeUp className="mb-6 text-center">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Common questions</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div>
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-24">
        <FadeUp>
          <div className="max-w-4xl mx-auto rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Have a project in mind?</h2>
            <p className="mt-3 text-muted-foreground">Tell me what you're building — I'll reply with a scoped proposal within 24 hours.</p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold rounded-lg px-6 py-3.5 text-sm hover:bg-primary/90 transition-colors">
              Start a project <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
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
