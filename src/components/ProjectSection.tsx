"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone, Users, Zap, MessageCircle, Shield, Globe,
  ExternalLink, Star, GitFork, Plane, MapPin, Brain, CreditCard, Clock, Search,
  Heart, MessageCircle as Chat, Share2, Bookmark, Search as SearchIcon, Bell,
} from "lucide-react";
import { PopUp, BlurReveal, AnimatedWords } from "@/components/AnimatedText";
import WaitlistModal from "@/components/WaitlistModal";

const spindareFeatures = [
  { icon: Zap, emoji: "🎡", title: "Daily Spin", desc: "One spin per day reveals a random challenge from 200+ curated picks", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { icon: Users, emoji: "👥", title: "Friend Feed", desc: "Real-time social feed of friends' challenge completions via Supabase Realtime", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: MessageCircle, emoji: "💬", title: "Stream Chat", desc: "Direct messaging powered by Stream Chat with JWT auth", color: "text-green-400", bg: "bg-green-500/10" },
  { icon: Smartphone, emoji: "📱", title: "iOS & Android", desc: "React Native + Expo — single codebase, both stores", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Shield, emoji: "🔒", title: "Clerk Auth", desc: "Secure authentication with a custom Supabase ban system", color: "text-red-400", bg: "bg-red-500/10" },
  { icon: Globe, emoji: "🔥", title: "Streak System", desc: "Daily streaks reward consistency and drive return visits", color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

const travelmeFeatures = [
  { icon: Brain, emoji: "🤖", title: "AI-Powered", desc: "Smart trip recommendations from AI", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Plane, emoji: "✈️", title: "Flight Search", desc: "Find and compare the best flights", color: "text-sky-400", bg: "bg-sky-500/10" },
  { icon: MapPin, emoji: "📍", title: "Destination Guide", desc: "AI curated local tips & hotspots", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: CreditCard, emoji: "💳", title: "Easy Booking", desc: "Seamless end-to-end booking flow", color: "text-orange-400", bg: "bg-orange-500/10" },
  { icon: Clock, emoji: "⏱️", title: "Itinerary Builder", desc: "Auto-generate full trip itineraries", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Search, emoji: "🔍", title: "Smart Search", desc: "Natural language travel search", color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

const projects = [
  {
    id: "spindare",
    name: "Spindare",
    tagline: "Spin. Complete. Share.",
    status: "V2 In Progress",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
    desc: "Spindare is a daily challenge social app — spin a wheel, get a random challenge from 200+ curated picks, complete it, and share your attempt with friends. Think TikTok-style feed meets real-world daily accountability.",
    detail: "V2 sits at 300+ files and ~150,000+ lines of code. A 3-person team (Uncle Bib, Daniel, and me as UI/UX lead). iOS launch targeting May 11 2026.",
    highlights: ["Daily spin with 200+ curated challenges", "Real-time Supabase feed", "Stream Chat DMs", "Streak system"],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "Clerk", "Stream Chat", "Backblaze B2", "Vercel"],
    github: "https://github.com/biba-work/spindare",
    url: "https://github.com/Rashica07/spindare-showcase-97",
    accentGradient: "from-primary via-accent to-secondary",
    mockupType: "social",
  },
  {
    id: "travelme",
    name: "TravelMe",
    tagline: "Your AI Travel Companion",
    status: "Coming Soon",
    statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    desc: "TravelMe removes the friction from travel planning. Instead of bouncing between 10 different apps, you describe your trip in plain language and TravelMe builds the full itinerary — flights, hotels, local tips, and a day-by-day plan.",
    detail: "Powered by OpenAI's API for natural language understanding, with a Node.js backend, MongoDB for trip storage, and Stripe for seamless booking. Built mobile-first with React Native for a smooth experience on any device.",
    highlights: ["AI itinerary generation", "Natural language search", "End-to-end booking with Stripe", "Personalised destination guides"],
    tech: ["React Native", "TypeScript", "OpenAI API", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/rashica07/booking-fallc",
    url: null,
    accentGradient: "from-orange-400 via-yellow-400 to-red-400",
    mockupType: "travel",
  },
];

function SpindareMockup() {
  return (
    <div className="w-52 h-96 rounded-[2.5rem] bg-[#0f0f1a] border-2 border-white/10 flex flex-col relative overflow-hidden shadow-2xl">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
        <span className="text-[9px] font-semibold text-white/60">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-2.5 h-1.5 rounded-[2px] border border-white/40 relative">
            <div className="absolute inset-[1px] left-[1px] right-[1px] rounded-[1px] bg-white/40" />
          </div>
        </div>
      </div>
      {/* Dynamic island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />

      {/* App header */}
      <div className="px-4 pt-1 pb-2 flex items-center justify-between shrink-0 border-b border-white/5">
        <span className="text-xs font-bold text-white">Spindare</span>
        <SearchIcon className="w-3.5 h-3.5 text-white/50" />
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-hidden px-3 pt-2 space-y-2.5">
        {[
          { user: "rashica07", time: "2m", liked: true, likes: 128 },
          { user: "alex.dev", time: "8m", liked: false, likes: 47 },
          { user: "mia_codes", time: "15m", liked: false, likes: 203 },
        ].map((post, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-2.5">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-5 h-5 rounded-full shrink-0 ${
                i === 0 ? "bg-gradient-to-br from-primary to-accent"
                  : i === 1 ? "bg-gradient-to-br from-green-400 to-cyan-400"
                    : "bg-gradient-to-br from-pink-400 to-rose-400"
              }`} />
              <span className="text-[9px] font-semibold text-white/80">{post.user}</span>
              <span className="text-[8px] text-white/30 ml-auto">{post.time}</span>
            </div>
            <div className={`h-1.5 rounded-full mb-1.5 ${i === 0 ? "w-full" : i === 1 ? "w-4/5" : "w-3/5"} bg-white/20`} />
            <div className={`h-1.5 rounded-full ${i === 0 ? "w-3/4" : i === 1 ? "w-2/3" : "w-4/5"} bg-white/10`} />
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Heart className={`w-3 h-3 ${post.liked ? "text-red-400 fill-red-400" : "text-white/30"}`} />
                <span className="text-[8px] text-white/40">{post.likes}</span>
              </div>
              <Chat className="w-3 h-3 text-white/30" />
              <Share2 className="w-3 h-3 text-white/30" />
              <Bookmark className="w-3 h-3 text-white/30 ml-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-4 py-2 border-t border-white/5 shrink-0">
        {["🏠", "🔍", "➕", "🔔", "👤"].map((icon, i) => (
          <span key={i} className={`text-sm ${i === 0 ? "opacity-100" : "opacity-30"}`}>{icon}</span>
        ))}
      </div>

      {/* Home indicator */}
      <div className="w-20 h-1 rounded-full bg-white/20 mx-auto mb-1.5" />
    </div>
  );
}

function TravelMeMockup() {
  return (
    <div className="w-52 h-96 rounded-[2.5rem] bg-[#0f0f1a] border-2 border-white/10 flex flex-col relative overflow-hidden shadow-2xl">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
        <span className="text-[9px] font-semibold text-white/60">9:41</span>
        <div className="w-2.5 h-1.5 rounded-[2px] border border-white/40">
          <div className="m-[1px] rounded-[1px] bg-white/40 h-full" />
        </div>
      </div>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />

      {/* Header */}
      <div className="px-4 pt-1 pb-2 shrink-0">
        <p className="text-[8px] text-white/40 font-mono">Good morning ✈️</p>
        <p className="text-xs font-bold text-white">Where to next?</p>
      </div>

      {/* Search bar */}
      <div className="mx-3 mb-2 bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2 shrink-0">
        <Search className="w-3 h-3 text-white/40" />
        <span className="text-[9px] text-white/30">Ask AI for destination ideas…</span>
      </div>

      {/* Destination cards */}
      <div className="flex-1 overflow-hidden px-3 space-y-2">
        {[
          { dest: "Tokyo, Japan 🗼", price: "$640", tag: "Trending" },
          { dest: "Bali, Indonesia 🌴", price: "$410", tag: "Best Value" },
          { dest: "Paris, France 🗼", price: "$890", tag: "Popular" },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-2.5 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg shrink-0 ${
              i === 0 ? "bg-gradient-to-br from-pink-400 to-orange-400"
                : i === 1 ? "bg-gradient-to-br from-green-400 to-teal-400"
                  : "bg-gradient-to-br from-blue-400 to-indigo-400"
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-semibold text-white/80 truncate">{item.dest}</p>
              <p className="text-[8px] text-white/40">from {item.price}</p>
            </div>
            <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary shrink-0">{item.tag}</span>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-4 py-2 border-t border-white/5 shrink-0">
        {["✈️", "🗺️", "🤖", "❤️", "👤"].map((icon, i) => (
          <span key={i} className={`text-sm ${i === 0 ? "opacity-100" : "opacity-30"}`}>{icon}</span>
        ))}
      </div>
      <div className="w-20 h-1 rounded-full bg-white/20 mx-auto mb-1.5" />
    </div>
  );
}

export default function ProjectSection() {
  const [active, setActive] = useState("spindare");
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const project = projects.find((p) => p.id === active)!;
  const features = active === "spindare" ? spindareFeatures : travelmeFeatures;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="section-label">🚀 Projects</p>
        </motion.div>

        <AnimatedWords as="h2" className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-4 text-foreground">
          What I&apos;ve Built
        </AnimatedWords>

        <BlurReveal delay={0.2}>
          <p className="text-center text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10">
            From social platforms to AI travel apps — built from the ground up with modern tools and real intent.
          </p>
        </BlurReveal>

        {/* Project switcher */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                active === p.id
                  ? "bg-primary text-primary-foreground glow-primary scale-105"
                  : "glass border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {p.id === "spindare" ? "🌀" : "✈️"} {p.name}
            </button>
          ))}
        </div>

        {/* Main project card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-3xl p-6 sm:p-10 md:p-12 mb-10 relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.accentGradient}`} />

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Text side */}
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${project.statusColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {project.status}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3" /> Personal Project
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  {project.tagline}
                </h3>

                <p className="text-muted-foreground mb-3 leading-relaxed text-sm sm:text-base">
                  {project.desc}
                </p>

                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.detail}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/60 text-xs text-foreground font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-all glow-primary"
                      data-testid="link-spindare-showcase"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Showcase
                    </a>
                  ) : (
                    <button
                      onClick={() => setWaitlistOpen(true)}
                      data-testid="button-travelme-waitlist"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all text-white"
                      style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}
                    >
                      <Bell className="w-4 h-4" />
                      Join Waitlist
                    </button>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary/40 text-sm font-semibold transition-all hover:scale-105"
                    data-testid="link-project-github"
                  >
                    <GitFork className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Phone mockup — proper app UI, no spinning */}
              <div className="flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active + "-phone"}
                    initial={{ opacity: 0, scale: 0.88, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    {active === "spindare" ? <SpindareMockup /> : <TravelMeMockup />}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-primary/5 blur-2xl -z-10 scale-110 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feature grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-features"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {features.map(({ icon: Icon, emoji, title, desc, color, bg }, i) => (
              <PopUp key={title} delay={i * 0.05}>
                <div className="glass rounded-2xl p-4 sm:p-5 hover-lift cursor-default group border border-border/50 hover:border-primary/30 transition-all h-full">
                  <div className={`p-2.5 rounded-xl w-fit mb-3 ${bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
                  </div>
                  <h4 className="font-bold text-foreground mb-1 text-sm flex items-center gap-1.5">
                    <span>{emoji}</span> {title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{desc}</p>
                </div>
              </PopUp>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        product="TravelMe"
        description="AI-powered travel planning. Be first to know when it's ready."
        color="orange"
      />
    </section>
  );
}
