"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Code,
  Users,
  Loader2,
} from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface GitHubData {
  user: {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    total_stars: number;
    total_forks: number;
    created_at: string;
  };
  languages: { name: string; percentage: number }[];
  commitHours: number[];
  topRepos: Array<{
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
  }>;
}

interface LeetCodeData {
  username: string;
  ranking: number;
  problemsSolved: { easy: number; medium: number; hard: number; total: number };
  submissions: { easy: number; medium: number; hard: number; total: number };
  acceptanceRate: number;
  contest: {
    rating: number;
    badge: string;
    attendedContests: number;
    globalRanking: number;
  } | null;
}

const langColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Jupyter: "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  SQL: "#e38c00",
  C: "#555555",
  "C++": "#f34b7d",
};

function useAnimatedNumber(target: number, duration = 800) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { ref, display };
}

function StatNumber({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, display } = useAnimatedNumber(value);
  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export default function EngineeringActivity() {
  const [gh, setGh] = useState<GitHubData | null>(null);
  const [lc, setLc] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetch_ = async () => {
      try {
        const [ghRes, lcRes] = await Promise.all([
          fetch("/api/github-stats"),
          fetch("/api/leetcode-stats"),
        ]);
        if (!ghRes.ok || !lcRes.ok) throw new Error("fetch failed");
        const [ghData, lcData] = await Promise.all([
          ghRes.json(),
          lcRes.json(),
        ]);
        if (!cancelled) {
          setGh(ghData);
          setLc(lcData);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "unknown");
          setLoading(false);
        }
      }
    };
    fetch_();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="stats" className="px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-16"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            Activity
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Engineering activity
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Live data fetched directly from GitHub and LeetCode. All numbers are
            real.
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center gap-2.5 py-16 text-sm text-muted-foreground">
            <Loader2 size={14} className="animate-spin" />
            <span className="font-mono text-xs">Fetching live data...</span>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-border/50 p-5 text-sm text-muted-foreground">
            <p className="font-mono text-xs text-red-400/70">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-xs text-foreground/60 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && gh && lc && (
          <div className="space-y-6">
            {/* GitHub Section */}
            <motion.div
              className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Github
                    size={16}
                    strokeWidth={1.5}
                    className="text-muted-foreground/50"
                  />
                  <span className="text-sm font-medium">GitHub</span>
                  <span className="font-mono text-xs text-muted-foreground/40">
                    {gh.user.login}
                  </span>
                </div>
                <a
                  href={`https://github.com/${gh.user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                >
                  View profile
                  <ExternalLink size={11} strokeWidth={1.5} />
                </a>
              </div>

              {/* Stats grid */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  icon={<Code size={13} strokeWidth={1.5} />}
                  label="Repos"
                  value={<StatNumber value={gh.user.public_repos} />}
                />
                <StatCard
                  icon={<Star size={13} strokeWidth={1.5} />}
                  label="Stars"
                  value={<StatNumber value={gh.user.total_stars} />}
                />
                <StatCard
                  icon={<Users size={13} strokeWidth={1.5} />}
                  label="Followers"
                  value={<StatNumber value={gh.user.followers} />}
                />
                <StatCard
                  icon={<GitFork size={13} strokeWidth={1.5} />}
                  label="Forks"
                  value={<StatNumber value={gh.user.total_forks} />}
                />
              </div>

              {/* Top repos */}
              {gh.topRepos && gh.topRepos.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/40">
                    Repositories
                  </p>
                  <div className="space-y-2">
                    {gh.topRepos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-lg border border-border/30 p-3 transition-colors hover:border-border/60"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-[13px] font-medium">
                              {repo.name}
                            </span>
                            {repo.language && (
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/50">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor:
                                      langColors[repo.language] || "#666",
                                  }}
                                />
                                {repo.language}
                              </span>
                            )}
                          </div>
                          {repo.description && (
                            <p className="mt-0.5 truncate text-[12px] text-muted-foreground/50">
                              {repo.description}
                            </p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground/40">
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1">
                              <Star size={11} strokeWidth={1.5} />
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1">
                              <GitFork size={11} strokeWidth={1.5} />
                              {repo.forks_count}
                            </span>
                          )}
                          <span className="hidden sm:inline">
                            {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Language distribution */}
              {gh.languages.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/40">
                    Languages
                  </p>
                  <div className="space-y-2">
                    {gh.languages.slice(0, 5).map((lang) => (
                      <div key={lang.name} className="flex items-center gap-3">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              langColors[lang.name] || "#666",
                          }}
                        />
                        <span className="w-20 shrink-0 text-xs text-muted-foreground/70">
                          {lang.name}
                        </span>
                        <div className="h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor:
                                langColors[lang.name] || "#666",
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono text-[11px] text-muted-foreground/40">
                          {lang.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commit activity */}
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/40">
                  Commit activity (IST)
                </p>
                <div className="flex items-end gap-[2px] h-14">
                  {gh.commitHours.map((count, h) => {
                    const max = Math.max(...gh.commitHours, 1);
                    const height =
                      max > 0 ? Math.max((count / max) * 100, 4) : 4;
                    return (
                      <div
                        key={h}
                        className="flex-1 rounded-t-sm bg-secondary transition-colors hover:bg-muted-foreground/20"
                        style={{ height: `${height}%` }}
                        title={`${String(h).padStart(2, "0")}:00 — ${count} events`}
                      />
                    );
                  })}
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="font-mono text-[9px] text-muted-foreground/25">
                    00
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/25">
                    12
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground/25">
                    23
                  </span>
                </div>
              </div>
            </motion.div>

            {/* LeetCode Section */}
            <motion.div
              className="rounded-xl border border-border/50 bg-card/30 p-6 sm:p-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-[#FFA116]"
                    fill="currentColor"
                  >
                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.077 1.365-.617 0-.293-.129-.444-.3-.615l-2.809-2.714c-.759-.737-1.76-1.138-2.82-1.138-1.004 0-1.956.375-2.668 1.078L5.063 9.837c-.724.712-1.135 1.662-1.135 2.663 0 1.003.415 1.953 1.14 2.67l4.362 4.35c.712.712 1.664 1.078 2.668 1.078 1.005 0 1.953-.358 2.67-1.07l2.809-2.714c.17-.17.3-.324.3-.615 0-.694-.852-1.132-1.365-.617z" />
                    <path d="M20.745 11.07l-4.362-4.35c-.712-.712-1.664-1.078-2.668-1.078-1.004 0-1.953.358-2.67 1.07L8.136 9.426c-.17.17-.3.324-.3.615 0 .694.852 1.132 1.365.617l2.697-2.607c.466-.467 1.111-.662 1.823-.662s1.357.195 1.824.662l4.332 4.363c.467.467.702 1.15.702 1.863s-.235 1.357-.702 1.824l-4.319 4.38c-.467.467-1.125.645-1.837.645s-1.357-.195-1.823-.662l-2.697-2.606c-.514-.515-1.365-.077-1.365.617 0 .293.129.444.3.615l2.809 2.714c.759.737 1.76 1.138 2.82 1.138 1.004 0 1.956-.375 2.668-1.078l4.362-4.35c.724-.712 1.135-1.662 1.135-2.663 0-1.003-.415-1.953-1.14-2.67z" />
                  </svg>
                  <span className="text-sm font-medium">LeetCode</span>
                  <span className="font-mono text-xs text-muted-foreground/40">
                    {lc.username}
                  </span>
                </div>
                <a
                  href={`https://leetcode.com/u/${lc.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                >
                  View profile
                  <ExternalLink size={11} strokeWidth={1.5} />
                </a>
              </div>

              {/* Stats grid */}
              <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
                <StatCard
                  label="Solved"
                  value={
                    <StatNumber value={lc.problemsSolved.total} />
                  }
                />
                <StatCard
                  label="Ranking"
                  value={
                    <StatNumber value={lc.ranking} prefix="#" />
                  }
                />
                <StatCard
                  label="Contest"
                  value={
                    lc.contest?.rating ? (
                      <StatNumber value={lc.contest.rating} />
                    ) : (
                      <span className="text-muted-foreground/30">
                        N/A
                      </span>
                    )
                  }
                />
              </div>

              {/* Problem breakdown */}
              <div className="mb-6">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/40">
                  Problem breakdown
                </p>
                <div className="space-y-3">
                  {(["Easy", "Medium", "Hard"] as const).map((diff) => {
                    const key = diff.toLowerCase() as
                      | "easy"
                      | "medium"
                      | "hard";
                    const count = lc.problemsSolved[key];
                    const total = Math.max(lc.problemsSolved.total, 1);
                    const pct = Math.round((count / total) * 100);
                    const colors = {
                      Easy: "bg-emerald-500/70",
                      Medium: "bg-amber-500/70",
                      Hard: "bg-red-500/70",
                    };
                    const textColors = {
                      Easy: "text-emerald-400/80",
                      Medium: "text-amber-400/80",
                      Hard: "text-red-400/80",
                    };
                    return (
                      <div
                        key={diff}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`w-12 text-xs font-mono font-medium ${textColors[diff]}`}
                        >
                          {diff}
                        </span>
                        <div className="h-1 w-full max-w-[280px] overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className={`h-full rounded-full ${colors[diff]}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono text-[12px] text-muted-foreground/50">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contest info */}
              {lc.contest && lc.contest.attendedContests > 0 && (
                <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-5">
                  <div>
                    <p className="font-mono text-sm">
                      {lc.contest.attendedContests}
                    </p>
                    <p className="text-[11px] text-muted-foreground/40">
                      Contests attended
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-sm">
                      #
                      {(lc.contest.globalRanking || 0).toLocaleString()}
                    </p>
                    <p className="text-[11px] text-muted-foreground/40">
                      Global ranking
                    </p>
                  </div>
                  {lc.contest.badge && (
                    <div>
                      <p className="text-sm">{lc.contest.badge}</p>
                      <p className="text-[11px] text-muted-foreground/40">
                        Badge
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-sm">
                      {lc.contest.rating}
                    </p>
                    <p className="text-[11px] text-muted-foreground/40">
                      Current rating
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/30 bg-secondary/20 p-3.5">
      <div className="flex items-center gap-1.5 text-[13px]">{value}</div>
      <p className="mt-1 text-[11px] text-muted-foreground/40">{label}</p>
    </div>
  );
}
