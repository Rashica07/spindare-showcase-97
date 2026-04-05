"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLetters, BlurReveal } from "@/components/AnimatedText";
import { ArrowDown, Sparkles, Github, Twitter, Globe, BookOpen } from "lucide-react";
import Image from "next/image";

const BIRTH = new Date(2011, 8, 10); // Sep 10 2011 (months 0-indexed)

function getAgeLabel() {
  const now = new Date();
  let y = now.getFullYear() - BIRTH.getFullYear();
  let m = now.getMonth() - BIRTH.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < BIRTH.getDate())) { y--; m += 12; }
  return `${y}`;
}

function LiveAgeValue() {
  const [age, setAge] = useState(getAgeLabel());
  useEffect(() => {
    const id = setInterval(() => setAge(getAgeLabel()), 60_000);
    return () => clearInterval(id);
  }, []);
  return <>{age}</>;
}

const roles = [
  "Full-Stack Developer",
  "React Native Builder",
  "Mobile App Creator",
  "Database Architect",
  "Open Source Contributor",
];

const staticStats = [
  { value: "10+", label: "Technologies" },
  { value: "2", label: "Live Apps" },
  { value: "∞", label: "Ambition" },
];

function TypewriterRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1400);
      return () => clearTimeout(t);
    }

    const current = roles[index];

    if (!deleting && displayed === current) {
      setPause(true);
      setDeleting(true);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const speed = deleting ? 40 : 70;
    const t = setTimeout(() => {
      setDisplayed((d) =>
        deleting ? d.slice(0, -1) : current.slice(0, d.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, deleting, index, pause]);

  return (
    <span className="text-gradient font-bold">
      {displayed}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: "calc(5rem + env(safe-area-inset-top))" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-10 dark:opacity-15"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
      </div>

      {/* Animated blobs — hidden on mobile (too GPU-heavy) */}
      <div className="hidden sm:block absolute top-1/4 left-1/6 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-blob" />
      <div className="hidden sm:block absolute bottom-1/3 right-1/6 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="hidden sm:block absolute top-1/2 left-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-5xl">

        {/* Badges — stacked on mobile, inline on larger screens */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
              <span className="sm:hidden">Kiq · Dev · Open to Work</span>
              <span className="hidden sm:inline">Kristian Gjergji · 14-Year-Old Developer · Open to Opportunities</span>
            </span>
          </div>

          {/* Currently learning badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-accent/10 border border-accent/20">
            <BookOpen className="w-3 h-3 text-accent shrink-0" />
            <span className="text-xs font-medium text-accent whitespace-nowrap">
              <span className="sm:hidden">Learning: System Design</span>
              <span className="hidden sm:inline">Currently learning: System Design & DevOps</span>
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <AnimatedLetters className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-2 leading-[1.05] tracking-tight text-foreground">
          Building the
        </AnimatedLetters>
        <AnimatedLetters
          delay={0.3}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight text-gradient-accent"
        >
          Future of Apps
        </AnimatedLetters>

        {/* Typewriter */}
        <BlurReveal delay={0.6}>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground mb-3 h-7 sm:h-8">
            <TypewriterRole />
          </p>
        </BlurReveal>

        <BlurReveal delay={0.9}>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed">
            I&apos;m a 14-year-old self-taught developer from Albania. I build mobile apps and web platforms that solve real problems — from rethinking social media with{" "}
            <span className="text-foreground font-semibold">Spindare</span> to making travel planning effortless with{" "}
            <span className="text-foreground font-semibold">TravelMe</span>.
          </p>
        </BlurReveal>

        <BlurReveal delay={1.1}>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            I started coding out of curiosity and never stopped. My focus is on shipping things that feel polished, perform fast, and actually get used.
          </p>
        </BlurReveal>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 px-2 sm:px-0"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold glow-primary transition-all hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            🎯 View My Work
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl glass border border-border hover:border-primary/50 text-foreground font-semibold transition-all hover:scale-105 text-sm sm:text-base inline-flex items-center justify-center"
          >
            💬 Let&apos;s Talk
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10 sm:mb-14"
        >
          {[
            { icon: Github, href: "https://github.com/rashica07", label: "GitHub" },
            { icon: Twitter, href: "https://twitter.com/kristiangjergj4", label: "Twitter" },
            { icon: Globe, href: "/dev-hub", label: "Dev Hub" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-xl glass border border-border hover:border-primary/40 hover:bg-primary/10 transition-all hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
            </a>
          ))}
        </motion.div>

        {/* Stats — 2 cols on mobile, 4 on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xs sm:max-w-xl mx-auto"
        >
          {/* Live age stat */}
          <div className="glass rounded-2xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gradient mb-1">
              <LiveAgeValue />
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">Years Old</div>
          </div>
          {staticStats.map(({ value, label }) => (
            <div
              key={label}
              className="glass rounded-2xl p-3 sm:p-4 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gradient mb-1">{value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium leading-tight">{label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
