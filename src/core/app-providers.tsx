import React from 'react';
import { AuthProvider } from 'modules/auth/auth-context';

type AppProvidersProps = {
  children: React.ReactChild
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);
