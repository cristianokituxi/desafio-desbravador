import { useState, type FormEvent, type ChangeEvent } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (username: string) => void;
  onInputChange?: (username: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export function SearchBar({
  onSearch,
  onInputChange,
  isLoading,
  initialValue = '',
}: SearchBarProps) {
  const [username, setUsername] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={`form-control ${styles.searchInput}`}
          placeholder="Digite um usuário do GitHub..."
          value={username}
          onChange={handleChange}
          disabled={isLoading}
          aria-label="Nome de usuário do GitHub"
          autoFocus
        />
        <button
          type="submit"
          className={`btn btn-primary ${styles.searchButton}`}
          disabled={isLoading || !username.trim()}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              <span>Buscando...</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">🔍</span>
              <span>Buscar</span>
            </>
          )}
        </button>
      </div>
      <p className={styles.hint}>Ex: octocat, torvalds, gaearon</p>
    </form>
  );
}
