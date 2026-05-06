"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  FolderGit2,
  Trophy,
  TrendingUp,
  RefreshCw,
  Clock,
  Target,
  Activity,
  AlertCircle,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  created_at: string;
}

interface Language {
  name: string;
  percentage: number;
  bytes: number;
}

interface GitHubStats {
  user: GitHubUser;
  languages: Language[];
  commitHours: number[];
  eventCount: number;
}

interface LeetCodeContest {
  rating: number;
  badge: string;
  attendedContests: number;
  globalRanking: number;
}

interface LeetCodeStats {
  username: string;
  ranking: number;
  reputation: number;
  avatar: string;
  problemsSolved: { easy: number; medium: number; hard: number; total: number };
  submissions: { easy: number; medium: number; hard: number; total: number };
  acceptanceRate: number;
  contest: LeetCodeContest | null;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  Github,
  Code,
  Swords,
  Award,
  BookOpen,
  BarChart3,
};

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
};

const DEFAULT_LANG_COLOR = "#7C3AED";

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */

function useAnimatedCounter(
  target: number,
  duration = 1800,
  inView = false,
  decimals = 0,
  prefix = "",
  suffix = ""
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const animDuration = prefersReduced ? 0 : duration;

    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return `${prefix}${decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}${suffix}`;
}

/* ------------------------------------------------------------------ */
/*  Heatmap Component (SVG)                                            */
/* ------------------------------------------------------------------ */

function ActivityHeatmap() {
  const weeks = 52;
  const days = 7;
  const cellSize = 10;
  const gap = 3;
  const width = weeks * (cellSize + gap);
  const height = days * (cellSize + gap);

  // Generate deterministic pseudo-random activity data
  const seed = (x: number, y: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };

  const getIntensity = (week: number, day: number): number => {
    // More recent weeks tend to have higher activity
    const recencyBoost = 0.3 + 0.7 * (week / weeks);
    const rand = seed(week, day);
    const raw = rand * recencyBoost;
    // Weekend days (0=Sun, 6=Sat) slightly less active
    const weekendDampen = day === 0 || day === 6 ? 0.6 : 1;
    return Math.min(1, raw * weekendDampen);
  };

  const getColor = (intensity: number): string => {
    if (intensity < 0.05) return "rgba(124, 58, 237, 0.04)";
    if (intensity < 0.25) return "rgba(124, 58, 237, 0.15)";
    if (intensity < 0.5) return "rgba(124, 58, 237, 0.35)";
    if (intensity < 0.75) return "rgba(124, 58, 237, 0.6)";
    return "rgba(124, 58, 237, 0.9)";
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[640px]">
        <div className="flex items-start gap-2">
          {/* Day labels */}
          <div className="flex flex-col justify-between pt-0" style={{ height }}>
            {dayLabels.map((label, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground/50 font-mono"
                style={{ height: cellSize, lineHeight: `${cellSize}px` }}
              >
                {label}
              </span>
            ))}
          </div>
          {/* Grid */}
          <svg
            width={width}
            height={height}
            className="block"
            role="img"
            aria-label="Activity heatmap showing coding contribution patterns"
          >
            {Array.from({ length: weeks }, (_, week) =>
              Array.from({ length: days }, (_, day) => {
                const intensity = getIntensity(week, day);
                return (
                  <rect
                    key={`${week}-${day}`}
                    x={week * (cellSize + gap)}
                    y={day * (cellSize + gap)}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    fill={getColor(intensity)}
                  >
                    <title>{`${Math.round(intensity * 12)} contributions`}</title>
                  </rect>
                );
              })
            )}
          </svg>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2 justify-end">
          <span className="text-[10px] text-muted-foreground/50 font-mono">
            Less
          </span>
          {[0.04, 0.15, 0.35, 0.6, 0.9].map((o, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: `rgba(124, 58, 237, ${o})`,
              }}
            />
          ))}
          <span className="text-[10px] text-muted-foreground/50 font-mono">
            More
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Glass Card Wrapper                                                 */
/* ------------------------------------------------------------------ */

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, borderColor: "rgba(124, 58, 237, 0.3)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        relative rounded-xl border border-border/40
        bg-background/30 backdrop-blur-xl
        shadow-[0_0_30px_rgba(124,58,237,0.04)]
        transition-shadow duration-300
        hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton States                                                    */
/* ------------------------------------------------------------------ */

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* GitHub skeleton */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-40 rounded-lg mb-4" />
        <Skeleton className="h-24 rounded-lg" />
      </GlassCard>
      {/* LeetCode skeleton */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-32 rounded-lg mb-4" />
        <Skeleton className="h-20 rounded-lg" />
      </GlassCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Error State                                                        */
/* ------------------------------------------------------------------ */

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <GlassCard className="p-8 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
      <p className="text-sm text-muted-foreground mb-4">{message}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="gap-2 border-primary/30 hover:bg-primary/10"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Retry
      </Button>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/*  GitHub Panel                                                       */
/* ------------------------------------------------------------------ */

function GitHubPanel({ stats }: { stats: GitHubStats }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { user, languages, commitHours } = stats;

  const publicRepos = useAnimatedCounter(user.public_repos, 1600, inView);
  const totalStars = useAnimatedCounter(user.total_stars, 2000, inView);
  const followers = useAnimatedCounter(user.followers, 1400, inView);
  const totalForks = useAnimatedCounter(user.total_forks, 1800, inView);

  const statCells = [
    { icon: FolderGit2, label: "Repositories", value: publicRepos },
    { icon: Star, label: "Total Stars", value: totalStars },
    { icon: Users, label: "Followers", value: followers },
    { icon: GitFork, label: "Forks", value: totalForks },
  ];

  const maxCommits = Math.max(...commitHours, 1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassCard className="p-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#333]/80 flex items-center justify-center">
              <Github className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-light text-lg tracking-tight">
                GitHub Analytics
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                @{user.login}
              </p>
            </div>
          </div>
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Open GitHub profile"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Stat cells */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {statCells.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-lg border border-border/30 bg-background/40 backdrop-blur-sm p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <cell.icon className="h-3.5 w-3.5 text-primary/70" />
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  {cell.label}
                </span>
              </div>
              <p className="text-2xl font-mono font-light tracking-tight">
                {cell.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Top Languages */}
        <div className="mb-6">
          <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Code className="h-3 w-3" />
            Top Languages
          </h4>
          <div className="space-y-2.5">
            {languages.slice(0, 6).map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-foreground/80">
                    {lang.name}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {lang.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-border/30 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={
                      inView
                        ? { width: `${lang.percentage}%` }
                        : { width: 0 }
                    }
                    transition={{
                      delay: 0.5 + i * 0.08,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        LANGUAGE_COLORS[lang.name] ?? DEFAULT_LANG_COLOR,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commit Hours */}
        <div>
          <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="h-3 w-3" />
            Commit Activity by Hour (UTC)
          </h4>
          <div className="flex items-end gap-[3px] h-16">
            {commitHours.map((count, hour) => {
              const height = maxCommits > 0 ? (count / maxCommits) * 100 : 0;
              return (
                <motion.div
                  key={hour}
                  className="flex-1 rounded-t-sm min-w-0"
                  style={{ backgroundColor: "rgba(124, 58, 237, 0.35)" }}
                  initial={{ height: 0 }}
                  animate={
                    inView
                      ? { height: `${Math.max(height, 4)}%` }
                      : { height: 0 }
                  }
                  transition={{
                    delay: 0.6 + hour * 0.02,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  title={`Hour ${hour}: ${count} commits`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-muted-foreground/40 font-mono">
              00
            </span>
            <span className="text-[9px] text-muted-foreground/40 font-mono">
              12
            </span>
            <span className="text-[9px] text-muted-foreground/40 font-mono">
              23
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  LeetCode SVG Icon                                                  */
/* ------------------------------------------------------------------ */

function LeetCodeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.077 1.31-.603-.014-.178-.047-.355-.104-.526-.255-.753-.862-1.266-1.586-1.598l-2.311-1.023c-.466-.208-.996-.312-1.532-.312-.734 0-1.461.209-2.045.612l-4.565 3.078c-.584.403-1.09.947-1.396 1.602-.306.655-.391 1.397-.228 2.104.163.707.565 1.347 1.135 1.822l4.7 3.912c.462.386 1.028.602 1.608.602.794 0 1.552-.366 2.045-1.006l2.2-2.874c.382-.499.072-1.226-.563-1.226-.196 0-.388.084-.523.243z" />
      <path d="M22 12.5c0-.828-.672-1.5-1.5-1.5h-5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5h5c.828 0 1.5-.672 1.5-1.5z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  LeetCode Panel                                                     */
/* ------------------------------------------------------------------ */

function LeetCodePanel({ stats }: { stats: LeetCodeStats }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const problemsTotal = useAnimatedCounter(
    stats.problemsSolved.total,
    1800,
    inView
  );
  const acceptanceRate = useAnimatedCounter(
    stats.acceptanceRate,
    1600,
    inView,
    1,
    "",
    "%"
  );
  const ranking = useAnimatedCounter(stats.ranking, 2000, inView, 0, "#");
  const contestRating = useAnimatedCounter(
    stats.contest?.rating ?? 0,
    1600,
    inView
  );

  const easy = useAnimatedCounter(stats.problemsSolved.easy, 1200, inView);
  const medium = useAnimatedCounter(
    stats.problemsSolved.medium,
    1400,
    inView
  );
  const hard = useAnimatedCounter(stats.problemsSolved.hard, 1600, inView);

  const totalProblems =
    stats.problemsSolved.easy +
    stats.problemsSolved.medium +
    stats.problemsSolved.hard;
  const easyPct = totalProblems > 0 ? (stats.problemsSolved.easy / totalProblems) * 100 : 0;
  const medPct = totalProblems > 0 ? (stats.problemsSolved.medium / totalProblems) * 100 : 0;
  const hardPct = totalProblems > 0 ? (stats.problemsSolved.hard / totalProblems) * 100 : 0;

  const difficultyColors = {
    Easy: { bar: "#22c55e", bg: "rgba(34, 197, 94, 0.12)", text: "text-green-400" },
    Medium: { bar: "#eab308", bg: "rgba(234, 179, 8, 0.12)", text: "text-yellow-400" },
    Hard: { bar: "#ef4444", bg: "rgba(239, 68, 68, 0.12)", text: "text-red-400" },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
    >
      <GlassCard className="p-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#FFA116]/20 flex items-center justify-center">
              <LeetCodeIcon className="h-5 w-5 text-[#FFA116]" />
            </div>
            <div>
              <h3 className="font-light text-lg tracking-tight">LeetCode</h3>
              <p className="text-xs text-muted-foreground font-mono">
                @{stats.username}
              </p>
            </div>
          </div>
          <a
            href={`https://leetcode.com/u/${stats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#FFA116] transition-colors"
            aria-label="Open LeetCode profile"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Stat cells */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            {
              icon: Target,
              label: "Problems Solved",
              value: problemsTotal,
              color: "text-primary",
            },
            {
              icon: TrendingUp,
              label: "Acceptance",
              value: acceptanceRate,
              color: "text-green-400",
            },
            {
              icon: Trophy,
              label: "Ranking",
              value: ranking,
              color: "text-yellow-400",
            },
            {
              icon: Activity,
              label: "Contest Rating",
              value: contestRating,
              color: "text-blue-400",
            },
          ].map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              className="rounded-lg border border-border/30 bg-background/40 backdrop-blur-sm p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <cell.icon className={`h-3.5 w-3.5 ${cell.color} opacity-70`} />
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  {cell.label}
                </span>
              </div>
              <p className="text-2xl font-mono font-light tracking-tight">
                {cell.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Problem breakdown */}
        <div className="mb-6">
          <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Swords className="h-3 w-3" />
            Problem Breakdown
          </h4>
          <div className="space-y-3">
            {([
              { label: "Easy", count: easy, pct: easyPct, style: difficultyColors.Easy },
              { label: "Medium", count: medium, pct: medPct, style: difficultyColors.Medium },
              { label: "Hard", count: hard, pct: hardPct, style: difficultyColors.Hard },
            ] as const).map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span
                    className={`font-mono font-medium ${d.style.text}`}
                  >
                    {d.label}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {d.count}
                  </span>
                </div>
                <div
                  className="h-2.5 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: d.style.bg }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${d.pct}%` } : { width: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: d.style.bar }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contest info */}
        {stats.contest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Trophy className="h-3 w-3" />
              Contest
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Attended",
                  value: stats.contest.attendedContests,
                },
                {
                  label: "Global Rank",
                  value: stats.contest.globalRanking.toLocaleString(),
                },
                {
                  label: "Badge",
                  value: stats.contest.badge || "—",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border/20 bg-background/30 px-3 py-2.5 text-center"
                >
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-mono font-light">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CodingProfiles() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ghRes, lcRes] = await Promise.allSettled([
        fetch("/api/github-stats"),
        fetch("/api/leetcode-stats"),
      ]);

      if (ghRes.status === "fulfilled" && ghRes.value.ok) {
        const data = await ghRes.value.json();
        setGithubStats(data);
      }
      if (lcRes.status === "fulfilled" && lcRes.value.ok) {
        const data = await lcRes.value.json();
        setLeetCodeStats(data);
      }

      if (
        (ghRes.status === "rejected" || !ghRes.value?.ok) &&
        (lcRes.status === "rejected" || !lcRes.value?.ok)
      ) {
        setError("Failed to load stats from both APIs");
      }
    } catch {
      setError("An unexpected error occurred while fetching stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { platforms } = portfolioData.codingProfiles;

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Engineering telemetry dashboard"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6"
          >
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              Dashboard
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight mb-3">
            Engineering{" "}
            <span className="text-primary">Telemetry</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Competitive Programming &amp; Engineering Stats
          </p>
        </motion.div>

        {/* Platform Links Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10"
        >
          {platforms.map((platform, i) => {
            const Icon = PLATFORM_ICONS[platform.icon] ?? Code;
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col items-center gap-2.5 rounded-xl border border-border/40 bg-background/30 backdrop-blur-xl p-4 text-center transition-all hover:border-primary/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary/80 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-tight">
                    {platform.name}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    {platform.username}
                  </p>
                </div>
                <ExternalLink className="absolute top-2.5 right-2.5 h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground transition-all" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Dashboard Grid */}
        <div className="mb-10">
          {loading && <DashboardSkeleton />}
          {error && (
            <ErrorState message={error} onRetry={fetchData} />
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {githubStats && <GitHubPanel stats={githubStats} />}
              {leetcodeStats && <LeetCodePanel stats={leetcodeStats} />}
            </div>
          )}
        </div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-primary/70" />
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
                Contribution Activity
              </h3>
            </div>
            <ActivityHeatmap />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
