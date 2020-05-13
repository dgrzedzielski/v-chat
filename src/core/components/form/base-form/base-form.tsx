import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Children } from 'core/common-types';
import { useTranslation } from 'react-i18next';
import './base-form.scss';

type BaseFormProps = {
  children: Children;
  onSubmit: () => void;
  className?: string;
  error?: string | null;
  withoutErrors?: boolean;
};

const BaseForm: React.FC<BaseFormProps> = ({
  children,
  onSubmit,
  className,
  withoutErrors = false,
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
    <form
      className={clsx('base-form', className, {
        'base-form--without-errors': withoutErrors,
      })}
      onSubmit={baseOnSubmit}
    >
      {children}
      {error && (
        <div className="base-form__error">
          <Typography variant="body1" color="error">
            {t(`errors.${error}`)}
          </Typography>
        </div>
      )}
    </form>
  );
};

export default BaseForm;
