import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "coder_2028";
const CACHE_DURATION = 10 * 60 * 1000;

let cachedData: { data: Record<string, unknown> | null; timestamp: number } = { data: null, timestamp: 0 };

async function fetchLeetCodeStats() {
  const now = Date.now();
  if (cachedData.data && now - cachedData.timestamp < CACHE_DURATION) return cachedData.data;

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum { difficulty count submissions }
        }
        profile { ranking userAvatar reputation }
      }
      userContestRanking(username: $username) {
        rating
        badge { name }
        attendedContestsCount
        globalRanking
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
    next: { revalidate: 600 },
  });

  if (!response.ok) throw new Error(`LeetCode API error: ${response.status}`);
  const data = await response.json();
  const matchedUser = data.data?.matchedUser;
  const contestRanking = data.data?.userContestRanking;

  if (!matchedUser) throw new Error("LeetCode user not found");

  const submissionStats: Record<string, { count: number; submissions: number }> = {};
  let totalSolved = 0;
  let totalSubmissions = 0;

  matchedUser.submitStats?.acSubmissionNum?.forEach((item: { difficulty: string; count: number; submissions: number }) => {
    submissionStats[item.difficulty] = { count: item.count, submissions: item.submissions };
    if (item.difficulty !== "All") { totalSolved += item.count; totalSubmissions += item.submissions; }
  });

  const acceptanceRate = totalSubmissions > 0 ? Math.round((totalSolved / totalSubmissions) * 100) : 0;

  const result = {
    username: matchedUser.username,
    ranking: matchedUser.profile?.ranking || 0,
    reputation: matchedUser.profile?.reputation || 0,
    avatar: matchedUser.profile?.userAvatar || "",
    problemsSolved: {
      easy: submissionStats["Easy"]?.count || 0,
      medium: submissionStats["Medium"]?.count || 0,
      hard: submissionStats["Hard"]?.count || 0,
      total: totalSolved,
    },
    submissions: {
      easy: submissionStats["Easy"]?.submissions || 0,
      medium: submissionStats["Medium"]?.submissions || 0,
      hard: submissionStats["Hard"]?.submissions || 0,
      total: totalSubmissions,
    },
    acceptanceRate,
    contest: contestRanking
      ? { rating: contestRanking.rating || 0, badge: contestRanking.badge?.name || "", attendedContests: contestRanking.attendedContestsCount || 0, globalRanking: contestRanking.globalRanking || 0 }
      : null,
  };

  cachedData = { data: result, timestamp: now };
  return result;
}

export async function GET() {
  try {
    const stats = await fetchLeetCodeStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("LeetCode stats fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
  }
}
