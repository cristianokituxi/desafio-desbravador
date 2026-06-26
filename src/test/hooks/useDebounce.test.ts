import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('returns debounced value after delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'hello', delay: 500 },
    });

    rerender({ value: 'world', delay: 500 });

    // Value should still be the old one before the timeout
    expect(result.current).toBe('hello');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('world');
  });

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 500 },
    });

    rerender({ value: 'ab', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: 'abc', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Still old value because timer was reset
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('abc');
  });
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    const [value] = result.current;
    expect(value).toBe('default');
  });

  it('persists value to localStorage on set', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      const [, setValue] = result.current;
      setValue('updated');
    });

    const [value] = result.current;
    expect(value).toBe('updated');
    expect(window.localStorage.getItem('test-key')).toBe('"updated"');
  });

  it('reads existing value from localStorage', () => {
    window.localStorage.setItem('test-key', '"stored"');

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    const [value] = result.current;
    expect(value).toBe('stored');
  });

  it('handles objects', () => {
    interface User {
      name: string;
      age: number;
    }

    const { result } = renderHook(() =>
      useLocalStorage<User>('user-key', { name: 'John', age: 30 }),
    );

    act(() => {
      const [, setValue] = result.current;
      setValue({ name: 'Jane', age: 25 });
    });

    const [value] = result.current;
    expect(value).toEqual({ name: 'Jane', age: 25 });
  });
});
