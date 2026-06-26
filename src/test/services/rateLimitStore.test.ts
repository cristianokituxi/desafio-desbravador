import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rateLimitStore } from '../../services/rateLimitStore';

describe('rateLimitStore', () => {
  beforeEach(() => {
    rateLimitStore.reset();
  });

  it('starts with null values', () => {
    const snapshot = rateLimitStore.getSnapshot();
    expect(snapshot.remaining).toBeNull();
    expect(snapshot.limit).toBeNull();
    expect(snapshot.reset).toBeNull();
  });

  it('updates from headers correctly', () => {
    rateLimitStore.updateFromHeaders({
      'x-ratelimit-remaining': '58',
      'x-ratelimit-limit': '60',
      'x-ratelimit-reset': '1719964800',
    });

    const snapshot = rateLimitStore.getSnapshot();
    expect(snapshot.remaining).toBe(58);
    expect(snapshot.limit).toBe(60);
    expect(snapshot.reset).toBe(1719964800);
  });

  it('handles partial headers (missing values become null)', () => {
    rateLimitStore.updateFromHeaders({
      'x-ratelimit-remaining': '10',
    });

    const snapshot = rateLimitStore.getSnapshot();
    expect(snapshot.remaining).toBe(10);
    expect(snapshot.limit).toBeNull();
    expect(snapshot.reset).toBeNull();
  });

  it('notifies subscribers on update', () => {
    const listener = vi.fn();
    const unsubscribe = rateLimitStore.subscribe(listener);

    rateLimitStore.updateFromHeaders({
      'x-ratelimit-remaining': '5',
      'x-ratelimit-limit': '60',
    });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({
      remaining: 5,
      limit: 60,
      reset: null,
    });

    unsubscribe();
  });

  it('does not notify after unsubscribe', () => {
    const listener = vi.fn();
    const unsubscribe = rateLimitStore.subscribe(listener);
    unsubscribe();

    rateLimitStore.updateFromHeaders({
      'x-ratelimit-remaining': '5',
    });

    expect(listener).not.toHaveBeenCalled();
  });

  it('reset clears all values and notifies subscribers', () => {
    rateLimitStore.updateFromHeaders({
      'x-ratelimit-remaining': '58',
      'x-ratelimit-limit': '60',
      'x-ratelimit-reset': '1719964800',
    });

    const listener = vi.fn();
    rateLimitStore.subscribe(listener);
    rateLimitStore.reset();

    const snapshot = rateLimitStore.getSnapshot();
    expect(snapshot.remaining).toBeNull();
    expect(snapshot.limit).toBeNull();
    expect(snapshot.reset).toBeNull();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
