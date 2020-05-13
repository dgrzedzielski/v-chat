import React from 'react';
import { TFunctionResult } from 'i18next';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ReactComponent as Illustration } from 'assets/login-img.svg';
import { Children } from 'core/common-types';
import BaseForm from 'core/components/form/base-form';
import BaseFormInput from 'core/components/form/base-form-input';
import BaseButton from 'core/components/ui/base-button';
import './auth-view.scss';

type AuthViewProps = {
  children: Children;
  title: string | TFunctionResult;
  submitAction: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | void>;
};

const AuthView: React.FC<AuthViewProps> = ({
  children,
  submitAction,
  title,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const { t } = useTranslation();

  const onSubmit = React.useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      await submitAction(email, password);
    } catch (err) {
      setError(err.code);
      setLoading(false);
    }
  }, [email, password, submitAction]);

  return (
    <Grid container component="main" className="view">
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        className="auth-view__image-container"
      >
        <Illustration className="img" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        component={Paper}
        elevation={4}
        alignItems="center"
        justify="center"
        container
      >
        <div className="auth-view__form-container">
          <Avatar className="auth-view__icon-container">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <BaseForm onSubmit={onSubmit} error={error}>
            <BaseFormInput
              label={t('auth.email')}
              value={email}
              onChange={setEmail}
              name="email"
              required
              autoFocus
            />
            <BaseFormInput
              label={t('auth.password')}
              value={password}
              onChange={setPassword}
              name="password"
              type="password"
              required
            />
            <BaseButton
              color="secondary"
              className="auth-view__submit"
              fullWidth
              loading={loading}
            >
              {title}
            </BaseButton>
            {children}
          </BaseForm>
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthView;
