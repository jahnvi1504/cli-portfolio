export type GitHubRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

export type GitHubUser = {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  html_url: string;
};

const BASE_URL = "https://api.github.com";

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "cli-portfolio",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubProfile() {
  return fetchJson<GitHubUser>(`${BASE_URL}/users/jahnvi1504`);
}

export async function getGithubRepos() {
  return fetchJson<GitHubRepo[]>(`${BASE_URL}/users/jahnvi1504/repos?per_page=6&sort=updated`);
}

export async function getGithubSummary() {
  const [profile, repos] = await Promise.all([getGithubProfile(), getGithubRepos()]);

  if (!profile && !repos) {
    return [
      "GitHub API unavailable right now.",
      "Profile: github.com/jahnvi1504",
      "Retry in a few moments.",
    ];
  }

  const repoLines = repos && repos.length > 0
    ? [
        "Latest repositories:",
        ...repos.slice(0, 5).map((repo) => `- ${repo.name} ★ ${repo.stargazers_count} ${repo.language ? `| ${repo.language}` : ""}`),
      ]
    : ["No repositories returned from GitHub yet."];

  const profileLines = profile
    ? [`GitHub: ${profile.html_url}`, `User: ${profile.name ?? profile.login}`, `Public repos: ${profile.public_repos}`]
    : ["GitHub: github.com/jahnvi1504"];

  return [...profileLines, "", ...repoLines];
}
