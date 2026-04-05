"use client";

import { useEffect, useState, type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Code2, Zap, Github, ExternalLink, Star,
  GitBranch, Layers, Cpu, Globe, MessageSquare, Terminal,
  Database, GitCommit, Clock, CheckCircle, AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import MagneticWrapper from "@/components/MagneticWrapper";
import GlossaryWord from "@/components/GlossaryWord";

/* ─── GitHub Pulse ─────────────────────────────────────────── */
function GitHubPulse() {
  const [state, setState] = useState<{ label: string; ok: boolean } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://api.github.com/users/rashica07/events/public?per_page=10",
          { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 0 } }
        );
        if (!res.ok) throw new Error();
        const events = await res.json();
        const push = events.find((e: { type: string }) => e.type === "PushEvent");
        if (!push) { setState({ label: "Active on GitHub", ok: true }); return; }
        const date = new Date(push.created_at);
        const hoursAgo = Math.floor((Date.now() - date.getTime()) / 3_600_000);
        const label =
          hoursAgo < 1 ? "Last ship: < 1 hour ago" :
          hoursAgo < 24 ? `Last ship: ${hoursAgo}h ago` :
          `Last ship: ${Math.floor(hoursAgo / 24)}d ago`;
        setState({ label, ok: true });
      } catch {
        setState({ label: "GitHub — rashica07", ok: false });
      }
    }
    load();
  }, []);

  if (!state) return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-border text-xs text-muted-foreground">
      <Clock className="w-3 h-3 animate-pulse" /> Checking GitHub…
    </span>
  );

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border text-xs font-medium ${
      state.ok ? "border-green-500/30 text-green-400" : "border-border text-muted-foreground"
    }`}>
      {state.ok
        ? <><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />{state.label}</>
        : <><AlertTriangle className="w-3 h-3" />{state.label}</>
      }
    </span>
  );
}

/* ─── Data ──────────────────────────────────────────────────── */
const skills = [
  {
    category: "Languages",
    icon: Terminal,
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    items: ["TypeScript", "JavaScript", "Python", "Bash"],
  },
  {
    category: "Mobile / Frontend",
    icon: Layers,
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    items: ["React Native", "Expo", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend & Cloud",
    icon: Database,
    color: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
    items: ["Supabase", "PostgreSQL", "Node.js", "Vercel", "Cloudflare"],
  },
  {
    category: "Tools",
    icon: Cpu,
    color: "from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-400",
    items: ["Git & GitHub", "Figma", "Replit", "Claude Code"],
  },
];

const experience = [
  {
    role: "Co-Founder & Lead Developer",
    company: "Spindare",
    period: "Jan 2025 – Present",
    bullets: [
      "Leading all frontend and mobile development on a 3-person team",
      "Architected the full component library and design system",
      "Integrated real-time features with Supabase Realtime",
      "Built in-app messaging, streak tracking, and AI challenge generation",
      "300+ components · 40K+ lines of code · V2 in active development",
    ],
    color: "border-primary/40 bg-primary/5",
    dot: "bg-primary",
  },
  {
    role: "Freelance Developer",
    company: "Independent",
    period: "2024 – Present",
    bullets: [
      "Full-stack web and mobile projects for clients",
      "Focus on React Native apps and Next.js web platforms",
      "End-to-end delivery: design, build, deploy, and maintain",
    ],
    color: "border-accent/40 bg-accent/5",
    dot: "bg-accent",
  },
];

const stats = [
  { value: "40K+", label: "Lines of code written" },
  { value: "300+", label: "Components built" },
  { value: "2", label: "Live products" },
  { value: "3", label: "Years coding" },
];

const decisions: {
  title: string;
  project: string;
  icon: ElementType;
  color: string;
  accent: string;
  points: { label: string; detail: ReactNode }[];
}[] = [
  {
    title: "Why Supabase over Firebase",
    project: "Spindare V2",
    icon: Database,
    color: "border-green-500/30 bg-green-500/5",
    accent: "text-green-400",
    points: [
      { label: "Real-time at scale", detail: <><GlossaryWord term="SUPABASE REALTIME" /> handled 10K+ concurrent challenge reactions with lower latency than <GlossaryWord term="FIREBASE" />'s WebSocket implementation.</> },
      { label: "Data integrity", detail: <><GlossaryWord term="POSTGRESQL" /> <GlossaryWord term="RLS" /> let me enforce privacy rules at the DB layer — no bloated middleware needed.</> },
      { label: "Dev velocity", detail: <>GoTrue Auth let me ship the full V2 authentication flow in under 48 hours, including OAuth and magic links — far faster than <GlossaryWord term="FIREBASE" />.</> },
    ],
  },
  {
    title: "Why Expo over bare React Native",
    project: "Both apps",
    icon: Layers,
    color: "border-blue-500/30 bg-blue-500/5",
    accent: "text-blue-400",
    points: [
      { label: "OTA updates", detail: <><GlossaryWord term="EXPO" />'s <GlossaryWord term="OTA" /> updates let me ship bug fixes to users without waiting for App Store review cycles.</> },
      { label: "Unified build pipeline", detail: <><GlossaryWord term="EAS" /> Build replaced a complex native build setup with a single command — critical for a small team working across iOS and Android.</> },
      { label: "Native modules when needed", detail: <><GlossaryWord term="EXPO" />'s dev client lets me add bare native modules for specific features while keeping the <GlossaryWord term="EXPO" /> workflow everywhere else.</> },
    ],
  },
  {
    title: "Why TypeScript everywhere",
    project: "All projects",
    icon: Terminal,
    color: "border-purple-500/30 bg-purple-500/5",
    accent: "text-purple-400",
    points: [
      { label: "Catches bugs at compile time", detail: <>With 40K+ LOC across <GlossaryWord term="SPINDARE" />, <GlossaryWord term="TYPESCRIPT" />'s type checker prevents entire classes of runtime errors before they reach users.</> },
      { label: "Self-documenting code", detail: <>Typed interfaces act as living documentation — no need to guess what a function expects or returns across 300+ components.</> },
      { label: "Refactoring confidence", detail: <>Renaming a prop or changing a function signature instantly surfaces every affected usage across the codebase — essential at scale.</> },
    ],
  },
];

/* ─── Page ──────────────────────────────────────────────────── */
export default function DevHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border/50 glass-strong">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to portfolio</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold font-mono text-sm text-foreground truncate">
              kiqa<span className="text-primary">-dev</span>
              <span className="text-muted-foreground"> / dev-hub</span>
            </span>
          </div>
          <MagneticWrapper strength={0.25}>
            <button
              onClick={() => document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              Hire Me
            </button>
          </MagneticWrapper>
        </div>
      </div>

      <main className="container mx-auto max-w-5xl px-6 py-16">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-foreground">Available for work · Developer Hub</span>
            </div>
            <GitHubPulse />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.05]">
            Kiq<span className="text-gradient">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-3">
            Full-Stack & Mobile Developer
          </p>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-8">
            14-year-old self-taught developer from Albania, building real products from the ground up.
            Currently leading development on{" "}
            <GlossaryWord term="SPINDARE" /> — a social gamification app built with{" "}
            <GlossaryWord term="REACT NATIVE" /> and <GlossaryWord term="SUPABASE" /> — and{" "}
            <GlossaryWord term="TRAVELME" />, an <GlossaryWord term="NEXT.JS" /> + AI-powered travel planner.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { href: "https://github.com/rashica07", icon: Github, label: "GitHub", external: true },
              { href: "/", icon: Globe, label: "Portfolio", external: false },
              { href: "https://discord.com/users/kodibkfg", icon: MessageSquare, label: "Discord", external: true },
            ].map(({ href, icon: Icon, label, external }) => (
              <MagneticWrapper key={label} strength={0.2}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary/40 text-sm font-semibold transition-colors"
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary/40 text-sm font-semibold transition-colors"
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </Link>
                )}
              </MagneticWrapper>
            ))}
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20"
        >
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="glass rounded-2xl p-5 border border-border text-center"
            >
              <p className="text-3xl font-extrabold text-foreground mb-1">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Projects ── */}
        <section className="mb-20">
          <p className="section-label mb-3">🚀 What I&apos;m Building</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-10">Current Projects</h2>

          <div className="space-y-6">
            {/* Spindare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-foreground">Spindare</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> In Development
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">Social Gamification Platform · Lead Developer</p>
                </div>
                <a
                  href="https://github.com/biba-work/spindare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:border-primary/40 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> View Repo
                </a>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                A social gamification platform where users spin for daily challenges, complete them, and share their results with friends. Built for iOS and Android using{" "}
                <GlossaryWord term="REACT NATIVE" />, <GlossaryWord term="TYPESCRIPT" />, and{" "}
                <GlossaryWord term="SUPABASE REALTIME" /> — with a 3-person team. I lead all frontend and mobile development.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  "Real-time social feed with reactions",
                  "Daily challenge spin system",
                  "Streak tracking & gamification",
                  "AI-powered challenge generation (Gemini)",
                  "In-app messaging (Stream Chat)",
                  "Auth via Clerk",
                  "Offline-first architecture",
                  "Supabase Realtime backend",
                ].map((f, i) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {["React Native", "TypeScript", "Expo", "Supabase", "Clerk", "Stream Chat", "Gemini AI"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-t border-border/50 pt-5">
                <span className="flex items-center gap-1.5"><GitBranch className="w-3.5 h-3.5" /> 300+ components</span>
                <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> 40K+ lines of code</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> 3-person team</span>
              </div>
            </motion.div>

            {/* TravelMe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-3xl p-8 border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400" />
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-foreground">TravelMe</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" /> Coming Soon
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">AI-Powered Travel Companion · Solo Project</p>
                </div>
                <a
                  href="https://github.com/rashica07/booking-fallc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:border-primary/40 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> Private Repo
                </a>
              </div>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Describe your trip in plain language — <GlossaryWord term="TRAVELME" /> generates a full itinerary: flights, hotels, local experiences, and a day-by-day plan.
                Built with <GlossaryWord term="REACT NATIVE" />, <GlossaryWord term="TYPESCRIPT" />, and <GlossaryWord term="NODE.JS" />. No more juggling 10 different apps.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React Native", "TypeScript", "OpenAI API", "Node.js", "MongoDB", "Stripe"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono border border-orange-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Architecture Decision Log ── */}
        <section className="mb-20">
          <p className="section-label mb-3">🏗️ Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Decision Log</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Every major tech choice has a reason. Here&apos;s my thinking behind the key decisions in my projects.
          </p>

          <div className="space-y-5">
            {decisions.map(({ title, project, icon: Icon, color, accent, points }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-3xl p-7 border ${color}`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl bg-background/40 border border-border/50">
                    <Icon className={`w-5 h-5 ${accent}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{title}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{project}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {points.map(({ label, detail }) => (
                    <div key={label} className="flex items-start gap-3">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${accent}`} />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="mb-20">
          <p className="section-label mb-3">💻 Technical Skills</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-10">What I Work With</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map(({ category, icon: Icon, color, items }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-6 border bg-gradient-to-br ${color.split(" ").slice(0, 3).join(" ")}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-5 h-5 ${color.split(" ")[3]}`} />
                  <h3 className="font-bold text-foreground">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-background/40 text-foreground text-sm font-medium border border-border/40">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 rounded-2xl p-5 border border-border/60 glass flex items-center gap-4"
          >
            <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Currently Learning</p>
              <p className="text-xs text-muted-foreground mt-0.5">System architecture · Database optimization · AI integration · DevOps</p>
            </div>
          </motion.div>
        </section>

        {/* ── Experience ── */}
        <section className="mb-20">
          <p className="section-label mb-3">📋 Experience</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-10">What I&apos;ve Done</h2>

          <div className="space-y-5">
            {experience.map(({ role, company, period, bullets, color, dot }, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-7 border ${color}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${dot}`} />
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{role}</h3>
                      <p className="text-sm text-muted-foreground">{company}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                    {period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5 shrink-0">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          id="contact-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10 border border-border text-center"
        >
          <p className="section-label mb-3">📬 Let&apos;s Work Together</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Got a project in mind?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
            I&apos;m open to freelance work, collaborations, and interesting projects. If you have something you&apos;d like to build together, I&apos;d love to hear it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticWrapper strength={0.25}>
              <a
                href="mailto:newkiqaa@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Dev%20Hub&body=Hi%20Kristian%2C%0A%0AI%20came%20across%20your%20Dev%20Hub%20and%20wanted%20to%20reach%20out.%0A%0A"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
                data-testid="link-devhub-email"
              >
                <Zap className="w-4 h-4" /> Email Me
              </a>
            </MagneticWrapper>
            <MagneticWrapper strength={0.25}>
              <a
                href="https://discord.com/users/kodibkfg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-border hover:border-indigo-500/50 text-foreground font-semibold transition-colors"
                data-testid="link-devhub-discord"
              >
                <MessageSquare className="w-4 h-4" /> Discord DM
              </a>
            </MagneticWrapper>
          </div>
        </motion.section>

      </main>

      <footer className="border-t border-border/50 mt-20 py-8 text-center text-sm text-muted-foreground">
        <span className="font-mono">kiqa-dev.it</span> · Developer Hub · Built with Next.js
      </footer>
    </div>
  );
}
