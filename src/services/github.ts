import axios, { type AxiosInstance } from 'axios';
import { rateLimitStore } from './rateLimitStore';
import { GitHubErrorCode } from '../errors/github';
import type { GitHubError } from '../errors/github';

const BASE_URL = 'https://api.github.com';

function createError(code: GitHubErrorCode, resetTime?: number): GitHubError {
  return { code, resetTime };
}

function createApiClient(): AxiosInstance {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers,
  });

  client.interceptors.response.use(
    (response) => {
      rateLimitStore.updateFromHeaders(response.headers as Record<string, string>);
      return response;
    },
    (error) => {
      if (error.response?.headers) {
        rateLimitStore.updateFromHeaders(error.response.headers as Record<string, string>);
      }

      if (error.response?.status === 404) {
        throw createError(GitHubErrorCode.NOT_FOUND);
      }

      if (error.response?.status === 403) {
        const remaining = error.response.headers['x-ratelimit-remaining'];
        if (remaining !== undefined && Number(remaining) === 0) {
          const resetTimestamp = error.response.headers['x-ratelimit-reset'];
          const resetTime = resetTimestamp ? Number(resetTimestamp) * 1000 : undefined;
          throw createError(GitHubErrorCode.RATE_LIMIT, resetTime);
        }
        throw createError(GitHubErrorCode.FORBIDDEN);
      }

      if (error.code === 'ECONNABORTED') {
        throw createError(GitHubErrorCode.TIMEOUT);
      }

      throw createError(GitHubErrorCode.NETWORK);
    },
  );

  return client;
}

const apiClient = createApiClient();

export const githubService = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  },
};
