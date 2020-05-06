import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'modules/auth/auth-context';

type AppProvidersProps = {
  children: React.ReactChild
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <Router>
    <AuthProvider>{children}</AuthProvider>
  </Router>
);
