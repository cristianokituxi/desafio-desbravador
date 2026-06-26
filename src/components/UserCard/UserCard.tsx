import { memo } from 'react';
import type { GitHubUser } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { Avatar } from '../Avatar/Avatar';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return (
    <div className={`card shadow-sm ${styles.userCard}`}>
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
        <Avatar src={user.avatar_url} alt={user.login} />

        <div className={styles.userInfo}>
          {user.name && <h2 className={styles.userName}>{user.name}</h2>}
          <p className={styles.userLogin}>@{user.login}</p>

          {user.bio && <p className={styles.userBio}>{user.bio}</p>}

          <div className={styles.userMeta}>
            {user.company && <span className={styles.metaItem}>🏢 {user.company}</span>}
            {user.location && <span className={styles.metaItem}>📍 {user.location}</span>}
          </div>

          <div className={styles.statsList}>
            <span className={styles.statItem}>
              <span className={styles.statIcon}>👥</span>
              <span className={styles.statValue}>{formatNumber(user.followers)}</span>
              seguidores
            </span>
            <span className={styles.statItem}>
              <span className={styles.statIcon}>👤</span>
              <span className={styles.statValue}>{formatNumber(user.following)}</span>
              seguindo
            </span>
            <span className={styles.statItem}>
              <span className={styles.statIcon}>📦</span>
              <span className={styles.statValue}>{formatNumber(user.public_repos)}</span>
              repositórios
            </span>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-outline-primary btn-sm ${styles.profileLink}`}
          >
            🔗 Ver no GitHub
          </a>
        </div>
      </div>
    </div>
  );
});
