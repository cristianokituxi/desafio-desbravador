import type { GitHubUser, GitHubRepository, GitHubRepoDetails } from '../types';
import { githubService } from '../services/github';

export async function fetchUser(username: string): Promise<GitHubUser> {
  return githubService.get<GitHubUser>(`/users/${username}`);
}

export async function fetchUserRepos(username: string): Promise<GitHubRepository[]> {
  return githubService.get<GitHubRepository[]>(
    `/users/${username}/repos?per_page=100&sort=updated`,
  );
}

export async function fetchRepoDetails(owner: string, repo: string): Promise<GitHubRepoDetails> {
  return githubService.get<GitHubRepoDetails>(`/repos/${owner}/${repo}`);
}
