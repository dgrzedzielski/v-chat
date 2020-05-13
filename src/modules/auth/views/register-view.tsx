import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BaseLink from 'core/components/ui/base-link';
import AuthView from './auth-view';
import AuthService from '../auth-service';

const RegisterView: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = async (email: string, password: string) => {
    await AuthService.signUp(email, password);
    history.push('/');
  };

  return (
    <AuthView title={t('auth.createAccount')} submitAction={onSubmit}>
      <BaseLink to="/">{t('auth.signIn')}</BaseLink>
    </AuthView>
  );
};

export default RegisterView;
