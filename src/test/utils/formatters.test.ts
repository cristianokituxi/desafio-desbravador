import { describe, it, expect } from 'vitest';
import { formatDate, formatNumber, sortRepositories } from '../../utils/formatters';
import type { GitHubRepository } from '../../types';

describe('formatDate', () => {
  it('formats an ISO date string to Brazilian date format', () => {
    const result = formatDate('2024-03-15T10:30:00Z');
    expect(result).toBe('15/03/2024');
  });

  it('pads single-digit days and months with zero', () => {
    const result = formatDate('2024-01-05T00:00:00Z');
    expect(result).toBe('05/01/2024');
  });
});

describe('formatNumber', () => {
  it('returns the number as string for values under 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with "k" suffix', () => {
    expect(formatNumber(1000)).toBe('1.0k');
    expect(formatNumber(1500)).toBe('1.5k');
    expect(formatNumber(10000)).toBe('10.0k');
    expect(formatNumber(10500)).toBe('10.5k');
  });
});

describe('sortRepositories', () => {
  const repos: GitHubRepository[] = [
    {
      id: 1,
      name: 'beta-repo',
      description: null,
      language: null,
      stargazers_count: 10,
      forks_count: 2,
      updated_at: '2024-01-01T00:00:00Z',
      html_url: '',
      owner: { login: 'user' },
    },
    {
      id: 2,
      name: 'alpha-repo',
      description: null,
      language: null,
      stargazers_count: 50,
      forks_count: 5,
      updated_at: '2024-06-01T00:00:00Z',
      html_url: '',
      owner: { login: 'user' },
    },
    {
      id: 3,
      name: 'gamma-repo',
      description: null,
      language: null,
      stargazers_count: 30,
      forks_count: 3,
      updated_at: '2024-03-01T00:00:00Z',
      html_url: '',
      owner: { login: 'user' },
    },
  ];

  it('does not mutate the original array', () => {
    const original = [...repos];
    sortRepositories(repos, 'stars_desc');
    expect(repos).toEqual(original);
  });

  it('sorts by stars descending', () => {
    const sorted = sortRepositories(repos, 'stars_desc');
    expect(sorted[0].stargazers_count).toBe(50);
    expect(sorted[1].stargazers_count).toBe(30);
    expect(sorted[2].stargazers_count).toBe(10);
  });

  it('sorts by stars ascending', () => {
    const sorted = sortRepositories(repos, 'stars_asc');
    expect(sorted[0].stargazers_count).toBe(10);
    expect(sorted[2].stargazers_count).toBe(50);
  });

  it('sorts by name ascending', () => {
    const sorted = sortRepositories(repos, 'name_asc');
    expect(sorted[0].name).toBe('alpha-repo');
    expect(sorted[2].name).toBe('gamma-repo');
  });

  it('sorts by name descending', () => {
    const sorted = sortRepositories(repos, 'name_desc');
    expect(sorted[0].name).toBe('gamma-repo');
    expect(sorted[2].name).toBe('alpha-repo');
  });

  it('sorts by updated date descending', () => {
    const sorted = sortRepositories(repos, 'updated_desc');
    expect(sorted[0].id).toBe(2);
    expect(sorted[2].id).toBe(1);
  });

  it('returns unsorted for unknown sort option', () => {
    const sorted = sortRepositories(repos, 'unknown' as never);
    expect(sorted[0].id).toBe(1);
  });
});
