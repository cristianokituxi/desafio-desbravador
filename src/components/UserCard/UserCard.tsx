import { memo, useCallback } from 'react';
import type { GitHubUser } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { Avatar } from '../Avatar/Avatar';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: GitHubUser;
  isFavorite?: boolean;
  onToggleFavorite?: (user: GitHubUser) => void;
}

export const UserCard = memo(function UserCard({
  user,
  isFavorite = false,
  onToggleFavorite,
}: UserCardProps) {
  const handleToggleFavorite = useCallback(() => {
    onToggleFavorite?.(user);
  }, [onToggleFavorite, user]);

  const handleShare = useCallback(async () => {
    const url = user.html_url;
    if (navigator.share) {
      try {
        await navigator.share({ title: user.name ?? user.login, url });
      } catch {
        // User cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        // Brief visual feedback handled by caller if needed
      } catch {
        // Clipboard not available
      }
    }
  }, [user]);

  return (
    <div className={`card shadow-sm ${styles.userCard}`}>
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
        <Avatar src={user.avatar_url} alt={user.login} />

        <div className={styles.userInfo}>
          {user.name && <h2 className={styles.userName}>{user.name}</h2>}
          <p className={styles.userLogin}>@{user.login}</p>

          {user.bio && <p className={styles.userBio}>{user.bio}</p>}

          <div className={styles.userMeta}>
            {user.company && (
              <span className={styles.metaItem}>
                <span aria-hidden="true">🏢 </span>
                {user.company}
              </span>
            )}
            {user.location && (
              <span className={styles.metaItem}>
                <span aria-hidden="true">📍 </span>
                {user.location}
              </span>
            )}
          </div>

          <div className={styles.statsList}>
            <span className={styles.statItem}>
              <span className={styles.statIcon} aria-hidden="true">
                👥
              </span>
              <span className={styles.statValue}>{formatNumber(user.followers)}</span>
              seguidores
            </span>
            <span className={styles.statItem}>
              <span className={styles.statIcon} aria-hidden="true">
                👤
              </span>
              <span className={styles.statValue}>{formatNumber(user.following)}</span>
              seguindo
            </span>
            <span className={styles.statItem}>
              <span className={styles.statIcon} aria-hidden="true">
                📦
              </span>
              <span className={styles.statValue}>{formatNumber(user.public_repos)}</span>
              repositórios
            </span>
          </div>

          <div className={styles.actionRow}>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline-primary btn-sm ${styles.profileLink}`}
            >
              <span aria-hidden="true">🔗 </span>Ver no GitHub
            </a>

            <button
              className={`btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} ${styles.actionBtn}`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {isFavorite ? '★' : '☆'}
            </button>

            <button
              className={`btn btn-outline-secondary btn-sm ${styles.actionBtn}`}
              onClick={handleShare}
              aria-label="Compartilhar perfil"
              title="Compartilhar perfil"
            >
              ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
