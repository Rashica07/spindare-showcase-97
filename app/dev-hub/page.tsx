"use client";
import Link from "next/link";
import { ArrowRight, Github, Mail } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";

const SPINDARE_FEATURES = [
  "Real-time social feed with reactions",
  "Daily challenge spin system — 200+ curated picks",
  "Streak tracking and gamification",
  "AI-powered challenge generation via Gemini",
  "In-app messaging via Stream Chat",
  "Auth via Clerk with custom Supabase ban system",
];

const STACK_GROUPS = [
  { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "Bash"] },
  { name: "Mobile / Frontend", items: ["React Native", "Expo", "React", "Next.js", "Tailwind"] },
  { name: "Backend & Cloud", items: ["Supabase", "PostgreSQL", "Node.js", "Vercel", "Cloudflare"] },
  { name: "Tools & Infra", items: ["Git", "Figma", "Claude Code", "EAS Build", "Backblaze B2"] },
];

const DECISIONS = [
  {
    title: "Why Supabase over Firebase",
    project: "Spindare",
    points: [
      { label: "Real-time scale", text: "Supabase Realtime handled 10K+ concurrent challenge reactions with lower latency than Firebase's WebSocket implementation." },
      { label: "Data integrity", text: "PostgreSQL RLS enforces privacy rules at the DB layer — no bloated middleware needed." },
      { label: "Dev velocity", text: "GoTrue Auth shipped the full V2 authentication flow in under 48 hours, including OAuth and magic links." },
    ],
  },
  {
    title: "Why Expo over bare React Native",
    project: "Both apps",
    points: [
      { label: "OTA updates", text: "Expo's OTA updates ship bug fixes without App Store review cycles." },
      { label: "Build pipeline", text: "EAS Build replaced a complex native setup with a single command — critical for a small team." },
      { label: "Native modules", text: "Expo's dev client allows bare native modules for specific features while keeping the Expo workflow everywhere else." },
    ],
  },
  {
    title: "Why TypeScript everywhere",
    project: "All projects",
    points: [
      { label: "Bug prevention", text: "With 150k+ LOC across Spindare, TypeScript prevents entire classes of runtime errors before they reach users." },
      { label: "Refactoring", text: "Renaming a prop instantly surfaces every affected usage across 300+ components — essential at scale." },
    ],
  },
];

export default function DevHubPage() {
  return (
    <main className="site-main">
      <section className="page-hero" data-label="DEV HUB">
        <div className="section-inner dh-hero">
          <div className="dh-hero-left">
            <p className="section-label">Developer Hub</p>
            <h1 className="page-hero-title">Kristian <span className="accent-text">Gjergji</span></h1>
            <p className="dh-role-line">Full-stack &amp; mobile developer · Lecco, Italy</p>
            <p className="page-hero-sub">
              Building production apps since 2023. Currently leading development on <strong>Spindare</strong> —
              a social gamification platform targeting iOS launch September 2026 — while taking on freelance web and mobile projects.
            </p>
            <div className="dh-hero-actions">
              <a href="https://github.com/rashica07" className="btn-primary" target="_blank" rel="noopener noreferrer">
                <Github size={14} /> GitHub ↗
              </a>
              <a href="mailto:contact@kiqa-dev.it" className="btn-secondary">
                <Mail size={14} /> Email
              </a>
              <a href="https://discord.com/users/kodibkfg" className="btn-secondary" target="_blank" rel="noopener noreferrer">Discord</a>
              <Link href="/contact" className="btn-secondary">Contact ↗</Link>
            </div>
          </div>
          <div className="dh-hero-right">
            <div className="dh-stat-grid">
              <div className="dh-stat-card">
                <span className="dh-stat-val">150k+</span>
                <span className="dh-stat-key">Lines of code</span>
              </div>
              <div className="dh-stat-card">
                <span className="dh-stat-val">300+</span>
                <span className="dh-stat-key">Components</span>
              </div>
              <div className="dh-stat-card">
                <span className="dh-stat-val">2+</span>
                <span className="dh-stat-key">Years building</span>
              </div>
              <div className="dh-stat-card">
                <span className="dh-stat-val accent-text">Sep &apos;26</span>
                <span className="dh-stat-key">iOS launch</span>
              </div>
            </div>
            <div className="dh-avail-pill">
              <span className="dh-avail-dot" />
              Open for freelance from June 2026
            </div>
          </div>
        </div>
      </section>

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Current Projects</p>
            <h2 className="section-title">What I&apos;m building</h2>
          </FadeUp>
          <div className="dh-projects">
            <FadeUp delay={0.08}>
              <div className="dh-project-card dh-project-featured">
                <div className="dh-project-head">
                  <div className="dh-project-name-row">
                    <span className="dh-project-name">Spindare</span>
                    <span className="dh-badge dh-badge-active">In Development</span>
                  </div>
                  <span className="dh-project-role">Lead Developer · UI/UX · 3-person team</span>
                </div>
                <div className="dh-project-body">
                  <p className="dh-project-desc">
                    A social gamification platform where users spin for daily challenges, complete them, and share with friends.
                    Built for iOS and Android with React Native, TypeScript, and Supabase Realtime.
                  </p>
                  <div className="dh-features">
                    {SPINDARE_FEATURES.map((f) => (
                      <div className="dh-feature" key={f}><span className="dh-dot" />{f}</div>
                    ))}
                  </div>
                </div>
                <div className="dh-project-foot">
                  <div className="dh-stack-row">
                    {["React Native", "TypeScript", "Expo", "Supabase", "Clerk", "Stream Chat", "Gemini AI", "Backblaze B2"].map((s) => (
                      <span className="stack-tag" key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="dh-project-meta">
                    <span><strong>300+</strong> components</span>
                    <span className="dh-sep">·</span>
                    <span><strong>150k+</strong> lines</span>
                    <span className="dh-sep">·</span>
                    <span><strong>3</strong>-person team</span>
                    <span className="dh-sep">·</span>
                    <a href="https://github.com/biba-work/spindare" target="_blank" rel="noopener noreferrer" className="dh-gh-link">
                      <Github size={12} /> GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.16}>
              <div className="dh-project-card">
                <div className="dh-project-head">
                  <div className="dh-project-name-row">
                    <span className="dh-project-name">TravelMe</span>
                    <span className="dh-badge dh-badge-soon">Coming Soon</span>
                  </div>
                  <span className="dh-project-role">Solo Project · Full-stack</span>
                </div>
                <div className="dh-project-body">
                  <p className="dh-project-desc">
                    Describe your trip in plain language — TravelMe generates a full itinerary: flights, hotels, local experiences, day-by-day plan. No more juggling 10 apps.
                  </p>
                </div>
                <div className="dh-project-foot">
                  <div className="dh-stack-row">
                    {["React Native", "TypeScript", "OpenAI API", "Node.js", "MongoDB", "Stripe"].map((s) => (
                      <span className="stack-tag" key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="dh-project-meta">
                    <a href="https://github.com/rashica07/booking-fallc" target="_blank" rel="noopener noreferrer" className="dh-gh-link">
                      <Github size={12} /> GitHub ↗
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Spindare Team</p>
            <h2 className="section-title">Who I build with</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="dh-collab-card">
              <div className="dh-collab-name-row">
                <span className="dh-collab-name">Daniel F.</span>
                <span className="dh-collab-role">Lead Developer · Spindare</span>
              </div>
              <p className="dh-collab-note">
                Working with Daniel on Spindare has been invaluable. As the technical lead, he&apos;s helped me level up my architecture skills and navigate complex backend challenges.
              </p>
              <span className="dh-collab-context">Co-founder &amp; uncle</span>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">What I Work With</p>
            <h2 className="section-title">Tech stack</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="dh-stack-grid">
              {STACK_GROUPS.map((g) => (
                <div className="dh-stack-group" key={g.name}>
                  <p className="dh-stack-group-name">{g.name}</p>
                  <div className="dh-stack-tags">
                    {g.items.map((item) => <span className="stack-tag" key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Architecture Decision Log</p>
            <h2 className="section-title">Why I chose what I chose</h2>
            <p className="section-sub">Technical decisions with reasoning. No cargo-culting.</p>
          </FadeUp>
          <div className="dh-adl">
            {DECISIONS.map((d, i) => (
              <FadeUp key={d.title} delay={i * 0.08}>
                <div className="dh-adl-item">
                  <div className="dh-adl-head">
                    <span className="dh-adl-title">{d.title}</span>
                    <span className="dh-adl-project">{d.project}</span>
                  </div>
                  <div className="dh-adl-points">
                    {d.points.map((p) => (
                      <div className="dh-adl-point" key={p.label}>
                        <span className="dh-adl-label">{p.label}</span>
                        <span className="dh-adl-text">{p.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">Experience</p>
            <h2 className="section-title">Timeline</h2>
          </FadeUp>
          <div className="dh-exp-list">
            <FadeUp delay={0.08}>
              <div className="dh-exp-item">
                <div className="dh-exp-left">
                  <p className="dh-exp-title">Co-Founder &amp; Lead Developer</p>
                  <p className="dh-exp-company">Spindare</p>
                  <ul className="dh-exp-bullets">
                    <li>Leading all frontend and mobile development on a 3-person team</li>
                    <li>Architected the full component library and design system from scratch</li>
                    <li>Integrated real-time features with Supabase Realtime across the social feed</li>
                    <li>Built in-app messaging, streak tracking, and AI challenge generation</li>
                  </ul>
                </div>
                <span className="dh-exp-date">Jan 2025 – Present</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.14}>
              <div className="dh-exp-item">
                <div className="dh-exp-left">
                  <p className="dh-exp-title">Freelance Developer</p>
                  <p className="dh-exp-company">KIQA DEV</p>
                  <ul className="dh-exp-bullets">
                    <li>Full-stack web and mobile projects for clients across Europe</li>
                    <li>Focus on React Native apps and Next.js web platforms</li>
                    <li>End-to-end delivery: design, build, deploy, maintain</li>
                  </ul>
                </div>
                <span className="dh-exp-date">2024 – Present</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="divider" />

      <FadeUp>
        <section className="section-padded cta-section">
          <div className="section-inner cta-inner">
            <h2 className="cta-title">Got a project in mind?</h2>
            <p className="cta-sub">Open to freelance work, collabs, and interesting builds. Available from June 2026.</p>
            <div className="dh-cta-actions">
              <Link href="/contact" className="btn-primary btn-large">Get in touch <ArrowRight size={16} /></Link>
              <a href="https://discord.com/users/kodibkfg" className="btn-secondary btn-large" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
        </section>
      </FadeUp>
    </main>
  );
}
