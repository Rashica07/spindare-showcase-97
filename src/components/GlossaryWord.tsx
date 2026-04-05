"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const glossary: Record<string, string> = {
  "REACT NATIVE": "Cross-platform mobile framework by Meta. Write once in TypeScript, ship native apps to iOS and Android.",
  "TYPESCRIPT": "Typed superset of JavaScript. Catches entire classes of bugs at compile time — used across every Kristian project.",
  "SUPABASE": "Open-source Firebase alternative built on PostgreSQL. Auth, real-time subscriptions, file storage, and edge functions.",
  "NEXT.JS": "The React framework for production. Handles SSR, file-system routing, image optimisation, and API routes out of the box.",
  "EXPO": "Universal React Native platform. Simplifies native builds with EAS Build and ships bug fixes via OTA updates.",
  "SPINDARE": "Social gamification platform. Users spin for daily challenges, complete them, and share results. In active V2 development.",
  "TRAVELME": "AI travel companion. Describe a trip in plain language — get a full personalised itinerary. Powered by OpenAI.",
  "GEMINI": "Google's multimodal AI model. Powers Spindare's AI challenge generation system for personalised daily missions.",
  "CLERK": "Modern authentication platform. Handles OAuth, magic links, session management, and multi-factor auth.",
  "EAS": "Expo Application Services. Cloud build & submit pipeline replacing complex native toolchains with a single command.",
  "SUPABASE REALTIME": "PostgreSQL LISTEN/NOTIFY exposed as WebSocket subscriptions. Handles 10K+ concurrent reactions in Spindare.",
  "RLS": "Row Level Security — PostgreSQL's built-in access control enforced at the database layer, no middleware needed.",
  "OTA": "Over-The-Air updates. Push JS bundle fixes directly to users without waiting for App Store review cycles.",
  "POSTGRESQL": "Powerful open-source relational database powering Supabase. Full ACID compliance and advanced JSON support.",
  "TAILWIND CSS": "Utility-first CSS framework. Compose designs directly in markup — no custom CSS files needed.",
  "FIGMA": "Industry-standard design tool. Used for all Spindare UI mockups, prototypes, and component specifications.",
  "STREAM CHAT": "Scalable in-app messaging SDK. Powers Spindare's real-time chat with full offline support.",
  "FIREBASE": "Google's BaaS platform. Real-time NoSQL database and auth — evaluated against Supabase for Spindare V2.",
  "VERCEL": "Edge deployment platform optimised for Next.js. Zero-config deployments with global CDN and serverless functions.",
  "NODE.JS": "JavaScript runtime for server-side code. Used for API servers, scripts, and backend automation.",
};

interface Props {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryWord({ term, children }: Props) {
  const [visible, setVisible] = useState(false);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const key = term.toUpperCase();
  const definition = glossary[key];

  if (!definition) {
    return <span className="font-semibold text-foreground">{children ?? term}</span>;
  }

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const handleTouch = () => {
    if (visible) {
      hide();
    } else {
      show();
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      touchTimeout.current = setTimeout(hide, 3500);
    }
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onTouchStart={handleTouch}
    >
      <span
        className="
          inline-flex items-center gap-0.5
          px-1.5 py-0.5
          rounded-md
          border border-primary/50
          bg-primary/10
          text-primary
          font-mono font-bold
          text-[0.82em]
          uppercase tracking-widest
          cursor-help
          select-none
          transition-colors duration-150
          hover:bg-primary/20 hover:border-primary/70
        "
        tabIndex={0}
        aria-label={`${term}: ${definition}`}
      >
        {children ?? term}
      </span>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-[200] w-60 pointer-events-none"
          >
            <div className="glass-strong border border-border/80 rounded-xl p-3.5 shadow-2xl">
              <p className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.15em] mb-1.5">
                {term}
              </p>
              <p className="text-[11px] text-foreground/80 leading-relaxed">
                {definition}
              </p>
            </div>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid hsl(var(--border) / 0.8)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
