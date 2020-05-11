import React from 'react';
import { useAuth } from 'modules/auth/auth-context';
import FullScreenLoader from 'core/components/ui/full-screen-loader';
import DelayedFullScreenLoader from './components/ui/delayed-full-screen-loader';

const AuthenticatedApp = React.lazy(
  /* webpackPrefetch: true */ () => import('./authenticated-app')
);
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

const App = () => {
  const { isReady, user } = useAuth();

  if (!isReady) return <FullScreenLoader />;

  return (
    <React.Suspense fallback={<DelayedFullScreenLoader debounce={50} />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
