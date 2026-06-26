import { useToast } from '../../context/ToastContext';
import styles from './Toast.module.scss';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer} aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
          role="alert"
        >
          <span>
            {toast.type === 'success' && <span aria-hidden="true">✅ </span>}
            {toast.type === 'error' && <span aria-hidden="true">❌ </span>}
            {toast.type === 'info' && <span aria-hidden="true">ℹ️ </span>}
            {toast.text}
          </span>
          <button className={styles.closeButton} aria-label="Fechar">
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      ))}
    </div>
  );
}
