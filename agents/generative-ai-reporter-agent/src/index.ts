export interface RepoInfo {
  name: string;
  stars: number;
}

export function rankRepos(repos: RepoInfo[]): RepoInfo[] {
  return [...repos].sort((a, b) => b.stars - a.stars);
}

export function generateReport(repos: RepoInfo[]): string {
  const ranked = rankRepos(repos);
  return ranked
    .map((repo, i) => `${i + 1}. ${repo.name} (${repo.stars}\u2B50)`)
    .join('\n');
}

export function run(repos: RepoInfo[]): string {
  return generateReport(repos);
}
