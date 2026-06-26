import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGithub } from '../../hooks/useGithub';
import type { GitHubUser, GitHubRepository } from '../../types';

// Mock the API module
vi.mock('../../api/github', () => ({
  fetchUser: vi.fn(),
  fetchUserRepos: vi.fn(),
}));

import { fetchUser, fetchUserRepos } from '../../api/github';

const mockUser: GitHubUser = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://avatars.githubusercontent.com/u/1',
  html_url: 'https://github.com/octocat',
  name: 'The Octocat',
  bio: 'GitHub mascot',
  company: 'GitHub',
  location: 'San Francisco',
  followers: 1000,
  following: 10,
  public_repos: 8,
};

const mockRepos: GitHubRepository[] = [
  {
    id: 1,
    name: 'hello-world',
    description: 'My first repo',
    language: 'JavaScript',
    stargazers_count: 42,
    forks_count: 7,
    updated_at: '2024-01-01T00:00:00Z',
    html_url: 'https://github.com/octocat/hello-world',
    owner: { login: 'octocat' },
  },
];

describe('useGithub', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with initial state', () => {
    const { result } = renderHook(() => useGithub());

    expect(result.current.user).toBeNull();
    expect(result.current.repositories).toEqual([]);
    expect(result.current.isLoadingUser).toBe(false);
    expect(result.current.isLoadingRepos).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.notFound).toBe(false);
  });

  it('does nothing when searching with empty string', async () => {
    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('   ');
    });

    expect(fetchUser).not.toHaveBeenCalled();
  });

  it('fetches user and repos on successful search', async () => {
    vi.mocked(fetchUser).mockResolvedValueOnce(mockUser);
    vi.mocked(fetchUserRepos).mockResolvedValueOnce(mockRepos);

    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('octocat');
    });

    expect(fetchUser).toHaveBeenCalledWith('octocat');
    expect(fetchUserRepos).toHaveBeenCalledWith('octocat');
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.repositories).toEqual(mockRepos);
    expect(result.current.isLoadingUser).toBe(false);
    expect(result.current.isLoadingRepos).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets notFound when user is not found', async () => {
    vi.mocked(fetchUser).mockRejectedValueOnce(new Error('NOT_FOUND'));

    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('nonexistent');
    });

    expect(result.current.notFound).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it('sets error message on rate limit', async () => {
    vi.mocked(fetchUser).mockRejectedValueOnce(new Error('RATE_LIMIT|2026-06-26T14:30:00.000Z'));

    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('octocat');
    });

    expect(result.current.error).toContain('Limite de requisições');
    expect(result.current.error).toMatch(/Volte às \d{2}:\d{2}/);
  });

  it('sets generic error on network failure', async () => {
    vi.mocked(fetchUser).mockRejectedValueOnce(new Error('NETWORK_ERROR'));

    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('octocat');
    });

    expect(result.current.error).toContain('Erro de conexão');
  });

  it('still returns user even if repo fetch fails', async () => {
    vi.mocked(fetchUser).mockResolvedValueOnce(mockUser);
    vi.mocked(fetchUserRepos).mockRejectedValueOnce(new Error('NETWORK_ERROR'));

    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('octocat');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.repositories).toEqual([]);
    expect(result.current.isLoadingRepos).toBe(false);
  });

  it('clearSearch resets to initial state', async () => {
    vi.mocked(fetchUser).mockResolvedValueOnce(mockUser);
    vi.mocked(fetchUserRepos).mockResolvedValueOnce(mockRepos);

    const { result } = renderHook(() => useGithub());

    await act(async () => {
      await result.current.searchUser('octocat');
    });

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.repositories).toEqual([]);
  });
});
