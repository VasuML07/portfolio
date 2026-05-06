"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Code,
  Swords,
  Award,
  BookOpen,
  BarChart3,
  ExternalLink,
  Star,
  GitFork,
  Users,
  Loader2,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const platformIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Github, Code, Swords, Award, BookOpen, BarChart3,
};

interface GitHubData {
  user: { login: string; public_repos: number; followers: number; following: number; total_stars: number; total_forks: number; created_at: string };
  languages: { name: string; percentage: number }[];
  commitHours: number[];
  eventCount: number;
}

interface LeetCodeData {
  username: string;
  ranking: number;
  problemsSolved: { easy: number; medium: number; hard: number; total: number };
  submissions: { easy: number; medium: number; hard: number; total: number };
  acceptanceRate: number;
  contest: { rating: number; badge: string; attendedContests: number; globalRanking: number } | null;
}

const langColors: Record<string, string> = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", Jupyter: "#DA5B0B",
  HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051", SQL: "#e38c00", C: "#555555",
};

function useAnimatedNumber(target: number, duration: number = 800) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { ref, display };
}

function StatNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, display } = useAnimatedNumber(value);
  return <span ref={ref} className="font-mono">{display.toLocaleString()}{suffix}</span>;
}

export default function CodingProfiles() {
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [lc, setLc] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetch_ = async () => {
      try {
        const [ghRes, lcRes] = await Promise.all([fetch("/api/github-stats"), fetch("/api/leetcode-stats")]);
        if (!ghRes.ok || !lcRes.ok) throw new Error("fetch failed");
        const [ghData, lcData] = await Promise.all([ghRes.json(), lcRes.json()]);
        if (!cancelled) { setGh(ghData); setLc(lcData); setLoading(false); }
      } catch (e) {
        if (!cancelled) { setError(e instanceof Error ? e.message : "unknown"); setLoading(false); }
      }
    };
    fetch_();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="stats" className="px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Activity</p>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Coding profiles</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Live data from competitive programming platforms and GitHub. All numbers are real and fetched directly from each platform&apos;s API.
          </p>
        </motion.div>

        <motion.div
          className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {portfolioData.codingPlatforms.map((p) => {
            const Icon = platformIcons[p.icon] || Code;
            return (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-muted-foreground/20">
                <Icon size={16} strokeWidth={1.5} className="text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium">{p.name}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground/60">{p.username}</p>
                </div>
                <ExternalLink size={12} strokeWidth={1.5} className="ml-auto shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60" />
              </a>
            );
          })}
        </motion.div>

        {loading && (
          <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
            <Loader2 size={14} className="animate-spin" />
            <span className="font-mono text-xs">Fetching live data...</span>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <p className="font-mono text-xs text-red-400/80">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-2 text-xs text-primary hover:underline">Retry</button>
          </div>
        )}

        {!loading && !error && gh && lc && (
          <div className="space-y-6">
            {/* GitHub */}
            <motion.div
              className="rounded-xl border border-border p-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Github size={15} strokeWidth={1.5} className="text-muted-foreground/60" />
                <span className="text-sm font-medium">GitHub</span>
                <span className="font-mono text-xs text-muted-foreground/50">{gh.user.login}</span>
                <a href={`https://github.com/${gh.user.login}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-muted-foreground/40 transition-colors hover:text-muted-foreground">
                  <ExternalLink size={13} strokeWidth={1.5} />
                </a>
              </div>
              <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MiniStat icon={<Code size={13} strokeWidth={1.5} />} label="Repos" value={gh.user.public_repos} />
                <MiniStat icon={<Star size={13} strokeWidth={1.5} />} label="Stars" value={gh.user.total_stars} />
                <MiniStat icon={<Users size={13} strokeWidth={1.5} />} label="Followers" value={gh.user.followers} />
                <MiniStat icon={<GitFork size={13} strokeWidth={1.5} />} label="Forks" value={gh.user.total_forks} />
              </div>
              {gh.languages.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground/50">Languages</p>
                  <div className="space-y-2">
                    {gh.languages.slice(0, 5).map((lang) => (
                      <div key={lang.name} className="flex items-center gap-3">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: langColors[lang.name] || "#666" }} />
                        <span className="w-20 shrink-0 text-xs text-muted-foreground">{lang.name}</span>
                        <div className="h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: langColors[lang.name] || "#666" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground/50">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground/50">Commit activity (IST)</p>
                <div className="flex items-end gap-[2px] h-12">
                  {gh.commitHours.map((count, h) => {
                    const max = Math.max(...gh.commitHours, 1);
                    const height = max > 0 ? Math.max((count / max) * 100, 3) : 3;
                    return (
                      <div key={h} className="flex-1 rounded-t-sm bg-primary/25 transition-colors hover:bg-primary/50" style={{ height: `${height}%` }} title={`${String(h).padStart(2, "0")}:00 — ${count} events`} />
                    );
                  })}
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="font-mono text-[9px] text-muted-foreground/30">00</span>
                  <span className="font-mono text-[9px] text-muted-foreground/30">12</span>
                  <span className="font-mono text-[9px] text-muted-foreground/30">23</span>
                </div>
              </div>
            </motion.div>

            {/* LeetCode */}
            <motion.div
              className="rounded-xl border border-border p-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-5 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] text-[#FFA116]" fill="currentColor">
                  <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.077 1.365-.617 0-.293-.129-.444-.3-.615l-2.809-2.714c-.759-.737-1.76-1.138-2.82-1.138-1.004 0-1.956.375-2.668 1.078L5.063 9.837c-.724.712-1.135 1.662-1.135 2.663 0 1.003.415 1.953 1.14 2.67l4.362 4.35c.712.712 1.664 1.078 2.668 1.078 1.005 0 1.953-.358 2.67-1.07l2.809-2.714c.17-.17.3-.324.3-.615 0-.694-.852-1.132-1.365-.617z" />
                  <path d="M20.745 11.07l-4.362-4.35c-.712-.712-1.664-1.078-2.668-1.078-1.004 0-1.953.358-2.67 1.07L8.136 9.426c-.17.17-.3.324-.3.615 0 .694.852 1.132 1.365.617l2.697-2.607c.466-.467 1.111-.662 1.823-.662s1.357.195 1.824.662l4.332 4.363c.467.467.702 1.15.702 1.863s-.235 1.357-.702 1.824l-4.319 4.38c-.467.467-1.125.645-1.837.645s-1.357-.195-1.823-.662l-2.697-2.606c-.514-.515-1.365-.077-1.365.617 0 .293.129.444.3.615l2.809 2.714c.759.737 1.76 1.138 2.82 1.138 1.004 0 1.956-.375 2.668-1.078l4.362-4.35c.724-.712 1.135-1.662 1.135-2.663 0-1.003-.415-1.953-1.14-2.67z" />
                </svg>
                <span className="text-sm font-medium">LeetCode</span>
                <span className="font-mono text-xs text-muted-foreground/50">{lc.username}</span>
                <a href={`https://leetcode.com/u/${lc.username}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-muted-foreground/40 transition-colors hover:text-muted-foreground">
                  <ExternalLink size={13} strokeWidth={1.5} />
                </a>
              </div>
              <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MiniStat label="Solved" value={lc.problemsSolved.total} />
                <MiniStat label="Acceptance" value={lc.acceptanceRate} suffix="%" />
                <MiniStat label="Ranking" value={lc.ranking} prefix="#" />
                <MiniStat label="Contest" value={lc.contest?.rating || 0} fallback="N/A" />
              </div>
              <div>
                <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground/50">Problem breakdown</p>
                <div className="space-y-2.5">
                  {(["Easy", "Medium", "Hard"] as const).map((diff) => {
                    const key = diff.toLowerCase() as "easy" | "medium" | "hard";
                    const count = lc.problemsSolved[key];
                    const total = Math.max(lc.problemsSolved.total, 1);
                    const pct = Math.round((count / total) * 100);
                    const colors = { Easy: "bg-emerald-500", Medium: "bg-amber-500", Hard: "bg-red-500" };
                    const textColors = { Easy: "text-emerald-400", Medium: "text-amber-400", Hard: "text-red-400" };
                    return (
                      <div key={diff} className="flex items-center gap-3">
                        <span className={`w-10 text-xs font-mono ${textColors[diff]}`}>{diff}</span>
                        <div className="h-1 w-full max-w-[240px] overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className={`h-full rounded-full ${colors[diff]}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground/60 w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {lc.contest && lc.contest.attendedContests > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                  <div>
                    <p className="font-mono text-sm">{lc.contest.attendedContests}</p>
                    <p className="text-[11px] text-muted-foreground/50">Contests</p>
                  </div>
                  <div>
                    <p className="font-mono text-sm">#{(lc.contest.globalRanking || 0).toLocaleString()}</p>
                    <p className="text-[11px] text-muted-foreground/50">Global rank</p>
                  </div>
                  {lc.contest.badge && (
                    <div>
                      <p className="text-sm">{lc.contest.badge}</p>
                      <p className="text-[11px] text-muted-foreground/50">Badge</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value, prefix = "", suffix = "", fallback }: { icon?: React.ReactNode; label: string; value: number; prefix?: string; suffix?: string; fallback?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/50 p-3">
      {fallback ? (
        <p className="font-mono text-sm text-muted-foreground/40">{fallback}</p>
      ) : (
        <p className="font-mono text-sm">{prefix}<StatNumber value={value} />{suffix}</p>
      )}
      <p className="mt-0.5 text-[11px] text-muted-foreground/50">{label}</p>
    </div>
  );
}
