import { NextResponse } from "next/server";

const GITHUB_USERNAME = "VasuML07";
const CACHE_DURATION = 10 * 60 * 1000;

let cachedData: { data: Record<string, unknown> | null; timestamp: number } = { data: null, timestamp: 0 };

async function fetchGitHubStats() {
  const now = Date.now();
  if (cachedData.data && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };

  const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, next: { revalidate: 600 } });
  if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status}`);
  const userData = await userRes.json();

  const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 600 } });
  const reposData: Array<{ language: string | null; stargazers_count: number; forks_count: number; fork: boolean; size: number }> = reposRes.ok ? await reposRes.json() : [];

  const languageBytes: Record<string, number> = {};
  let totalStars = 0;
  let totalForks = 0;

  reposData.filter((r) => !r.fork).forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    if (repo.language) languageBytes[repo.language] = (languageBytes[repo.language] || 0) + repo.size;
  });

  const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0);
  const languages = Object.entries(languageBytes)
    .sort(([, a], [, b]) => b - a)
    .map(([name, bytes]) => ({ name, percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0, bytes }));

  const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, { headers, next: { revalidate: 600 } });
  const eventsData = eventsRes.ok ? await eventsRes.json() : [];

  const commitHours: number[] = new Array(24).fill(0);
  eventsData.forEach((event: { created_at?: string; type: string }) => {
    if (event.created_at && (event.type === "PushEvent" || event.type === "CreateEvent")) {
      const date = new Date(event.created_at);
      const istHour = (date.getUTCHours() + 5.5) % 24;
      commitHours[Math.floor(istHour) % 24]++;
    }
  });

  const result = {
    user: {
      login: userData.login,
      name: userData.name || userData.login,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      public_repos: (userData.public_repos as number) || 0,
      followers: (userData.followers as number) || 0,
      following: (userData.following as number) || 0,
      total_stars: totalStars,
      total_forks: totalForks,
      created_at: userData.created_at,
    },
    languages,
    commitHours,
    eventCount: eventsData.length,
  };

  cachedData = { data: result, timestamp: now };
  return result;
}

export async function GET() {
  try {
    const stats = await fetchGitHubStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("GitHub stats fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
