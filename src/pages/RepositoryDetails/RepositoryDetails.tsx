import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { GitHubRepoDetails } from '../../types';
import { fetchRepoDetails } from '../../api/github';
import { formatNumber, formatDate } from '../../utils/formatters';
import { Avatar } from '../../components/Avatar/Avatar';
import { Loading } from '../../components/Loading/Loading';
import { parseGitHubError, getErrorMessage } from '../../errors/github';
import styles from './RepositoryDetails.module.scss';

export function RepositoryDetails() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [repoData, setRepoData] = useState<GitHubRepoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;

    const ownerName = owner;
    const repoName = repo;

    let cancelled = false;

    async function loadRepoDetails() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchRepoDetails(ownerName, repoName);
        if (!cancelled) {
          setRepoData(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(parseGitHubError(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadRepoDetails();

    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loading variant="skeleton-details" />
      </div>
    );
  }

  if (error || !repoData) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.errorState}>
            <h2>😕 {error || 'Repositório não encontrado'}</h2>
            <Link to="/" className="btn btn-primary mt-3">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link to="/" className={`btn btn-outline-secondary btn-sm ${styles.backButton}`}>
          ← Voltar
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={`card shadow-sm ${styles.repoCard}`}>
            <div className="d-flex align-items-start gap-3 mb-3">
              <Avatar src={repoData.owner.avatar_url} alt={repoData.owner.login} size="small" />
              <div>
                <div className={styles.repoHeader}>
                  <h1 className={styles.repoName}>{repoData.name}</h1>
                </div>
                <p className={styles.repoOwner}>por @{repoData.owner.login}</p>
              </div>
            </div>

            {repoData.description && (
              <p className={styles.repoDescription}>{repoData.description}</p>
            )}

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statValue}>
                  <span aria-hidden="true">⭐ </span>
                  {formatNumber(repoData.stargazers_count)}
                </span>
                <span className={styles.statLabel}>Stars</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statValue}>
                  <span aria-hidden="true">🍴 </span>
                  {formatNumber(repoData.forks_count)}
                </span>
                <span className={styles.statLabel}>Forks</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statValue}>
                  <span aria-hidden="true">👁️ </span>
                  {formatNumber(repoData.watchers_count)}
                </span>
                <span className={styles.statLabel}>Watchers</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statValue}>
                  <span aria-hidden="true">❗ </span>
                  {formatNumber(repoData.open_issues_count)}
                </span>
                <span className={styles.statLabel}>Issues abertas</span>
              </div>
            </div>

            <div className={styles.metaList}>
              {repoData.language && (
                <span className={styles.metaItem}>
                  Linguagem: <span className={styles.metaValue}>{repoData.language}</span>
                </span>
              )}
              {repoData.license && (
                <span className={styles.metaItem}>
                  Licença: <span className={styles.metaValue}>{repoData.license.name}</span>
                </span>
              )}
              <span className={styles.metaItem}>
                Criado: <span className={styles.metaValue}>{formatDate(repoData.created_at)}</span>
              </span>
              <span className={styles.metaItem}>
                Atualizado:{' '}
                <span className={styles.metaValue}>{formatDate(repoData.updated_at)}</span>
              </span>
            </div>

            <div className={styles.actionButtons}>
              <a
                href={repoData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span aria-hidden="true">🔗 </span>Abrir no GitHub
              </a>
              <Link to="/" className="btn btn-outline-secondary">
                <span aria-hidden="true">← </span>Voltar
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
