import React from 'react';
import { useAuth } from 'modules/auth/auth-context';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

export const App = () => {
  const { isReady, user } = useAuth();

  if (!isReady) return <div>Loading...</div>;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};
