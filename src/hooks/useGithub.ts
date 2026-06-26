import { useState, useCallback } from 'react';
import type { SearchState } from '../types';
import { fetchUser, fetchUserRepos } from '../api/github';

interface UseGithubReturn extends SearchState {
  searchUser: (username: string) => Promise<void>;
  clearSearch: () => void;
}

const initialState: SearchState = {
  user: null,
  repositories: [],
  isLoadingUser: false,
  isLoadingRepos: false,
  error: null,
  notFound: false,
};

export function useGithub(): UseGithubReturn {
  const [state, setState] = useState<SearchState>(initialState);

  const searchUser = useCallback(async (username: string) => {
    if (!username.trim()) return;

    setState((prev) => ({
      ...prev,
      isLoadingUser: true,
      isLoadingRepos: true,
      error: null,
      notFound: false,
      user: null,
      repositories: [],
    }));

    try {
      const user = await fetchUser(username.trim());

      setState((prev) => ({
        ...prev,
        user,
        isLoadingUser: false,
      }));

      try {
        const repos = await fetchUserRepos(username.trim());
        setState((prev) => ({
          ...prev,
          repositories: repos,
          isLoadingRepos: false,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          repositories: [],
          isLoadingRepos: false,
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

      if (message === 'NOT_FOUND') {
        setState({
          ...initialState,
          notFound: true,
        });
      } else if (message.startsWith('RATE_LIMIT')) {
        const resetIso = message.split('|')[1];
        const resetDate = resetIso ? new Date(resetIso) : null;
        const resetLabel = resetDate
          ? `Volte às ${resetDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`
          : 'Aguarde um momento.';
        setState({
          ...initialState,
          error: `Limite de requisições da API excedido. ${resetLabel}`,
        });
      } else {
        setState({
          ...initialState,
          error: 'Erro de conexão. Verifique sua internet e tente novamente.',
        });
      }
    }
  }, []);

  const clearSearch = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    searchUser,
    clearSearch,
  };
}
