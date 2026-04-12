"use client";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage } from "@/lib/i18n";

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
  const { t } = useLanguage();
  const dh = t.devHub;

  return (
    <main className="site-main">
      <section className="page-hero" data-label="DEV HUB">
        <div className="section-inner dh-hero">
          <div className="dh-hero-left">
            <p className="section-label">{dh.hero.label}</p>
            <h1 className="page-hero-title">Kristian <span className="accent-text">Gjergji</span></h1>
            <p className="dh-role-line">{dh.hero.role}</p>
            <p className="page-hero-sub">{dh.hero.sub}</p>
            <div className="dh-hero-actions">
              <a href="https://github.com/rashica07" className="btn-primary" target="_blank" rel="noopener noreferrer">
                <Github size={14} /> GitHub ↗
              </a>
              <Link href="/contact" className="btn-secondary">{dh.hero.contact}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">{dh.projects.label}</p>
            <h2 className="section-title">{dh.projects.title}</h2>
          </FadeUp>
          <div className="dh-projects">
            <FadeUp delay={0.08}>
              <div className="dh-project-card dh-project-featured">
                <div className="dh-project-head">
                  <div className="dh-project-name-row">
                    <span className="dh-project-name">Spindare</span>
                    <span className="dh-badge dh-badge-active">{dh.projects.spindareBadge}</span>
                  </div>
                  <span className="dh-project-role">{dh.projects.spindareRole}</span>
                </div>
                <div className="dh-project-body">
                  <p className="dh-project-desc">{dh.projects.spindareDesc}</p>
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
                    <span className="dh-badge dh-badge-soon">{dh.projects.travelmeBadge}</span>
                  </div>
                  <span className="dh-project-role">{dh.projects.travelmeRole}</span>
                </div>
                <div className="dh-project-body">
                  <p className="dh-project-desc">{dh.projects.travelmeDesc}</p>
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
            <p className="section-label">{dh.stack.label}</p>
            <h2 className="section-title">{dh.stack.title}</h2>
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
            <p className="section-label">{dh.adl.label}</p>
            <h2 className="section-title">{dh.adl.title}</h2>
            <p className="section-sub">{dh.adl.sub}</p>
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
            <p className="section-label">{dh.exp.label}</p>
            <h2 className="section-title">{dh.exp.title}</h2>
          </FadeUp>
          <div className="dh-exp-list">
            <FadeUp delay={0.08}>
              <div className="dh-exp-item">
                <div className="dh-exp-left">
                  <p className="dh-exp-title">{dh.exp.spindareRole}</p>
                  <p className="dh-exp-company">Spindare</p>
                  <ul className="dh-exp-bullets">
                    {dh.exp.spindareBullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                <span className="dh-exp-date">{dh.exp.spindareDate}</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.14}>
              <div className="dh-exp-item">
                <div className="dh-exp-left">
                  <p className="dh-exp-title">{dh.exp.kiqaRole}</p>
                  <p className="dh-exp-company">KIQA DEV</p>
                  <ul className="dh-exp-bullets">
                    {dh.exp.kiqaBullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                <span className="dh-exp-date">{dh.exp.kiqaDate}</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section-padded">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">{dh.oss.label}</p>
            <h2 className="section-title">{dh.oss.title}</h2>
            <p className="section-sub">{dh.oss.sub}</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="dh-oss-grid">
              <a href="https://github.com/biba-work/spindare" target="_blank" rel="noopener noreferrer" className="dh-oss-card">
                <div className="dh-oss-card-top">
                  <span className="dh-oss-name">spindare</span>
                  <span className="dh-oss-org">biba-work</span>
                </div>
                <p className="dh-oss-desc">{dh.oss.spindareDesc}</p>
                <div className="dh-oss-tags">
                  <span className="stack-tag">React Native</span>
                  <span className="stack-tag">TypeScript</span>
                  <span className="stack-tag">Supabase</span>
                </div>
              </a>
              <a href="https://github.com/rashica07/booking-fallc" target="_blank" rel="noopener noreferrer" className="dh-oss-card">
                <div className="dh-oss-card-top">
                  <span className="dh-oss-name">booking-fallc</span>
                  <span className="dh-oss-org">rashica07</span>
                </div>
                <p className="dh-oss-desc">{dh.oss.travelmeDesc}</p>
                <div className="dh-oss-tags">
                  <span className="stack-tag">React Native</span>
                  <span className="stack-tag">OpenAI</span>
                  <span className="stack-tag">Node.js</span>
                </div>
              </a>
              <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="dh-oss-card dh-oss-card--profile">
                <div className="dh-oss-card-top">
                  <span className="dh-oss-name">rashica07</span>
                  <span className="dh-oss-org">GitHub profile</span>
                </div>
                <p className="dh-oss-desc">{dh.oss.profileDesc}</p>
                <span className="dh-oss-arrow">{dh.oss.viewProfile} ↗</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <FadeUp>
        <section className="section-padded cta-section">
          <div className="section-inner cta-inner">
            <h2 className="cta-title">{dh.cta.title}</h2>
            <p className="cta-sub">{dh.cta.sub}</p>
            <div className="dh-cta-actions">
              <Link href="/contact" className="btn-primary btn-large">{dh.hero.contact} <ArrowRight size={16} /></Link>
              <a href="https://discord.com/users/kodibkfg" className="btn-secondary btn-large" target="_blank" rel="noopener noreferrer">{dh.cta.discord}</a>
            </div>
          </div>
        </section>
      </FadeUp>
    </main>
  );
}
