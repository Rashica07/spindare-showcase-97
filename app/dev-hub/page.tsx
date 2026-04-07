"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DevHubPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    setTimeout(() => {
      document
        .querySelectorAll(".hub-header.fade-up")
        .forEach((el) => el.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/" className="nav-logo">kiq<span>.</span>dev</Link>
          <span className="nav-sep">/</span>
          <span className="nav-page">dev-hub</span>
        </div>
        <Link href="/" className="nav-back">← Portfolio</Link>
      </nav>

      <div className="hub-header fade-up">
        <p className="hub-tag">Developer Hub</p>
        <h1>Kiq.<br /><em>Builder.</em></h1>
        <p className="hub-desc">
          14-year-old full-stack and mobile developer from Albania. Currently building <strong>Spindare</strong> — a social gamification app — and <strong>TravelMe</strong>, an AI travel planner.
          Open to freelance web and app projects.
        </p>
        <div className="hub-links">
          <a href="https://github.com/rashica07" className="hub-link primary">GitHub</a>
          <a href="mailto:newkiqaa@gmail.com" className="hub-link">Email</a>
          <a href="https://discord.com/users/kodibkfg" className="hub-link">Discord</a>
        </div>
      </div>

      <div className="hub-body">

        <section>
          <p className="section-label">Current Projects</p>
          <div className="projects-list">

            <div className="project-card fade-up">
              <div className="project-top">
                <div>
                  <p className="project-name">Spindare</p>
                  <p className="project-role">Lead Developer · UI/UX · 3-person team</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <a href="https://github.com/biba-work/spindare" target="_blank" rel="noopener noreferrer" className="hub-link" style={{ padding: "4px 10px" }}>GitHub ↗</a>
                  <span className="project-badge">In Development</span>
                </div>
              </div>
              <p className="project-desc">
                A social gamification platform where users spin for daily challenges, complete them, and share with friends. Built for iOS and Android with React Native, TypeScript, and Supabase Realtime.
              </p>
              <div className="project-features">
                <div className="feature-row">Real-time social feed with reactions</div>
                <div className="feature-row">Daily challenge spin system — 200+ curated picks</div>
                <div className="feature-row">Streak tracking and gamification</div>
                <div className="feature-row">AI-powered challenge generation via Gemini</div>
                <div className="feature-row">In-app messaging via Stream Chat</div>
                <div className="feature-row">Auth via Clerk with custom Supabase ban system</div>
              </div>
              <div className="project-stack">
                <span className="stack-tag">React Native</span>
                <span className="stack-tag">TypeScript</span>
                <span className="stack-tag">Expo</span>
                <span className="stack-tag">Supabase</span>
                <span className="stack-tag">Clerk</span>
                <span className="stack-tag">Stream Chat</span>
                <span className="stack-tag">Gemini AI</span>
                <span className="stack-tag">Backblaze B2</span>
              </div>
              <div className="project-stats">
                <div className="stat"><span className="stat-value">300+</span><span className="stat-label">Components</span></div>
                <div className="stat"><span className="stat-value">40K+</span><span className="stat-label">Lines of code</span></div>
                <div className="stat"><span className="stat-value">3</span><span className="stat-label">Person team</span></div>
                <div className="stat"><span className="stat-value">Sep &apos;26</span><span className="stat-label">iOS launch</span></div>
              </div>
            </div>

            <div className="project-card fade-up delay-1">
              <div className="project-top">
                <div>
                  <p className="project-name">TravelMe</p>
                  <p className="project-role">Solo Project · Full-stack</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <a href="https://github.com/rashica07/booking-fallc" target="_blank" rel="noopener noreferrer" className="hub-link" style={{ padding: "4px 10px" }}>GitHub ↗</a>
                  <span className="project-badge soon">Coming Soon</span>
                </div>
              </div>
              <p className="project-desc">
                Describe your trip in plain language — TravelMe generates a full itinerary: flights, hotels, local experiences, day-by-day plan. No more juggling 10 apps.
              </p>
              <div className="project-stack">
                <span className="stack-tag">React Native</span>
                <span className="stack-tag">TypeScript</span>
                <span className="stack-tag">OpenAI API</span>
                <span className="stack-tag">Node.js</span>
                <span className="stack-tag">MongoDB</span>
                <span className="stack-tag">Stripe</span>
              </div>
            </div>

          </div>
        </section>

        <section>
          <p className="section-label">Architecture Decision Log</p>
          <div className="decision-list">

            <div className="decision-item fade-up">
              <div className="decision-top">
                <span className="decision-title">Why Supabase over Firebase</span>
                <span className="decision-project">Spindare</span>
              </div>
              <div className="decision-points">
                <div className="decision-point">
                  <span className="point-label">Real-time scale</span>
                  <span className="point-text">Supabase Realtime handled 10K+ concurrent challenge reactions with lower latency than Firebase&apos;s WebSocket implementation.</span>
                </div>
                <div className="decision-point">
                  <span className="point-label">Data integrity</span>
                  <span className="point-text">PostgreSQL RLS let me enforce privacy rules at the DB layer — no bloated middleware needed.</span>
                </div>
                <div className="decision-point">
                  <span className="point-label">Dev velocity</span>
                  <span className="point-text">GoTrue Auth let me ship the full V2 authentication flow in under 48 hours, including OAuth and magic links.</span>
                </div>
              </div>
            </div>

            <div className="decision-item fade-up delay-1">
              <div className="decision-top">
                <span className="decision-title">Why Expo over bare React Native</span>
                <span className="decision-project">Both apps</span>
              </div>
              <div className="decision-points">
                <div className="decision-point">
                  <span className="point-label">OTA updates</span>
                  <span className="point-text">Expo&apos;s OTA updates let me ship bug fixes without waiting for App Store review cycles.</span>
                </div>
                <div className="decision-point">
                  <span className="point-label">Build pipeline</span>
                  <span className="point-text">EAS Build replaced a complex native build setup with a single command — critical for a small team working across iOS and Android.</span>
                </div>
                <div className="decision-point">
                  <span className="point-label">Native modules</span>
                  <span className="point-text">Expo&apos;s dev client lets me add bare native modules for specific features while keeping the Expo workflow everywhere else.</span>
                </div>
              </div>
            </div>

            <div className="decision-item fade-up delay-2">
              <div className="decision-top">
                <span className="decision-title">Why TypeScript everywhere</span>
                <span className="decision-project">All projects</span>
              </div>
              <div className="decision-points">
                <div className="decision-point">
                  <span className="point-label">Bug prevention</span>
                  <span className="point-text">With 40K+ LOC across Spindare, TypeScript&apos;s type checker prevents entire classes of runtime errors before they reach users.</span>
                </div>
                <div className="decision-point">
                  <span className="point-label">Refactoring</span>
                  <span className="point-text">Renaming a prop or changing a function signature instantly surfaces every affected usage across 300+ components — essential at scale.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section>
          <p className="section-label">What I Work With</p>
          <div className="skills-grid fade-up">
            <div className="skill-group">
              <p className="skill-group-name">Languages</p>
              <div className="skill-tags">
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Bash</span>
              </div>
            </div>
            <div className="skill-group">
              <p className="skill-group-name">Mobile / Frontend</p>
              <div className="skill-tags">
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">Expo</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Tailwind</span>
              </div>
            </div>
            <div className="skill-group">
              <p className="skill-group-name">Backend & Cloud</p>
              <div className="skill-tags">
                <span className="skill-tag">Supabase</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Vercel</span>
                <span className="skill-tag">Cloudflare</span>
              </div>
            </div>
            <div className="skill-group">
              <p className="skill-group-name">Tools</p>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Claude Code</span>
                <span className="skill-tag">EAS Build</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="section-label">Experience</p>
          <div className="exp-list">
            <div className="exp-item fade-up">
              <div>
                <p className="exp-title">Co-Founder & Lead Developer</p>
                <p className="exp-company">Spindare</p>
                <div className="exp-bullets">
                  <p className="exp-bullet">Leading all frontend and mobile development on a 3-person team</p>
                  <p className="exp-bullet">Architected the full component library and design system</p>
                  <p className="exp-bullet">Integrated real-time features with Supabase Realtime</p>
                  <p className="exp-bullet">Built in-app messaging, streak tracking, and AI challenge generation</p>
                </div>
              </div>
              <span className="exp-date">Jan 2025 – Present</span>
            </div>
            <div className="exp-item fade-up delay-1">
              <div>
                <p className="exp-title">Freelance Developer</p>
                <p className="exp-company">Independent</p>
                <div className="exp-bullets">
                  <p className="exp-bullet">Full-stack web and mobile projects for clients</p>
                  <p className="exp-bullet">Focus on React Native apps and Next.js web platforms</p>
                  <p className="exp-bullet">End-to-end delivery: design, build, deploy, maintain</p>
                </div>
              </div>
              <span className="exp-date">2024 – Present</span>
            </div>
          </div>
        </section>

        <div className="cta-block fade-up">
          <div className="cta-text">
            <h3>Got a project in mind?</h3>
            <p>Open to freelance work, collabs, and interesting builds.</p>
          </div>
          <div className="cta-actions">
            <a href="mailto:newkiqaa@gmail.com" className="btn-primary">Email Me</a>
            <a href="https://discord.com/users/kodibkfg" className="btn-ghost">Discord</a>
          </div>
        </div>

      </div>

      <footer>
        <span className="footer-left">kiq<span>.</span>dev — Developer Hub</span>
        <span className="footer-right">Next.js + TypeScript ⚡</span>
      </footer>
    </>
  );
}
