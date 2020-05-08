import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Children } from 'core/common-types';
import { useTranslation } from 'react-i18next';
import './base-form.scss';

type BaseFormProps = {
  children: Children;
  onSubmit: () => void;
  error?: string | null;
};

const BaseForm: React.FC<BaseFormProps> = ({
  children,
  onSubmit,
  error = null,
}) => {
  const { t } = useTranslation();

  const baseOnSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  return (
    <form className="base-form" onSubmit={baseOnSubmit}>
      {children}
      {error && (
        <div className="base-form__error">
          <Typography variant="body1" color="error">
            {t(error)}
          </Typography>
        </div>
      )}
    </form>
  );
};

export default BaseForm;
