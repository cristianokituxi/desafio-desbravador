import styles from './Loading.module.scss';

interface LoadingProps {
  text?: string;
  variant?: 'spinner' | 'skeleton-card' | 'skeleton-profile' | 'skeleton-details';
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

  if (variant === 'skeleton-details') {
    return (
      <div className="container">
        {/* Back button skeleton */}
        <div
          className={styles.skeletonLine}
          style={{ width: '80px', height: '32px', marginBottom: '1.5rem' }}
        />

        <div className="card shadow-sm">
          <div className="card-body p-4">
            {/* Avatar + title row */}
            <div className="d-flex align-items-start gap-3 mb-3">
              <div className={styles.skeletonAvatar} style={{ width: '48px', height: '48px' }} />
              <div className="flex-grow-1">
                <div
                  className={styles.skeletonLine}
                  style={{ width: '50%', height: '28px', marginBottom: '0.5rem' }}
                />
                <div className={styles.skeletonLine} style={{ width: '30%', height: '16px' }} />
              </div>
            </div>

            {/* Description */}
            <div
              className={styles.skeletonLine}
              style={{ width: '100%', marginBottom: '1.5rem' }}
            />

            {/* Stats grid */}
            <div className="row g-3 mb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div className={styles.skeletonStatBox}>
                    <div
                      className={styles.skeletonLine}
                      style={{ width: '70%', height: '20px', marginBottom: '0.5rem' }}
                    />
                    <div className={styles.skeletonLine} style={{ width: '40%', height: '14px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Meta lines */}
            <div className={styles.skeletonLine} style={{ width: '35%' }} />
            <div className={styles.skeletonLine} style={{ width: '25%' }} />
            <div className={styles.skeletonLine} style={{ width: '30%' }} />

            {/* Buttons */}
            <div className="d-flex gap-2 mt-4">
              <div
                className={styles.skeletonLine}
                style={{ width: '160px', height: '38px', borderRadius: '6px' }}
              />
              <div
                className={styles.skeletonLine}
                style={{ width: '100px', height: '38px', borderRadius: '6px' }}
              />
            </div>
          </div>
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
