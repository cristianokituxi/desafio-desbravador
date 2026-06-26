import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <span className={styles.emoji} aria-hidden="true">
        🚀
      </span>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Página não encontrada. Parece que você se perdeu no espaço!</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Voltar ao início
      </Link>
    </div>
  );
}
