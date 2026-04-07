"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const heroActionsRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const sanitize = (v: string) =>
    v.replace(
      /[<>'"&]/g,
      (c) =>
        (
          {
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#x27;",
            '"': "&quot;",
            "&": "&amp;",
          } as Record<string, string>
        )[c] ?? c
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const name = sanitize(form.name.trim());
    const email = sanitize(form.email.trim());
    const message = sanitize(form.message.trim());
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.length > 2000) {
      setError("Message must be under 2000 characters.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("sent");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch {
      setError("Network error. Please check your connection.");
      setStatus("idle");
    }
  };

  return (
    <>
      <Nav heroActionsRef={heroActionsRef} />
      <Hero actionsRef={heroActionsRef} />

      <div className="divider" />

      <section id="about">
        <div className="section-inner">
          <FadeUp>
            <p className="section-label">About</p>
            <p className="about-text">
              I started coding out of curiosity and turned it into something
              real. I build mobile apps and web platforms —{" "}
              <strong>not as a hobby, but as a mission.</strong> Spindare exists
              because my family needs it to succeed. That changes how you write
              code.
              <br />
              <br />
              I&apos;m the UI/UX lead on a 3-person team. I work with{" "}
              <span className="accent">React Native, TypeScript, Supabase</span>
              , and whatever else the problem needs. I learn by shipping — not
              by watching tutorials.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section id="projects">
        <div className="section-inner">
          <p className="section-label">Projects</p>
          <div className="projects-list">
            <FadeUp delay={0}>
              <div className="project-item">
                <div>
                  <div className="project-header">
                    <span className="project-name">Spindare</span>
                    <span className="project-badge">In Development</span>
                  </div>
                  <p className="project-desc">
                    A daily challenge social app. Spin a wheel, get a challenge
                    from 200+ curated picks, complete it, share it with friends.
                    Think TikTok-style feed meets real-world accountability.
                    300+ components, 40K lines of code. iOS launch September
                    2026.
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
                  <a
                    href="https://github.com/biba-work/spindare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github"
                  >
                    GitHub ↗
                  </a>
                  <span className="project-stat">300+ components</span>
                  <span className="project-stat">40K lines</span>
                  <span className="project-stat">3-person team</span>
                  <span className="project-arrow">↗</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="project-item">
                <div>
                  <div className="project-header">
                    <span className="project-name">TravelMe</span>
                    <span className="project-badge soon">Coming Soon</span>
                  </div>
                  <p className="project-desc">
                    Describe your trip in plain language — TravelMe generates
                    the full itinerary: flights, hotels, experiences, day-by-day
                    plan. No more switching between 10 apps. AI-powered, built
                    solo with React Native and Node.js.
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
                  <a
                    href="https://github.com/rashica07/booking-fallc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github"
                  >
                    GitHub ↗
                  </a>
                  <span className="project-stat">Solo project</span>
                  <span className="project-arrow">↗</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="stack">
        <div className="section-inner">
          <p className="section-label">Stack</p>
          <FadeUp>
            <div className="stack-grid">
              {[
                ["TypeScript", "Language"],
                ["React Native", "Mobile"],
                ["Next.js", "Web"],
                ["Supabase", "Backend"],
                ["Expo", "Mobile"],
                ["Tailwind", "Styling"],
                ["PostgreSQL", "Database"],
                ["Vercel", "Deploy"],
                ["Clerk", "Auth"],
                ["Node.js", "Runtime"],
                ["Cloudflare", "Infra"],
                ["Git", "Version Control"],
              ].map(([name, type]) => (
                <motion.div
                  key={name}
                  className="stack-item"
                  whileHover={{ borderColor: "var(--accent)", transition: { duration: 0.15 } }}
                >
                  <span className="stack-item-name">{name}</span>
                  <span className="stack-item-type">{type}</span>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      <section id="writing">
        <div className="section-inner">
          <p className="section-label">Writing</p>
          <div className="blog-list">
            {[
              {
                tag: "React Native",
                title:
                  "How I fixed a memory leak in FlatList that was crashing Spindare's social feed",
                date: "Mar 28, 2026",
              },
              {
                tag: "Architecture",
                title:
                  "Why I rebuilt Spindare's authentication flow in 48 hours — and why I don't regret it",
                date: "Mar 14, 2026",
              },
              {
                tag: "Backend",
                title:
                  "Supabase Realtime vs Firebase for social feeds: what I found after stress-testing both",
                date: "Feb 22, 2026",
              },
            ].map((post, i) => (
              <FadeUp key={post.title} delay={i * 0.08}>
                <a href="#" className="blog-item">
                  <div>
                    <p className="blog-tag">{post.tag}</p>
                    <p className="blog-title">{post.title}</p>
                  </div>
                  <span className="blog-date">{post.date}</span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="contact">
        <div className="section-inner">
          <p className="section-label">Contact</p>

          <div className="contact-grid">
            {[
              {
                href: "https://discord.com/users/kodibkfg",
                label: "Discord",
                value: "@kodibkfg",
              },
              {
                href: "mailto:newkiqaa@gmail.com",
                label: "Email",
                value: "newkiqaa@gmail.com",
              },
              {
                href: "https://github.com/rashica07",
                label: "GitHub",
                value: "github.com/rashica07",
              },
              {
                href: "https://twitter.com/kristiangjergj4",
                label: "Twitter",
                value: "@kristiangjergj4",
              },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.07}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-value">{item.value}</span>
                  <span className="contact-arrow">↗</span>
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.12}>
            <div className="contact-form-wrap">
              {status === "sent" ? (
                <div className="contact-form-success">
                  <p className="contact-form-success-title">Message sent.</p>
                  <p className="contact-form-success-sub">
                    I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    className="contact-form-reset"
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", email: "", message: "" });
                    }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="contact-form"
                >
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label className="contact-field-label">Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Your name"
                        maxLength={100}
                        className="contact-input"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label className="contact-field-label">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="you@example.com"
                        maxLength={200}
                        className="contact-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-field">
                    <label className="contact-field-label">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Tell me about your project..."
                      rows={5}
                      maxLength={2000}
                      className="contact-input contact-textarea"
                      required
                    />
                    <span className="contact-char-count">
                      {form.message.length}/2000
                    </span>
                  </div>
                  {error && <p className="contact-error">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary contact-submit"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      <footer>
        <span className="footer-left">
          kiq<span>.</span>dev — Kristian Gjergji
        </span>
        <span className="footer-right">Next.js + TypeScript ⚡</span>
      </footer>
    </>
  );
}
