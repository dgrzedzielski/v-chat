import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from 'modules/auth/auth-context';
import defaultTheme from 'themes/default';

type AppProvidersProps = {
  children: React.ReactChild;
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <Router>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </Router>
);
