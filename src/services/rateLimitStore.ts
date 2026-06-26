import type { RateLimitInfo } from '../types';

type Listener = (info: RateLimitInfo) => void;

const initialState: RateLimitInfo = {
  remaining: null,
  limit: null,
  reset: null,
};

let state: RateLimitInfo = { ...initialState };
const listeners = new Set<Listener>();

export const rateLimitStore = {
  getSnapshot(): RateLimitInfo {
    return state;
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  updateFromHeaders(headers: Record<string, string | undefined>): void {
    const remaining = headers['x-ratelimit-remaining'];
    const limit = headers['x-ratelimit-limit'];
    const reset = headers['x-ratelimit-reset'];

    state = {
      remaining: remaining != null ? Number(remaining) : null,
      limit: limit != null ? Number(limit) : null,
      reset: reset != null ? Number(reset) : null,
    };

    listeners.forEach((listener) => listener(state));
  },

  reset(): void {
    state = { ...initialState };
    listeners.forEach((listener) => listener(state));
  },
};
