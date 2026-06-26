import type { GitHubRepository, SortOption } from '../types';

export function sortRepositories(
  repos: GitHubRepository[],
  sortBy: SortOption,
): GitHubRepository[] {
  const sorted = [...repos];

  switch (sortBy) {
    case 'stars_desc':
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'stars_asc':
      return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
    case 'name_asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'updated_desc':
      return sorted.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
    default:
      return sorted;
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}
