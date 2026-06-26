import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useRateLimit } from '../../context/RateLimitContext';
import styles from './Header.module.scss';

function RateLimitBadge() {
  const { remaining, limit, reset } = useRateLimit();

  if (remaining === null) return null;

  const percentage = limit ? (remaining / limit) * 100 : 100;
  const isLow = remaining <= 10;
  const isCritical = remaining === 0;

  const resetTime = reset ? new Date(reset * 1000) : null;
  const resetLabel = resetTime
    ? `Reseta em ${resetTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    : '';

  const title = [`Requisições: ${remaining}/${limit ?? '?'}`, resetLabel]
    .filter(Boolean)
    .join(' — ');

  return (
    <div
      className={`${styles.rateLimitBadge} ${isCritical ? styles.rateLimitCritical : ''} ${isLow && !isCritical ? styles.rateLimitLow : ''}`}
      title={title}
      aria-label={title}
      role="status"
    >
      <div className={styles.rateLimitBar} style={{ width: `${Math.max(percentage, 2)}%` }} />
      <span className={styles.rateLimitText}>
        {remaining}
        {limit && <span className={styles.rateLimitMax}>/{limit}</span>}
      </span>
    </div>
  );
}

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-3">
          <Link to="/" className={styles.brand}>
            <span className={styles.brandIcon} aria-hidden="true">
              🐙
            </span>
            <span className="d-none d-sm-inline">GitHub Explorer</span>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <RateLimitBadge />
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              aria-pressed={isDark}
              title={isDark ? 'Modo claro' : 'Modo escuro'}
            >
              <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
