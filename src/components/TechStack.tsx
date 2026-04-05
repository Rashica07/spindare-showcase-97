"use client";

import { motion } from "framer-motion";
import { PopUp } from "@/components/AnimatedText";

const categories = [
  {
    title: "Languages",
    emoji: "⌨️",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    items: [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "Dart", level: 75 },
      { name: "PHP", level: 70 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    emoji: "🏗️",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
    items: [
      { name: "React", level: 90 },
      { name: "React Native", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Flutter", level: 75 },
      { name: "Node.js", level: 80 },
      { name: "Laravel", level: 65 },
    ],
  },
  {
    title: "Databases & Backend",
    emoji: "🗄️",
    gradient: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20",
    dot: "bg-green-400",
    items: [
      { name: "Supabase", level: 85 },
      { name: "Firebase", level: 82 },
      { name: "MongoDB", level: 72 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    title: "Tools & Platforms",
    emoji: "🔧",
    gradient: "from-orange-500/10 to-yellow-500/10",
    border: "border-orange-500/20",
    dot: "bg-orange-400",
    items: [
      { name: "Git & GitHub", level: 88 },
      { name: "REST APIs", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "VS Code", level: 95 },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-16 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-label">🛠️ What I Work With</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Technologies I use to build fast, modern, and scalable applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              className={`rounded-2xl p-6 border bg-gradient-to-br hover-lift ${cat.gradient} ${cat.border}`}
            >
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <span>{cat.emoji}</span>
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.items.map((tech, i) => (
                  <PopUp key={tech.name} delay={catIdx * 0.1 + i * 0.05}>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-mono font-medium text-foreground">{tech.name}</span>
                        <span className="text-xs text-muted-foreground">{tech.level}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: catIdx * 0.1 + i * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </div>
                  </PopUp>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
