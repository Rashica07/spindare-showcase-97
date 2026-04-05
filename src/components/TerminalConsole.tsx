"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Square } from "lucide-react";

type Line = { type: "input" | "output" | "error" | "success" | "system"; text: string };

const BANNER: Line[] = [
  { type: "system", text: "kiqa-dev terminal v1.0.0 — type 'help' for commands" },
  { type: "system", text: "© 2026 Kristian Gjergji · rashica07" },
];

const COMMANDS: Record<string, () => { lines: Line[]; action?: () => void }> = {
  help: () => ({
    lines: [
      { type: "output", text: "Available commands:" },
      { type: "success", text: "  projects   — view my work" },
      { type: "success", text: "  about      — who is Kiq?" },
      { type: "success", text: "  skills     — my tech stack" },
      { type: "success", text: "  spindare   — about Spindare" },
      { type: "success", text: "  travelme   — about TravelMe" },
      { type: "success", text: "  github     — open GitHub" },
      { type: "success", text: "  contact    — jump to contact form" },
      { type: "success", text: "  devhub     — open the Dev Hub" },
      { type: "success", text: "  clear      — clear terminal" },
    ],
  }),
  projects: () => ({
    lines: [
      { type: "output", text: "My projects:" },
      { type: "success", text: "  → Spindare   Social gamification platform · In Development" },
      { type: "success", text: "  → TravelMe   AI travel companion · Coming Soon" },
      { type: "output", text: "Run 'spindare' or 'travelme' for details." },
    ],
  }),
  about: () => ({
    lines: [
      { type: "output", text: "Kristian Gjergji (rashica07)" },
      { type: "output", text: "Age: 14  ·  Location: Albania" },
      { type: "output", text: "Role: Full-Stack & Mobile Developer" },
      { type: "output", text: "Focus: React Native, TypeScript, Supabase" },
      { type: "output", text: "Currently building Spindare & TravelMe." },
    ],
  }),
  skills: () => ({
    lines: [
      { type: "output", text: "Languages:  TypeScript · JavaScript · Python" },
      { type: "output", text: "Mobile:     React Native · Expo" },
      { type: "output", text: "Web:        Next.js · React · Tailwind CSS" },
      { type: "output", text: "Backend:    Supabase · Node.js · PostgreSQL" },
      { type: "output", text: "Tools:      Git · Figma · Replit · Claude" },
    ],
  }),
  spindare: () => ({
    lines: [
      { type: "success", text: "Spindare — Social Gamification Platform" },
      { type: "output", text: "Status: In Development (V2)" },
      { type: "output", text: "Stack:  React Native · TypeScript · Supabase · Clerk" },
      { type: "output", text: "Scale:  300+ components · 40K+ lines of code" },
      { type: "output", text: "Team:   3 people · I lead all frontend & mobile" },
      { type: "output", text: "GitHub: github.com/biba-work/spindare" },
    ],
  }),
  travelme: () => ({
    lines: [
      { type: "success", text: "TravelMe — AI Travel Companion" },
      { type: "output", text: "Status: Coming Soon" },
      { type: "output", text: "Stack:  React Native · TypeScript · OpenAI · Stripe" },
      { type: "output", text: "Pitch:  Describe a trip in plain language — get a full itinerary." },
      { type: "output", text: "GitHub: github.com/rashica07/booking-fallc" },
    ],
  }),
  github: () => ({
    lines: [{ type: "success", text: "Opening github.com/rashica07 ..." }],
    action: () => window.open("https://github.com/rashica07", "_blank"),
  }),
  contact: () => ({
    lines: [{ type: "success", text: "Scrolling to contact form..." }],
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
  }),
  devhub: () => ({
    lines: [{ type: "success", text: "Opening Dev Hub..." }],
    action: () => window.open("/dev-hub", "_self"),
  }),
  clear: () => ({ lines: [] }),
};

const SUGGESTIONS = ["help", "projects", "about", "skills", "spindare", "travelme", "github", "contact", "devhub", "clear"];

export default function TerminalConsole() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const handleInput = (val: string) => {
    setInput(val);
    const match = SUGGESTIONS.find((s) => s.startsWith(val) && val.length > 0 && s !== val);
    setSuggestion(match ?? "");
  };

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const inputLine: Line = { type: "input", text: `> ${cmd}` };

    if (!trimmed) {
      setLines((l) => [...l, inputLine]);
      return;
    }

    setHistory((h) => [trimmed, ...h].slice(0, 50));
    setHistoryIdx(-1);

    const handler = COMMANDS[trimmed];
    if (!handler) {
      setLines((l) => [
        ...l,
        inputLine,
        { type: "error", text: `Command not found: '${trimmed}'. Try 'help'.` },
      ]);
      return;
    }

    const result = handler();

    if (trimmed === "clear") {
      setLines(BANNER);
    } else {
      setLines((l) => [...l, inputLine, ...result.lines]);
      result.action?.();
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setSuggestion("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) { setInput(suggestion); setSuggestion(""); }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    }
  };

  const lineColor = (type: Line["type"]) => {
    switch (type) {
      case "input":   return "text-primary font-semibold";
      case "success": return "text-green-400";
      case "error":   return "text-red-400";
      case "system":  return "text-muted-foreground";
      default:        return "text-foreground/90";
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">
        <p className="section-label mb-3">💻 Interactive</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">Live Terminal</h2>
        <p className="text-muted-foreground mb-8 max-w-xl">
          Type commands below to explore this portfolio without leaving the page.
          Try <code className="text-primary font-mono text-sm">help</code> to get started.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border overflow-hidden shadow-2xl"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 dark:bg-black/60 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-red-500/80 shrink-0" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 shrink-0" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 shrink-0" />
            <div className="flex-1 text-center min-w-0">
              <span className="font-mono text-xs text-muted-foreground hidden sm:inline">kiq@rashica07 — portfolio</span>
              <span className="font-mono text-xs text-muted-foreground sm:hidden">kiq@rashica07</span>
            </div>
            <Terminal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          </div>

          {/* Output */}
          <div
            ref={scrollContainerRef}
            className="bg-[#0d1117] dark:bg-[#080b11] min-h-[280px] max-h-[380px] overflow-y-auto p-4 font-mono text-sm leading-relaxed cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence initial={false}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  className={`${lineColor(line.type)} whitespace-pre-wrap break-words`}
                >
                  {line.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Input row */}
            <div className="flex items-center mt-2 relative">
              <span className="text-primary font-semibold mr-2 shrink-0">{">"}</span>
              <div className="relative flex-1">
                <span className="absolute inset-0 font-mono text-sm text-muted-foreground/40 pointer-events-none select-none">
                  {input}{suggestion.slice(input.length)}
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => handleInput(e.target.value)}
                  onKeyDown={onKey}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="w-full bg-transparent text-primary font-mono text-sm outline-none caret-primary relative z-10"
                  placeholder=""
                  aria-label="Terminal input"
                  data-testid="terminal-input"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
