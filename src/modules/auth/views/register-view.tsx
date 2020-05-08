import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseLink from 'core/components/ui/base-link';
import AuthView from './auth-view';
import AuthService from '../auth-service';

const RegisterView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AuthView title={t('auth.createAccount')} submitAction={AuthService.signUp}>
      <BaseLink to="/">{t('auth.signIn')}</BaseLink>
    </AuthView>
  );
};

export default RegisterView;
