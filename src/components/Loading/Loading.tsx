import styles from './Loading.module.scss';

interface LoadingProps {
  text?: string;
  variant?: 'spinner' | 'skeleton-card' | 'skeleton-profile';
}

export function Loading({ text = 'Carregando...', variant = 'spinner' }: LoadingProps) {
  if (variant === 'skeleton-card') {
    return (
      <div className="row g-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <div className={styles.skeletonCard} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'skeleton-profile') {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center gap-4 p-4">
        <div className={styles.skeletonAvatar} />
        <div className="flex-grow-1 w-100">
          <div className={styles.skeletonLine} style={{ width: '60%', height: '24px' }} />
          <div className={styles.skeletonLine} style={{ width: '40%' }} />
          <div className={styles.skeletonLine} style={{ width: '80%' }} />
          <div className={styles.skeletonLine} style={{ width: '30%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.spinnerContainer}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <p className={styles.spinnerText}>{text}</p>
    </div>
  );
}
