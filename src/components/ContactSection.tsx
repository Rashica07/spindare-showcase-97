"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, MessageSquare, ArrowUpRight, Send, CheckCircle } from "lucide-react";
import { AnimatedWords, BlurReveal } from "@/components/AnimatedText";

const socials = [
  {
    icon: Mail,
    emoji: "📧",
    label: "Email Me",
    href: "mailto:newkiqaa@gmail.com",
    desc: "newkiqaa@gmail.com",
    color: "from-red-500/10 to-orange-500/10 border-red-500/20",
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
    badge: null,
  },
  {
    icon: Github,
    emoji: "🐙",
    label: "GitHub",
    href: "https://github.com/rashica07",
    desc: "github.com/rashica07",
    color: "from-gray-500/10 to-slate-500/10 border-gray-500/20",
    iconColor: "text-gray-400",
    iconBg: "bg-gray-500/10",
    badge: null,
  },
  {
    icon: MessageSquare,
    emoji: "💬",
    label: "Discord",
    href: "https://discord.com/users/kodibkfg",
    desc: "kodibkfg",
    color: "from-indigo-500/10 to-violet-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10",
    badge: "Fastest reply",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const sanitize = (value: string) =>
    value.replace(/[<>'"&]/g, (c) => (({ "<": "&lt;", ">": "&gt;", "'": "&#x27;", '"': "&quot;", "&": "&amp;" } as Record<string, string>)[c] ?? c));

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-muted/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label text-center"
        >
          ✉️ Let&apos;s Connect
        </motion.p>

        <AnimatedWords as="h2" className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground text-center">
          Ready to collaborate?
        </AnimatedWords>

        <BlurReveal delay={0.2}>
          <p className="text-muted-foreground text-lg mb-16 max-w-xl mx-auto text-center">
            Have a project idea, want to work together, or just want to say hi? I&apos;d love to hear from you! 🙌
          </p>
        </BlurReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Social links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Discord DM featured card */}
            <motion.a
              href="https://discord.com/users/kodibkfg"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 rounded-2xl p-5 border bg-gradient-to-br from-indigo-500/15 to-violet-500/10 border-indigo-500/40 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />
              <div className="p-3 rounded-xl shrink-0 bg-indigo-500/15">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  💬 DM me on Discord
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    Fastest reply
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground font-mono">@kodibkfg</p>
              </div>
            </motion.a>

            {socials.filter(s => s.label !== "Discord").map(({ icon: Icon, emoji, label, href, desc, color, iconColor, iconBg }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 rounded-2xl p-5 border bg-gradient-to-br cursor-pointer transition-all group ${color}`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground flex items-center gap-1.5">
                    <span>{emoji}</span> {label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-muted-foreground" />
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">{desc}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass rounded-3xl p-8 border border-border"
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground">Message Sent! 🎉</h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible!
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="John Doe"
                    maxLength={100}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="john@example.com"
                    maxLength={200}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    maxLength={2000}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground resize-none transition-all text-sm"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{form.message.length}/2000</p>
                </div>
                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                    ⚠️ {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 glow-primary text-sm"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message 🚀
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
