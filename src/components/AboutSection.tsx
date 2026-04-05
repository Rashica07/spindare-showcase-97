"use client";

import { motion } from "framer-motion";
import { AnimatedWords, BlurReveal } from "@/components/AnimatedText";
import { Code2, Rocket, Lightbulb, Trophy, Target, Layers } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    emoji: "💻",
    label: "Multi-Stack",
    desc: "JS/TS, Python, Dart, C++, PHP",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    label: "Product Builder",
    desc: "Mobile, web & backend systems",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Lightbulb,
    emoji: "💡",
    label: "Self-Taught",
    desc: "Learned by building real things",
    color: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    label: "AI-Augmented",
    desc: "Uses AI as a tool, not a crutch",
    color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
  },
];

const timeline = [
  { year: "2018", event: "Wrote my first lines of HTML — instantly fell in love with building things 💥" },
  { year: "2021", event: "Took a long break from coding and stepped away for a while" },
  { year: "2022–23", event: "Came back and started pushing harder — exploring more languages and concepts" },
  { year: "2024", event: "Levelled up — started building and shipping real websites 🌐" },
  { year: "2025", event: "Jumped into mobile — building full apps with React Native 📱" },
  { year: "Now", event: "Fully upgraded. Shipping Spindare, building TravelMe, and not stopping 🚀" },
];

const techDistribution = [
  { label: "JavaScript / TypeScript", pct: 40, color: "from-blue-500 to-cyan-400" },
  { label: "HTML / CSS", pct: 15, color: "from-orange-500 to-yellow-400" },
  { label: "Python", pct: 15, color: "from-green-500 to-emerald-400" },
  { label: "Dart (Flutter)", pct: 10, color: "from-sky-500 to-blue-400" },
  { label: "C++ / C#", pct: 10, color: "from-violet-500 to-purple-400" },
  { label: "Other (PHP, Java…)", pct: 10, color: "from-pink-500 to-rose-400" },
];

const focus = [
  { icon: Target, label: "Turn ideas into working products — fast" },
  { icon: Layers, label: "Understand systems end-to-end, not just the surface" },
  { icon: Rocket, label: "Iterate quickly and learn by shipping" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label">🧠 About Me</p>
          <AnimatedWords as="h2" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Builder. Thinker. Perpetual learner.
          </AnimatedWords>
        </motion.div>

        {/* ── Bio + Timeline ── */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* Bio */}
          <BlurReveal>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                I&apos;m a <strong className="text-foreground">self-driven full-stack developer</strong> focused on building
                real-world applications — with a strong interest in mobile development, backend systems, and product design.
              </p>
              <p>
                I started without formal coding experience, learning by building projects from scratch and working alongside
                AI tools. Over time I developed a solid understanding of how modern applications are structured,
                deployed, and scaled.
              </p>
              <p>
                My main project, <span className="text-primary font-semibold">Spindare</span>, reflects my approach:
                building systems that are not only functional, but intentional — combining user experience,
                performance, and privacy into a single product.
              </p>

              {/* Focus areas */}
              <div className="pt-2 space-y-2">
                {focus.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 p-1.5 rounded-md bg-primary/10 shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </BlurReveal>

          {/* Timeline */}
          <BlurReveal delay={0.2}>
            <div>
              <h3 className="font-semibold text-foreground text-xs uppercase tracking-widest font-mono mb-5">
                🗺️ My Journey
              </h3>
              <div className="relative space-y-0">
                {/* Vertical line */}
                <div className="absolute left-[26px] top-3 bottom-3 w-px bg-border" />
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-5 pb-7 last:pb-0 relative"
                  >
                    <div className="shrink-0 w-[62px] h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center z-10">
                      <span className="text-[10px] font-mono font-bold text-primary">{item.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </BlurReveal>
        </div>

        {/* ── Tech Distribution ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 sm:p-8 mb-12 border border-border"
        >
          <h3 className="font-semibold text-foreground text-xs uppercase tracking-widest font-mono mb-6">
            💻 Tech Usage — Realistic Distribution
          </h3>
          <div className="space-y-4">
            {techDistribution.map(({ label, pct, color }, i) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-mono text-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.07, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Highlight cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, emoji, label, desc, color, iconColor, iconBg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`rounded-2xl p-5 flex flex-col gap-3 border bg-gradient-to-br cursor-default transition-all duration-300 ${color}`}
            >
              <div className={`p-2.5 rounded-xl w-fit ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm sm:text-base">
                  {emoji} {label}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
