import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { RateLimitProvider } from './context/RateLimitContext';
import { ToastContainer } from './components/Toast/Toast';
import { router } from './routes';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RateLimitProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </RateLimitProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
