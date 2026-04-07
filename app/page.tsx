"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    setTimeout(() => {
      document
        .querySelectorAll(".hero .fade-up")
        .forEach((el) => el.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">kiq<span>.</span>dev</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#stack">Stack</a></li>
          <li><a href="#writing">Writing</a></li>
          <li><Link href="/dev-hub">Dev Hub</Link></li>
          <li><a href="#contact" className="nav-cta">Hire Me</a></li>
        </ul>
      </nav>

      <section className="hero">
        <p className="hero-tag fade-up">Available for work</p>
        <h1 className="fade-up delay-1">
          Kristian<br />
          <em>Gjergji.</em>
        </h1>
        <p className="hero-sub fade-up delay-2">
          14-year-old developer from Albania, living in Italy.
          I&apos;ve spent the last year building <strong>Spindare</strong> — a social app with 40,000 lines of code — with my uncle and a friend. It ships to the App Store in September.
          That&apos;s basically my CV.
        </p>
        <div className="hero-actions fade-up delay-3">
          <a href="#projects" className="btn-primary">See My Work</a>
          <Link href="/dev-hub" className="btn-ghost">Dev Hub</Link>
        </div>
        <span className="hero-scroll">Scroll</span>
      </section>

      <div className="divider" />

      <section id="about">
        <div className="section-inner">
          <p className="section-label">About</p>
          <p className="about-text fade-up">
            I started coding out of curiosity and turned it into something real. I build mobile apps and web platforms — <strong>not as a hobby, but as a mission.</strong> Spindare exists because my family needs it to succeed. That changes how you write code.
            <br /><br />
            I&apos;m the UI/UX lead on a 3-person team. I work with <span className="accent">React Native, TypeScript, Supabase</span>, and whatever else the problem needs. I learn by shipping — not by watching tutorials.
          </p>
        </div>
      </section>

      <div className="divider" />

      <section id="projects">
        <div className="section-inner">
          <p className="section-label">Projects</p>
          <div className="projects-list">

            <div className="project-item fade-up">
              <div>
                <div className="project-header">
                  <span className="project-name">Spindare</span>
                  <span className="project-badge">In Development</span>
                </div>
                <p className="project-desc">
                  A daily challenge social app. Spin a wheel, get a challenge from 200+ curated picks, complete it, share it with friends. Think TikTok-style feed meets real-world accountability. 300+ components, 40K lines of code. iOS launch September 2026.
                </p>
                <div className="project-stack">
                  <span className="stack-tag">React Native</span>
                  <span className="stack-tag">TypeScript</span>
                  <span className="stack-tag">Supabase</span>
                  <span className="stack-tag">Clerk</span>
                  <span className="stack-tag">Stream Chat</span>
                  <span className="stack-tag">Expo</span>
                </div>
              </div>
              <div className="project-meta">
                <span className="project-stat">300+ components</span>
                <span className="project-stat">40K lines</span>
                <span className="project-stat">3-person team</span>
                <span className="project-arrow">↗</span>
              </div>
            </div>

            <div className="project-item fade-up delay-1">
              <div>
                <div className="project-header">
                  <span className="project-name">TravelMe</span>
                  <span className="project-badge soon">Coming Soon</span>
                </div>
                <p className="project-desc">
                  Describe your trip in plain language — TravelMe generates the full itinerary: flights, hotels, experiences, day-by-day plan. No more switching between 10 apps. AI-powered, built solo with React Native and Node.js.
                </p>
                <div className="project-stack">
                  <span className="stack-tag">React Native</span>
                  <span className="stack-tag">TypeScript</span>
                  <span className="stack-tag">OpenAI API</span>
                  <span className="stack-tag">Node.js</span>
                  <span className="stack-tag">MongoDB</span>
                </div>
              </div>
              <div className="project-meta">
                <span className="project-stat">Solo project</span>
                <span className="project-arrow">↗</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="stack">
        <div className="section-inner">
          <p className="section-label">Stack</p>
          <div className="stack-grid fade-up">
            <div className="stack-item"><span className="stack-item-name">TypeScript</span><span className="stack-item-type">Language</span></div>
            <div className="stack-item"><span className="stack-item-name">React Native</span><span className="stack-item-type">Mobile</span></div>
            <div className="stack-item"><span className="stack-item-name">Next.js</span><span className="stack-item-type">Web</span></div>
            <div className="stack-item"><span className="stack-item-name">Supabase</span><span className="stack-item-type">Backend</span></div>
            <div className="stack-item"><span className="stack-item-name">Expo</span><span className="stack-item-type">Mobile</span></div>
            <div className="stack-item"><span className="stack-item-name">Tailwind</span><span className="stack-item-type">Styling</span></div>
            <div className="stack-item"><span className="stack-item-name">PostgreSQL</span><span className="stack-item-type">Database</span></div>
            <div className="stack-item"><span className="stack-item-name">Vercel</span><span className="stack-item-type">Deploy</span></div>
            <div className="stack-item"><span className="stack-item-name">Clerk</span><span className="stack-item-type">Auth</span></div>
            <div className="stack-item"><span className="stack-item-name">Node.js</span><span className="stack-item-type">Runtime</span></div>
            <div className="stack-item"><span className="stack-item-name">Cloudflare</span><span className="stack-item-type">Infra</span></div>
            <div className="stack-item"><span className="stack-item-name">Git</span><span className="stack-item-type">Version Control</span></div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="writing">
        <div className="section-inner">
          <p className="section-label">Writing</p>
          <div className="blog-list">
            <a href="#" className="blog-item fade-up">
              <div>
                <p className="blog-tag">React Native</p>
                <p className="blog-title">How I fixed a memory leak in FlatList that was crashing Spindare&apos;s social feed</p>
              </div>
              <span className="blog-date">Mar 28, 2026</span>
            </a>
            <a href="#" className="blog-item fade-up delay-1">
              <div>
                <p className="blog-tag">Architecture</p>
                <p className="blog-title">Why I rebuilt Spindare&apos;s authentication flow in 48 hours — and why I don&apos;t regret it</p>
              </div>
              <span className="blog-date">Mar 14, 2026</span>
            </a>
            <a href="#" className="blog-item fade-up delay-2">
              <div>
                <p className="blog-tag">Backend</p>
                <p className="blog-title">Supabase Realtime vs Firebase for social feeds: what I found after stress-testing both</p>
              </div>
              <span className="blog-date">Feb 22, 2026</span>
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="contact">
        <div className="section-inner">
          <p className="section-label">Contact</p>
          <div className="contact-grid">
            <a href="https://discord.com/users/kodibkfg" className="contact-item fade-up">
              <span className="contact-label">Discord</span>
              <span className="contact-value">@kodibkfg</span>
              <span className="contact-arrow">↗</span>
            </a>
            <a href="mailto:newkiqaa@gmail.com" className="contact-item fade-up delay-1">
              <span className="contact-label">Email</span>
              <span className="contact-value">newkiqaa@gmail.com</span>
              <span className="contact-arrow">↗</span>
            </a>
            <a href="https://github.com/rashica07" className="contact-item fade-up delay-2">
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/rashica07</span>
              <span className="contact-arrow">↗</span>
            </a>
            <a href="https://twitter.com/kristiangjergj4" className="contact-item fade-up delay-3">
              <span className="contact-label">Twitter</span>
              <span className="contact-value">@kristiangjergj4</span>
              <span className="contact-arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-left">kiq<span>.</span>dev — Kristian Gjergji</span>
        <span className="footer-right">Next.js + TypeScript ⚡</span>
      </footer>
    </>
  );
}
