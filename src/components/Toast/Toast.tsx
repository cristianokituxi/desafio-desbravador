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
            {toast.type === 'success' && '✅ '}
            {toast.type === 'error' && '❌ '}
            {toast.type === 'info' && 'ℹ️ '}
            {toast.text}
          </span>
          <button className={styles.closeButton} aria-label="Fechar">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
