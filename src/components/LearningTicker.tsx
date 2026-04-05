"use client";

import { motion } from "framer-motion";

const items = [
  { emoji: "🍎", label: "Swift & SwiftUI" },
  { emoji: "🔄", label: "CI/CD Pipelines" },
  { emoji: "🏗️", label: "System Design" },
  { emoji: "📦", label: "App Store Connect" },
  { emoji: "🐳", label: "Docker Basics" },
  { emoji: "🦀", label: "Rust Fundamentals" },
  { emoji: "🎨", label: "Figma Prototyping" },
  { emoji: "🗄️", label: "PostgreSQL Internals" },
  { emoji: "🔐", label: "OAuth 2.0 & JWTs" },
  { emoji: "🌐", label: "Edge Functions" },
];

const doubled = [...items, ...items];

export default function LearningTicker() {
  return (
    <section className="py-10 px-4 overflow-hidden border-y border-border/40 bg-muted/10">
      <div className="container mx-auto max-w-6xl mb-4">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center">
          📚 Currently learning
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        <motion.div
          className="flex gap-3 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/60 text-sm font-medium text-muted-foreground whitespace-nowrap shrink-0"
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
