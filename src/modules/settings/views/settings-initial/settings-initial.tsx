import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import CardContent from '@material-ui/core/CardContent';
import BaseFormInput from 'core/components/form/base-form-input';
import BaseButton from 'core/components/ui/base-button';
import BaseForm from 'core/components/form/base-form/base-form';
import BaseIconContainer from 'core/components/ui/base-icon-container';
import AuthService from 'modules/auth/auth-service';
import { useAuth } from 'modules/auth/auth-context';
import './settings-initial.scss';

const SettingsInitial: React.FC = () => {
  const [displayName, setDisplayName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const { updateUser } = useAuth();
  const { t } = useTranslation();

  const saveForm = async () => {
    setLoading(true);

    try {
      await AuthService.updateProfile({ displayName });
      updateUser({ displayName });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view view--centered">
      <Card>
        <CardContent className="settings-initial__card-content">
          <BaseIconContainer>
            <FaceIcon />
          </BaseIconContainer>
          <Typography
            component="h2"
            variant="h6"
            className="settings-initial__heading"
          >
            {t('settings.initialProfileSettings')}
          </Typography>
          <BaseForm
            onSubmit={saveForm}
            className="settings-initial__form"
            error={error}
          >
            <BaseFormInput
              label={t('settings.displayName')}
              name="display-name"
              onChange={setDisplayName}
              value={displayName}
              required
            />
            <BaseButton
              color="primary"
              fullWidth
              loading={loading}
              className="settings-initial__submit"
            >
              {t('common.submit')}
            </BaseButton>
          </BaseForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsInitial;
