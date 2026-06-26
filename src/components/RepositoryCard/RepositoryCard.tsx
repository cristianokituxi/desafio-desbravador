import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { GitHubRepository } from '../../types';
import { formatNumber, formatDate } from '../../utils/formatters';
import styles from './RepositoryCard.module.scss';

interface RepositoryCardProps {
  repository: GitHubRepository;
  index: number;
}

export const RepositoryCard = memo(function RepositoryCard({
  repository,
  index,
}: RepositoryCardProps) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className={`card shadow-sm ${styles.card}`}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
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
            <span className={styles.metaItem}>⭐ {formatNumber(repository.stargazers_count)}</span>
            <span className={styles.metaItem}>🍴 {formatNumber(repository.forks_count)}</span>
            <span className={styles.metaItem}>📅 {formatDate(repository.updated_at)}</span>
          </div>

          <Link
            to={`/repository/${repository.owner.login}/${repository.name}`}
            className={`btn btn-outline-primary btn-sm ${styles.detailsButton}`}
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
});
