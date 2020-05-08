import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from '@material-ui/core';
import { Children } from 'core/common-types';
import './base-button.scss';

type BaseButtonProps = {
  onClick?: (e?: React.MouseEvent) => void;
  children: Children;
  color: PropTypes.Color;
  loading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  type?: 'submit' | 'button' | 'reset';
  className?: string;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  onClick,
  color,
  children,
  loading = false,
  fullWidth = false,
  variant = 'contained',
  type = 'submit',
  className = '',
}) => (
  <Button
    fullWidth={fullWidth}
    variant={variant}
    color={color}
    className={`${className} btn`}
    disabled={loading}
    onClick={onClick}
    type={type}
  >
    {loading && (
      <span className="btn__loader-container">
        <CircularProgress size={20} color="primary" />
      </span>
    )}
    <span className="btn__content">{children}</span>
  </Button>
);

export default BaseButton;
