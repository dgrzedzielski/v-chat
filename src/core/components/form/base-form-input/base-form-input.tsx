import React from 'react';
import TextField from '@material-ui/core/TextField';
import { TFunctionResult } from 'i18next';

type BaseFormInputProps = {
  onChange: (val: any) => void;
  value: any;
  name: string;
  label: string | TFunctionResult;
  autoFocus?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
};

const BaseFormInput: React.FC<BaseFormInputProps> = ({
  value,
  name,
  label,
  onChange,
  required = false,
  autoFocus = false,
  type = 'text',
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
      margin="normal"
      autoComplete="off"
      required={required}
      fullWidth
      id={name}
      label={label}
      name={name}
      autoFocus={autoFocus}
      type={type}
    />
  );
};

export default BaseFormInput;
