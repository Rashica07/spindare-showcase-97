"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Calendar, Clock, GitBranch, CheckCircle, Circle } from "lucide-react";

const LAUNCH_DATE = new Date("2026-09-30T00:00:00Z");

const MILESTONES = [
  { label: "Project architecture & setup", done: true },
  { label: "Core auth & onboarding flow", done: true },
  { label: "Basic social feed structure", done: true },
  { label: "Daily spin system", done: false },
  { label: "Real-time messaging", done: false },
  { label: "Streak & XP engine", done: false },
  { label: "AI challenge generation", done: false },
  { label: "App Store assets & metadata", done: false },
  { label: "Beta testing & crash fixes", done: false },
  { label: "V2 launch 🚀", done: false },
];

const PROGRESS = 19;

function useCountdown(target: Date) {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const ms = target.getTime() - Date.now();
      if (ms <= 0) { setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setDiff({
        days:    Math.floor(ms / 86_400_000),
        hours:   Math.floor((ms % 86_400_000) / 3_600_000),
        minutes: Math.floor((ms % 3_600_000) / 60_000),
        seconds: Math.floor((ms % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return diff;
}

export default function LaunchProgress() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <p className="section-label mb-3">🚀 Shipping Soon</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Spindare V2 Launch</h2>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Targeting <span className="text-foreground font-semibold">late September 2026</span>. Here's where we are.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left — progress + countdown */}
          <div className="space-y-5">
            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground text-sm">V2 Completion</span>
                </div>
                <span className="text-2xl font-extrabold text-gradient">{PROGRESS}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${PROGRESS}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{PROGRESS}% of V2 features complete · Early build phase</p>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">Time to Launch</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: days,    label: "Days" },
                  { value: hours,   label: "Hours" },
                  { value: minutes, label: "Mins" },
                  { value: seconds, label: "Secs" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <motion.div
                      key={value}
                      initial={{ opacity: 0.6, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums"
                    >
                      {String(value).padStart(2, "0")}
                    </motion.div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Launch date card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-5 border flex items-center gap-4"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(var(--accent)/0.05))", borderColor: "hsl(var(--primary)/0.25)" }}
            >
              <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">Spindare V2</p>
                <p className="text-sm text-muted-foreground">iOS & Android · September 2026</p>
              </div>
              <span className="ml-auto text-xs font-mono font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                SOON
              </span>
            </motion.div>
          </div>

          {/* Right — milestones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground text-sm">Release Milestones</span>
            </div>
            <div className="space-y-3.5">
              {MILESTONES.map(({ label, done }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3"
                >
                  {done ? (
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                  )}
                  <span className={`text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {done && (
                    <span className="ml-auto text-[10px] text-green-400 font-mono">✓ done</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
