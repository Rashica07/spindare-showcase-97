"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, Users, BookOpen, ExternalLink, GitCommit } from "lucide-react";
import { PopUp } from "@/components/AnimatedText";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Dart: "bg-sky-400",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
};

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch("https://api.github.com/users/rashica07"),
          fetch("https://api.github.com/users/rashica07/repos?sort=updated&per_page=6"),
        ]);
        if (uRes.ok) setUser(await uRes.json());
        if (rRes.ok) {
          const data: Repo[] = await rRes.json();
          setRepos(data.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4));
        }
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label">🐙 Open Source</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 mb-3">GitHub Activity</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Real commits, real repos. Everything is tracked on{" "}
            <a href="https://github.com/rashica07" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              github.com/rashica07
            </a>
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto mb-10">
          {[
            { icon: BookOpen, label: "Public Repos", value: loading ? "—" : user?.public_repos ?? "—", color: "text-blue-400" },
            { icon: Users, label: "Followers", value: loading ? "—" : user?.followers ?? "—", color: "text-purple-400" },
            { icon: GitCommit, label: "Following", value: loading ? "—" : user?.following ?? "—", color: "text-green-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <PopUp key={label}>
              <div className="glass rounded-2xl p-4 border border-border/50 text-center">
                <Icon className={`w-4 h-4 mx-auto mb-2 ${color}`} />
                <div className="text-2xl font-extrabold text-foreground mb-1">{value}</div>
                <div className="text-[10px] text-muted-foreground">{label}</div>
              </div>
            </PopUp>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6 border border-border/50 mb-8 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Contribution Calendar</p>
            <a
              href="https://github.com/rashica07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              View on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="w-full overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/6366f1/rashica07"
              alt="GitHub contribution chart for rashica07"
              className="w-full min-w-[600px] rounded-lg opacity-90 dark:invert dark:opacity-70"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Top repos */}
        {repos.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {repos.map((repo, i) => (
              <PopUp key={repo.name} delay={i * 0.07}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 border border-border/50 hover:border-primary/40 transition-all hover-lift flex flex-col gap-3 h-full group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{repo.name}</p>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-auto">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${LANG_COLOR[repo.language] ?? "bg-gray-400"}`} />
                        <span className="text-[10px] text-muted-foreground">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="w-3 h-3" />
                      <span className="text-[10px]">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <GitFork className="w-3 h-3" />
                      <span className="text-[10px]">{repo.forks_count}</span>
                    </div>
                  </div>
                </a>
              </PopUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
