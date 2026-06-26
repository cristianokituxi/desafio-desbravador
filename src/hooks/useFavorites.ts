import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { GitHubUser } from '../types';

const FAVORITES_KEY = 'github-explorer-favorites';

export function useFavorites(): {
  favorites: GitHubUser[];
  isFavorite: (login: string) => boolean;
  toggleFavorite: (user: GitHubUser) => void;
} {
  const [favorites, setFavorites] = useLocalStorage<GitHubUser[]>(FAVORITES_KEY, []);

  const isFavorite = useCallback(
    (login: string) => favorites.some((f) => f.login === login),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (user: GitHubUser) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.login === user.login);
        if (exists) {
          return prev.filter((f) => f.login !== user.login);
        }
        return [...prev, user];
      });
    },
    [setFavorites],
  );

  return { favorites, isFavorite, toggleFavorite };
}
