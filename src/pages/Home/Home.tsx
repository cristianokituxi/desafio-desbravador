import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { SortOption } from '../../types';
import { useGithub } from '../../hooks/useGithub';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { sortRepositories } from '../../utils/formatters';
import { SORT_OPTIONS, LAST_SEARCHED_USER_KEY } from '../../utils/constants';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { UserCard } from '../../components/UserCard/UserCard';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';
import { Loading } from '../../components/Loading/Loading';
import { Pagination } from '../../components/Pagination/Pagination';
import styles from './Home.module.scss';

const REPOS_PER_PAGE = 6;
const DEBOUNCE_DELAY = 500;

export function Home() {
  const { user, repositories, isLoadingUser, isLoadingRepos, error, notFound, searchUser } =
    useGithub();
  const [sortBy, setSortBy] = useState<SortOption>('stars_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUser, setLastUser] = useLocalStorage<string>(LAST_SEARCHED_USER_KEY, '');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSearch = useCallback(
    (username: string) => {
      setCurrentPage(1);
      setLastUser(username);
      searchUser(username);
    },
    [searchUser, setLastUser],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const trimmed = value.trim();
      if (trimmed.length >= 2) {
        debounceTimerRef.current = setTimeout(() => {
          setCurrentPage(1);
          setLastUser(trimmed);
          searchUser(trimmed);
        }, DEBOUNCE_DELAY);
      }
    },
    [searchUser, setLastUser],
  );

  const sortedRepos = useMemo(() => sortRepositories(repositories, sortBy), [repositories, sortBy]);

  const totalPages = Math.ceil(sortedRepos.length / REPOS_PER_PAGE);
  const paginatedRepos = sortedRepos.slice(
    (currentPage - 1) * REPOS_PER_PAGE,
    currentPage * REPOS_PER_PAGE,
  );

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>GitHub Explorer</h1>
        <p className={styles.heroSubtitle}>
          Pesquise usuários do GitHub e descubra seus repositórios
        </p>
        <SearchBar
          key={lastUser}
          onSearch={handleSearch}
          onInputChange={handleInputChange}
          isLoading={isLoadingUser}
          initialValue={lastUser}
        />
      </section>

      {/* Loading State */}
      {isLoadingUser && !user && (
        <div className={styles.resultsSection}>
          <Loading variant="skeleton-profile" />
          <Loading variant="skeleton-card" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3>Ops! Algo deu errado</h3>
          <p className="text-muted">{error}</p>
        </div>
      )}

      {/* Not Found State */}
      {notFound && (
        <div className={styles.notFoundState}>
          <div className={styles.notFoundIcon}>🔍</div>
          <h3>Usuário não encontrado</h3>
          <p className="text-muted">Verifique o nome de usuário e tente novamente.</p>
        </div>
      )}

      {/* Results */}
      {user && !error && (
        <div className={styles.resultsSection}>
          <div className="container">
            <UserCard user={user} />

            <div className={styles.reposHeader}>
              <h2 className={styles.reposTitle}>📦 Repositórios ({repositories.length})</h2>
              <select
                className={`form-select ${styles.sortSelect}`}
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                aria-label="Ordenar repositórios por"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {isLoadingRepos ? (
              <Loading variant="skeleton-card" />
            ) : repositories.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📭</div>
                <h3>Sem repositórios</h3>
                <p className="text-muted">Este usuário ainda não possui repositórios públicos.</p>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {paginatedRepos.map((repo, index) => (
                    <RepositoryCard key={repo.id} repository={repo} index={index} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* Initial State - no search yet */}
      {!user && !error && !notFound && !isLoadingUser && (
        <div className={styles.initialState}>
          <span className={styles.initialIcon} aria-hidden="true">
            🐱
          </span>
          <p className={styles.initialText}>
            Pesquise por um usuário do GitHub para começar a explorar!
          </p>
        </div>
      )}
    </div>
  );
}
