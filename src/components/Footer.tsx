"use client";

import { useEffect, useState } from "react";
import { Github, Twitter, Mail, Heart, Code2, ArrowUp, Users } from "lucide-react";

const links = [
  { label: "About", id: "about" },
  { label: "Tech Stack", id: "tech" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/rashica07", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/kristiangjergj4", label: "Twitter" },
  { icon: Mail, href: "mailto:newkiqaa@gmail.com", label: "Email" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Hit the counter once per session (store in sessionStorage)
    const hit = async () => {
      try {
        const key = "kd_visited";
        const method = sessionStorage.getItem(key) ? "GET" : "POST";
        if (method === "POST") sessionStorage.setItem(key, "1");
        const res = await fetch("/api/visitors", { method });
        const data = await res.json();
        setCount(data.count);
      } catch {
        setCount(null);
      }
    };
    hit();
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
      <Users className="w-3 h-3" />
      {count.toLocaleString()} visitors
    </span>
  );
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="border-t border-border bg-muted/20"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground font-mono text-sm">
                kiqa<span className="text-primary">-dev</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kristian Gjergji — building the future of apps, one commit at a time. 🚀
            </p>
          </div>

          {/* Nav links — buttons, no hash anchors */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl glass border border-border hover:border-primary/40 hover:bg-primary/10 transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground font-mono">@rashica07</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              © {new Date().getFullYear()} Kristian Gjergji — Built with
              <Heart className="w-3 h-3 text-red-400 inline fill-current" />
              and lots of caffeine
            </p>
            <VisitorCounter />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs font-mono text-muted-foreground">
              Next.js + React + TypeScript ⚡
            </p>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="p-2 rounded-lg glass border border-border hover:border-primary/40 hover:bg-primary/10 transition-all hover:scale-110"
            >
              <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
