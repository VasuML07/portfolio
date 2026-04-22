"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  Trophy,
  Target,
  BarChart3,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface GitHubStats {
  user: {
    login: string;
    name: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    total_stars: number;
    total_forks: number;
    created_at: string;
  };
  languages: { name: string; percentage: number; bytes: number }[];
  commitHours: number[];
}

interface LeetCodeStats {
  username: string;
  ranking: number;
  reputation: number;
  problemsSolved: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  submissions: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  acceptanceRate: number;
  contest: {
    rating: number;
    badge: string;
    attendedContests: number;
    globalRanking: number;
  } | null;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  SQL: "#e38c00",
  Dart: "#00B4AB",
};

const difficultyColors = {
  Easy: { bg: "bg-green-500/10", text: "text-green-400", bar: "bg-green-500" },
  Medium: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    bar: "bg-yellow-500",
  },
  Hard: { bg: "bg-red-500/10", text: "text-red-400", bar: "bg-red-500" },
};

const CodingProfiles = () => {
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [leetcodeData, setLeetCodeData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ghRes, lcRes] = await Promise.all([
          fetch("/api/github-stats"),
          fetch("/api/leetcode-stats"),
        ]);

        if (!ghRes.ok || !lcRes.ok) {
          throw new Error("Failed to fetch stats");
        }

        const [gh, lc] = await Promise.all([ghRes.json(), lcRes.json()]);
        setGithubData(gh);
        setLeetCodeData(lc);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="stats" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Coding <span className="text-blue-500">Profiles</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Live statistics from my coding platforms — always up to date.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto" />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-3 text-white/50 font-mono text-sm">
              Fetching live stats...
            </span>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 font-mono text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/40 transition-all text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && githubData && leetcodeData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GitHub Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-black border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* GitHub Header */}
                <div className="flex items-center gap-3 p-5 border-b border-white/10 bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">
                      GitHub Analytics
                    </h3>
                    <p className="text-white/40 text-xs font-mono">
                      {githubData.user.login}
                    </p>
                  </div>
                  <a
                    href={`https://github.com/${githubData.user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                </div>

                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-blue-400 text-lg font-semibold">
                        {githubData.user.public_repos}
                      </div>
                      <div className="text-white/40 text-xs font-mono mt-1">
                        Public Repos
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-blue-400 text-lg font-semibold">
                        {githubData.user.total_stars}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-mono mt-1">
                        <Star className="w-3 h-3" /> Stars
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-blue-400 text-lg font-semibold">
                        {githubData.user.followers}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-mono mt-1">
                        <Users className="w-3 h-3" /> Followers
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-blue-400 text-lg font-semibold">
                        {githubData.user.total_forks}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-mono mt-1">
                        <GitFork className="w-3 h-3" /> Forks
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-blue-400 text-lg font-semibold">
                        {githubData.user.following}
                      </div>
                      <div className="text-white/40 text-xs font-mono mt-1">
                        Following
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-blue-400 text-lg font-semibold">
                        {githubData.eventCount}
                      </div>
                      <div className="text-white/40 text-xs font-mono mt-1">
                        Recent Events
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h4 className="text-white/50 text-xs font-mono mb-3 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      Top Languages
                    </h4>
                    <div className="space-y-2.5">
                      {githubData.languages.slice(0, 5).map((lang) => (
                        <div key={lang.name}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    languageColors[lang.name] || "#666",
                                }}
                              />
                              <span className="text-white/70 text-xs font-mono">
                                {lang.name}
                              </span>
                            </div>
                            <span className="text-white/40 text-xs font-mono">
                              {lang.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  languageColors[lang.name] || "#666",
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Commit Hour Distribution */}
                  <div>
                    <h4 className="text-white/50 text-xs font-mono mb-3 flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5" />
                      Commits (IST)
                    </h4>
                    <div className="flex items-end gap-[2px] h-16">
                      {githubData.commitHours.map((count, hour) => {
                        const maxCount = Math.max(
                          ...githubData.commitHours,
                          1
                        );
                        const height =
                          maxCount > 0
                            ? Math.max((count / maxCount) * 100, 4)
                            : 4;
                        return (
                          <div
                            key={hour}
                            className="flex-1 rounded-t-sm bg-blue-500/40 hover:bg-blue-500/70 transition-colors cursor-default group relative"
                            style={{ height: `${height}%` }}
                            title={`${hour}:00 - ${count} events`}
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white/60 text-[9px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] text-white/20 font-mono">
                        00
                      </span>
                      <span className="text-[9px] text-white/20 font-mono">
                        12
                      </span>
                      <span className="text-[9px] text-white/20 font-mono">
                        23
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* LeetCode Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="bg-black border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* LeetCode Header */}
                <div className="flex items-center gap-3 p-5 border-b border-white/10 bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-[#FFA116]/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-[#FFA116]"
                      fill="currentColor"
                    >
                      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.077 1.365-.617 0-.293-.129-.444-.3-.615l-2.809-2.714c-.759-.737-1.76-1.138-2.82-1.138-1.004 0-1.956.375-2.668 1.078L5.063 9.837c-.724.712-1.135 1.662-1.135 2.663 0 1.003.415 1.953 1.14 2.67l4.362 4.35c.712.712 1.664 1.078 2.668 1.078 1.005 0 1.953-.358 2.67-1.07l2.809-2.714c.17-.17.3-.324.3-.615 0-.694-.852-1.132-1.365-.617z" />
                      <path d="M20.745 11.07l-4.362-4.35c-.712-.712-1.664-1.078-2.668-1.078-1.004 0-1.953.358-2.67 1.07L8.136 9.426c-.17.17-.3.324-.3.615 0 .694.852 1.132 1.365.617l2.697-2.607c.466-.467 1.111-.662 1.823-.662s1.357.195 1.824.662l4.332 4.363c.467.467.702 1.15.702 1.863s-.235 1.357-.702 1.824l-4.319 4.38c-.467.467-1.125.645-1.837.645s-1.357-.195-1.823-.662l-2.697-2.606c-.514-.515-1.365-.077-1.365.617 0 .293.129.444.3.615l2.809 2.714c.759.737 1.76 1.138 2.82 1.138 1.004 0 1.956-.375 2.668-1.078l4.362-4.35c.724-.712 1.135-1.662 1.135-2.663 0-1.003-.415-1.953-1.14-2.67z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">
                      LeetCode Profile
                    </h3>
                    <p className="text-white/40 text-xs font-mono">
                      {leetcodeData.username}
                    </p>
                  </div>
                  <a
                    href={`https://leetcode.com/u/${leetcodeData.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                </div>

                <div className="p-5 space-y-5">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-[#FFA116] text-lg font-semibold">
                        {leetcodeData.problemsSolved.total}
                      </div>
                      <div className="text-white/40 text-xs font-mono mt-1">
                        Problems Solved
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-[#FFA116] text-lg font-semibold">
                        {leetcodeData.acceptanceRate}%
                      </div>
                      <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-mono mt-1">
                        <Target className="w-3 h-3" /> Acceptance
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-[#FFA116] text-lg font-semibold">
                        #{leetcodeData.ranking.toLocaleString()}
                      </div>
                      <div className="text-white/40 text-xs font-mono mt-1">
                        Global Ranking
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-white/5">
                      <div className="text-[#FFA116] text-lg font-semibold">
                        {leetcodeData.contest
                          ? leetcodeData.contest.rating
                          : "N/A"}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-white/40 text-xs font-mono mt-1">
                        <Trophy className="w-3 h-3" /> Contest Rating
                      </div>
                    </div>
                  </div>

                  {/* Problem Solved by Difficulty */}
                  <div>
                    <h4 className="text-white/50 text-xs font-mono mb-3">
                      Problem Breakdown
                    </h4>
                    <div className="space-y-3">
                      {(
                        ["Easy", "Medium", "Hard"] as const
                      ).map((difficulty) => {
                        const count =
                          leetcodeData.problemsSolved[
                            difficulty.toLowerCase() as keyof typeof leetcodeData.problemsSolved
                          ];
                        const submissions =
                          leetcodeData.submissions[
                            difficulty.toLowerCase() as keyof typeof leetcodeData.submissions
                          ];
                        const total = Math.max(count, 1);
                        const colors = difficultyColors[difficulty];

                        return (
                          <div key={difficulty}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-mono px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
                                >
                                  {difficulty}
                                </span>
                                <span className="text-white/70 text-xs font-mono">
                                  {count}
                                </span>
                              </div>
                              <span className="text-white/30 text-[10px] font-mono">
                                {submissions} submissions
                              </span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${colors.bar}`}
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: `${Math.min((count / Math.max(leetcodeData.problemsSolved.total, 1)) * 100, 100)}%`,
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contest Info */}
                  {leetcodeData.contest &&
                    leetcodeData.contest.attendedContests > 0 && (
                      <div className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
                        <h4 className="text-white/50 text-xs font-mono mb-2 flex items-center gap-2">
                          <Trophy className="w-3.5 h-3.5" />
                          Contest Performance
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-white/70 text-sm font-mono">
                              {leetcodeData.contest.attendedContests}
                            </div>
                            <div className="text-white/30 text-[10px] font-mono">
                              Contests Attended
                            </div>
                          </div>
                          <div>
                            <div className="text-white/70 text-sm font-mono">
                              #{(
                                leetcodeData.contest.globalRanking || 0
                              ).toLocaleString()}
                            </div>
                            <div className="text-white/30 text-[10px] font-mono">
                              Global Rank
                            </div>
                          </div>
                          {leetcodeData.contest.badge && (
                            <div>
                              <div className="text-white/70 text-sm font-mono">
                                {leetcodeData.contest.badge}
                              </div>
                              <div className="text-white/30 text-[10px] font-mono">
                                Badge
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CodingProfiles;
