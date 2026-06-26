import { useState, useCallback } from 'react';
import type { SearchState } from '../types';
import { fetchUser, fetchUserRepos } from '../api/github';
import { GitHubErrorCode, parseGitHubError, getErrorMessage } from '../errors/github';

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
      const ghError = parseGitHubError(error);

      if (ghError.code === GitHubErrorCode.NOT_FOUND) {
        setState({
          ...initialState,
          notFound: true,
        });
      } else {
        setState({
          ...initialState,
          error: getErrorMessage(ghError),
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
