import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseLink from 'core/components/ui/base-link';
import AuthService from '../auth-service';
import AuthView from './auth-view';

const LoginView = () => {
  const { t } = useTranslation();

  return (
    <AuthView title={t('auth.signIn')} submitAction={AuthService.signIn}>
      <BaseLink to="/register">{t('auth.createAccount')}</BaseLink>
    </AuthView>
  );
};

export default LoginView;
