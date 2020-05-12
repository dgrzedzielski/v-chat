import React from 'react';
import { TFunctionResult } from 'i18next';
import { PropTypes } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

type BaseFormInputProps = {
  onChange: (val: any) => void;
  value: any;
  name: string;
  label: string | TFunctionResult;
  autoFocus?: boolean;
  required?: boolean;
  placeholder?: string;
  margin?: PropTypes.Margin;
  type?: 'text' | 'email' | 'password';
  className?: string;
};

const BaseFormInput: React.FC<BaseFormInputProps> = ({
  value,
  name,
  label,
  onChange,
  required = false,
  autoFocus = false,
  className,
  type = 'text',
  placeholder = '',
  margin = 'normal',
}) => {
  const baseOnChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <TextField
      value={value}
      onChange={baseOnChange}
      variant="outlined"
      margin={margin}
      autoComplete="off"
      required={required}
      fullWidth
      id={name}
      label={label}
      name={name}
      autoFocus={autoFocus}
      type={type}
      placeholder={placeholder}
      className={clsx(className)}
    />
  );
};

export default BaseFormInput;
