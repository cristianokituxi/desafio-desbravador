import axios, { type AxiosInstance } from 'axios';
import { rateLimitStore } from './rateLimitStore';

const BASE_URL = 'https://api.github.com';

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

  // Extract rate limit info from every successful response
  client.interceptors.response.use(
    (response) => {
      rateLimitStore.updateFromHeaders(response.headers as Record<string, string>);
      return response;
    },
    (error) => {
      // Even failed responses may include rate limit headers
      if (error.response?.headers) {
        rateLimitStore.updateFromHeaders(error.response.headers as Record<string, string>);
      }

      if (error.response?.status === 404) {
        throw new Error('NOT_FOUND');
      }

      if (error.response?.status === 403) {
        const remaining = error.response.headers['x-ratelimit-remaining'];
        // Only treat as rate limit if remaining is explicitly 0
        if (remaining !== undefined && Number(remaining) === 0) {
          const resetTimestamp = error.response.headers['x-ratelimit-reset'];
          const resetTime = resetTimestamp ? new Date(Number(resetTimestamp) * 1000) : null;
          const errorMessage = resetTime ? `RATE_LIMIT|${resetTime.toISOString()}` : 'RATE_LIMIT';
          throw new Error(errorMessage);
        }
        throw new Error('FORBIDDEN');
      }

      if (error.code === 'ECONNABORTED') {
        throw new Error('TIMEOUT');
      }

      throw new Error('NETWORK_ERROR');
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
