import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SortOption } from '../../types';
import { useGithub } from '../../hooks/useGithub';
import { useFavorites } from '../../hooks/useFavorites';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { sortRepositories } from '../../utils/formatters';
import { SORT_OPTIONS, LAST_SEARCHED_USER_KEY } from '../../utils/constants';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { UserCard } from '../../components/UserCard/UserCard';
import { UserStats } from '../../components/UserStats/UserStats';
import { RepositoryCard } from '../../components/RepositoryCard/RepositoryCard';
import { Loading } from '../../components/Loading/Loading';
import { Pagination } from '../../components/Pagination/Pagination';
import styles from './Home.module.scss';

const REPOS_PER_PAGE = 6;
const DEBOUNCE_DELAY = 500;

export function Home() {
  const { user, repositories, isLoadingUser, isLoadingRepos, error, notFound, searchUser } =
    useGithub();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState<SortOption>('stars_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUser, setLastUser] = useLocalStorage<string>(LAST_SEARCHED_USER_KEY, '');
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setLanguageFilter('');
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback(
    (username: string) => {
      resetFilters();
      setLastUser(username);
      searchUser(username);
    },
    [searchUser, setLastUser, resetFilters],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      const trimmed = value.trim();
      if (trimmed.length >= 2) {
        debounceTimerRef.current = setTimeout(() => {
          resetFilters();
          setLastUser(trimmed);
          searchUser(trimmed);
        }, DEBOUNCE_DELAY);
      }
    },
    [searchUser, setLastUser, resetFilters],
  );

  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    for (const r of repositories) {
      if (r.language) langs.add(r.language);
    }
    return Array.from(langs).sort();
  }, [repositories]);

  const filteredRepos = useMemo(() => {
    let result = repositories;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          (r.description?.toLowerCase().includes(query) ?? false),
      );
    }

    if (languageFilter) {
      result = result.filter((r) => r.language === languageFilter);
    }

    return result;
  }, [repositories, searchQuery, languageFilter]);

  const sortedRepos = useMemo(
    () => sortRepositories(filteredRepos, sortBy),
    [filteredRepos, sortBy],
  );

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
          <div className={styles.errorIcon} aria-hidden="true">
            ⚠️
          </div>
          <h3>Ops! Algo deu errado</h3>
          <p className="text-muted">{error}</p>
        </div>
      )}

      {/* Not Found State */}
      {notFound && (
        <div className={styles.notFoundState}>
          <div className={styles.notFoundIcon} aria-hidden="true">
            🔍
          </div>
          <h3>Usuário não encontrado</h3>
          <p className="text-muted">Verifique o nome de usuário e tente novamente.</p>
        </div>
      )}

      {/* Results */}
      {user && !error && (
        <div className={styles.resultsSection}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UserCard
                user={user}
                isFavorite={isFavorite(user.login)}
                onToggleFavorite={toggleFavorite}
              />
            </motion.div>

            <UserStats repositories={repositories} />

            <div className={styles.reposHeader}>
              <h2 className={styles.reposTitle}>
                <span aria-hidden="true">📦 </span>Repositórios ({filteredRepos.length}
                {filteredRepos.length !== repositories.length && ` de ${repositories.length}`})
              </h2>

              <div className={styles.filterControls}>
                <input
                  type="text"
                  className={`form-control form-control-sm ${styles.filterInput}`}
                  placeholder="Filtrar por nome..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Filtrar repositórios por nome ou descrição"
                />

                <select
                  className={`form-select form-select-sm ${styles.filterSelect}`}
                  value={languageFilter}
                  onChange={(e) => {
                    setLanguageFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Filtrar por linguagem"
                >
                  <option value="">Todas linguagens</option>
                  {availableLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>

                <select
                  className={`form-select form-select-sm ${styles.sortSelect}`}
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
            </div>

            {isLoadingRepos ? (
              <Loading variant="skeleton-card" />
            ) : repositories.length === 0 || filteredRepos.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  {repositories.length === 0 ? (
                    <span aria-hidden="true">📭</span>
                  ) : (
                    <span aria-hidden="true">🔎</span>
                  )}
                </div>
                <h3>{repositories.length === 0 ? 'Sem repositórios' : 'Nenhum resultado'}</h3>
                <p className="text-muted">
                  {repositories.length === 0
                    ? 'Este usuário ainda não possui repositórios públicos.'
                    : 'Nenhum repositório corresponde aos filtros aplicados.'}
                </p>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {paginatedRepos.map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      className="col-12 col-md-6 col-lg-4"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <RepositoryCard repository={repo} />
                    </motion.div>
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

          {favorites.length > 0 && (
            <div className={styles.favoritesSection}>
              <h3 className={styles.favoritesTitle}>
                <span aria-hidden="true">⭐ </span>Usuários favoritos ({favorites.length})
              </h3>
              <div className={styles.favoritesGrid}>
                {favorites.map((fav) => (
                  <button
                    key={fav.login}
                    className={styles.favoriteChip}
                    onClick={() => handleSearch(fav.login)}
                    title={`Buscar @${fav.login}`}
                  >
                    <img src={fav.avatar_url} alt="" className={styles.favoriteAvatar} />
                    <span>@{fav.login}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
