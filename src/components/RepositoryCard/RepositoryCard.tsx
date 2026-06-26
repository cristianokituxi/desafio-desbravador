import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { GitHubRepository } from '../../types';
import { formatNumber, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import styles from './RepositoryCard.module.scss';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export const RepositoryCard = memo(function RepositoryCard({
  repository,
}: RepositoryCardProps) {
  const { addToast } = useToast();

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(repository.html_url);
      addToast('Link copiado!', 'success');
    } catch {
      addToast('Erro ao copiar link', 'error');
    }
  }, [repository.html_url, addToast]);

  return (
    <div className={`card shadow-sm ${styles.card}`}>
      <div className={`card-body ${styles.cardBody}`}>
        <h3 className={styles.repoName}>{repository.name}</h3>

        {repository.description && (
          <p className={styles.repoDescription}>{repository.description}</p>
        )}

        <div className={styles.repoMeta}>
          {repository.language && (
            <span className={`${styles.metaItem} ${styles.languageBadge}`}>
              {repository.language}
            </span>
          )}
          <span className={styles.metaItem}>
            <span aria-hidden="true">⭐ </span>
            {formatNumber(repository.stargazers_count)}
          </span>
          <span className={styles.metaItem}>
            <span aria-hidden="true">🍴 </span>
            {formatNumber(repository.forks_count)}
          </span>
          <span className={styles.metaItem}>
            <span aria-hidden="true">📅 </span>
            {formatDate(repository.updated_at)}
          </span>
        </div>

        <div className={styles.actionRow}>
          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className={`btn btn-outline-primary btn-sm ${styles.detailsButton}`}
          >
            Ver detalhes
          </Link>
          <button
            className={`btn btn-outline-secondary btn-sm ${styles.copyBtn}`}
            onClick={handleCopyLink}
            aria-label="Copiar link do repositório"
            title="Copiar link do repositório"
          >
            <span aria-hidden="true">📋</span>
          </button>
        </div>
      </div>
    </div>
  );
});
