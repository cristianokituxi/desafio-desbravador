import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Loading } from '../components/Loading/Loading';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Layout } from '../components/Layout/Layout';

const Home = lazy(() => import('../pages/Home/Home').then((m) => ({ default: m.Home })));
const RepositoryDetails = lazy(() =>
  import('../pages/RepositoryDetails/RepositoryDetails').then((m) => ({
    default: m.RepositoryDetails,
  })),
);
const NotFound = lazy(() =>
  import('../pages/NotFound/NotFound').then((m) => ({ default: m.NotFound })),
);

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading text="Carregando página..." />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          </ErrorBoundary>
        ),
      },
      {
        path: '/repository/:owner/:repo',
        element: (
          <ErrorBoundary>
            <SuspenseWrapper>
              <RepositoryDetails />
            </SuspenseWrapper>
          </ErrorBoundary>
        ),
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
