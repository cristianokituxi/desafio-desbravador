import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { GitHubRepository } from '../../types';
import { formatNumber } from '../../utils/formatters';
import styles from './UserStats.module.scss';

interface UserStatsProps {
  repositories: GitHubRepository[];
}

export function UserStats({ repositories }: UserStatsProps) {
  const stats = useMemo(() => {
    if (repositories.length === 0) return null;

    const totalStars = repositories.reduce((sum, r) => sum + r.stargazers_count, 0);

    const topRepo = repositories.reduce((top, r) =>
      r.stargazers_count > top.stargazers_count ? r : top,
    );

    const languageCount: Record<string, number> = {};
    for (const r of repositories) {
      if (r.language) {
        languageCount[r.language] = (languageCount[r.language] ?? 0) + 1;
      }
    }

    const topLanguage =
      Object.entries(languageCount).length > 0
        ? Object.entries(languageCount).reduce((top, [lang, count]) =>
            count > top[1] ? [lang, count] : top,
          )[0]
        : null;

    return { totalStars, topRepo, topLanguage };
  }, [repositories]);

  if (!stats) return null;

  return (
    <div className={styles.statsRow}>
      <div className={styles.statCard}>
        <span className={styles.statIcon} aria-hidden="true">
          ⭐
        </span>
        <div>
          <span className={styles.statValue}>{formatNumber(stats.totalStars)}</span>
          <span className={styles.statLabel}>estrelas totais</span>
        </div>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statIcon} aria-hidden="true">
          🔤
        </span>
        <div>
          <span className={styles.statValue}>{stats.topLanguage ?? '—'}</span>
          <span className={styles.statLabel}>linguagem principal</span>
        </div>
      </div>

      <div className={styles.statCard}>
        <span className={styles.statIcon} aria-hidden="true">
          🏆
        </span>
        <div>
          <Link
            to={`/repository/${stats.topRepo.owner.login}/${stats.topRepo.name}`}
            className={styles.statLink}
          >
            {stats.topRepo.name}
          </Link>
          <span className={styles.statLabel}>
            repo mais popular (⭐ {formatNumber(stats.topRepo.stargazers_count)})
          </span>
        </div>
      </div>
    </div>
  );
}
