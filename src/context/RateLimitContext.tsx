import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import type { RateLimitInfo } from '../types';
import { rateLimitStore } from '../services/rateLimitStore';

const RateLimitContext = createContext<RateLimitInfo | null>(null);

export function RateLimitProvider({ children }: { children: ReactNode }) {
  const rateLimit = useSyncExternalStore(rateLimitStore.subscribe, rateLimitStore.getSnapshot);

  return <RateLimitContext.Provider value={rateLimit}>{children}</RateLimitContext.Provider>;
}

export function useRateLimit(): RateLimitInfo {
  const context = useContext(RateLimitContext);
  if (!context) {
    throw new Error('useRateLimit must be used within a RateLimitProvider');
  }
  return context;
}
