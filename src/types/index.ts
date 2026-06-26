export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
  };
}

export interface GitHubRepoDetails {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  license: {
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export type SortOption = 'stars_desc' | 'stars_asc' | 'name_asc' | 'name_desc' | 'updated_desc';

export interface SearchState {
  user: GitHubUser | null;
  repositories: GitHubRepository[];
  isLoadingUser: boolean;
  isLoadingRepos: boolean;
  error: string | null;
  notFound: boolean;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

export interface RateLimitInfo {
  remaining: number | null;
  limit: number | null;
  reset: number | null; // Unix timestamp (seconds)
}
